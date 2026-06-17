// @ts-nocheck
import { h, type ComponentProps } from 'preact';
import { useMemo, useRef, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { ojTabBar } from 'ojs/ojnavigationlist';
import 'ojs/ojlabel';
import 'ojs/ojoption';
import 'ojs/ojradioset';
import 'ojs/ojnavigationlist';

type TabbarEdge = 'top' | 'bottom';
type TabbarItem = {
  name: string;
  id: string;
};
type ReorderableTabBarElement = HTMLElement & {
  getContextByNode: (node: Element) => ojTabBar.NodeContext<TabbarItem["id"]> | null;
};
type RadiosetValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-radioset'>['onvalueChanged']>
>[0];
type TabbarSelectionChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-tab-bar'>['onselectionChanged']>
>[0];
type TabbarItemContext = ojTabBar.ItemContext<TabbarItem["id"], TabbarItem>;

export const TabbarTbreorder = () => {
  const tabbarRef = useRef<ReorderableTabBarElement | null>(null);
  const [edge, setEdge] = useState<TabbarEdge>('top');
  const [selectedItem, setSelectedItem] = useState('settings');
  const [accInfo, setAccInfo] = useState('');
  const [tabs, setTabs] = useState<TabbarItem[]>([
    { name: 'Settings', id: 'settings' },
    { name: 'Tools', id: 'tools' },
    { name: 'Base', id: 'base' },
    { name: 'Environment', id: 'environment' },
    { name: 'Security', id: 'security' }
  ]);

  const dataProvider = useMemo(() => new ArrayDataProvider<TabbarItem["id"], TabbarItem>(tabs, { keyAttributes: 'id' }), [tabs]);

  const handleReorder = (event: ojTabBar.ojReorder) => {
    const tabbar = tabbarRef.current;
    if (!tabbar) {
      return;
    }

    const source = tabbar.getContextByNode(event.detail.item);
    const dest = tabbar.getContextByNode(event.detail.reference);
    if (!source || !dest) {
      return;
    }

    setTabs((items: TabbarItem[]) => {
      const next = [...items];
      const [sourceData] = next.splice(source.index, 1);
      const insertPos =
        source.index < dest.index
          ? event.detail.position === 'before'
            ? dest.index - 1
            : dest.index
          : event.detail.position === 'before'
            ? dest.index
            : dest.index + 1;
      next.splice(insertPos, 0, sourceData);
      setAccInfo(`Moved ${event.detail.position} ${items[dest.index]?.name ?? ''}`);
      return next;
    });
  };

  return (
    <div id="tabbarContainer">
      <div class="oj-panel oj-bg-neutral-30 oj-sm-margin-4x-bottom">
        <div class="oj-flex demo-header oj-sm-justify-content-flex-end oj-sm-margin-4x-bottom">
          <div class="oj-flex-item oj-sm-padding-2x-horizontal">
            <oj-label id="edgeLabelId">Edge</oj-label>
            <oj-radioset id="edgeRadioId" labelledBy="edgeLabelId" ariaLabelledby="edgeLabelId" onvalueChanged={(event: RadiosetValueChangedEvent) => setEdge(event.detail.value as TabbarEdge)} value={edge}>
              <oj-option id="horiEdge" value="top">Top</oj-option>
              <oj-option id="horiBottomEdge" value="bottom">Bottom</oj-option>
            </oj-radioset>
          </div>
        </div>
      </div>
      <oj-tab-bar ref={tabbarRef} id="tabbar" aria-label="Tabs using json data" onselectionChanged={(event: TabbarSelectionChangedEvent) => setSelectedItem(event.detail.value)} selection={selectedItem} data={dataProvider} reorderable="enabled" edge={edge} onojReorder={handleReorder}>
        <template slot="itemTemplate" render={(item: TabbarItemContext) => <li><a href="#">{item.data.name}</a></li>} />
      </oj-tab-bar>
      <div id="tabBarReorderInfo" class="oj-helper-hidden-accessible" aria-live="polite">{accInfo}</div>
    </div>
  );
};

export default TabbarTbreorder;
