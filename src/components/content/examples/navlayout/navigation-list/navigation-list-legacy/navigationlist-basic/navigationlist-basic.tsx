/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, h } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import 'ojs/ojnavigationlist';
import 'ojs/ojswitch';
import 'ojs/ojlabel';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type PropertyChangedEvent<T> = CustomEvent<{ value: T }>;

export const NavigationlistBasic = () => {
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
      { name: 'Library', id: 'library', icons: 'oj-ux-ico-library' }
  ];

  const [isContrastBackground, setIsContrastBackground] = useState<boolean>(false);
  const [selectedItem1, setSelectedItem1] = useState<string>('home');
  const [selectedItem2, setSelectedItem2] = useState<string>('home');
  const [selectedItem3, setSelectedItem3] = useState<string>('home');

  const dataProvider = useMemo(() => new ArrayDataProvider(data, {
      keyAttributes: 'id'
  }), []);

  const handleIsContrastBackgroundValueChanged = (event: PropertyChangedEvent<boolean>) => {
    setIsContrastBackground(event.detail.value);
  };

  const handleSelectedItem1SelectionChanged = (event: PropertyChangedEvent<string>) => {
    setSelectedItem1(event.detail.value);
  };

  const handleSelectedItem2SelectionChanged = (event: PropertyChangedEvent<string>) => {
    setSelectedItem2(event.detail.value);
  };

  const handleSelectedItem3SelectionChanged = (event: PropertyChangedEvent<string>) => {
    setSelectedItem3(event.detail.value);
  };

  const navListContainerClass = [
    'navlistcontainer',
    isContrastBackground ? 'oj-bg-neutral-170 oj-color-invert' : ''
  ].filter(Boolean).join(' ');

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
            <div class="oj-flex">
                    <div class="oj-flex-item oj-md-padding-10x-end">
                              <h2 class="oj-typography-subheading-xs">Text Only</h2>
                              <div class="oj-sm-padding-10x-bottom">
                                          <div class={navListContainerClass}>
                                                        <oj-navigation-list onselectionChanged={handleSelectedItem1SelectionChanged} selection={selectedItem1} aria-label="Choose a navigation item" drill-mode="none" data={dataProvider}>
                                                                        <template slot="itemTemplate" render={(item) => (
                                                                                        <>
                                                                                            <li><a href="#">{item.data.name}</a></li>
                                                                                        </>
                                                                                      )} />
                                                                    </oj-navigation-list>
                                                    </div>
                                      </div>
                          </div>
                    <div class="oj-flex-item oj-md-padding-10x-end">
                              <h2 class="oj-typography-subheading-xs">Icon Only</h2>
                              <div class="oj-sm-padding-10x-bottom">
                                          <div class={navListContainerClass}>
                                                        <oj-navigation-list onselectionChanged={handleSelectedItem2SelectionChanged} selection={selectedItem2} display="icons" aria-label="Choose a navigation item" drill-mode="none" data={dataProvider}>
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
                                                    </div>
                                      </div>
                          </div>
                    <div class="oj-flex-item">
                              <h2 class="oj-typography-subheading-xs">Text and Icons</h2>
                              <div class="oj-sm-padding-10x-bottom">
                                          <div class={navListContainerClass}>
                                                        <oj-navigation-list onselectionChanged={handleSelectedItem3SelectionChanged} selection={selectedItem3} display="all" aria-label="Choose a navigation item" drill-mode="none" data={dataProvider}>
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
                                                    </div>
                                      </div>
                          </div>
                </div>
        </div>
    );
};

export default NavigationlistBasic;
