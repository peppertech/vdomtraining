import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import * as jsonDataText from 'text!./treeViewData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');
import { AllKeySetImpl, KeySet, KeySetImpl } from 'ojs/ojkeyset';
import 'ojs/ojbutton';
import 'ojs/ojformlayout';
import 'ojs/ojinputtext';
import 'ojs/ojselectsingle';
import 'ojs/ojtreeview';

type TreeNode = {
  title: string;
  id: string;
  children?: TreeNode[];
};

type TreeViewItemTemplateContext = {
  data: TreeNode;
};

type TreeViewSelectionMode = NonNullable<ComponentProps<'oj-tree-view'>['selectionMode']>;
type TreeViewSelectedChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-tree-view'>['onselectedChanged']>
>[0];
type SelectSingleValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-select-single'>['onvalueChanged']>
>[0];

type SelectionModeOption = {
  value: TreeViewSelectionMode;
  label: string;
};

const jsonData = JSON.parse(jsonDataText as string) as TreeNode[];

const selectionModes: SelectionModeOption[] = [
  { value: 'single', label: 'Single' },
  { value: 'multiple', label: 'Multiple' },
  { value: 'multipleToggle', label: 'Multiple Toggle' },
  { value: 'leafOnly', label: 'Leaf Only' },
  { value: 'leafOnlyToggle', label: 'Leaf Only Toggle' },
  { value: 'none', label: 'None' }
];

const itemTemplateRenderer = (row: TreeViewItemTemplateContext) => [
  <span key="icon" class="oj-treeview-item-icon" />,
  <span key="text" class="oj-treeview-item-text">
    {row.data.title}
  </span>
];

const getSelectionInfo = (selected: KeySet<string>) => {
  if (!selected.isAddAll()) {
    const selectedValues = Array.from((selected as KeySetImpl<string>).values());
    return selectedValues.length > 0 ? selectedValues.join(', ') : 'none';
  }

  const deletedValues = Array.from((selected as AllKeySetImpl<string>).deletedValues());
  return deletedValues.length > 0
    ? `All Selected Except ${deletedValues.join(', ')}`
    : 'All Selected';
};

const isSelectionEmpty = (selected: KeySet<string>) =>
  !selected.isAddAll() && Array.from((selected as KeySetImpl<string>).values()).length === 0;

export const TreeViewSelection = () => {
  const data = useMemo(
    () =>
      new ArrayTreeDataProvider(jsonData, {
        keyAttributes: 'id'
      }),
    []
  );
  const selectionModeDP = useMemo(
    () =>
      new ArrayDataProvider(selectionModes, {
        keyAttributes: 'value'
      }),
    []
  );
  const [selected, setSelected] = useState<KeySet<string>>(() => new KeySetImpl<string>());
  const [selectedSelectionMode, setSelectedSelectionMode] =
    useState<TreeViewSelectionMode>('multiple');

  const handleSelectedChanged = (event: TreeViewSelectedChangedEvent) => {
    setSelected(event.detail.value as KeySet<string>);
  };

  const handleSelectionModeChanged = (event: SelectSingleValueChangedEvent) => {
    const selectionMode = event.detail.value as TreeViewSelectionMode | null;
    if (selectionMode) {
      setSelectedSelectionMode(selectionMode);
      setSelected(new KeySetImpl<string>());
    }
  };

  const clearSelection = () => {
    setSelected(new KeySetImpl<string>());
  };

  return (
    <div id="treeview-container">
      <div class="oj-panel oj-bg-neutral-30 oj-sm-margin-4x-bottom">
        <oj-form-layout labelEdge="top" maxColumns={2} direction="row">
          <oj-select-single
            id="selection-mode"
            labelHint="Selection Mode"
            value={selectedSelectionMode}
            data={selectionModeDP}
            onvalueChanged={handleSelectionModeChanged}
          />
          <oj-text-area
            labelHint="Current Selection"
            readonly={true}
            value={getSelectionInfo(selected)}
          />
          <oj-button onojAction={clearSelection} disabled={isSelectionEmpty(selected)}>
            Clear selection
          </oj-button>
        </oj-form-layout>
      </div>
      <oj-tree-view
        id="treeview"
        data={data}
        selected={selected}
        selectionMode={selectedSelectionMode}
        onselectedChanged={handleSelectedChanged}
        aria-label="Tree View Selected Demo"
      >
        <template slot="itemTemplate" render={itemTemplateRenderer} />
      </oj-tree-view>
    </div>
  );
};

export default TreeViewSelection;
