import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'ojs/ojkeyset';
import 'ojs/ojlistview';
import 'ojs/ojswitch';
import 'ojs/ojlabel';
import 'ojs/ojavatar';
import 'ojs/ojlistitemlayout';
import 'ojs/ojselector';
import 'ojs/ojradioset';
import { ojListView } from 'ojs/ojlistview';
import { ImmutableKeySet, KeySet, KeySetImpl } from 'ojs/ojkeyset';
import 'ojs/ojoption';

interface EmployeeData {
    id: number;
    name: string;
    title: string;
    image: string;
}

type SelectionMode = Extract<ComponentProps<'oj-list-view'>['selectionMode'], 'multiple' | 'multipleToggle'>;
type SelectedKeySet = KeySet<EmployeeData['id']>;
type FirstSelectedItem = Parameters<
  NonNullable<ComponentProps<'oj-list-view'>['onfirstSelectedItemChanged']>
>[0]['detail']['value'];
type ItemTemplateContext = ojListView.ItemTemplateContext<EmployeeData['id'], EmployeeData>;
type SwitchValueChangedEvent = Parameters<NonNullable<ComponentProps<'oj-switch'>['onvalueChanged']>>[0];
type SelectorSelectedKeysChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-selector'>['onselectedKeysChanged']>
>[0];
type SelectorIndeterminateChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-selector'>['onindeterminateChanged']>
>[0];
type RadioValueChangedEvent = Parameters<NonNullable<ComponentProps<'oj-radioset'>['onvalueChanged']>>[0];
type FirstSelectedItemChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-list-view'>['onfirstSelectedItemChanged']>
>[0];

