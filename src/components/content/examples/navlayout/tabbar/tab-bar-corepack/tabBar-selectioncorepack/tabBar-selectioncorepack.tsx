import { h } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'ojs/ojnavigationlist';

export const TabBarSelectioncorepack = () => {
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider(
        [
          { name: 'Home', id: 'home' },
          { name: 'Getting Started', id: 'gettingstarted' },
          { name: 'Cookbook', id: 'cookbook' },
          { name: 'Style Lab', id: 'stylelab' },
          { name: 'Library', id: 'library' }
        ],
        { keyAttributes: 'id' }
      ),
    []
  );
  const [selectedItem, setSelectedItem] = useState('');
  const [currentItem, setCurrentItem] = useState('');

  return (
    <div id="tabbardemo">
      <oj-tab-bar
        oncurrentItemChanged={(event) => setCurrentItem(event.detail.value)}
        currentItem={currentItem}
        onselectionChanged={(event) => setSelectedItem(event.detail.value)}
        selection={selectedItem}
        data={dataProvider}
        edge="top"
      >
        <template slot="itemTemplate" render={(item) => <li><a href="#">{item.data.name}</a></li>} />
      </oj-tab-bar>
      <div class="oj-flex-item oj-sm-padding-2x-vertical oj-sm-12" />
      <div class="oj-flex-item oj-sm-12 oj-label oj-sm-padding-2x-vertical">
        <label for="curr-selection">Selected List Item:</label>
        <span id="curr-selection-value">{selectedItem}</span>
      </div>
      <div class="oj-flex-item oj-sm-12 oj-label oj-sm-padding-2x-vertical">
        <label for="current-item">Current Item:</label>
        <span id="current-item-value">{currentItem}</span>
      </div>
    </div>
  );
};

export default TabBarSelectioncorepack;
