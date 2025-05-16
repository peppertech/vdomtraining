import "preact"
import 'oj-c/list-item-layout';
import 'oj-c/list-view';
import { CListViewElement } from 'oj-c/list-view';
import { DragHandle } from 'oj-c/drag-handle';
import MutableArrayDataProvider = require('ojs/ojmutablearraydataprovider');
import { ojListView } from 'ojs/ojlistview';

interface DataProps {
  id: number;
  name: string;
  title: string;
  image: string;
}
const data: DataProps[] = [
  {
    id: 1,
    name: 'Chris Black',
    title: 'Oracle Cloud Infrastructure GTM Channel Director EMEA',
    image: '../images/hcm/placeholder-male-01.png',
  },
  {
    id: 2,
    name: 'Christine Cooper',
    title: 'Senior Principal Escalation Manager',
    image: '../images/hcm/placeholder-female-01.png',
  },
  {
    id: 3,
    name: 'Chris Benalamore',
    title: 'Area Business Operations Director EMEA & JAPAC',
    image: '../images/hcm/placeholder-male-03.png',
  },
  {
    id: 4,
    name: 'Christopher Johnson',
    title: 'Vice-President HCM Application Development',
    image: '../images/hcm/placeholder-male-04.png',
  },
  {
    id: 5,
    name: 'Samire Christian',
    title: 'Consulting Project Technical Manager',
    image: '../images/hcm/placeholder-male-05.png',
  },
  {
    id: 6,
    name: 'Kurt Marchris',
    title: 'Customer Service Analyst',
    image: '../images/hcm/placeholder-male-06.png',
  },
  {
    id: 7,
    name: 'Zelda Christian Cooperman',
    title: 'Senior Principal Escalation Manager',
    image: "../images/hcm/placeholder-female-02.png",
  },
];
export function ListViewTest2() {
  const dataProvider = new MutableArrayDataProvider(data, {
    keyAttributes: 'id',
  });

  const handleReorder = (event: CListViewElement.ojReorder<string>): void => {
    console.log(event);
  };

  const itemTemplate: CListViewElement.RenderItemTemplate<DataProps['id'], DataProps> = (
    item
  ) => {
    return (
      <oj-c-list-item-layout>
        <span class="oj-typography-body-md oj-text-color-primary">
          {item.data.name}
        </span>
        <DragHandle slot="action" />
      </oj-c-list-item-layout>
    );
  };

  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
      <oj-c-list-view
        aria-label="Reorderable list"
        data={dataProvider}
        id="listview"
        reorderable={{ items: 'enabled' }}
        onojReorder={handleReorder}
      >
        <template slot='itemTemplate' render={itemTemplate} />
      </oj-c-list-view>
    </div>
  );
}