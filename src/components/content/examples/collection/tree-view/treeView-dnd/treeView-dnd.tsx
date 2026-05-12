import { h } from 'preact';
import { useMemo, useRef, useState } from 'preact/hooks';
import * as jsonDragText from 'text!./treeViewDataDrag.json';
import * as jsonDropText from 'text!./treeViewDataDrop.json';
import type { ojMenu } from 'ojs/ojmenu';
import type { ojTreeView } from 'ojs/ojtreeview';
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');
import { KeySet, KeySetImpl } from 'ojs/ojkeyset';
import DemoDataTransfer from './DemoDataTransfer';
import 'css!./demo.css';
import 'ojs/ojmenu';
import 'ojs/ojtreeview';

type TreeNode = {
  title: string;
  id: string;
  children?: TreeNode[];
};

type TreeViewItemTemplateContext = {
  data: TreeNode;
};

const dragData = JSON.parse(jsonDragText as string) as TreeNode[];
const dropData = JSON.parse(jsonDropText as string) as TreeNode[];
const initialCards = ['Tools', 'Apps', 'Logs'];

const cloneTreeData = (data: TreeNode[]) => JSON.parse(JSON.stringify(data)) as TreeNode[];

const deleteTreeviewItem = (data: TreeNode[], itemId: string): TreeNode | null => {
  for (let index = 0; index < data.length; index += 1) {
    const item = data[index];
    if (item.id === itemId) {
      data.splice(index, 1);
      return item;
    }

    if (item.children) {
      const deletedItem = deleteTreeviewItem(item.children, itemId);
      if (deletedItem) {
        return deletedItem;
      }
    }
  }

  return null;
};

const createTreeviewItem = (
  data: TreeNode[],
  createdData: TreeNode,
  referenceId: string | null,
  position: string
) => {
  if (referenceId == null) {
    data.push(createdData);
    return true;
  }

  for (let index = 0; index < data.length; index += 1) {
    const item = data[index];
    if (item.id === referenceId) {
      if (position === 'before') {
        data.splice(index, 0, createdData);
      } else if (position === 'after') {
        data.splice(index + 1, 0, createdData);
      } else if (position === 'inside') {
        item.children = item.children ?? [];
        item.children.push(createdData);
      } else {
        item.children = item.children ?? [];
        item.children.unshift(createdData);
      }
      return true;
    }

    if (item.children && createTreeviewItem(item.children, createdData, referenceId, position)) {
      return true;
    }
  }

  return false;
};

const findTreeviewItem = (data: TreeNode[], itemId: string): TreeNode | null => {
  const clonedData = cloneTreeData(data);
  return deleteTreeviewItem(clonedData, itemId);
};

const createSourceItemTemplateRenderer = (disabledKeys: string[]) => (row: TreeViewItemTemplateContext) => [
  <span key="icon" class="oj-treeview-item-icon" />,
  <span
    key="text"
    class={`oj-treeview-item-text${disabledKeys.includes(row.data.id) ? ' oj-text-color-disabled' : ''}`}
  >
    {row.data.title}
  </span>
];

const targetItemTemplateRenderer = (row: TreeViewItemTemplateContext) => [
  <span key="icon" class="oj-treeview-item-icon" />,
  <span key="text" class="oj-treeview-item-text">
    {row.data.title}
  </span>
];

