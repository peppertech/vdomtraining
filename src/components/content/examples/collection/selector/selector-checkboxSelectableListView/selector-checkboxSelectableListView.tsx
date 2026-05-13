import { h, type ComponentProps } from 'preact';
import { useCallback, useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { ImmutableKeySet, KeySet, KeySetImpl } from 'ojs/ojkeyset';
import type { ojListView } from 'ojs/ojlistview';
import type { SelectorElement } from 'ojs/ojselector';
import 'ojs/ojlistview';
import 'ojs/ojlistitemlayout';
import 'ojs/ojoption';
import 'ojs/ojradioset';
import 'ojs/ojselector';

type Employee = {
  id: number;
  name: string;
  title: string;
};

type SelectionMode = Extract<
  ComponentProps<'oj-list-view'>['selectionMode'],
  'multiple' | 'multipleToggle'
>;
type SelectedKeySet = KeySet<Employee['id']>;
type ItemTemplateContext = ojListView.ItemTemplateContext<Employee['id'], Employee>;
type RadioValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-radioset'>['onvalueChanged']>
>[0];

const createEmptySelection = () => new KeySetImpl<Employee['id']>() as SelectedKeySet;

const getDisplayValue = (selected: SelectedKeySet) => {
  const immutableSelection = selected as ImmutableKeySet<Employee['id']>;
  const keyState = immutableSelection.keys;

  if (keyState.all) {
    const deletedKeys = Array.from(keyState.deletedKeys.values());
    return deletedKeys.length > 0
      ? `Everything selected except: ${JSON.stringify(deletedKeys)}`
      : 'Everything selected';
  }

  return JSON.stringify(Array.from(keyState.keys.values()));
};

export const SelectorCheckboxSelectableListView = () => {
  const [selectionMode, setSelectionMode] = useState<SelectionMode>('multiple');
  const [selectedItems, setSelectedItems] = useState<SelectedKeySet>(
    createEmptySelection()
  );
  const employees = useMemo(
    () =>
      [
        { id: 1, name: 'Chris Black', title: 'Channel Director' },
        { id: 2, name: 'Christine Cooper', title: 'Escalation Manager' },
        { id: 3, name: 'Chris Benalamore', title: 'Operations Director' },
        { id: 4, name: 'Samire Christian', title: 'Technical Manager' }
      ] satisfies Employee[],
    []
  );
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider<Employee['id'], Employee>(employees, {
        keyAttributes: 'id'
      }),
    [employees]
  );

  const handleSelectedChanged = useCallback(
    (event: ojListView.selectedChanged<Employee['id'], Employee>) => {
      setSelectedItems((event.detail.value as SelectedKeySet | null) ?? createEmptySelection());
    },
    []
  );

  const handleSelectorChanged = useCallback(
    (event: SelectorElement.selectedKeysChanged<Employee['id']>) => {
      setSelectedItems((event.detail.value as SelectedKeySet | null) ?? createEmptySelection());
    },
    []
  );

  const handleSelectionModeChanged = useCallback(
    (event: RadioValueChangedEvent) => {
      setSelectionMode((event.detail.value as SelectionMode | null) ?? 'multiple');
      setSelectedItems(createEmptySelection());
    },
    []
  );

  const renderItemTemplate = useCallback(
    (item: ItemTemplateContext) => (
      <oj-list-item-layout>
        <span>{item.data.name}</span>
        <span slot="secondary">{item.data.title}</span>
        <oj-selector
          slot="selector"
          aria-label={`Select ${item.data.name}`}
          selectedKeys={selectedItems}
          onselectedKeysChanged={handleSelectorChanged}
          selectionMode="multiple"
          rowKey={item.key}
        />
      </oj-list-item-layout>
    ),
    [handleSelectorChanged, selectedItems]
  );

  return (
    <div id="listViewContainer">
      <oj-radioset
        id="selectionMode"
        value={selectionMode}
        onvalueChanged={handleSelectionModeChanged}
        labelHint="Selection Mode"
      >
        <oj-option value="multiple">Multiple</oj-option>
        <oj-option value="multipleToggle">Multiple Toggle</oj-option>
      </oj-radioset>
      <oj-list-view
        id="listview"
        aria-label="selector list view"
        data={dataProvider}
        selected={selectedItems}
        onselectedChanged={handleSelectedChanged}
        selectionMode={selectionMode}
        item={{ enterKeyFocusBehavior: 'focusWithin' }}
      >
        <template slot="itemTemplate" render={renderItemTemplate} />
      </oj-list-view>
      <div class="oj-sm-margin-4x-top">
        Current selection: {getDisplayValue(selectedItems)}
      </div>
    </div>
  );
};

export default SelectorCheckboxSelectableListView;
