import { h } from 'preact';
import { useMemo, useRef, useState } from 'preact/hooks';
import DemoDataTransfer from './DemoDataTransfer';
import type { ojMenuEventMap } from 'ojs/ojmenu';
import type { ojTreeView } from 'ojs/ojtreeview';
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');
import { AllKeySetImpl, KeySet, KeySetImpl } from 'ojs/ojkeyset';
import 'css!./demo.css';
import 'ojs/ojmenu';
import 'ojs/ojtreeview';

type TreeNode = {
  key: string;
  title: string;
  children?: TreeNode[];
};

type FlatItem = {
  key: string;
  year: number;
  title: string;
  q: string;
};

type TreeViewItemTemplateContext = {
  data: TreeNode;
};

const initialFlatArray: FlatItem[] = [
  { title: 'Jan', q: 'Q1', year: 2023, key: '2023_q1_jan' },
  { title: 'Mar', q: 'Q1', year: 2023, key: '2023_q1_mar' },
  { title: 'Apr', q: 'Q2', year: 2023, key: '2023_q2_apr' },
  { title: 'May', q: 'Q2', year: 2023, key: '2023_q2_may' },
  { title: 'Feb', q: 'Q1', year: 2023, key: '2023_q1_feb' },
  { title: 'Jun', q: 'Q2', year: 2023, key: '2023_q2_jun' },
  { title: 'Jul', q: 'Q3', year: 2023, key: '2023_q3_jul' },
  { title: 'Aug', q: 'Q3', year: 2023, key: '2023_q3_aug' },
  { title: 'Sep', q: 'Q3', year: 2023, key: '2023_q3_sep' },
  { title: 'Oct', q: 'Q4', year: 2023, key: '2023_q4_oct' },
  { title: 'Nov', q: 'Q4', year: 2023, key: '2023_q4_nov' },
  { title: 'Jan', q: 'Q1', year: 2024, key: '2024_q1_jan' },
  { title: 'Dec', q: 'Q4', year: 2023, key: '2023_q4_dec' },
  { title: 'Feb', q: 'Q1', year: 2024, key: '2024_q1_feb' },
  { title: 'Mar', q: 'Q1', year: 2024, key: '2024_q1_mar' },
  { title: 'Apr', q: 'Q2', year: 2024, key: '2024_q2_apr' },
  { title: 'May', q: 'Q2', year: 2024, key: '2024_q2_may' },
  { title: 'Jun', q: 'Q2', year: 2024, key: '2024_q2_jun' },
  { title: 'Jul', q: 'Q3', year: 2024, key: '2024_q3_jul' },
  { title: 'Aug', q: 'Q3', year: 2024, key: '2024_q3_aug' },
  { title: 'Sep', q: 'Q3', year: 2024, key: '2024_q3_sep' },
  { title: 'Oct', q: 'Q4', year: 2024, key: '2024_q4_oct' },
  { title: 'Nov', q: 'Q4', year: 2024, key: '2024_q4_nov' },
  { title: 'Dec', q: 'Q4', year: 2024, key: '2024_q4_dec' }
];

const nestArray = (flatArray: FlatItem[], groupingProps: Array<keyof FlatItem>) => {
  const tree: TreeNode[] = [];
  const groupingMap = new Map<string, Map<string, number>>();
  let lastItem: FlatItem | null = null;

  groupingProps.forEach((prop) => {
    groupingMap.set(String(prop), new Map<string, number>());
  });

  flatArray.forEach((item) => {
    let currentLevel = tree;
    let currentGroupKey = '';

    groupingProps.forEach((prop, index) => {
      const propValue = String(item[prop]);
      const groupKey = `${currentGroupKey}_${propValue}`;
      const propMap = groupingMap.get(String(prop));
      const groupCount = propMap?.get(groupKey) ?? 0;
      let group: TreeNode | undefined;

      if (lastItem?.[prop] === item[prop]) {
        group = currentLevel.find((entry) => entry.key === `${groupKey}_${groupCount - 1}`);
        if (!group && index < groupingProps.length - 1) {
          group = {
            title: propValue,
            key: `${groupKey}_${groupCount}`,
            children: []
          };
          currentLevel.push(group);
        }
      } else {
        propMap?.set(groupKey, groupCount + 1);
        group = {
          title: propValue,
          key: `${groupKey}_${groupCount}`,
          children: []
        };
        currentLevel.push(group);
      }

      if (!group) {
        return;
      }

      if (index === groupingProps.length - 1) {
        group.children?.push(item as unknown as TreeNode);
      } else {
        currentLevel = group.children ?? [];
      }

      currentGroupKey = groupKey;
    });

    lastItem = item;
  });

  return tree;
};

