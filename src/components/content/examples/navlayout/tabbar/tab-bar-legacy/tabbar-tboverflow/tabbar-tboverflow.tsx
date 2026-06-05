import { h } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'ojs/ojconveyorbelt';
import 'ojs/ojnavigationlist';

export const TabbarTboverflow = () => {
  const [selectedItem1, setSelectedItem1] = useState('settings');
  const [selectedItem2, setSelectedItem2] = useState('settings');
  const [selectedItem4, setSelectedItem4] = useState('settings');
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider(
        [
          { name: 'Settings', id: 'settings' },
          { name: 'Very very very long label', id: 'longlabel' },
          { name: 'Many more tools', id: 'tools' },
          { name: 'Base', id: 'base' },
          { name: 'Environment', id: 'environment' },
          { name: 'Security', id: 'security' },
          { name: 'Contacts', id: 'contacts' },
          { name: 'Location', id: 'location' },
          { name: 'About', id: 'about' }
        ],
        { keyAttributes: 'id' }
      ),
    []
  );
  const itemTemplateRenderer = (item: any) => <li id={item.data.id}><a href="#">{item.data.name}</a></li>;

  return (
    <div id="tabbardemo">
      <div class="oj-flex oj-panel demo-container">
        <div class="oj-flex-item oj-sm-12 demo-tabbar-container oj-sm-padding-10x-bottom oj-sm-padding-2x-horizontal">
          <h2 class="oj-typography-subheading-xs oj-sm-margin-0-bottom">Overflow using conveyor belt</h2>
          <oj-conveyor-belt id="conveyor">
            <oj-tab-bar edge="top" onselectionChanged={(event: any) => setSelectedItem1(event.detail.value)} selection={selectedItem1} data={dataProvider}>
              <template slot="itemTemplate" render={itemTemplateRenderer} />
            </oj-tab-bar>
          </oj-conveyor-belt>
        </div>
        <div class="oj-flex-item oj-sm-12 demo-tabbar-container oj-sm-padding-10x-bottom oj-sm-padding-2x-horizontal">
          <h2 class="oj-typography-subheading-xs oj-sm-margin-0-bottom">overflow="popup"</h2>
          <oj-tab-bar edge="top" overflow="popup" onselectionChanged={(event: any) => setSelectedItem2(event.detail.value)} selection={selectedItem2} data={dataProvider}>
            <template slot="itemTemplate" render={itemTemplateRenderer} />
          </oj-tab-bar>
        </div>
        <div class="oj-flex-item oj-sm-12 demo-tabbar-container oj-sm-padding-10x-bottom oj-sm-padding-2x-horizontal">
          <h2 class="oj-typography-subheading-xs oj-sm-margin-0-bottom">overflow="popup" and truncation="progressive"</h2>
          <oj-tab-bar edge="top" overflow="popup" onselectionChanged={(event: any) => setSelectedItem4(event.detail.value)} selection={selectedItem4} truncation="progressive" data={dataProvider} id="truncatedOverflowTabBar">
            <template slot="itemTemplate" render={itemTemplateRenderer} />
          </oj-tab-bar>
        </div>
      </div>
    </div>
  );
};

export default TabbarTboverflow;
