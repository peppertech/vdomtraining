import 'ojs/ojavatar';
import { KeySetImpl } from 'ojs/ojkeyset';
import 'ojs/ojlistitemlayout';
import 'ojs/ojlistview';
import 'ojs/ojswitch';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type EmployeeData = {
  id: number;
  name: string;
  title: string;
  image: string;
};
type ListViewItemContext = { data: EmployeeData };
type ListViewSelectedChangedEvent = Parameters<NonNullable<ComponentProps<'oj-list-view'>['onselectedChanged']>>[0];
type ListViewFirstSelectedItemChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-list-view'>['onfirstSelectedItemChanged']>
>[0];
type SwitchValueChangedEvent = Parameters<NonNullable<ComponentProps<'oj-switch'>['onvalueChanged']>>[0];

const data: EmployeeData[] = [
  { id: 1, name: 'Chris Black', title: 'Oracle Cloud Infrastructure GTM Channel Director EMEA', image: '/styles/images/hcm/placeholder-male-01.png' },
  { id: 2, name: 'Christine Cooper', title: 'Senior Principal Escalation Manager', image: '/styles/images/hcm/placeholder-female-01.png' },
  { id: 3, name: 'Chris Benalamore', title: 'Area Business Operations Director EMEA & JAPAC', image: '/styles/images/hcm/placeholder-male-03.png' },
  { id: 4, name: 'Christopher Johnson', title: 'Vice-President HCM Application Development', image: '/styles/images/hcm/placeholder-male-04.png' },
  { id: 5, name: 'Samire Christian', title: 'Consulting Project Technical Manager', image: '/styles/images/hcm/placeholder-male-05.png' },
  { id: 6, name: 'Kurt Marchris', title: 'Customer Service Analyst', image: '/styles/images/hcm/placeholder-male-06.png' },
  { id: 7, name: 'Zelda Christian Cooperman', title: 'Senior Principal Escalation Manager', image: '/styles/images/hcm/placeholder-female-02.png' }
];

const getDisplayValue = (set: KeySetImpl<number>) => JSON.stringify(Array.from(set.values()));

export const ListViewArrayListView = () => {
  const [selectedSelectionRequired, setSelectedSelectionRequired] = useState(false);
  const [selectedItems, setSelectedItems] = useState<KeySetImpl<number>>(new KeySetImpl<number>());
  const [firstSelectedItem, setFirstSelectedItem] = useState<unknown>(null);
  const [selectedIds, setSelectedIds] = useState<string>('');
  const dataProvider = useMemo(() => new ArrayDataProvider<EmployeeData['id'], EmployeeData>(data, { keyAttributes: 'id' }), []);

  const itemTemplateRenderer = (item: ListViewItemContext) => (
    <li>
      <oj-list-item-layout>
        <span class="oj-typography-body-md oj-text-color-primary">{item.data.name}</span>
        <oj-avatar slot="leading" size="xs" src={item.data.image}></oj-avatar>
        <span slot="secondary" class="oj-typography-body-sm oj-text-color-secondary">
          {item.data.title}
        </span>
      </oj-list-item-layout>
    </li>
  );

  const handleSelectedChanged = (event: ListViewSelectedChangedEvent) => {
    const nextSelected = event.detail.value as KeySetImpl<number>;
    setSelectedItems(nextSelected);
    setSelectedIds(getDisplayValue(nextSelected));
  };

  const handleFirstSelectedItemChanged = (event: ListViewFirstSelectedItemChangedEvent) => {
    setFirstSelectedItem(event.detail.value ?? null);
  };

  return (
    <div id="listViewContainer">
      <oj-switch
        id="selection-required"
        value={selectedSelectionRequired}
        labelEdge="inside"
        labelHint="Selection Required"
        onvalueChanged={(event: SwitchValueChangedEvent) => setSelectedSelectionRequired(!!event.detail.value)}
      />

      <oj-list-view
        id="listview"
        aria-label="list to show selection features"
        class="oj-listview-item-padding-off"
        data={dataProvider}
        item={{ enterKeyFocusBehavior: 'focusWithin' }}
        selected={selectedItems}
        selectionMode="single"
        selectionRequired={selectedSelectionRequired}
        onselectedChanged={handleSelectedChanged}
        onfirstSelectedItemChanged={handleFirstSelectedItemChanged}
      >
        <template slot="itemTemplate" render={itemTemplateRenderer} />
      </oj-list-view>

      <div class="oj-typography-body-sm oj-text-color-secondary">
        <br />
        <label for="curr-selection">Current Selection:&nbsp;</label>
        <span id="curr-selection-value">{getDisplayValue(selectedItems)}</span>
        <br />
        <br />
        <label for="selected-item-ids">IDs from Selected Change Event:&nbsp;</label>
        <span id="selected-item-ids-value">{selectedIds}</span>
        <br />
        <br />
        <label for="first-selected-item-id">Data for First Selected Item:&nbsp;</label>
        <span id="first-selected-item-id-value">{JSON.stringify(firstSelectedItem)}</span>
      </div>
    </div>
  );
};

export default ListViewArrayListView;
