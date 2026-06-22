import { h } from 'preact';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { useMemo } from 'preact/hooks';
import 'ojs/ojavatar';
import 'ojs/ojlistitemlayout';
import 'ojs/ojlistview';

type PersonData = {
  id: number;
  name: string;
  title: string;
  image: string;
};

type ItemTemplateContext = {
  data: PersonData;
};

export const ListViewGridlinesListView = () => {
  const data = useMemo<PersonData[]>(
    () => [
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
    ],
    []
  );
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider<PersonData['id'], PersonData>(data, {
        keyAttributes: 'id'
      }),
    [data]
  );

  const renderItem = (item: ItemTemplateContext) => {
    return (
      <oj-list-item-layout>
        <span class="oj-typography-body-md oj-text-color-primary">{item.data.name}</span>
        <span slot="secondary" class="oj-typography-body-sm oj-text-color-secondary">
          {item.data.title}
        </span>
        <oj-avatar slot="leading" size="xs" src={item.data.image} />
      </oj-list-item-layout>
    );
  };

  return (
    <div id="listviewContainer">
      <div class="oj-typography-body-lg oj-text-color-secondary">Gridlines are hidden</div>
      <oj-list-view
        id="listview"
        aria-label="simple list"
        data={dataProvider}
        class="oj-listview-item-padding-off oj-sm-padding-4x-bottom"
        {...{ 'gridlines.item': 'hidden', 'item.enter-key-focus-behavior': 'focusWithin' }}
      >
        <template slot="itemTemplate" render={renderItem} />
      </oj-list-view>
      <div class="oj-sm-padding-4x-top oj-typography-body-lg oj-text-color-secondary">
        Gridlines are visible
      </div>
      <oj-list-view
        id="listview2"
        aria-label="simple list"
        data={dataProvider}
        class="oj-listview-item-padding-off oj-sm-padding-4x-bottom"
        {...{ 'gridlines.item': 'visible', 'item.enter-key-focus-behavior': 'focusWithin' }}
      >
        <template slot="itemTemplate" render={renderItem} />
      </oj-list-view>
      <div class="oj-sm-padding-4x-top oj-typography-body-lg oj-text-color-secondary">
        Gridlines are visible except for the last item
      </div>
      <oj-list-view
        id="listview3"
        aria-label="simple list"
        data={dataProvider}
        class="oj-listview-item-padding-off"
        {...{ 'gridlines.item': 'visibleExceptLast', 'item.enter-key-focus-behavior': 'focusWithin' }}
      >
        <template slot="itemTemplate" render={renderItem} />
      </oj-list-view>
    </div>
  );
};

export default ListViewGridlinesListView;
