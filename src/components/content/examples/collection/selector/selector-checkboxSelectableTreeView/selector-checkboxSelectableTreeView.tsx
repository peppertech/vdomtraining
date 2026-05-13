// @ts-nocheck
import { h } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');
import { KeySetImpl } from 'ojs/ojkeyset';
import 'ojs/ojoption';
import 'ojs/ojradioset';
import 'ojs/ojselector';
import 'ojs/ojtreeview';

export const SelectorCheckboxSelectableTreeView = () => {
  const [selectionMode, setSelectionMode] = useState('multiple');
  const [selectedItems, setSelectedItems] = useState<any>(new KeySetImpl());
  const expanded = useMemo(() => new KeySetImpl(['org', 'product']), []);
  const treeData = useMemo(
    () => [
      {
        id: 'org',
        title: 'Organization',
        children: [
          { id: 'finance', title: 'Finance' },
          { id: 'hr', title: 'Human Resources' }
        ]
      },
      {
        id: 'product',
        title: 'Product',
        children: [
          { id: 'ux', title: 'UX' },
          { id: 'engineering', title: 'Engineering' }
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
      selection-mode={selectionMode === 'single' ? 'single' : 'multiple'}
      row-key={row.data.id}
    />,
    <span key="text" class="oj-treeview-item-text oj-sm-margin-2x-start">
      {row.data.title}
    </span>
  ];

  return (
    <div id="treeview-container">
      <oj-radioset
        value={selectionMode}
        onvalueChanged={(event: any) => {
          setSelectionMode(event.detail.value ?? 'multiple');
          setSelectedItems(new KeySetImpl());
        }}
        labelHint="Selection Mode"
      >
        <oj-option value="single">Single</oj-option>
        <oj-option value="multiple">Multiple</oj-option>
        <oj-option value="multipleToggle">Multiple Toggle</oj-option>
        <oj-option value="leafOnly">Leaf Only</oj-option>
        <oj-option value="leafOnlyToggle">Leaf Only Toggle</oj-option>
        <oj-option value="none">None</oj-option>
      </oj-radioset>
      <oj-tree-view
        id="treeview"
        aria-label="selector tree view"
        data={dataProvider}
        expanded={expanded}
        selected={selectedItems}
        onselectedChanged={(event: any) => setSelectedItems(event.detail.value)}
        selectionMode={selectionMode}
      >
        <template slot="itemTemplate" render={renderItemTemplate} />
      </oj-tree-view>
      <div class="oj-sm-margin-4x-top">Current selection: {JSON.stringify(Array.from(selectedItems.values?.() ?? []))}</div>
    </div>
  );
};

export default SelectorCheckboxSelectableTreeView;
