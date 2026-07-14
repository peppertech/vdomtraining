import 'ojs/ojconveyorbelt';
import type { ojConveyorBelt } from 'ojs/ojconveyorbelt';
import 'ojs/ojnavigationlist';
import { ojTabBar } from 'ojs/ojnavigationlist';
import 'ojs/ojselectsingle';
import 'preact';
import { type ComponentProps } from 'preact';
import { useCallback,useMemo,useRef,useState } from 'preact/hooks';
import MutableArrayDataProvider = require('ojs/ojmutablearraydataprovider');

type TabItem = {
  id: string;
  name: string;
  icons: string;
};

const tabs: TabItem[] = [
  { id: 'dashboard', name: 'Dashboard', icons: 'oj-ux-ico-dashboard' },
  { id: 'incidents', name: 'Incidents', icons: 'oj-ux-ico-warning' },
  { id: 'customers', name: 'Customers', icons: 'oj-ux-ico-contact-group' },
  { id: 'projects', name: 'Projects', icons: 'oj-ux-ico-apps' },
  { id: 'reports', name: 'Reports', icons: 'oj-ux-ico-bar-chart' },
  { id: 'calendar', name: 'Calendar', icons: 'oj-ux-ico-calendar' },
  { id: 'messages', name: 'Messages', icons: 'oj-ux-ico-email' },
  { id: 'settings', name: 'Settings', icons: 'oj-ux-ico-settings' }
];

type SelectSingleProps = ComponentProps<'oj-select-single'>;
type SelectSingleValueChangedEvent = Parameters<
  NonNullable<SelectSingleProps['onvalueChanged']>
>[0];

export const ConveyorBeltProgrammaticScrolling = () => {
  const conveyorBeltRef = useRef<ojConveyorBelt>(null);
  const tabRefs = useRef<Record<TabItem['id'], HTMLLIElement | null>>({});
  const [selectedItem, setSelectedItem] = useState<TabItem['id']>('dashboard');

  const dataProvider = useMemo(
    () =>
      new MutableArrayDataProvider<TabItem['id'], TabItem>(tabs, {
        keyAttributes: 'id'
      }),
    []
  );

  const scrollSelectedIntoView = useCallback((key: TabItem['id']) => {
    window.requestAnimationFrame(() => {
      const tabElement = tabRefs.current[key];
      if (tabElement) {
        conveyorBeltRef.current?.scrollElementIntoView(tabElement);
      }
    });
  }, []);

  const itemTemplate = useCallback((context: ojTabBar.ItemContext<TabItem['id'], TabItem>) => {
    return (
      <li
        ref={(element) => {
          tabRefs.current[context.data.id] = element;
        }}
        id={`tab-${context.data.id}`}
      >
        <a href="#">
          <span class={`oj-tabbar-item-icon ${context.data.icons}`} aria-hidden="true"></span>
          <span class="oj-tabbar-item-label">{context.data.name}</span>
        </a>
      </li>
    );
  }, []);

  const handleSelectionChanged = useCallback(
    (event: ojTabBar.selectionChanged<TabItem['id'], TabItem>) => {
      if (event.detail.value) {
        setSelectedItem(event.detail.value);
        scrollSelectedIntoView(event.detail.value);
      }
    },
    [scrollSelectedIntoView]
  );

  const handleSelectValueChanged = useCallback(
    (event: SelectSingleValueChangedEvent) => {
      const value = event.detail.value as TabItem['id'] | null;
      if (value) {
        setSelectedItem(value);
        scrollSelectedIntoView(value);
      }
    },
    [scrollSelectedIntoView]
  );

  return (
    <div id="programmaticScrolling">
      <oj-select-single
        id="tabSelect"
        class="oj-form-control-max-width-md oj-sm-margin-4x-bottom"
        labelHint="Select tab"
        labelEdge="inside"
        data={dataProvider as SelectSingleProps['data']}
        value={selectedItem}
        itemText="name"
        onvalueChanged={handleSelectValueChanged}
      ></oj-select-single>
      <div class="oj-flex">
        <oj-conveyor-belt
          id="programmaticConveyorBelt"
          ref={conveyorBeltRef}
          class="oj-lg-6 oj-md-9 oj-sm-12 oj-flex-item"
        >
          <oj-tab-bar
            id="programmaticTabBar"
            data={dataProvider}
            selection={selectedItem}
            display="all"
            edge="top"
            onselectionChanged={handleSelectionChanged}
          >
            <template slot="itemTemplate" render={itemTemplate}></template>
          </oj-tab-bar>
        </oj-conveyor-belt>
      </div>
    </div>
  );
};

export default ConveyorBeltProgrammaticScrolling;