export const TreeViewDnd = () => {
  const sourceTreeRef = useRef<ojTreeView<string, TreeNode> | null>(null);
  const targetTreeRef = useRef<ojTreeView<string, TreeNode> | null>(null);
  const clipboardRef = useRef(new DemoDataTransfer());
  const [sourceItems, setSourceItems] = useState<TreeNode[]>(dragData);
  const [targetItems, setTargetItems] = useState<TreeNode[]>(dropData);
  const [cards, setCards] = useState<string[]>(initialCards);
  const [selected, setSelected] = useState<KeySet<string>>(() => new KeySetImpl<string>());
  const [disabledKeys, setDisabledKeys] = useState<string[]>([]);
  const [cutCardId, setCutCardId] = useState<string | null>(null);

  const sourceData = useMemo(
    () =>
      new ArrayTreeDataProvider(sourceItems, {
        keyAttributes: 'id'
      }),
    [sourceItems]
  );
  const targetData = useMemo(
    () =>
      new ArrayTreeDataProvider(targetItems, {
        keyAttributes: 'id'
      }),
    [targetItems]
  );
  const selectedKeys = useMemo(
    () => Array.from((selected as KeySetImpl<string>).values()),
    [selected]
  );
  const sourceItemTemplateRenderer = useMemo(
    () => createSourceItemTemplateRenderer(disabledKeys),
    [disabledKeys]
  );

  const handleSelectedChanged = (event: { detail: { value: KeySet<string> } }) => {
    setSelected(event.detail.value);
  };

  const cutSelectedItems = () => {
    if (selectedKeys.length === 0) {
      return;
    }

    const itemsToCut = selectedKeys
      .map((key) => findTreeviewItem(sourceItems, key))
      .filter((item): item is TreeNode => item != null);

    clipboardRef.current.setData('application/ojtreeviewitems+json', JSON.stringify(itemsToCut));
    setDisabledKeys(selectedKeys);
    setCutCardId(null);
  };

  const removeSelectedFromSource = () => {
    setSourceItems((currentItems) => {
      const nextItems = cloneTreeData(currentItems);
      selectedKeys.forEach((key) => {
        deleteTreeviewItem(nextItems, key);
      });
      return nextItems;
    });
    setSelected(new KeySetImpl<string>());
    setDisabledKeys([]);
  };

  const pasteFromClipboard = (position: string) => {
    const dropId = targetTreeRef.current?.currentItem ?? null;
    const itemData = clipboardRef.current.getData('application/ojtreeviewitems+json');
    const divData = clipboardRef.current.getData('dragdiv/text');

    if (itemData) {
      const parsedItems = JSON.parse(itemData) as TreeNode[];
      setTargetItems((currentItems) => {
        const nextItems = cloneTreeData(currentItems);
        parsedItems.forEach((item) => {
          createTreeviewItem(nextItems, item, dropId, position);
        });
        return nextItems;
      });
      removeSelectedFromSource();
    } else if (divData) {
      setTargetItems((currentItems) => {
        const nextItems = cloneTreeData(currentItems);
        createTreeviewItem(
          nextItems,
          {
            id: divData.toLowerCase(),
            title: divData
          },
          dropId,
          position
        );
        return nextItems;
      });
      setCards((currentCards) => currentCards.filter((card) => card !== divData));
      setCutCardId(null);
    }

    clipboardRef.current.clearData();
  };

  const handleMenuCut = () => {
    cutSelectedItems();
  };

  const handleMenuPaste = (event: ojMenu.ojAction) => {
    pasteFromClipboard(event.detail.selectedValue);
  };

  const handleKeyCut = (event: KeyboardEvent) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'x') {
      cutSelectedItems();
    }
  };

  const handleKeyPaste = (event: KeyboardEvent) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'v') {
      pasteFromClipboard('after');
    }
  };

  const handleDrop = (event: DragEvent, context: ojTreeView.ItemsDropOnDropContext) => {
    if (!event.dataTransfer || !targetTreeRef.current) {
      return;
    }

    const dropId = context.item
      ? targetTreeRef.current.getContextByNode(context.item)?.key ?? null
      : null;
    const itemData = event.dataTransfer.getData('application/ojtreeviewitems+json');
    const divData = event.dataTransfer.getData('dragdiv/text');

    if (itemData) {
      const parsedItems = JSON.parse(itemData) as TreeNode[];
      setTargetItems((currentItems) => {
        const nextItems = cloneTreeData(currentItems);
        parsedItems.forEach((item) => {
          createTreeviewItem(nextItems, item, dropId, context.position);
        });
        return nextItems;
      });
    } else if (divData) {
      setTargetItems((currentItems) => {
        const nextItems = cloneTreeData(currentItems);
        createTreeviewItem(
          nextItems,
          { id: divData.toLowerCase(), title: divData },
          dropId,
          context.position
        );
        return nextItems;
      });
    }
  };

  const handleDragEnd = (event: DragEvent) => {
    if (event.dataTransfer?.dropEffect !== 'none') {
      removeSelectedFromSource();
    }
  };

  const handleCardDragStart = (event: DragEvent) => {
    const cardText = (event.currentTarget as HTMLElement).textContent ?? '';
    event.dataTransfer?.setData('dragdiv/text', cardText);
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = event.ctrlKey ? 'copy' : 'move';
    }
  };

  const handleCardDragEnd = (event: DragEvent) => {
    if (event.dataTransfer?.dropEffect === 'move') {
      const cardId = (event.currentTarget as HTMLElement).textContent ?? '';
      setCards((currentCards) => currentCards.filter((card) => card !== cardId));
      setCutCardId(null);
    }
  };

  const handleCardKeyDown = (event: KeyboardEvent) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'x') {
      const cardText = (event.currentTarget as HTMLElement).textContent ?? '';
      clipboardRef.current.setData('dragdiv/text', cardText);
      setCutCardId(cardText.toLowerCase());
      setDisabledKeys([]);
    }
  };

  const handleDragTouchMove = (event: TouchEvent) => {
    event.preventDefault();
  };

  return (
    <>
      <div id="treeviews">
        <div class="oj-lg-only-float-start">
          <fieldset class="demo-fieldset oj-panel oj-panel-border-radius-0">
            <legend class="oj-sm-margin-6x-start oj-sm-padding-1x-vertical oj-sm-padding-3x-horizontal">
              Drag Sources
            </legend>
            <div class="demo-div-container">
              {cards.map((card) => {
                const cardId = card.toLowerCase();
                const backgroundClass =
                  cutCardId === cardId ? 'oj-bg-neutral-30' : 'oj-bg-danger-30';

                return (
                  <div
                    key={cardId}
                    id={cardId}
                    tabIndex={0}
                    draggable={true}
                    class={`demo-card oj-helper-text-align-center ${backgroundClass} oj-panel oj-sm-padding-0 oj-panel-border-radius-0 oj-sm-margin-3x-top oj-lg-only-float-start oj-sm-margin-6x-bottom oj-sm-margin-2x-horizontal`}
                    onKeyDown={handleCardKeyDown}
                    onDragStart={handleCardDragStart}
                    onDragEnd={handleCardDragEnd}
                    onTouchMove={handleDragTouchMove}
                  >
                    {card}
                  </div>
                );
              })}
            </div>
            <div class="demo-clear" />

            <div class="oj-lg-only-float-start">
              <oj-tree-view
                ref={sourceTreeRef}
                id="treeviewDrag"
                onKeyDown={handleKeyCut}
                selectionMode="multiple"
                selected={selected}
                onselectedChanged={handleSelectedChanged}
                data={sourceData}
                aria-label="Tree View Drag Source"
                class="demo-position"
                {...{
                  'dnd.drag.items.data-types': '["application/ojtreeviewitems+json"]',
                  'dnd.drag.items.drag-end': handleDragEnd
                }}
              >
                <oj-menu slot="contextMenu" aria-label="menu with actions" onojMenuAction={handleMenuCut}>
                  <oj-option id="cut" value="cut" disabled={selectedKeys.length === 0}>
                    Cut
                  </oj-option>
                </oj-menu>
                <template slot="itemTemplate" render={sourceItemTemplateRenderer} />
              </oj-tree-view>
            </div>
          </fieldset>
        </div>

        <div class="oj-lg-only-float-start oj-sm-margin-10x-start">
          <fieldset class="demo-fieldset oj-panel oj-panel-border-radius-0">
            <legend class="oj-sm-margin-6x-start oj-sm-padding-1x-vertical oj-sm-padding-3x-horizontal">
              Drop Target
            </legend>
            <oj-tree-view
              ref={targetTreeRef}
              id="treeviewDrop"
              onKeyDown={handleKeyPaste}
              data={targetData}
              aria-label="Tree View Drop Target"
              {...{
                'dnd.drop.items.data-types': '["application/ojtreeviewitems+json", "dragdiv/text"]',
                'dnd.drop.items.drop': handleDrop
              }}
            >
              <oj-menu slot="contextMenu" aria-label="menu with actions" onojMenuAction={handleMenuPaste}>
                <oj-option
                  id="pasteBefore"
                  disabled={
                    !clipboardRef.current.getData('application/ojtreeviewitems+json') &&
                    !clipboardRef.current.getData('dragdiv/text')
                  }
                  value="before"
                >
                  Paste Before
                </oj-option>
                <oj-option
                  id="pasteAfter"
                  disabled={
                    !clipboardRef.current.getData('application/ojtreeviewitems+json') &&
                    !clipboardRef.current.getData('dragdiv/text')
                  }
                  value="after"
                >
                  Paste After
                </oj-option>
              </oj-menu>
              <template slot="itemTemplate" render={targetItemTemplateRenderer} />
            </oj-tree-view>
          </fieldset>
        </div>
      </div>

      <div class="demo-clear" />
      <p />
    </>
  );
};

export default TreeViewDnd;
