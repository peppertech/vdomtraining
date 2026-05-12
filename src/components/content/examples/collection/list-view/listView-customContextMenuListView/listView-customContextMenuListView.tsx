import { h } from 'preact';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { useMemo, useState } from 'preact/hooks';
import 'ojs/ojavatar';
import 'ojs/ojlistitemlayout';
import 'ojs/ojlistview';
import 'ojs/ojmenu';
import 'ojs/ojoption';
import { ojMenuEventMap } from 'ojs/ojmenu';
import { ojListView } from 'ojs/ojlistview';

interface EmployeeData {
  id: string;
  name: string;
  title: string;
  image: string;
}

type ItemTemplateContext = {
  data: EmployeeData;
};

export const ListViewCustomContextMenuListView = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>('None selected yet');
  const [launchedFromItem, setLaunchedFromItem] = useState<string>('None launched yet');

  const data = useMemo<EmployeeData[]>(
    () => [
      {
        id: 'i1',
        name: 'Chris Black',
        title: 'Oracle Cloud Infrastructure GTM Channel Director EMEA',
        image: '../images/hcm/placeholder-male-01.png'
      },
      {
        id: 'i2',
        name: 'Christine Cooper',
        title: 'Senior Principal Escalation Manager',
        image: '../images/hcm/placeholder-female-01.png'
      },
      {
        id: 'i3',
        name: 'Chris Benalamore',
        title: 'Area Business Operations Director EMEA & JAPAC',
        image: '../images/hcm/placeholder-male-03.png'
      },
      {
        id: 'i4',
        name: 'Christopher Johnson',
        title: 'Vice-President HCM Application Development',
        image: '../images/hcm/placeholder-male-04.png'
      },
      {
        id: 'i5',
        name: 'Samire Christian',
        title: 'Consulting Project Technical Manager',
        image: '../images/hcm/placeholder-male-05.png'
      },
      {
        id: 'i6',
        name: 'Kurt Marchris',
        title: 'Customer Service Analyst',
        image: '../images/hcm/placeholder-male-06.png'
      },
      {
        id: 'i7',
        name: 'Zelda Christian Cooperman',
        title: 'Senior Principal Escalation Manager',
        image: '../images/hcm/placeholder-female-02.png'
      }
    ],
    []
  );
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider<EmployeeData['id'], EmployeeData>(data, {
        keyAttributes: 'id'
      }),
    [data]
  );

  const handleMenuAction = (event: ojMenuEventMap['ojMenuAction']) => {
    setSelectedMenuItem(event.detail.selectedValue);
  };

  const handleBeforeOpen = (event: ojMenuEventMap['ojBeforeOpen']) => {
    const launcher = event.detail.openOptions.launcher;
    if (!(launcher instanceof Element)) {
      return;
    }

    const context = (document.getElementById('listview') as ojListView<EmployeeData['id'], EmployeeData>).getContextByNode(
      launcher
    );

    if (context != null && context.key != null) {
      setLaunchedFromItem(String(context.key));
    }
  };

  const renderItem = (item: ItemTemplateContext) => {
    return (
      <oj-list-item-layout>
        <span class="oj-typography-body-md oj-text-color-primary">{item.data.name}</span>
        <oj-avatar slot="leading" size="xs" src={item.data.image} />
        <span slot="secondary" class="oj-typography-body-sm oj-text-color-secondary">
          {item.data.title}
        </span>
      </oj-list-item-layout>
    );
  };

  return (
    <div id="listviewwrapper">
      <oj-list-view
        id="listview"
        aria-label="list with context menu"
        class="oj-listview-item-padding-off"
        data={dataProvider}
        {...{ 'item.enter-key-focus-behavior': 'focusWithin' }}
      >
        <oj-menu
          slot="contextMenu"
          aria-label="actions"
          onojMenuAction={handleMenuAction}
          onojBeforeOpen={handleBeforeOpen}
        >
          <oj-option id="action1" value="Action 1">
            Action 1
          </oj-option>
          <oj-option id="action2" value="Action 2">
            Action 2
          </oj-option>
          <oj-option id="action3" value="Action 3">
            Action 3
          </oj-option>
        </oj-menu>
        <template slot="itemTemplate" render={renderItem} />
      </oj-list-view>
      <p>
        Last selected menu action:
        <span id="selected">{selectedMenuItem}</span>
      </p>
      <p>
        Launched from:
        <span id="launched">{launchedFromItem}</span>
      </p>
    </div>
  );
};

export default ListViewCustomContextMenuListView;
