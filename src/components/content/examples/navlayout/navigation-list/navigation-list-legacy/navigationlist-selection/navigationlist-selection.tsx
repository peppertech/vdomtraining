import 'ojs/ojnavigationlist';
import 'preact';
import { useMemo,useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type PropertyChangedEvent<T> = CustomEvent<{ value: T }>;

export const NavigationlistSelection = () => {
  const data = [
      {
          name: 'Home',
          id: 'home'
      },
      {
          name: 'Getting Started',
          id: 'gettingstarted'
      },
      {
          name: 'Cookbook',
          id: 'cookbook'
      },
      {
          name: 'Style Lab',
          id: 'stylelab'
      },
      {
          name: 'Library',
          id: 'library'
      }
  ];

  const [selectedItem, setSelectedItem] = useState<string>('');
  const [currentItem, setCurrentItem] = useState<string>('');

  const dataProvider = useMemo(() => new ArrayDataProvider(data, { keyAttributes: 'id' }), []);

  const handleSelectedItemSelectionChanged = (event: PropertyChangedEvent<string>) => {
    setSelectedItem(event.detail.value);
  };

  const handleCurrentItemCurrentItemChanged = (event: PropertyChangedEvent<string>) => {
    setCurrentItem(event.detail.value);
  };

  return (
      <div id="navlistdemo">
            <div>
                    <oj-navigation-list onselectionChanged={handleSelectedItemSelectionChanged} selection={selectedItem} oncurrentItemChanged={handleCurrentItemCurrentItemChanged} current-item={currentItem} data={dataProvider}>
                              <template slot="itemTemplate" render={(item) => (
                                        <>
                                            <li><a href="#">{item.data.name}</a></li>
                                        </>
                                      )} />
                          </oj-navigation-list>
                </div>
            <div class="oj-label">
                    <div class="oj-sm-padding-3x-vertical">
                              <label for="curr-selection">Selected List Item:</label>
                              <span id="curr-selection-value">{selectedItem}</span>
                          </div>
                    <div>
                              <label for="current-item">Current Item:</label>
                              <span id="current-item-value">{currentItem}</span>
                          </div>
                </div>
        </div>
    );
};

export default NavigationlistSelection;
