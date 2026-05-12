import { h } from 'preact';
import { useMemo, useRef, useState } from 'preact/hooks';
import * as jsonDataText from 'text!./treeViewData.json';
import type { ojMenuEventMap } from 'ojs/ojmenu';
import type { ojTreeView } from 'ojs/ojtreeview';
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');
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

const jsonData = JSON.parse(jsonDataText as string) as TreeNode[];

const itemTemplateRenderer = (row: TreeViewItemTemplateContext) => [
  <span key="icon" class="oj-treeview-item-icon" />,
  <span key="text" class="oj-treeview-item-text">
    {row.data.title}
  </span>
];

export const TreeViewContextMenu = () => {
  const treeViewRef = useRef<ojTreeView<string, TreeNode> | null>(null);
  const data = useMemo(
    () =>
      new ArrayTreeDataProvider(jsonData, {
        keyAttributes: 'id'
      }),
    []
  );
  const [selectedMenuItem, setSelectedMenuItem] = useState('(None selected yet)');

  const handleMenuAction = async (event: ojMenuEventMap['ojMenuAction']) => {
    const treeView = treeViewRef.current;
    if (!treeView?.currentItem) {
      return;
    }

    const results = await data.fetchByKeys({ keys: new Set([treeView.currentItem]) });
    const currentItem = results.results.get(treeView.currentItem) as { data: TreeNode } | undefined;
    if (currentItem) {
      setSelectedMenuItem(`${event.detail.selectedValue} from ${currentItem.data.title}`);
    }
  };

  return (
    <div id="treeview-container">
      <p>
        Last selected context menu action:{' '}
        <span id="results" class="oj-typography-body-lg oj-typography-bold">
          {selectedMenuItem}
        </span>
      </p>

      <oj-tree-view
        ref={treeViewRef}
        id="treeview"
        data={data}
        selectionMode="multiple"
        aria-label="Tree View with JSON Data"
      >
        <oj-menu slot="contextMenu" aria-label="menu with actions" onojMenuAction={handleMenuAction}>
          <oj-option id="action1" value="Action 1">
            Action 1
          </oj-option>
          <oj-option id="action2" value="Action 2">
            Action 2
          </oj-option>
          <oj-option id="action3" value="Action 3">
            Action 3
          </oj-option>
        </oj-menu>
        <template slot="itemTemplate" render={itemTemplateRenderer} />
      </oj-tree-view>
    </div>
  );
};

export default TreeViewContextMenu;
