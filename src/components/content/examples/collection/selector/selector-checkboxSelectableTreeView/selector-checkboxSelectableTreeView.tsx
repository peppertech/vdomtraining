// @ts-nocheck
import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');
import { KeySet, KeySetImpl } from 'ojs/ojkeyset';
import type { ojTreeView } from 'ojs/ojtreeview';
import type { SelectorElement } from 'ojs/ojselector';
import 'ojs/ojoption';
import 'ojs/ojradioset';
import 'ojs/ojselector';
import 'ojs/ojtreeview';

type TreeNode = {
  id: string;
  title: string;
  children?: TreeNode[];
};
type TreeViewSelectionMode = NonNullable<
  ComponentProps<'oj-tree-view'>['selectionMode']
>;
type TreeNodeKeySet = KeySet<TreeNode['id']>;
type TreeItemTemplateContext = ojTreeView.ItemTemplateContext<
  TreeNode['id'],
  TreeNode
>;
type TreeSelectedChangedEvent = ojTreeView.selectedChanged<
  TreeNode['id'],
  TreeNode
>;
type RadioValueChangedEvent = CustomEvent<{
  value: TreeViewSelectionMode | null;
}>;
type SelectorSelectedKeysChangedEvent =
  SelectorElement.selectedKeysChanged<TreeNode['id']>;

const createEmptySelection = () => new KeySetImpl<TreeNode['id']>();

export const SelectorCheckboxSelectableTreeView = () => {
  const [selectionMode, setSelectionMode] =
    useState<TreeViewSelectionMode>('multiple');
  const [selectedItems, setSelectedItems] =
    useState<TreeNodeKeySet>(createEmptySelection());
  const expanded = useMemo(
    () => new KeySetImpl<TreeNode['id']>(['org', 'product']),
    []
  );
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

  const renderItemTemplate = (row: TreeItemTemplateContext) => [
    <oj-selector
      key="selector"
      aria-label={row.data.title}
      selected-keys={selectedItems}
      onselectedKeysChanged={(event: SelectorSelectedKeysChangedEvent) =>
        setSelectedItems(event.detail.value ?? createEmptySelection())
      }
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
        onvalueChanged={(event: RadioValueChangedEvent) => {
          setSelectionMode(event.detail.value ?? 'multiple');
          setSelectedItems(createEmptySelection());
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
        onselectedChanged={(event: TreeSelectedChangedEvent) =>
          setSelectedItems(event.detail.value ?? createEmptySelection())
        }
        selectionMode={selectionMode}
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

export default SelectorCheckboxSelectableTreeView;
