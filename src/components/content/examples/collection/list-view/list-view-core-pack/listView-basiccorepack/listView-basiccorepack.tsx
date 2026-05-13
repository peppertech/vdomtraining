import { h } from 'preact';
import { useMemo } from 'preact/hooks';
import MutableArrayDataProvider = require('ojs/ojmutablearraydataprovider');
import type { CListViewElement } from 'oj-c/list-view';
import 'oj-c/list-view';
import 'oj-c/avatar';
import 'oj-c/list-item-layout';

type EmployeeData = {
  id: number;
  name: string;
  title: string;
  image: string;
};

type ListViewItemContext = CListViewElement.ItemTemplateContext<
  EmployeeData['id'],
  EmployeeData
>;

const data: EmployeeData[] = [
  { id: 1, name: 'Chris Black', title: 'Oracle Cloud Infrastructure GTM Channel Director EMEA', image: '/styles/images/hcm/placeholder-male-01.png' },
  { id: 2, name: 'Christine Cooper', title: 'Senior Principal Escalation Manager', image: '/styles/images/hcm/placeholder-female-01.png' },
  { id: 3, name: 'Chris Benalamore', title: 'Area Business Operations Director EMEA & JAPAC', image: '/styles/images/hcm/placeholder-male-03.png' },
  { id: 4, name: 'Christopher Johnson', title: 'Vice-President HCM Application Development', image: '/styles/images/hcm/placeholder-male-04.png' },
  { id: 5, name: 'Samire Christian', title: 'Consulting Project Technical Manager', image: '/styles/images/hcm/placeholder-male-05.png' },
  { id: 6, name: 'Kurt Marchris', title: 'Customer Service Analyst', image: '/styles/images/hcm/placeholder-male-06.png' },
  { id: 7, name: 'Zelda Christian Cooperman', title: 'Senior Principal Escalation Manager', image: '/styles/images/hcm/placeholder-female-02.png' }
];

export const ListViewBasiccorepack = () => {
  const dataProvider = useMemo(
    () => new MutableArrayDataProvider<EmployeeData['id'], EmployeeData>(data, { keyAttributes: 'id' }),
    []
  );
  const itemConfig = useMemo(() => ({ enterKeyFocusBehavior: 'focusWithin' as const }), []);

  const itemTemplateRenderer = (item: ListViewItemContext) => (
    <oj-c-list-item-layout>
      <span class="oj-typography-body-md oj-text-color-primary">{item.data.name}</span>
      <oj-c-avatar slot="leading" size="xs" src={item.data.image}></oj-c-avatar>
      <span slot="secondary" class="oj-typography-body-sm oj-text-color-secondary">
        {item.data.title}
      </span>
    </oj-c-list-item-layout>
  );

  return (
    <oj-c-list-view
      id="listview"
      aria-label="simple list"
      data={dataProvider}
      item={itemConfig}
      class="oj-listview-item-padding-off"
    >
      <template slot="itemTemplate" render={itemTemplateRenderer} />
    </oj-c-list-view>
  );
};

export default ListViewBasiccorepack;
