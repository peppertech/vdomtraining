import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');
import 'ojs/ojlistview';
import 'ojs/ojavatar';
import 'ojs/ojlistitemlayout';
import 'ojs/ojbutton';
import { AllKeySetImpl, KeySetImpl } from 'ojs/ojkeyset';

type EmployeeData = {
  id: number;
  name: string;
  title: string;
  image: string;
};

type GroupData = {
  id: string;
  label: string;
  children: EmployeeData[];
};

type Expanded = NonNullable<ComponentProps<'oj-list-view'>['expanded']>;
type ItemTemplateContext = {
  leaf: boolean;
  data: GroupData | EmployeeData;
};

export const ListViewCollapsibleListView = () => {
  const [expanded, setExpanded] = useState<Expanded>(new KeySetImpl(['a', 'c']));

  const data = useMemo<GroupData[]>(() => [
      {
          id: 'a',
          label: 'A',
          children: [
              {
                  id: 1,
                  name: 'Alfred Marchris',
                  title: 'Principal Developer',
                  image: '../images/hcm/placeholder-male-13.png'
              },
              {
                  id: 11,
                  name: 'Andrew Chrismon',
                  title: 'Consulting Project Technical Manager',
                  image: '../images/hcm/placeholder-male-08.png'
              },
              {
                  id: 12,
                  name: 'Annett Christy',
                  title: 'Area Business Operations Director EMEA & JAPAC',
                  image: '../images/hcm/placeholder-female-03.png'
              }
          ]
      },
      {
          id: 'b',
          label: 'B',
          children: [
              {
                  id: 5,
                  name: 'Bart Christian',
                  title: 'Consulting Project Technical Manager',
                  image: '../images/hcm/placeholder-male-05.png'
              },
              {
                  id: 6,
                  name: 'Ben Marchris',
                  title: 'Customer Service Analyst',
                  image: '../images/hcm/placeholder-male-06.png'
              },
              {
                  id: 7,
                  name: 'Brie Christian Cooperman',
                  title: 'Senior Principal Escalation Manager',
                  image: '../images/hcm/placeholder-female-02.png'
              }
          ]
      },
      {
          id: 'c',
          label: 'C',
          children: [
              {
                  id: 3,
                  name: 'Christine Cooper',
                  title: 'Senior Principal Escalation Manager',
                  image: '../images/hcm/placeholder-female-01.png'
              },
              {
                  id: 31,
                  name: 'Chris Benalamore',
                  title: 'Area Business Operations Director EMEA & JAPAC',
                  image: '../images/hcm/placeholder-male-03.png'
              },
              {
                  id: 32,
                  name: 'Christopher Johnson',
                  title: 'Vice-President HCM Application Development',
                  image: '../images/hcm/placeholder-male-04.png'
              }
          ]
      }
  ], []);
  const dataProvider = useMemo(() => new ArrayTreeDataProvider<GroupData['id'] | EmployeeData['id'], GroupData | EmployeeData>(data, {
      keyAttributes: 'id'
  }), [data]);

  const expandAll = () => {
      setExpanded(new AllKeySetImpl());
  };

  const collapseAll = () => {
      setExpanded(new KeySetImpl());
  };

  const renderItem = (item: ItemTemplateContext) => {
      if (item.leaf) {
          const employee = item.data as EmployeeData;

          return (
              <oj-list-item-layout>
                  <span class="oj-typography-body-md oj-text-color-primary">{employee.name}</span>
                  <span slot="secondary" class="oj-typography-body-sm oj-text-color-secondary">{employee.title}</span>
                  <oj-avatar slot="leading" size="xs" src={employee.image} />
              </oj-list-item-layout>
          );
      }

      const group = item.data as GroupData;
      return <span>{group.label}</span>;
  };

  return (
      <div id="listviewContainer">
            <oj-button onojAction={expandAll}>Expand All</oj-button>
            <oj-button onojAction={collapseAll}>Collapse All</oj-button>
            <h5>Directory</h5>
            <oj-list-view id="listview" aria-label="collapsible list" class="oj-listview-item-padding-off" data={dataProvider} expanded={expanded} group-header-position="static" {...{ 'item.enter-key-focus-behavior': "focusWithin" }}>
                    <template slot="itemTemplate" render={renderItem} />
                </oj-list-view>
        </div>
    );
};

export default ListViewCollapsibleListView;
