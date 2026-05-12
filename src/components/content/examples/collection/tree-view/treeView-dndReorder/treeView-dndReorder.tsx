import { h } from 'preact';
import { useMemo, useRef, useState } from 'preact/hooks';
import * as jsonDataText from 'text!./treeViewData.json';
import DemoDataTransfer from './DemoDataTransfer';
import type { ojMenuEventMap } from 'ojs/ojmenu';
import type { ojTreeView } from 'ojs/ojtreeview';
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');
import { AllKeySetImpl } from 'ojs/ojkeyset';
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

const treeData = JSON.parse(jsonDataText as string) as TreeNode[];

const cloneTreeData = (data: TreeNode[]) => JSON.parse(JSON.stringify(data)) as TreeNode[];

const findTreeviewItem = (data: TreeNode[], findId: string, deleteItem: boolean): TreeNode | null => {
  for (let index = 0; index < data.length; index += 1) {
    const item = data[index];
    if (item.id === findId) {
      if (deleteItem) {
        data.splice(index, 1);
      }
      return item;
    }

    if (item.children) {
      const foundChild = findTreeviewItem(item.children, findId, deleteItem);
      if (foundChild) {
        if (deleteItem && item.children.length === 0) {
          delete item.children;
        }
        return foundChild;
      }
    }
  }

  return null;
};

const createTreeviewItem = (
  data: TreeNode[],
  createdData: TreeNode,
  referenceId: string,
  position: string
): boolean => {
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

const isChild = (data: TreeNode[], parentId: string, childId: string) => {
  const parent = findTreeviewItem(data, parentId, false);
  if (!parent?.children) {
    return null;
  }

  return findTreeviewItem(parent.children, childId, false);
};

const createItemTemplateRenderer = (disabledKey: string) => (row: TreeViewItemTemplateContext) => [
  <span key="icon" class="oj-treeview-item-icon" />,
  <span
    key="text"
    class={`oj-treeview-item-text${row.data.id === disabledKey ? ' oj-text-color-disabled' : ''}`}
  >
    {row.data.title}
  </span>
];

export const TreeViewDndReorder = () => {
  const treeViewRef = useRef<ojTreeView<string, TreeNode> | null>(null);
  const clipboardRef = useRef(new DemoDataTransfer());
  const [items, setItems] = useState<TreeNode[]>(treeData);
  const [disabledKey, setDisabledKey] = useState('');
  const [hasClipboardItem, setHasClipboardItem] = useState(false);
  const expanded = useMemo(() => new AllKeySetImpl<string>(), []);
  const data = useMemo(
    () =>
      new ArrayTreeDataProvider(items, {
        keyAttributes: 'id'
      }),
    [items]
  );
  const itemTemplateRenderer = useMemo(
    () => createItemTemplateRenderer(disabledKey),
    [disabledKey]
  );

  const cutItem = (cutId: string) => {
    const clipboardTreeviewItem = findTreeviewItem(cloneTreeData(items), cutId, false);
    if (!clipboardTreeviewItem) {
      return;
    }

    clipboardRef.current.setData(
      'application/ojtreeviewitems+json',
      JSON.stringify(clipboardTreeviewItem)
    );
    setDisabledKey(clipboardTreeviewItem.id);
    setHasClipboardItem(true);
  };

  const pasteItem = (pasteId: string, position: string) => {
    const treeView = treeViewRef.current;
    const currentItem = treeView?.currentItem;
    if (!currentItem) {
      return;
    }

    setItems((currentItems) => {
      const nextItems = cloneTreeData(currentItems);
      if (isChild(nextItems, pasteId, currentItem)) {
        return currentItems;
      }

      const removedItem = findTreeviewItem(nextItems, pasteId, true);
      if (!removedItem) {
        return currentItems;
      }

      createTreeviewItem(nextItems, removedItem, currentItem, position);
      return nextItems;
    });

    setDisabledKey('');
    clipboardRef.current.clearData();
    setHasClipboardItem(false);
  };

  const handleMenuAction = (event: ojMenuEventMap['ojMenuAction']) => {
    const treeView = treeViewRef.current;
    const currentItem = treeView?.currentItem;
    if (!currentItem) {
      return;
    }

    if (event.detail.selectedValue === 'cut') {
      cutItem(currentItem);
      return;
    }

    const clipboardItem = JSON.parse(
      clipboardRef.current.getData('application/ojtreeviewitems+json')
    ) as TreeNode;
    if (clipboardItem?.id) {
      pasteItem(clipboardItem.id, event.detail.selectedValue);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    const treeView = treeViewRef.current;
    const currentItem = treeView?.currentItem;
    if (!currentItem) {
      return;
    }

    if ((event.ctrlKey || event.metaKey) && event.key === 'x') {
      cutItem(currentItem);
    }

    if ((event.ctrlKey || event.metaKey) && event.key === 'v') {
      const clipboardItem = JSON.parse(
        clipboardRef.current.getData('application/ojtreeviewitems+json')
      ) as TreeNode;
      if (clipboardItem?.id) {
        pasteItem(clipboardItem.id, 'before');
      }
    }
  };

  const handleDrop = (event: DragEvent, context: ojTreeView.ItemsDropOnDropContext) => {
    const treeView = treeViewRef.current;
    if (!event.dataTransfer || !treeView) {
      return;
    }

    const dragData = JSON.parse(
      event.dataTransfer.getData('application/ojtreeviewitems+json')
    ) as TreeNode[];
    const dragId = dragData[0]?.id;
    const dropId = treeView.getContextByNode(context.item)?.key;
    if (!dragId || !dropId || dragId === dropId) {
      return;
    }

    setItems((currentItems) => {
      const nextItems = cloneTreeData(currentItems);
      if (isChild(nextItems, dragId, dropId)) {
        return currentItems;
      }

      const draggedItem = findTreeviewItem(nextItems, dragId, true);
      if (!draggedItem) {
        return currentItems;
      }

      createTreeviewItem(nextItems, draggedItem, dropId, context.position);
      return nextItems;
    });
  };

  return (
    <div class="oj-lg-only-float-start oj-sm-margin-10x-start oj-md-width-2/5">
      <fieldset class="demo-fieldset oj-panel oj-panel-border-radius-0">
        <legend class="oj-sm-margin-6x-start oj-sm-padding-1x-vertical oj-sm-padding-3x-horizontal">
          Reorder
        </legend>
        <oj-tree-view
          ref={treeViewRef}
          id="treeview"
          data={data}
          expanded={expanded}
          onKeyDown={handleKeyDown}
          class="demo-treeview-height"
          aria-label="Tree View with Reorder Capability"
          {...{
            'dnd.drag.items.data-types': '["application/ojtreeviewitems+json"]',
            'dnd.drop.items.data-types': '["application/ojtreeviewitems+json"]',
            'dnd.drop.items.drop': handleDrop
          }}
        >
          <oj-menu slot="contextMenu" aria-label="menu with actions" onojMenuAction={handleMenuAction}>
            <oj-option id="cut" value="cut">
              Cut
            </oj-option>
            <oj-option id="pasteBefore" disabled={!hasClipboardItem} value="before">
              Paste Before
            </oj-option>
            <oj-option id="pasteAfter" disabled={!hasClipboardItem} value="after">
              Paste After
            </oj-option>
          </oj-menu>
          <template slot="itemTemplate" render={itemTemplateRenderer} />
        </oj-tree-view>
      </fieldset>
    </div>
  );
};

export default TreeViewDndReorder;