export const ListViewSelectionListView = () => {
  const [selectedItems, setSelectedItems] = useState<SelectedKeySet>(new KeySetImpl());
  const [selectedSelectionRequired, setSelectedSelectionRequired] = useState(false);
  const [firstSelectedItem, setFirstSelectedItem] = useState<FirstSelectedItem | null>(null);
  const [selectedIds, setSelectedIds] = useState<string | null>(null);
  const [isIndeterminate, setIsIndeterminate] = useState(false);
  const [selectionMode, setSelectionMode] = useState<SelectionMode>('multiple');

  const data = useMemo(() => [
      {
          id: 1,
          name: 'Chris Black',
          title: 'Oracle Cloud Infrastructure GTM Channel Director EMEA',
          image: '/styles/images/hcm/placeholder-male-01.png'
      },
      {
          id: 2,
          name: 'Christine Cooper',
          title: 'Senior Principal Escalation Manager',
          image: '/styles/images/hcm/placeholder-female-01.png'
      },
      {
          id: 3,
          name: 'Chris Benalamore',
          title: 'Area Business Operations Director EMEA & JAPAC',
          image: '/styles/images/hcm/placeholder-male-03.png'
      },
      {
          id: 4,
          name: 'Christopher Johnson',
          title: 'Vice-President HCM Application Development',
          image: '/styles/images/hcm/placeholder-male-04.png'
      },
      {
          id: 5,
          name: 'Samire Christian',
          title: 'Consulting Project Technical Manager',
          image: '/styles/images/hcm/placeholder-male-05.png'
      },
      {
          id: 6,
          name: 'Kurt Marchris',
          title: 'Customer Service Analyst',
          image: '/styles/images/hcm/placeholder-male-06.png'
      },
      {
          id: 7,
          name: 'Zelda Christian Cooperman',
          title: 'Senior Principal Escalation Manager',
          image: '/styles/images/hcm/placeholder-female-02.png'
      }
  ], []);
  const dataProvider = useMemo(() => new ArrayDataProvider<EmployeeData['id'], EmployeeData>(data, {
      keyAttributes: 'id'
  }), [data]);

  const handleSelectedSelectionRequiredValueChanged = (event: SwitchValueChangedEvent) => {
    setSelectedSelectionRequired(event.detail.value ?? false);
  };

  const handleSelectedItemsSelectedKeysChanged = (event: SelectorSelectedKeysChangedEvent) => {
    setSelectedItems(event.detail.value ?? new KeySetImpl());
  };

  const handleIsIndeterminateIndeterminateChanged = (event: SelectorIndeterminateChangedEvent) => {
    setIsIndeterminate(event.detail.value ?? false);
  };

  const handleFirstSelectedItemFirstSelectedItemChanged = (event: FirstSelectedItemChangedEvent) => {
    setFirstSelectedItem(event.detail.value ?? null);
  };

  const handleSelectionModeChanged = (event: RadioValueChangedEvent) => {
      // Reset selected on selection mode change.
      setSelectionMode((event.detail.value as SelectionMode | null) ?? 'multiple');
      setSelectedItems(new KeySetImpl());
      setSelectedIds(null);
      setFirstSelectedItem(null);
  };

  const getDisplayValue = (keySet: SelectedKeySet) => {
      const immutableKeySet = keySet as ImmutableKeySet<EmployeeData['id']>;
      const { keys } = immutableKeySet;
      let text: string = '';
      const set = keys.all === true ? keys.deletedKeys : keys.keys;
      if (keys.all) {
          text = 'Everything selected';
          if (set.size > 0) {
              text = text + ' except: ';
          }
      }
      return text + JSON.stringify(Array.from(set.values()));
  };

  const handleSelectedChanged = (event: ojListView.selectedChanged<EmployeeData['id'], EmployeeData>) => {
      const currentSelection = event.detail.value as ImmutableKeySet<EmployeeData['id']>;
      setSelectedIds(getDisplayValue(currentSelection as SelectedKeySet)); // show selected list item elements' ids
      if ((!currentSelection.keys.all && currentSelection.keys.keys!.size > 0) ||
          (currentSelection.keys.all && currentSelection.keys.deletedKeys!.size > 0)) {
          setIsIndeterminate(true);
      }
      else {
          setIsIndeterminate(false);
      }
  };

  const renderItem = (item: ItemTemplateContext) => {
      return (
          <oj-list-item-layout>
              <span class="oj-typography-body-md oj-text-color-primary">{item.data.name}</span>
              <oj-selector
                aria-label="selector for item"
                slot="selector"
                onselectedKeysChanged={handleSelectedItemsSelectedKeysChanged}
                selectedKeys={selectedItems}
                selectionMode="multiple"
                rowKey={item.data.id}
                id={`listview_checkboxset${item.data.id}`}
              />
              <oj-avatar slot="leading" size="xs" src={item.data.image} />
              <span slot="secondary" class="oj-typography-body-sm oj-text-color-secondary">
                {item.data.title}
              </span>
          </oj-list-item-layout>
      );
  };

  const getFirstSelectedItemDisplay = () => {
      return JSON.stringify(firstSelectedItem);
  };

  return (
      <div id="listViewContainer">
            <div class="oj-panel oj-bg-neutral-30">
                    <div class="oj-flex oj-sm-align-items-center">
                              <oj-switch id="selection-required" onvalueChanged={handleSelectedSelectionRequiredValueChanged} value={selectedSelectionRequired} labelHint="Selection Required" labelEdge="inside" />
                          </div>
                    <oj-radioset id="selectionMode" value={selectionMode} onvalueChanged={handleSelectionModeChanged} labelHint="Selection Mode">
                              <oj-option value="multiple">Multiple</oj-option>
                              <oj-option value="multipleToggle">Multiple Toggle</oj-option>
                          </oj-radioset>
                </div>
            <oj-list-item-layout>
                    <oj-selector onselectedKeysChanged={handleSelectedItemsSelectedKeysChanged} selectedKeys={selectedItems} slot="selector" id="selectAll" selectionMode="all" onindeterminateChanged={handleIsIndeterminateIndeterminateChanged} indeterminate={isIndeterminate} aria-label="select all" />
                    <span>Select All</span>
                </oj-list-item-layout>
            <oj-list-view id="listview" aria-label="list to show selection features" class="oj-listview-item-padding-off" data={dataProvider} selected={selectedItems} selectionMode={selectionMode} selectionRequired={selectedSelectionRequired} onselectedChanged={handleSelectedChanged} onfirstSelectedItemChanged={handleFirstSelectedItemFirstSelectedItemChanged} firstSelectedItem={firstSelectedItem ?? undefined} {...{ 'item.enter-key-focus-behavior': "focusWithin" }}>
                    <template slot="itemTemplate" render={renderItem} />
                </oj-list-view>
            <div class="oj-typography-body-sm oj-text-color-secondary">
                    <br />
                    <label for="curr-selection">Current Selection:</label>
                    <span id="curr-selection-value">{getDisplayValue(selectedItems)}</span>
                    <br />
                    <br />
                    <label for="selected-item-ids">IDs from Selected Change Event:</label>
                    <span id="selected-item-ids-value">{selectedIds}</span>
                    <br />
                    <br />
                    <label for="first-selected-item-id">Data for First Selected Item:</label>
                    <span id="first-selected-item-id-value">{getFirstSelectedItemDisplay()}</span>
                </div>
        </div>
    );
};

export default ListViewSelectionListView;
