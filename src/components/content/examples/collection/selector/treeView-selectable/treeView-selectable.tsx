import { h } from 'preact';
import { useMemo } from 'preact/hooks';
import * as jsonDataText from 'text!./treeViewData.json';
import type { ojTreeView } from 'ojs/ojtreeview';
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');
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

const leafOnly = (itemContext: ojTreeView.ItemContext<string, TreeNode>) => itemContext.leaf;

const treeItemOptions = {
  selectable: leafOnly
};

export const TreeViewSelectable = () => {
  const data = useMemo(
    () =>
      new ArrayTreeDataProvider(jsonData, {
        keyAttributes: 'id'
      }),
    []
  );

  return (
    <div id="treeview-container">
      <oj-tree-view
        id="treeview"
        data={data}
        item={treeItemOptions}
        selectionMode="multiple"
        aria-label="Tree View Selectable and Focusable Demo"
      >
        <template slot="itemTemplate" render={itemTemplateRenderer} />
      </oj-tree-view>
    </div>
  );
};

export default TreeViewSelectable;
