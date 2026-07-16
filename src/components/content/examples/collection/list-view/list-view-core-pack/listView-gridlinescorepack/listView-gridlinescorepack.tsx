import 'oj-c/avatar';
import 'oj-c/list-item-layout';
import 'oj-c/list-view';
import 'preact';
import { useMemo } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type PersonData = {
  id: number;
  name: string;
  title: string;
  image: string;
};

type ItemTemplateContext = {
  item: {
    data: PersonData;
  };
};

export const ListViewGridlinescorepack = () => {
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

  const renderItem: import("ojs/ojvcomponent").TemplateSlot<ItemTemplateContext> = (item) => {
    return (
      <oj-c-list-item-layout>
        <span class="oj-typography-body-md oj-text-color-primary">{item.item.data.name}</span>
        <span slot="secondary" class="oj-typography-body-sm oj-text-color-secondary">
          {item.item.data.title}
        </span>
        <oj-c-avatar slot="leading" size="xs" src={item.item.data.image} />
      </oj-c-list-item-layout>
    );
  };

  return (
    <div id="listviewContainer">
      <div class="oj-typography-body-lg oj-text-color-secondary">Gridlines are hidden</div>
      <oj-c-list-view
        id="listview"
        aria-label="simple list"
        data={dataProvider}
        class="oj-listview-item-padding-off oj-sm-padding-4x-bottom"
        gridlines={{ item: 'hidden' }}
        item={{ enterKeyFocusBehavior: 'focusWithin' }}
      >
        <template slot="itemTemplate" render={renderItem} />
      </oj-c-list-view>
      <div class="oj-sm-padding-4x-top oj-typography-body-lg oj-text-color-secondary">
        Gridlines are visible
      </div>
      <oj-c-list-view
        id="listview2"
        aria-label="simple list"
        data={dataProvider}
        class="oj-listview-item-padding-off oj-sm-padding-4x-bottom"
        gridlines={{ item: 'visible' }}
        item={{ enterKeyFocusBehavior: 'focusWithin' }}
      >
        <template slot="itemTemplate" render={renderItem} />
      </oj-c-list-view>
      <div class="oj-sm-padding-4x-top oj-typography-body-lg oj-text-color-secondary">
        Gridlines are visible except for the last item
      </div>
      <oj-c-list-view
        id="listview3"
        aria-label="simple list"
        data={dataProvider}
        class="oj-listview-item-padding-off"
        gridlines={{ item: 'visible', bottom: 'hidden' }}
        item={{ enterKeyFocusBehavior: 'focusWithin' }}
      >
        <template slot="itemTemplate" render={renderItem} />
      </oj-c-list-view>
    </div>
  );
};

export default ListViewGridlinescorepack;
