import { h } from 'preact';
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');
import { useMemo } from 'preact/hooks';
import 'ojs/ojlabel';
import 'ojs/ojlistview';
import * as jsonDataStr from 'text!../../../data/cookbook/dataCollections/listView/stickyGroupHeaderListView/contacts.json';

type ContactLeafData = {
  attr: {
    name: string;
    id?: string;
  };
};

type ItemTemplateContext = {
  leaf: boolean;
  data: ContactLeafData;
};

export const ListViewStickyGroupHeaderListView = () => {
  const data = JSON.parse(jsonDataStr as unknown as string);
  const dataProvider = useMemo(() => new ArrayTreeDataProvider(data), [data]);

  const renderItem = (item: ItemTemplateContext) => {
    if (item.leaf === true) {
      return <span class="demo-item">{item.data.attr.name}</span>;
    }

    return <span class="demo-group">{item.data.attr.id}</span>;
  };

  return (
    <div id="mainContent">
      <h5>Contacts</h5>
      <oj-list-view
        id="listview"
        aria-label="sticky group header"
        class="demo-contacts"
        data={dataProvider}
        drill-mode="none"
        group-header-position="sticky"
        {...{ 'item.enter-key-focus-behavior': 'focusWithin' }}
      >
        <template slot="itemTemplate" render={renderItem} />
      </oj-list-view>
    </div>
  );
};

export default ListViewStickyGroupHeaderListView;
