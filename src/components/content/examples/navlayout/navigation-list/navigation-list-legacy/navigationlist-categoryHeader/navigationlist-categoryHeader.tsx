/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, h } from 'preact';
import { useMemo } from 'preact/hooks';
import { ojNavigationList } from 'ojs/ojnavigationlist';
import 'ojs/ojnavigationlist';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'css!./demo.css';

export const NavigationlistCategoryHeader = () => {
  const categoryData1 = [
      { name: 'Save', id: 'save' },
      { name: 'Zoom In', id: 'zoomin' },
      { name: 'Zoom Out', id: 'zoomout' },
      { name: 'Print...', id: 'print' },
      { name: 'divider', id: 'divider' }
  ];
  const categoryData2 = [
      { name: 'Previous', id: 'prev' },
      { name: 'Stop', id: 'stop' },
      { name: 'Play', id: 'play' },
      { name: 'Next', id: 'nextitem' },
      { name: 'divider', id: 'divider' }
  ];
  const categoryData3 = [
      { name: 'Track 1', id: 'track1' },
      { name: 'Track 2', id: 'track2' },
      { name: 'Track 3', id: 'track3' },
      { name: 'Track 4', id: 'track4' }
  ];

  let selectedItem: HTMLElement | null = null;
  const dataProvider1 = useMemo(() => new ArrayDataProvider(categoryData1, {
      keyAttributes: 'id'
  }), []);
  const dataProvider2 = useMemo(() => new ArrayDataProvider(categoryData2, {
      keyAttributes: 'id'
  }), []);
  const dataProvider3 = useMemo(() => new ArrayDataProvider(categoryData3, {
      keyAttributes: 'id'
  }), []);
  const selectionChange: (event: ojNavigationList.selectionChanged<string, string>) => any = (event: CustomEvent) => {
      //Get Selected item using item key.
      let newSelectedItem = document.getElementById(event.detail.value);
      //Check if existing selected item is not null,
      if (selectedItem && newSelectedItem) {
          let oldNavlist = closest(selectedItem, '.oj-navigationlist') as ojNavigationList<string | null, string>;
          //Check if the existing selected item belongs
          //to a differnet navigationlist
          if (oldNavlist != null &&
              oldNavlist !==
                  (closest(newSelectedItem, '.oj-navigationlist') as ojNavigationList<string | null, string>)) {
              //Remove selection in old navlist
              oldNavlist.selection = null;
          }
      }
      //update the current item with newly selected one.
      selectedItem = newSelectedItem;
  };

  const closest = (element: HTMLElement, selector: string) => {
      if (element.closest) {
          return element.closest(selector);
      }
      else {
          let ele: HTMLElement = element;
          do {
              if (ele.matches(selector))
                  return ele;
              ele = (ele.parentElement || ele.parentNode) as HTMLElement;
          } while (ele !== null && ele.nodeType === 1);
          return null;
      }
  };

  return (
      <div id="navlistdemo" class="demo-navlist-container oj-flex">
            <div class="oj-flex-item oj-sm-padding-2x-horizontal">
                    <div id="navlist">
                              <h4 id="options">Options</h4>
                              <oj-navigation-list id="navilist1" onselectionChanged={selectionChange} aria-labelledby="options" data={dataProvider1}>
                                          <template slot="itemTemplate" render={(item) => (
                                                      <>
                                                          <li id={item.data.id} class={item.index === 4 ? 'oj-navigationlist-category-divider' : ''}><a href="#">{item.data.name}</a></li>
                                                      </>
                                                    )} />
                                      </oj-navigation-list>
                              <h4 id="playback">Playback</h4>
                              <oj-navigation-list id="navilist2" onselectionChanged={selectionChange} aria-labelledby="playback" data={dataProvider2}>
                                          <template slot="itemTemplate" render={(item) => (
                                                      <>
                                                          <li id={item.data.id} class={item.index === 4 ? 'oj-navigationlist-category-divider' : ''}><a href="#">{item.data.name}</a></li>
                                                      </>
                                                    )} />
                                      </oj-navigation-list>
                              <h4 id="tracks">Tracks</h4>
                              <oj-navigation-list id="navilist3" onselectionChanged={selectionChange} aria-labelledby="tracks" data={dataProvider3}>
                                          <template slot="itemTemplate" render={(item) => (
                                                      <>
                                                          <li id={item.data.id}><a href="#">{item.data.name}</a></li>
                                                      </>
                                                    )} />
                                      </oj-navigation-list>
                          </div>
                </div>
        </div>
    );
};

export default NavigationlistCategoryHeader;
