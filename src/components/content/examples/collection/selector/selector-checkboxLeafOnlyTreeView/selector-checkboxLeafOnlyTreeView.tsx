import { KeySet,KeySetImpl } from 'ojs/ojkeyset';
import 'ojs/ojselector';
import type { SelectorElement } from 'ojs/ojselector';
import 'ojs/ojtreeview';
import type { ojTreeView } from 'ojs/ojtreeview';
import 'preact';
import { useMemo,useState } from 'preact/hooks';
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');

type TreeNode = {
  title: string;
  id: string;
  children?: TreeNode[];
};
type TreeNodeKeySet = KeySet<TreeNode['id']>;
type TreeItemTemplateContext = ojTreeView.ItemTemplateContext<
  TreeNode['id'],
  TreeNode
>;
type TreeSelectedChangedEvent = ojTreeView.selectedChanged<
  TreeNode['id'],
  TreeNode
>;
type SelectorSelectedKeysChangedEvent =
  SelectorElement.selectedKeysChanged<TreeNode['id']>;

const createEmptySelection = () => new KeySetImpl<TreeNode['id']>();

export const SelectorCheckboxLeafOnlyTreeView = () => {
  const [selectedItems, setSelectedItems] =
    useState<TreeNodeKeySet>(createEmptySelection());
  const expanded = useMemo(
    () => new KeySetImpl<TreeNode['id']>(['blogs', 'links', 'oracle', 'usa']),
    []
  );
  const treeData = useMemo(
    () => [
      {
        title: 'News',
        id: 'news'
      },
      {
        title: 'Blogs',
        id: 'blogs',
        children: [
          {
            title: 'Today',
            id: 'today'
          },
          {
            title: 'Archive',
            id: 'archive'
          }
        ]
      },
      {
        title: 'Links',
        id: 'links',
        children: [
          {
            title: 'Oracle',
            id: 'oracle',
            children: [
              {
                title: 'USA',
                id: 'usa',
                children: [
                  {
                    title: 'Northeast',
                    id: 'northeast'
                  },
                  {
                    title: 'West',
                    id: 'west'
                  }
                ]
              },
              {
                title: 'Europe',
                id: 'europe'
              }
            ]
          },
          {
            title: 'Microsoft',
            id: 'microsoft'
          }
        ]
      }
    ],
    []
  );
  const dataProvider = useMemo(
    () => new ArrayTreeDataProvider(treeData, { keyAttributes: 'id' }),
    [treeData]
  );

  const renderItemTemplate = (row: TreeItemTemplateContext) => [
    <oj-selector
      key="selector"
      aria-label={row.data.title}
      selected-keys={selectedItems}
      onselectedKeysChanged={(event: SelectorSelectedKeysChangedEvent) =>
        setSelectedItems(event.detail.value ?? createEmptySelection())
      }
      selection-mode="multiple"
      row-key={row.data.id}
    />,
    <span key="text" class="oj-treeview-item-text oj-sm-margin-2x-start">
      {row.data.title}
    </span>
  ];

  return (
    <div id="treeview-container">
      <oj-tree-view
        id="treeview"
        aria-label="leaf only selector tree"
        data={dataProvider}
        expanded={expanded}
        selected={selectedItems}
        onselectedChanged={(event: TreeSelectedChangedEvent) =>
          setSelectedItems(event.detail.value ?? createEmptySelection())
        }
        selectionMode="leafOnly"
      >
        <template slot="itemTemplate" render={renderItemTemplate} />
      </oj-tree-view>
      <div class="oj-sm-margin-4x-top">
        Current selection:{" "}
        {JSON.stringify(Array.from((selectedItems as KeySetImpl<string>).values()))}
      </div>
    </div>
  );
};

export default SelectorCheckboxLeafOnlyTreeView;
