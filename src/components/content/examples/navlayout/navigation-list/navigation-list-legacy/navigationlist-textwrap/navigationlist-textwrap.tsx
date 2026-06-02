/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, h } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import 'ojs/ojnavigationlist';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'css!./demo.css';

type PropertyChangedEvent<T> = CustomEvent<{ value: T }>;

export const NavigationlistTextwrap = () => {
  const data = [
      { name: 'Home', id: 'home' },
      { name: 'Getting Started', id: 'gettingstarted' },
      {
          name: 'This is very very very very very very very very long label',
          id: 'longlabel'
      },
      { name: 'Style Lab', id: 'stylelab2' },
      { name: 'Library', id: 'library' }
  ];

  const [selectedItem, setSelectedItem] = useState<string>('home');

  const dataProvider = useMemo(() => new ArrayDataProvider(data, { keyAttributes: 'id' }), []);

  const handleSelectedItemSelectionChanged = (event: PropertyChangedEvent<string>) => {
    setSelectedItem(event.detail.value);
  };

  return (
      <div id="navlistdemo">
            <div class="demo-navlist-container">
                    <oj-navigation-list class="oj-navigationlist-item-text-wrap" onselectionChanged={handleSelectedItemSelectionChanged} selection={selectedItem} data={dataProvider}>
                              <template slot="itemTemplate" render={(item) => (
                                        <>
                                            <li><a href="#">{item.data.name}</a></li>
                                        </>
                                      )} />
                          </oj-navigation-list>
                </div>
            <div class="oj-sm-padding-3x-vertical">
                    <p class="bold">
                              Last selected list item:
                              <span>{selectedItem}</span>
                          </p>
                </div>
        </div>
    );
};

export default NavigationlistTextwrap;
