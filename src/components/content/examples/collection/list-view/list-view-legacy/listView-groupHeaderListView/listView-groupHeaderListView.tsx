import 'ojs/ojavatar';
import { AllKeySetImpl } from 'ojs/ojkeyset';
import 'ojs/ojlistitemlayout';
import 'ojs/ojlistview';
import 'preact';
import { useMemo } from 'preact/hooks';
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');

type EmployeeData = {
  id: number;
  name: string;
  title: string;
  image: string;
};

type GroupData = {
  id: string;
  name: string;
  children: EmployeeData[];
};

type ItemTemplateContext = {
  leaf: boolean;
  data: GroupData | EmployeeData;
};

export const ListViewGroupHeaderListView = () => {
  const data = useMemo<GroupData[]>(
    () => [
      {
        id: 'g1',
        name: 'Group header',
        children: [
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
          }
        ]
      }
    ],
    []
  );
  const dataProvider = useMemo(
    () =>
      new ArrayTreeDataProvider<GroupData['id'] | EmployeeData['id'], GroupData | EmployeeData>(
        data,
        {
          keyAttributes: 'id'
        }
      ),
    [data]
  );
  const expanded = useMemo(() => new AllKeySetImpl(), []);

  const renderItem = (item: ItemTemplateContext) => {
    if (item.leaf) {
      const employee = item.data as EmployeeData;

      return (
        <oj-list-item-layout>
          <span class="oj-typography-body-md oj-text-color-primary">{employee.name}</span>
          <span slot="secondary" class="oj-typography-body-sm oj-text-color-secondary">
            {employee.title}
          </span>
          <oj-avatar slot="leading" size="xs" src={employee.image} />
        </oj-list-item-layout>
      );
    }

    const group = item.data as GroupData;
    return <span>{group.name}</span>;
  };

  return (
    <div id="listviewContainer">
      <div class="oj-typography-body-lg oj-text-color-secondary">Small Size Group Headers</div>
      <oj-list-view
        id="listview"
        aria-label="simple list"
        data={dataProvider}
        expanded={expanded}
        class="oj-group-header-sm oj-sm-padding-4x-bottom oj-listview-item-padding-off"
        {...{ 'item.enter-key-focus-behavior': 'focusWithin' }}
      >
        <template slot="itemTemplate" render={renderItem} />
      </oj-list-view>
      <div class="oj-sm-padding-4x-top oj-typography-body-lg oj-text-color-secondary">
        Medium Size Group Headers
      </div>
      <oj-list-view
        id="listview2"
        aria-label="simple list"
        data={dataProvider}
        expanded={expanded}
        class="oj-group-header-md oj-sm-padding-4x-bottom oj-listview-item-padding-off"
      >
        <template slot="itemTemplate" render={renderItem} />
      </oj-list-view>
      <div class="oj-sm-padding-4x-top oj-typography-body-lg oj-text-color-secondary">
        Large Size Group Headers
      </div>
      <oj-list-view
        id="listview3"
        aria-label="simple list"
        data={dataProvider}
        expanded={expanded}
        class="oj-group-header-lg oj-listview-item-padding-off"
      >
        <template slot="itemTemplate" render={renderItem} />
      </oj-list-view>
    </div>
  );
};

export default ListViewGroupHeaderListView;
