import 'oj-c/avatar';
import 'oj-c/list-item-layout';
import 'oj-c/list-view';
import type { CListViewElement } from 'oj-c/list-view';
import 'preact';
import { type ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

interface EmployeeData {
  id: string;
  name: string;
  title: string;
  image: string;
}

type ListViewProps = ComponentProps<'oj-c-list-view'>;
type ContextMenuConfig = NonNullable<ListViewProps['contextMenuConfig']>;
type ContextMenuItemContext = Parameters<ContextMenuConfig['items']>[0];
type ContextMenuActionEvent = CListViewElement.ojContextMenuAction<EmployeeData['id'], EmployeeData>;
type ItemTemplateContext = CListViewElement.ItemTemplateContext<EmployeeData['id'], EmployeeData>;

const data: EmployeeData[] = [
  {
    id: 'i1',
    name: 'Chris Black',
    title: 'Oracle Cloud Infrastructure GTM Channel Director EMEA',
    image: '/styles/images/hcm/placeholder-male-01.png'
  },
  {
    id: 'i2',
    name: 'Christine Cooper',
    title: 'Senior Principal Escalation Manager',
    image: '/styles/images/hcm/placeholder-female-01.png'
  },
  {
    id: 'i3',
    name: 'Chris Benalamore',
    title: 'Area Business Operations Director EMEA & JAPAC',
    image: '/styles/images/hcm/placeholder-male-03.png'
  },
  {
    id: 'i4',
    name: 'Christopher Johnson',
    title: 'Vice-President HCM Application Development',
    image: '/styles/images/hcm/placeholder-male-04.png'
  },
  {
    id: 'i5',
    name: 'Samire Christian',
    title: 'Consulting Project Technical Manager',
    image: '/styles/images/hcm/placeholder-male-05.png'
  },
  {
    id: 'i6',
    name: 'Kurt Marchris',
    title: 'Customer Service Analyst',
    image: '/styles/images/hcm/placeholder-male-06.png'
  },
  {
    id: 'i7',
    name: 'Zelda Christian Cooperman',
    title: 'Senior Principal Escalation Manager',
    image: '/styles/images/hcm/placeholder-female-02.png'
  }
];

export const ListViewContextMenucorepack = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>('None selected yet');
  const [launchedFromItem, setLaunchedFromItem] = useState<string>('None launched yet');

  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider<EmployeeData['id'], EmployeeData>(data, {
        keyAttributes: 'id'
      }),
    []
  );

  const contextMenuConfig = useMemo(
    (): ContextMenuConfig => ({
      accessibleLabel: 'Actions',
      items: (context: ContextMenuItemContext) => {
        setLaunchedFromItem(String(context?.item?.metadata?.key ?? 'None launched yet'));
        return [
          { label: 'Action 1', key: 'Action 1' },
          { label: 'Action 2', key: 'Action 2' },
          { label: 'Action 3', key: 'Action 3' }
        ];
      }
    }),
    []
  );

  const handleContextMenuAction = (event: ContextMenuActionEvent) => {
    setSelectedMenuItem(event.detail.menuItemKey);
    setLaunchedFromItem(String(event.detail.contextMenuContext?.item?.metadata?.key ?? 'None launched yet'));
  };

  const renderItem: import("ojs/ojvcomponent").TemplateSlot<ItemTemplateContext> = (item) => (
    <oj-c-list-item-layout>
      <span class="oj-typography-body-md oj-text-color-primary">{item.data.name}</span>
      <oj-c-avatar slot="leading" size="xs" src={item.data.image} />
      <span slot="secondary" class="oj-typography-body-sm oj-text-color-secondary">
        {item.data.title}
      </span>
    </oj-c-list-item-layout>
  );

  return (
    <div id="listviewwrapper">
      <oj-c-list-view
        id="listview"
        aria-label="list with context menu"
        class="oj-listview-item-padding-off"
        data={dataProvider}
        contextMenuConfig={contextMenuConfig}
        onojContextMenuAction={handleContextMenuAction}
        item={{ enterKeyFocusBehavior: 'focusWithin' }}
      >
        <template slot="itemTemplate" render={renderItem} />
      </oj-c-list-view>
      <p>
        Last selected menu action:
        <span id="selected">{selectedMenuItem}</span>
      </p>
      <p>
        Launched from:
        <span id="launched">{launchedFromItem}</span>
      </p>
    </div>
  );
};

export default ListViewContextMenucorepack;
