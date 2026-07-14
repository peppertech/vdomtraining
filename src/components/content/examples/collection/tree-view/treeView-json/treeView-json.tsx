import 'ojs/ojtreeview';
import 'preact';
import { useMemo } from 'preact/hooks';
import * as jsonDataText from 'text!./treeViewData.json';
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');

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

export const TreeViewJson = () => {
  const data = useMemo(
    () =>
      new ArrayTreeDataProvider(jsonData, {
        keyAttributes: 'id'
      }),
    []
  );

  return (
    <oj-tree-view
      id="treeview"
      data={data}
      selectionMode="multiple"
      aria-label="Tree View with JSON Data"
    >
      <template slot="itemTemplate" render={itemTemplateRenderer} />
    </oj-tree-view>
  );
};

export default TreeViewJson;
