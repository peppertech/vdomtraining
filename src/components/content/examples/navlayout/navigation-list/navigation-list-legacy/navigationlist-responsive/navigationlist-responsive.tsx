/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, h } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import * as ResponsiveUtils from 'ojs/ojresponsiveutils';
import 'ojs/ojnavigationlist';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type PropertyChangedEvent<T> = CustomEvent<{ value: T }>;

export const NavigationlistResponsive = () => {
  const data = [
      { name: 'Home', id: 'home', icons: 'oj-ux-ico-home' },
      {
          name: 'Getting Started',
          id: 'gettingstarted',
          icons: 'oj-ux-ico-education'
      },
      { name: 'Cookbook', id: 'cookbook', icons: 'oj-ux-ico-book' },
      {
          name: 'Style Lab',
          id: 'stylelab',
          icons: 'oj-ux-ico-color-palette'
      },
      { name: 'Library', id: 'library', icons: 'oj-ux-ico-library' },
      { name: 'Support', id: 'support', icons: 'oj-ux-ico-chat-on' }
  ];
  const lgQuery = ResponsiveUtils.getFrameworkQuery('lg-up');

  const [selectedItem, setSelectedItem] = useState<string>('home');

  const large = typeof window !== 'undefined' && !!lgQuery ? window.matchMedia(lgQuery).matches : false;
  const dataProvider = useMemo(() => new ArrayDataProvider(data, { keyAttributes: 'id' }), []);

  const handleSelectedItemSelectionChanged = (event: PropertyChangedEvent<string>) => {
    setSelectedItem(event.detail.value);
  };

  return (
      <div id="navlistdemo">
            <oj-navigation-list onselectionChanged={handleSelectedItemSelectionChanged} selection={selectedItem} display={large ? 'all' : 'icons'} data={dataProvider} id="navlist">
                    <template slot="itemTemplate" render={(item) => (
                            <>
                                <li>
                                              <a href="#">
                                                              <span class={'oj-navigationlist-item-icon ' + item.data.icons} />
                                                              {item.data.name}
                                                          </a>
                                          </li>
                            </>
                          )} />
                </oj-navigation-list>
            <div class="oj-sm-padding-3x-vertical">
                    <p class="bold">
                              Last selected list item:
                              <span id="results">{selectedItem}</span>
                          </p>
                </div>
        </div>
    );
};

export default NavigationlistResponsive;
