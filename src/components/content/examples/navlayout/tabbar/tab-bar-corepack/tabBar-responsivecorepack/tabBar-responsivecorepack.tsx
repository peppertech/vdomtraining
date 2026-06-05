import { h } from 'preact';
import { useEffect, useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as ResponsiveUtils from 'ojs/ojresponsiveutils';
import 'ojs/ojnavigationlist';

export const TabBarResponsivecorepack = () => {
  const mdQuery = ResponsiveUtils.getFrameworkQuery('md-up');
  const [selectedItem, setSelectedItem] = useState('home');
  const [isMedium, setIsMedium] = useState(() => (typeof window !== 'undefined' && mdQuery ? window.matchMedia(mdQuery).matches : true));
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider(
        [
          { name: 'Home', id: 'home', icons: 'oj-ux-ico-home' },
          { name: 'Getting Started', id: 'gettingstarted', icons: 'oj-ux-ico-education' },
          { name: 'Cookbook', id: 'cookbook', icons: 'oj-ux-ico-book' },
          { name: 'Library', id: 'library', icons: 'oj-ux-ico-library' }
        ],
        { keyAttributes: 'id' }
      ),
    []
  );

  useEffect(() => {
    if (!mdQuery || typeof window === 'undefined') {
      return;
    }
    const mediaQuery = window.matchMedia(mdQuery);
    const listener = (event: any) => setIsMedium(event.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, [mdQuery]);

  return (
    <div id="tabbardemo">
      <oj-tab-bar onselectionChanged={(event: any) => setSelectedItem(event.detail.value)} selection={selectedItem} display={isMedium ? 'all' : 'icons'} layout={isMedium ? 'stretch' : 'condense'} edge="top" data={dataProvider} id="tabbar" class="oj-flex oj-sm-justify-content-center oj-md-justify-content-center oj-lg-justify-content-flex-end">
        <template slot="itemTemplate" render={(item: any) => <li><a href="#"><span class={'oj-tabbar-item-icon ' + item.data.icons} />{item.data.name}</a></li>} />
      </oj-tab-bar>
    </div>
  );
};

export default TabBarResponsivecorepack;
