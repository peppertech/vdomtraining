// @ts-nocheck
import { h } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import '../../../../../../jet-composites/demo-profile-card-layout/loader';
import 'ojs/ojavatar';
import 'ojs/ojbutton';
import 'ojs/ojlistitemlayout';
import 'ojs/ojlistview';
import 'ojs/ojoption';
import 'css!./demo.css';

type EmployeeData = {
  id: number;
  image: string;
  initials: string;
  name: string;
  title: string;
};

type ListViewItemContext = {
  data: EmployeeData;
};
type PropertyChangedEvent<T> = CustomEvent<{ value: T }>;
type ActiveLayout = 'card' | 'list';

const EMPLOYEES: EmployeeData[] = [
  {
    id: 1,
    name: 'Chris Black',
    initials: 'CB',
    title: 'Oracle Cloud Infrastructure GTM Channel Director EMEA',
    image: '/styles/images/hcm/placeholder-male-01.png'
  },
  {
    id: 2,
    name: 'Christine Cooper',
    initials: 'CC',
    title: 'Senior Principal Escalation Manager',
    image: '/styles/images/hcm/placeholder-female-01.png'
  },
  {
    id: 3,
    name: 'Chris Benalamore',
    initials: 'CB',
    title: 'Area Business Operations Director EMEA & JAPAC',
    image: '/styles/images/hcm/placeholder-male-03.png'
  },
  {
    id: 4,
    name: 'Christopher Johnson',
    initials: 'CJ',
    title: 'Vice-President HCM Application Development',
    image: '/styles/images/hcm/placeholder-male-04.png'
  },
  {
    id: 5,
    name: 'Samire Christian',
    initials: 'SC',
    title: 'Consulting Project Technical Manager',
    image: '/styles/images/hcm/placeholder-male-05.png'
  },
  {
    id: 6,
    name: 'Kurt Marchris',
    initials: 'KM',
    title: 'Customer Service Analyst',
    image: '/styles/images/hcm/placeholder-male-06.png'
  },
  {
    id: 7,
    name: 'Zelda Christian Cooperman',
    initials: 'ZC',
    title: 'Senior Principal Escalation Manager',
    image: '/styles/images/hcm/placeholder-female-02.png'
  },
  {
    id: 8,
    name: 'Christian Wu',
    initials: 'CW',
    title: 'Senior Principal Escalation Manager',
    image: '/styles/images/hcm/placeholder-male-07.png'
  },
  {
    id: 9,
    name: 'Jennifer Christy',
    initials: 'JC',
    title: 'Area Business Operations Director EMEA & JAPAC',
    image: '/styles/images/hcm/placeholder-female-03.png'
  },
  {
    id: 10,
    name: 'Christine Ellis',
    initials: 'CE',
    title: 'Vice-President HCM Application Development',
    image: '/styles/images/hcm/placeholder-female-04.png'
  },
  {
    id: 11,
    name: 'Patrick Chrismon',
    initials: 'PC',
    title: 'Consulting Project Technical Manager',
    image: '/styles/images/hcm/placeholder-male-08.png'
  },
  {
    id: 12,
    name: 'Alfred Marchris',
    initials: 'AM',
    title: 'Principal Developer',
    image: '/styles/images/hcm/placeholder-male-13.png'
  }
];

const renderCard = (context: ListViewItemContext) => (
  <li class="demo-card">
    <div class="oj-panel demo-card-panel">
      {h('demo-profile-card-layout', {
        name: context.data.name,
        workTitle: context.data.title,
        initials: context.data.initials,
        image: context.data.image
      })}
    </div>
  </li>
);

export const ListViewCollectionListView = () => {
  const [activeLayout, setActiveLayout] = useState<ActiveLayout>('card');
  const layoutViewRadios = useMemo(() => [
    { id: 'card', icon: 'oj-ux-ico-grid-view-small' },
    { id: 'list', icon: 'oj-ux-ico-list-round' }
  ], []);
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider<EmployeeData['id'], EmployeeData>(EMPLOYEES, {
        keyAttributes: 'id'
      }),
    []
  );

  const handleActiveLayoutValueChanged = (event: PropertyChangedEvent<ActiveLayout>) => {
    setActiveLayout(event.detail.value ?? 'card');
  };

  const renderItem = (item: ListViewItemContext) => {
    if (activeLayout === 'list') {
      return (
        <li>
          <oj-list-item-layout>
            <span class="oj-typography-body-md">{item.data.name}</span>
            <oj-avatar slot="leading" size="xs" src={item.data.image} />
            <span slot="secondary" class="oj-typography-body-sm oj-text-color-secondary">
              {item.data.title}
            </span>
          </oj-list-item-layout>
        </li>
      );
    }

    return renderCard(item);
  };

  return (
    <div id="listviewContainer">
      <div class="oj-flex oj-sm-justify-content-flex-end">
        <oj-buttonset-one
          display="icons"
          onvalueChanged={handleActiveLayoutValueChanged}
          value={activeLayout}
          chroming="borderless"
          class="oj-flex-item oj-sm-flex-initial oj-buttonset-width-auto"
          aria-label="Choose layout view."
        >
          {layoutViewRadios.map((item) => (
            <oj-option value={item.id} id={item.id}>
              <span slot="startIcon" class={item.icon} />
              <span>{item.id}</span>
            </oj-option>
          ))}
        </oj-buttonset-one>
      </div>
      <oj-list-view
        id="listview"
        aria-label="list with card layout"
        class="demo-card-layout-list"
        data={dataProvider}
        display={activeLayout}
        {...{ 'item.enter-key-focus-behavior': 'focusWithin' }}
      >
        <template slot="itemTemplate" render={renderItem} />
      </oj-list-view>
    </div>
  );
};

export default ListViewCollectionListView;
