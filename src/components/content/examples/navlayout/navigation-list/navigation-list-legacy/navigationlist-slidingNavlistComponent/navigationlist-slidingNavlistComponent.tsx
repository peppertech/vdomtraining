/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, h } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import * as jsonData from 'text!../../data/cookbook/layout/navigationlist/slidingNavlistComponent/treeViewData.json';
import 'ojs/ojnavigationlist';
import 'ojs/ojswitch';
import 'ojs/ojlabel';
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');
import 'css!./demo.css';

type PropertyChangedEvent<T> = CustomEvent<{ value: T }>;

export const NavigationlistSlidingNavlistComponent = () => {
  const navlistContainer = document.getElementById('navlistcontainer');

  const [isContrastBackground, setIsContrastBackground] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string>('home');

  const dataProvider = useMemo(() => new ArrayTreeDataProvider(JSON.parse(jsonData), {
      keyAttributes: 'id'
  }), []);

  const handleIsContrastBackgroundValueChanged = (event: PropertyChangedEvent<boolean>) => {
    setIsContrastBackground(event.detail.value);
  };

  const handleSelectedItemSelectionChanged = (event: PropertyChangedEvent<string>) => {
    setSelectedItem(event.detail.value);
  };

  return (
      <div id="navlistdemo">
            <div class="oj-panel oj-bg-neutral-30 oj-sm-margin-4x-bottom">
                    <div class="oj-flex oj-sm-justify-content-flex-end oj-sm-margin-4x-bottom">
                              <div class="oj-flex-item oj-sm-padding-2x-horizontal">
                                          <oj-label id="contrastBgLabel" class="oj-label" for="contrastBgSwitch">Dark Background</oj-label>
                                          <oj-switch id="contrastBgSwitch" onvalueChanged={handleIsContrastBackgroundValueChanged} value={isContrastBackground} />
                                      </div>
                          </div>
                </div>
            <div id="navlistcontainer" class="demo-navlist-container">
                    <oj-navigation-list drill-mode="sliding" onselectionChanged={handleSelectedItemSelectionChanged} selection={selectedItem} data={dataProvider}>
                              <template slot="itemTemplate" render={(item) => (
                                        <>
                                            <li id={item.data.id}>
                                                            <a href="#">
                                                                              <span class={'oj-navigationlist-item-icon ' + item.data.icons} />
                                                                              {item.data.name}
                                                                          </a>
                                                        </li>
                                        </>
                                      )} />
                          </oj-navigation-list>
                </div>
            <div class="oj-sm-padding-3x-vertical">
                    <p class="bold">
                              Last selected list item:
                              <span id="results">{selectedItem}</span>
                          </p>
                </div>
        </div>
    );
};

export default NavigationlistSlidingNavlistComponent;
