import { h } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { KeySetImpl, type ImmutableKeySet } from 'ojs/ojkeyset';
import type { CListViewElement } from 'oj-c/list-view';
import 'css!./demo.css';
import 'oj-c/avatar';
import 'oj-c/button';
import 'oj-c/list-item-layout';
import 'oj-c/list-view';

type Employee = {
  id: number;
  name: string;
  title: string;
  image: string;
  summary: string;
};

const employees: Employee[] = [
  {
    id: 1,
    name: 'Chris Black',
    title: 'Oracle Cloud Infrastructure GTM Channel Director EMEA',
    image: '/styles/images/hcm/placeholder-male-01.png',
    summary: 'Owns channel strategy and partner follow-through for regional OCI programs.'
  },
  {
    id: 2,
    name: 'Christine Cooper',
    title: 'Senior Principal Escalation Manager',
    image: '/styles/images/hcm/placeholder-female-01.png',
    summary: 'Coordinates high-priority customer escalations and tracks readiness actions.'
  },
  {
    id: 3,
    name: 'Chris Benalamore',
    title: 'Area Business Operations Director EMEA & JAPAC',
    image: '/styles/images/hcm/placeholder-male-03.png',
    summary: 'Keeps regional operations aligned across planning, reporting, and execution.'
  }
];

type ItemTemplateContext = CListViewElement.ItemTemplateContext<Employee['id'], Employee>;
type SelectedChangedEvent = CListViewElement.selectedChanged<Employee['id'], Employee>;
type FirstSelectedItemEvent = CListViewElement.ojFirstSelectedItem<Employee['id'], Employee>;

const getFirstSelectedKey = (keySet: ImmutableKeySet<Employee['id']>) => {
  if (keySet.keys.all) {
    return employees[0].id;
  }

  const [key] = Array.from(keySet.keys.keys.values());
  return typeof key === 'number' ? key : null;
};

export const ListViewOverviewcorepack = () => {
  const [activeEmployeeId, setActiveEmployeeId] = useState(employees[0].id);
  const [selected, setSelected] = useState<ImmutableKeySet<Employee['id']>>(
    () => new KeySetImpl([employees[0].id]) as ImmutableKeySet<Employee['id']>
  );
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider<Employee['id'], Employee>(employees, {
        keyAttributes: 'id'
      }),
    []
  );
  const activeEmployee =
    employees.find((employee) => employee.id === activeEmployeeId) ?? employees[0];

  const handleSelectedChanged = (event: SelectedChangedEvent) => {
    const nextSelected =
      event.detail.value ?? (new KeySetImpl([employees[0].id]) as ImmutableKeySet<Employee['id']>);
    setSelected(nextSelected);

    const nextKey = getFirstSelectedKey(nextSelected);
    if (nextKey !== null) {
      setActiveEmployeeId(nextKey);
    }
  };

  const handleFirstSelectedItem = (event: FirstSelectedItemEvent) => {
    const nextKey = event.detail.key;
    if (typeof nextKey === 'number') {
      setActiveEmployeeId(nextKey);
    }
  };

  const handleItemAction = (event: CListViewElement.ojItemAction<Employee['id'], Employee>) => {
    const nextKey = event.detail.context.item.metadata.key;
    setSelected(new KeySetImpl([nextKey]) as ImmutableKeySet<Employee['id']>);
    setActiveEmployeeId(nextKey);
  };

  const renderItem = (item: ItemTemplateContext) => (
    <oj-c-list-item-layout aria-label={`Details for ${item.data.name}`}>
      <span class="oj-typography-body-md oj-text-color-primary oj-typography-semi-bold">
        {item.data.name}
      </span>
      <oj-c-avatar
        slot="leading"
        size="xs"
        src={item.data.image}
        title={`Avatar of ${item.data.name}`}
      />
      <span slot="secondary" class="oj-typography-body-sm oj-text-color-secondary">
        {item.data.title}
      </span>
    </oj-c-list-item-layout>
  );

  return (
    <div class="demo-overview-layout">
      <oj-c-list-view
        id="listview"
        aria-label="list view overview"
        data={dataProvider}
        selected={selected}
        selectionMode="singleRequired"
        onselectedChanged={handleSelectedChanged}
        onojFirstSelectedItem={handleFirstSelectedItem}
        onojItemAction={handleItemAction}
        item={{ enterKeyFocusBehavior: 'none' }}
        gridlines={{ item: 'visible', bottom: 'visible' }}
        class="demo-overview-list oj-listview-item-padding-off"
      >
        <template slot="itemTemplate" render={renderItem} />
      </oj-c-list-view>
      <section class="demo-overview-detail oj-bg-neutral-30" aria-live="polite">
        <div class="demo-overview-detail__header">
          <oj-c-avatar size="md" src={activeEmployee.image} title={`Avatar of ${activeEmployee.name}`} />
          <div>
            <div class="oj-typography-subheading-sm oj-text-color-primary">{activeEmployee.name}</div>
            <div class="oj-typography-body-sm oj-text-color-secondary">{activeEmployee.title}</div>
          </div>
        </div>
        <p class="oj-typography-body-md">{activeEmployee.summary}</p>
        <div class="demo-overview-detail__actions">
          <oj-c-button label="View Profile" chroming="outlined" />
        </div>
      </section>
    </div>
  );
};

export default ListViewOverviewcorepack;