const itemTemplateRenderer = (item: TreeViewItemTemplateContext) => (
  <li id={item.data.key}>
    <span class="oj-treeview-item-icon" />
    <span class="oj-treeview-item-text">{item.data.title}</span>
  </li>
);

export const TreeViewGrouping = () => {
  const treeViewRef = useRef<ojTreeView<string, TreeNode> | null>(null);
  const clipboardRef = useRef(new DemoDataTransfer());
  const [flatArray, setFlatArray] = useState<FlatItem[]>(initialFlatArray);
  const [selected, setSelected] = useState<KeySet<string>>(() => new KeySetImpl<string>());
  const [cutDisabled, setCutDisabled] = useState(false);
  const [pasteDisabled, setPasteDisabled] = useState(true);

  const expanded = useMemo(() => new AllKeySetImpl<string>(), []);
  const data = useMemo(
    () =>
      new ArrayTreeDataProvider(nestArray(flatArray, ['year', 'q']), {
        keyAttributes: 'key'
      }),
    [flatArray]
  );

  const handleSelectedChanged = (event: { detail: { value: KeySet<string> } }) => {
    setSelected(event.detail.value);
  };

  const handleReorder = (reorderKey: string, dropKey: string, position: string) => {
    setFlatArray((currentFlatArray) => {
      if (reorderKey === dropKey) {
        return currentFlatArray;
      }

      const nextFlatArray = [...currentFlatArray];
      const dragIndex = nextFlatArray.findIndex((item) => item.key === reorderKey);
      if (dragIndex === -1) {
        return currentFlatArray;
      }

      const [removedData] = nextFlatArray.splice(dragIndex, 1);
      const dropIndex = nextFlatArray.findIndex((item) => item.key === dropKey);
      if (dropIndex === -1) {
        return currentFlatArray;
      }

      if (position === 'before') {
        nextFlatArray.splice(dropIndex, 0, removedData);
      } else if (position === 'after') {
        nextFlatArray.splice(dropIndex + 1, 0, removedData);
      }

      return nextFlatArray;
    });
  };

  const cutItem = () => {
    const treeView = treeViewRef.current;
    const currentItem = treeView?.currentItem;
    if (!currentItem) {
      return;
    }

    let cutData: string[] = [];
    if (selected.has(currentItem)) {
      if (!selected.isAddAll()) {
        cutData = Array.from((selected as KeySetImpl<string>).values());
      } else {
        cutData = flatArray.map((item) => item.key);
      }
    } else {
      cutData = [currentItem];
    }

    clipboardRef.current.setData('application/ojtreeviewitems+json', JSON.stringify(cutData));
  };

  const pasteItems = (clipboardData: string[], position: string) => {
    const treeView = treeViewRef.current;
    const currentItem = treeView?.currentItem;
    if (!currentItem) {
      return;
    }

    clipboardData.forEach((key) => {
      handleReorder(key, currentItem, position);
    });
    clipboardRef.current.clearData();
  };

  const handleMenuAction = (event: ojMenuEventMap['ojMenuAction']) => {
    if (event.detail.selectedValue === 'cut') {
      cutItem();
      return;
    }

    const clipboardData = JSON.parse(
      clipboardRef.current.getData('application/ojtreeviewitems+json')
    ) as string[];
    if (clipboardData.length > 0) {
      pasteItems(clipboardData, event.detail.selectedValue);
    }
  };

  const handleBeforeOpen = () => {
    const treeView = treeViewRef.current;
    const currentItem = treeView?.currentItem;
    const currentNode = currentItem ? treeView?.querySelector<HTMLElement>(`#${currentItem}`) : null;
    const currentContext = currentNode && treeView ? treeView.getContextByNode(currentNode) : null;

    if (!currentContext?.leaf) {
      setCutDisabled(true);
      setPasteDisabled(true);
      return;
    }

    setCutDisabled(false);
    setPasteDisabled(!clipboardRef.current.getData('application/ojtreeviewitems+json'));
  };

  const handleKeyDownOperation = (event: KeyboardEvent) => {
    const treeView = treeViewRef.current;
    const currentItem = treeView?.currentItem;
    if (!currentItem) {
      return;
    }

    if ((event.ctrlKey || event.metaKey) && event.key === 'v') {
      const clipboardData = JSON.parse(
        clipboardRef.current.getData('application/ojtreeviewitems+json')
      ) as string[];
      if (clipboardData.length > 0) {
        pasteItems(clipboardData, 'before');
      }
    } else if ((event.ctrlKey || event.metaKey) && event.key === 'x') {
      cutItem();
    }
  };

  const handleDrop = (event: DragEvent, context: ojTreeView.ItemsDropOnDropContext) => {
    const treeView = treeViewRef.current;
    if (!event.dataTransfer || !treeView) {
      return;
    }

    const dropContext = treeView.getContextByNode(context.item);
    const dragDataArray = JSON.parse(
      event.dataTransfer.getData('application/ojtreeviewitems+json')
    ) as FlatItem[];

    if (dropContext?.leaf && context.position !== 'inside') {
      dragDataArray.forEach((dragData) => {
        handleReorder(dragData.key, dropContext.key, context.position);
      });
    }
  };

  const handleDragEvents = (event: Event, context: ojTreeView.ItemsDropOnDropContext) => {
    const treeView = treeViewRef.current;
    if (!treeView) {
      return;
    }

    const dragContext = treeView.getContextByNode(context.item);
    if (dragContext?.leaf) {
      event.preventDefault();
    }
  };

  return (
    <div id="treeview-container">
      <div class="oj-sm-margin-6x-bottom" />
      <oj-tree-view
        ref={treeViewRef}
        id="treeview"
        data={data}
        expanded={expanded}
        selected={selected}
        onselectedChanged={handleSelectedChanged}
        selectionMode="leafOnly"
        onKeyDown={handleKeyDownOperation}
        class="demo-treeview-height"
        aria-label="Grouping Leaf Reorder"
        {...{
          'dnd.drag.items.data-types': '["application/ojtreeviewitems+json"]',
          'dnd.drop.items.drop': handleDrop,
          'dnd.drop.items.drag-over': handleDragEvents,
          'dnd.drop.items.drag-enter': handleDragEvents,
          'dnd.drop.items.drag-leave': handleDragEvents
        }}
      >
        <oj-menu
          id="tvContextMenu"
          slot="contextMenu"
          aria-label="Edit"
          onojMenuAction={handleMenuAction}
          onojBeforeOpen={handleBeforeOpen}
        >
          <oj-option id="cut" value="cut" disabled={cutDisabled}>
            Cut
          </oj-option>
          <oj-option id="pasteBefore" disabled={pasteDisabled} value="before">
            Paste Before
          </oj-option>
          <oj-option id="pasteAfter" disabled={pasteDisabled} value="after">
            Paste After
          </oj-option>
        </oj-menu>
        <template slot="itemTemplate" render={itemTemplateRenderer} />
      </oj-tree-view>
    </div>
  );
};

export default TreeViewGrouping;
