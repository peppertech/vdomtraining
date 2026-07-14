import 'ojs/ojlabel';
import 'ojs/ojnavigationlist';
import 'ojs/ojswitch';
import 'preact';
import { useMemo,useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type PropertyChangedEvent<T> = CustomEvent<{ value: T }>;

export const NavigationlistBadge = () => {
  const data = [
      {
          name: 'Inbox',
          id: 'inbox',
          icons: 'oj-ux-ico-inbox',
          endicon: 'oj-icon-color-danger oj-ux-ico-error-s',
          count: '3'
      },
      {
          name: 'Deleted Items',
          id: 'deleteditems',
          icons: 'oj-ux-ico-trash',
          endicon: 'oj-icon-color-success  oj-ux-ico-success-s',
          count: '99+'
      },
      {
          name: 'Archive',
          id: 'archive',
          icons: 'oj-ux-ico-library'
      }
  ];

  const [isContrastBackground, setIsContrastBackground] = useState<boolean>(false);
  const [selectedItem1, setSelectedItem1] = useState<string>('inbox');
  const [selectedItem2, setSelectedItem2] = useState<string>('inbox');
  const [selectedItem3, setSelectedItem3] = useState<string>('inbox');
  const [selectedItem4, setSelectedItem4] = useState<string>('inbox');
  const [selectedItem5, setSelectedItem5] = useState<string>('inbox');
  const [selectedItem6, setSelectedItem6] = useState<string>('inbox');
  const [selectedItem7, setSelectedItem7] = useState<string>('inbox');
  const [selectedItem8, setSelectedItem8] = useState<string>('inbox');

  const dataProvider = useMemo(() => new ArrayDataProvider(data, { keyAttributes: 'id' }), []);

  const handleIsContrastBackgroundValueChanged = (event: PropertyChangedEvent<boolean>) => {
    setIsContrastBackground(event.detail.value);
  };

  const handleSelectedItem1SelectionChanged = (event: PropertyChangedEvent<string>) => {
    setSelectedItem1(event.detail.value);
  };

  const handleSelectedItem3SelectionChanged = (event: PropertyChangedEvent<string>) => {
    setSelectedItem3(event.detail.value);
  };

  const handleSelectedItem2SelectionChanged = (event: PropertyChangedEvent<string>) => {
    setSelectedItem2(event.detail.value);
  };

  const handleSelectedItem4SelectionChanged = (event: PropertyChangedEvent<string>) => {
    setSelectedItem4(event.detail.value);
  };

  const handleSelectedItem6SelectionChanged = (event: PropertyChangedEvent<string>) => {
    setSelectedItem6(event.detail.value);
  };

  const handleSelectedItem7SelectionChanged = (event: PropertyChangedEvent<string>) => {
    setSelectedItem7(event.detail.value);
  };

  const handleSelectedItem8SelectionChanged = (event: PropertyChangedEvent<string>) => {
    setSelectedItem8(event.detail.value);
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
            <h6>Badge</h6>
            <div class="oj-flex">
                    <div class="oj-flex-item oj-sm-12 oj-lg-4 oj-lg-padding-4x-end oj-divider-end">
                              <div class="oj-sm-padding-2x-bottom oj-sm-padding-5x-end">
                                          <div class={navListContainerClass}>
                                                        <oj-navigation-list onselectionChanged={handleSelectedItem1SelectionChanged} selection={selectedItem1} aria-label="Choose a navigation item" drill-mode="none" data={dataProvider}>
                                                                        <template slot="itemTemplate" render={(item) => (
                                                                                        <>
                                                                                            <li>
                                                                                                                  <a href="#">
                                                                                                                                          {
                                                                                                                                                                  item.data.count ? (
                                                                                                                                                                    <>
                                                                                                                                                                      <span class="oj-navigationlist-item-end"><span class="oj-badge">{item.data.count}</span></span>
                                                                                                                                                                    </>
                                                                                                                                                                  ) : null
                                                                                                                                                                }
                                                                                                                                          {item.data.name}
                                                                                                                                      </a>
                                                                                                              </li>
                                                                                        </>
                                                                                      )} />
                                                                    </oj-navigation-list>
                                                    </div>
                                      </div>
                          </div>
                    <div class="oj-flex-item oj-sm-12 oj-lg-4 oj-lg-padding-4x-horizontal oj-divider-end">
                              <div class="oj-sm-padding-2x-bottom oj-sm-padding-5x-end">
                                          <div class={navListContainerClass}>
                                                        <oj-navigation-list onselectionChanged={handleSelectedItem3SelectionChanged} selection={selectedItem3} display="all" aria-label="Choose a navigation item" drill-mode="none" data={dataProvider}>
                                                                        <template slot="itemTemplate" render={(item) => (
                                                                                        <>
                                                                                            <li>
                                                                                                                  <a href="#">
                                                                                                                                          <span class={'oj-navigationlist-item-icon ' + item.data.icons} />
                                                                                                                                          {
                                                                                                                                                                  item.data.count ? (
                                                                                                                                                                    <>
                                                                                                                                                                      <span class="oj-navigationlist-item-end"><span class="oj-badge">{item.data.count}</span></span>
                                                                                                                                                                    </>
                                                                                                                                                                  ) : null
                                                                                                                                                                }
                                                                                                                                          {item.data.name}
                                                                                                                                      </a>
                                                                                                              </li>
                                                                                        </>
                                                                                      )} />
                                                                    </oj-navigation-list>
                                                    </div>
                                      </div>
                          </div>
                    <div class="oj-flex-item oj-sm-12 oj-lg-4 oj-lg-padding-4x-start">
                              <div class="oj-sm-padding-2x-bottom oj-sm-padding-5x-end">
                                          <div class={navListContainerClass}>
                                                        <oj-navigation-list onselectionChanged={handleSelectedItem2SelectionChanged} selection={selectedItem2} display="icons" aria-label="Choose a navigation item" drill-mode="none" data={dataProvider}>
                                                                        <template slot="itemTemplate" render={(item) => (
                                                                                        <>
                                                                                            <li>
                                                                                                                  <a href="#" aria-label={item.data.name}>
                                                                                                                                          <span class={'oj-navigationlist-item-icon ' + item.data.icons} />
                                                                                                                                          {
                                                                                                                                                                  item.data.count ? (
                                                                                                                                                                    <>
                                                                                                                                                                      <span class="oj-navigationlist-item-end"><span class="oj-badge oj-badge-sm">{item.data.count}</span></span>
                                                                                                                                                                    </>
                                                                                                                                                                  ) : null
                                                                                                                                                                }
                                                                                                                                          <span class="oj-helper-hidden-accessible">{item.data.name}</span>
                                                                                                                                      </a>
                                                                                                              </li>
                                                                                        </>
                                                                                      )} />
                                                                    </oj-navigation-list>
                                                    </div>
                                      </div>
                          </div>
                </div>
            <h6 class="oj-sm-margin-8x-top">Icons</h6>
            <div class="oj-flex">
                    <div class="oj-flex-item oj-sm-12 oj-lg-4 oj-lg-padding-4x-end oj-divider-end">
                              <div class="oj-sm-padding-2x-bottom oj-sm-padding-5x-end">
                                          <div class={navListContainerClass}>
                                                        <oj-navigation-list onselectionChanged={handleSelectedItem4SelectionChanged} selection={selectedItem4} aria-label="Choose a navigation item" drill-mode="none" data={dataProvider}>
                                                                        <template slot="itemTemplate" render={(item) => (
                                                                                        <>
                                                                                            <li>
                                                                                                                  <a href="#">
                                                                                                                                          {
                                                                                                                                                                  item.data.count ? (
                                                                                                                                                                    <>
                                                                                                                                                                      <span class={'oj-navigationlist-item-end oj-ux-icon-size-5x ' + item.data.endicon} role="img" aria-label="error" />
                                                                                                                                                                    </>
                                                                                                                                                                  ) : null
                                                                                                                                                                }
                                                                                                                                          {item.data.name}
                                                                                                                                      </a>
                                                                                                              </li>
                                                                                        </>
                                                                                      )} />
                                                                    </oj-navigation-list>
                                                    </div>
                                      </div>
                          </div>
                    <div class="oj-flex-item oj-sm-12 oj-lg-4 oj-lg-padding-4x-horizontal">
                              <div class="oj-sm-padding-2x-bottom oj-sm-padding-5x-end">
                                          <div class={navListContainerClass}>
                                                        <oj-navigation-list onselectionChanged={handleSelectedItem6SelectionChanged} selection={selectedItem6} display="all" aria-label="Choose a navigation item" drill-mode="none" data={dataProvider}>
                                                                        <template slot="itemTemplate" render={(item) => (
                                                                                        <>
                                                                                            <li>
                                                                                                                  <a href="#">
                                                                                                                                          <span class={'oj-navigationlist-item-icon ' + item.data.icons} />
                                                                                                                                          {
                                                                                                                                                                  item.data.count ? (
                                                                                                                                                                    <>
                                                                                                                                                                      <span class={'oj-navigationlist-item-end oj-ux-icon-size-5x ' + item.data.endicon} role="img" aria-label="error" />
                                                                                                                                                                    </>
                                                                                                                                                                  ) : null
                                                                                                                                                                }
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
            <h6 class="oj-sm-margin-8x-top">Metadata</h6>
            <div class="oj-flex">
                    <div class="oj-flex-item oj-sm-12 oj-lg-4 oj-lg-padding-4x-end oj-divider-end">
                              <div class="oj-sm-padding-2x-bottom oj-sm-padding-5x-end">
                                          <div class={navListContainerClass}>
                                                        <oj-navigation-list onselectionChanged={handleSelectedItem7SelectionChanged} selection={selectedItem7} aria-label="Choose a navigation item" drill-mode="none" data={dataProvider}>
                                                                        <template slot="itemTemplate" render={(item) => (
                                                                                        <>
                                                                                            <li>
                                                                                                                  <a href="#">
                                                                                                                                          {
                                                                                                                                                                  item.data.count ? (
                                                                                                                                                                    <>
                                                                                                                                                                      <span class="oj-navigationlist-item-end">
                                                                                                                                                                                                  (
                                                                                                                                                                                                  {item.data.count}
                                                                                                                                                                                                  )
                                                                                                                                                                                              </span>
                                                                                                                                                                    </>
                                                                                                                                                                  ) : null
                                                                                                                                                                }
                                                                                                                                          {item.data.name}
                                                                                                                                      </a>
                                                                                                              </li>
                                                                                        </>
                                                                                      )} />
                                                                    </oj-navigation-list>
                                                    </div>
                                      </div>
                          </div>
                    <div class="oj-flex-item oj-sm-12 oj-lg-4 oj-lg-padding-4x-horizontal">
                              <div class="oj-sm-padding-2x-bottom oj-sm-padding-5x-end">
                                          <div class={navListContainerClass}>
                                                        <oj-navigation-list onselectionChanged={handleSelectedItem8SelectionChanged} selection={selectedItem8} display="all" aria-label="Choose a navigation item" drill-mode="none" data={dataProvider}>
                                                                        <template slot="itemTemplate" render={(item) => (
                                                                                        <>
                                                                                            <li>
                                                                                                                  <a href="#">
                                                                                                                                          <span class={'oj-navigationlist-item-icon ' + item.data.icons} />
                                                                                                                                          {
                                                                                                                                                                  item.data.count ? (
                                                                                                                                                                    <>
                                                                                                                                                                      <span class="oj-navigationlist-item-end">
                                                                                                                                                                                                  (
                                                                                                                                                                                                  {item.data.count}
                                                                                                                                                                                                  )
                                                                                                                                                                                              </span>
                                                                                                                                                                    </>
                                                                                                                                                                  ) : null
                                                                                                                                                                }
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

export default NavigationlistBadge;
