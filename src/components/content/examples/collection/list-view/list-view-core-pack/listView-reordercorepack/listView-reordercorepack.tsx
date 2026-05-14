import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import MutableArrayDataProvider = require('ojs/ojmutablearraydataprovider');
import type { CListViewElement } from 'oj-c/list-view';
import 'css!./demo.css';
import 'oj-c/avatar';
import 'oj-c/drag-handle';
import 'oj-c/list-item-layout';
import 'oj-c/list-view';

type EmployeeData = {
  id: number;
  name: string;
  title: string;
  image: string;
};

type ItemTemplateContext = CListViewElement.ItemTemplateContext<
  EmployeeData['id'],
  EmployeeData
>;
type ReorderEvent = Parameters<NonNullable<ComponentProps<'oj-c-list-view'>['onojReorder']>>[0];

const INITIAL_EMPLOYEES: EmployeeData[] = [
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
];

const getReorderMessage = (
  employeesById: Map<EmployeeData['id'], EmployeeData>,
  fromKey?: EmployeeData['id'],
  toKey?: EmployeeData['id'] | null
) => {
  const fromName = fromKey == null ? null : employeesById.get(fromKey)?.name;
  const toName = toKey == null ? 'the beginning' : employeesById.get(toKey)?.name;

  if (!fromName || !toName) {
    return '';
  }

  return `move ${fromName} after ${toName}`;
};

export const ListViewReordercorepack = () => {
  const [employees, setEmployees] = useState<EmployeeData[]>(() => [...INITIAL_EMPLOYEES]);
  const [reorderMessage, setReorderMessage] = useState('');
  const dataProvider = useMemo(
    () =>
      new MutableArrayDataProvider<EmployeeData['id'], EmployeeData>(employees, {
        keyAttributes: 'id'
      }),
    [employees]
  );
  const reorderable = useMemo(() => ({ items: 'enabled' as const }), []);
  const employeesById = useMemo(
    () => new Map(employees.map((employee) => [employee.id, employee])),
    [employees]
  );

  const handleReorder = (event: ReorderEvent) => {
    const reorderedEmployees = event.detail.reorderedKeys
      .map((key) => employeesById.get(key as EmployeeData['id']))
      .filter((employee): employee is EmployeeData => employee != null);

    if (reorderedEmployees.length === employees.length) {
      setEmployees(reorderedEmployees);
    }

    setReorderMessage(
      getReorderMessage(
        employeesById,
        event.detail.itemKeys?.[0] as EmployeeData['id'] | undefined,
        event.detail.referenceKey as EmployeeData['id'] | null | undefined
      )
    );
  };

  const renderItem = (item: ItemTemplateContext) => (
    <oj-c-list-item-layout>
      <span class="oj-typography-body-md oj-text-color-primary">{item.data.name}</span>
      <oj-c-avatar slot="leading" size="xs" src={item.data.image} />
      <span slot="secondary" class="oj-typography-body-sm oj-text-color-secondary">
        {item.data.title}
      </span>
      <oj-c-drag-handle slot="action" />
    </oj-c-list-item-layout>
  );

  return (
    <div id="listviewContainer">
      <oj-c-list-view
        id="listview"
        aria-label="Reorderable list"
        data={dataProvider}
        reorderable={reorderable}
        onojReorder={handleReorder}
        class="demo-list oj-listview-item-padding-off"
      >
        <template slot="itemTemplate" render={renderItem} />
      </oj-c-list-view>
      <div id="reorderInfo" aria-live="polite" class="oj-helper-hidden-accessible">
        {reorderMessage}
      </div>
    </div>
  );
};

export default ListViewReordercorepack;
