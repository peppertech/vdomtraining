import 'ojs/ojavatar';
import 'ojs/ojlistitemlayout';
import 'ojs/ojlistview';
import { ojListView } from 'ojs/ojlistview';
import 'ojs/ojmenu';
import { ojMenuEventMap } from 'ojs/ojmenu';
import 'ojs/ojoption';
import 'preact';
import { useMemo,useRef,useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

interface EmployeeData {
  id: string;
  name: string;
  title: string;
  image: string;
}

type ItemTemplateContext = {
  data: EmployeeData;
};

export const ListViewCustomContextMenuListView = () => {
  const listViewRef = useRef<ojListView<EmployeeData['id'], EmployeeData> | null>(null);
  const contextMenuKeyRef = useRef<EmployeeData['id'] | null>(null);
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>('None selected yet');
  const [launchedFromItem, setLaunchedFromItem] = useState<string>('None launched yet');

  const data = useMemo<EmployeeData[]>(
    () => [
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
    ],
    []
  );
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider<EmployeeData['id'], EmployeeData>(data, {
        keyAttributes: 'id'
      }),
    [data]
  );

  const getContextKey = (node: Node | null | undefined): EmployeeData['id'] | null => {
    if (!(node instanceof Element)) {
      return null;
    }

    const context = listViewRef.current?.getContextByNode(node);
    if (context?.key != null) {
      return String(context.key);
    }

    const itemNode = node.closest('li, .oj-listview-item');
    if (itemNode instanceof Element) {
      const itemContext = listViewRef.current?.getContextByNode(itemNode);
      if (itemContext?.key != null) {
        return String(itemContext.key);
      }
    }

    return null;
  };

  const resolveLauncherNode = (launcher: string | Element | undefined): Node | null => {
    if (launcher instanceof Element) {
      return launcher;
    }

    if (typeof launcher === 'string') {
      return document.querySelector(launcher);
    }

    return null;
  };

  const updateLaunchedFrom = (node: Node | null | undefined) => {
    const key = getContextKey(node);
    if (key != null) {
      contextMenuKeyRef.current = key;
      setLaunchedFromItem(key);
    }
    return key;
  };

  const handleMenuAction = (event: ojMenuEventMap['ojMenuAction']) => {
    setSelectedMenuItem(event.detail.selectedValue);
    const key = updateLaunchedFrom(event.target as Node | null);
    if (key == null && contextMenuKeyRef.current != null) {
      setLaunchedFromItem(contextMenuKeyRef.current);
    }
  };

  const handleContextMenu = (event: MouseEvent) => {
    updateLaunchedFrom(event.target as Node | null);
  };

  const handleBeforeOpen = (event: ojMenuEventMap['ojBeforeOpen']) => {
    const originalEvent = event.detail.originalEvent as Event | undefined;
    const key = updateLaunchedFrom(originalEvent?.target as Node | null);
    if (key != null) {
      return;
    }

    const launcher = event.detail.openOptions.launcher;
    updateLaunchedFrom(resolveLauncherNode(launcher));
  };

  const renderItem = (item: ItemTemplateContext) => {
    return (
      <oj-list-item-layout>
        <span class="oj-typography-body-md oj-text-color-primary">{item.data.name}</span>
        <oj-avatar slot="leading" size="xs" src={item.data.image} />
        <span slot="secondary" class="oj-typography-body-sm oj-text-color-secondary">
          {item.data.title}
        </span>
      </oj-list-item-layout>
    );
  };

  return (
    <div id="listviewwrapper">
      <oj-list-view
        ref={listViewRef}
        id="listview"
        aria-label="list with context menu"
        class="oj-listview-item-padding-off"
        data={dataProvider}
        onContextMenuCapture={handleContextMenu}
        {...{ 'item.enter-key-focus-behavior': 'focusWithin' }}
      >
        <oj-menu
          slot="contextMenu"
          aria-label="actions"
          onojMenuAction={handleMenuAction}
          onojBeforeOpen={handleBeforeOpen}
        >
          <oj-option id="action1" value="Action 1">
            Action 1
          </oj-option>
          <oj-option id="action2" value="Action 2">
            Action 2
          </oj-option>
          <oj-option id="action3" value="Action 3">
            Action 3
          </oj-option>
        </oj-menu>
        <template slot="itemTemplate" render={renderItem} />
      </oj-list-view>
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

export default ListViewCustomContextMenuListView;
