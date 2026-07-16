// @ts-nocheck
import 'oj-c/avatar';
import 'oj-c/list-item-layout';
import 'oj-c/list-view';
import 'ojs/ojkeyset';
import { ImmutableKeySet,KeySetImpl } from 'ojs/ojkeyset';
import 'ojs/ojlabel';
import { ojListView } from 'ojs/ojlistview';
import 'ojs/ojswitch';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

interface EmployeeData {
    id: number;
    name: string;
    title: string;
    image: string;
}

type SelectedKeySet = ImmutableKeySet<EmployeeData['id']>;
type FirstSelectedItem = Parameters<
  NonNullable<ComponentProps<'oj-c-list-view'>['onfirstSelectedItemChanged']>
>[0]['detail']['value'];
type ItemTemplateContext = ojListView.ItemTemplateContext<EmployeeData['id'], EmployeeData>;
type SwitchValueChangedEvent = Parameters<NonNullable<ComponentProps<'oj-switch'>['onvalueChanged']>>[0];
type FirstSelectedItemChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-c-list-view'>['onfirstSelectedItemChanged']>
>[0];

export const ListViewSingleSelectioncorepack = () => {
  const [selectedItems, setSelectedItems] = useState<SelectedKeySet>(new KeySetImpl());
  const [selectedSelectionRequired, setSelectedSelectionRequired] = useState(false);
  const [firstSelectedItem, setFirstSelectedItem] = useState<FirstSelectedItem | null>(null);
  const [selectedIds, setSelectedIds] = useState<string | null>(null);

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

  const handleFirstSelectedItemFirstSelectedItemChanged = (event: FirstSelectedItemChangedEvent) => {
    setFirstSelectedItem(event.detail.value ?? null);
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
      setSelectedItems(currentSelection as SelectedKeySet);
      setSelectedIds(getDisplayValue(currentSelection as SelectedKeySet));
  };

  const renderItem: import("ojs/ojvcomponent").TemplateSlot<ItemTemplateContext> = (item) => {
      return (
          <oj-c-list-item-layout>
              <oj-c-avatar slot="leading" size="xs" src={item.data.image} />
              <span class="oj-typography-body-md oj-text-color-primary">{item.data.name}</span>
              <span slot="secondary" class="oj-typography-body-sm oj-text-color-secondary">
                {item.data.title}
              </span>
          </oj-c-list-item-layout>
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
                </div>
            <oj-c-list-view id="listview" aria-label="list to show selection features" class="oj-listview-item-padding-off" data={dataProvider} selected={selectedItems} selectionMode="single" selectionRequired={selectedSelectionRequired} onselectedChanged={handleSelectedChanged} onojFirstSelectedItem={handleFirstSelectedItemFirstSelectedItemChanged} {...{ 'item.enter-key-focus-behavior': "focusWithin" }}>
                    <template slot="itemTemplate" render={renderItem} />
                </oj-c-list-view>
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

export default ListViewSingleSelectioncorepack;
