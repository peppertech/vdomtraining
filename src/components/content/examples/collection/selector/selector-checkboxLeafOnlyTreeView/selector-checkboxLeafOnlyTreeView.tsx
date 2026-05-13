import { h } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');
import { KeySetImpl } from 'ojs/ojkeyset';
import 'ojs/ojselector';
import 'ojs/ojtreeview';

export const SelectorCheckboxLeafOnlyTreeView = () => {
  const [selectedItems, setSelectedItems] = useState<any>(new KeySetImpl());
  const expanded = useMemo(() => new KeySetImpl(['blogs', 'links', 'oracle', 'usa']), []);
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

  const renderItemTemplate = (row: any) => [
    <oj-selector
      key="selector"
      aria-label={row.data.title}
      selected-keys={selectedItems}
      onselectedKeysChanged={(event: any) => setSelectedItems(event.detail.value)}
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
        onselectedChanged={(event: any) => setSelectedItems(event.detail.value)}
        selectionMode="leafOnly"
      >
        <template slot="itemTemplate" render={renderItemTemplate} />
      </oj-tree-view>
      <div class="oj-sm-margin-4x-top">Current selection: {JSON.stringify(Array.from(selectedItems.values?.() ?? []))}</div>
    </div>
  );
};

export default SelectorCheckboxLeafOnlyTreeView;
