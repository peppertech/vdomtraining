import 'css!./demo.css';
import 'ojs/ojavatar';
import 'ojs/ojlistitemlayout';
import { ojListView } from 'ojs/ojlistview';
import 'ojs/ojlistviewdnd';
import 'ojs/ojmenu';
import 'ojs/ojoption';
import 'preact';
import { useMemo,useRef,useState } from 'preact/hooks';
import DemoDataTransfer from './DemoDataTransfer';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

interface DataInfo {
    id: string;
    name: string;
    title: string;
    image: string;
}

type ItemTemplateContext = ojListView.ItemTemplateContext<DataInfo['id'], DataInfo>;
type TransferSource = DataTransfer | DemoDataTransfer | null;
type MenuActionEvent = CustomEvent<{ selectedValue?: 'cut' | 'paste' }>;
type TransferItem = DataInfo | { data?: DataInfo; item?: { data?: DataInfo } };
type LegacyItemTemplateContext = ItemTemplateContext & {
    metadata?: {
        key: DataInfo['id'];
    };
    item?: {
        data: DataInfo;
        metadata: {
            key: DataInfo['id'];
        };
    };
};

const LISTVIEW_ITEM_MIME_TYPE = 'application/ojlistviewitems+json';

const SOURCE_DATA: DataInfo[] = [
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
        name: 'Jennifer Christy',
        title: 'Area Business Operations Director EMEA & JAPAC',
        image: '/styles/images/hcm/placeholder-female-03.png'
    }
];

const TARGET_DATA: DataInfo[] = [
    {
        id: 'i8',
        name: 'Zelda Christian Cooperman',
        title: 'Senior Principal Escalation Manager',
        image: '/styles/images/hcm/placeholder-female-02.png'
    },
    {
        id: 'i9',
        name: 'Christian Wu',
        title: 'Senior Principal Escalation Manager',
        image: '/styles/images/hcm/placeholder-male-07.png'
    },
    {
        id: 'i10',
        name: 'Christine Ellis',
        title: 'Vice-President HCM Application Development',
        image: '/styles/images/hcm/placeholder-female-04.png'
    },
    {
        id: 'i11',
        name: 'Patrick Chrismon',
        title: 'Consulting Project Technical Manager',
        image: '/styles/images/hcm/placeholder-male-08.png'
    },
    {
        id: 'i12',
        name: 'Alfred Marchris',
        title: 'Principal Developer',
        image: '/styles/images/hcm/placeholder-male-13.png'
    }
];

const getTemplateData = (item: LegacyItemTemplateContext): DataInfo => {
    return item.data ?? item.item?.data;
};

const getTemplateKey = (item: LegacyItemTemplateContext): DataInfo['id'] => {
    return item.key ?? item.metadata?.key ?? item.item?.metadata?.key ?? getTemplateData(item).id;
};

const getTransferData = (item: TransferItem): DataInfo | null => {
    const data = 'data' in item ? item.data : undefined;
    const itemData = 'item' in item ? item.item?.data : undefined;
    const candidate = data ?? itemData ?? item;
    return candidate && 'id' in candidate ? candidate as DataInfo : null;
};

export const ListViewWithTableDndListView = () => {
  const [sourceArr, setSourceArr] = useState<DataInfo[]>(() => [...SOURCE_DATA]);
  const [targetArr, setTargetArr] = useState<DataInfo[]>(() => [...TARGET_DATA]);
  const [cutItem, setCutItem] = useState<DataInfo['id'] | null>(null);

  const dragItemIdRef = useRef<DataInfo['id'] | null>(null);
  const dragItemDataRef = useRef<DataInfo | null>(null);
  const sourceListRef = useRef<ojListView<DataInfo['id'], DataInfo> | null>(null);
  const targetListRef = useRef<ojListView<DataInfo['id'], DataInfo> | null>(null);
  const sourceDataProvider = useMemo(() => new ArrayDataProvider(sourceArr, {
      keyAttributes: 'id'
  }), [sourceArr]);
  const targetDataProvider = useMemo(() => new ArrayDataProvider(targetArr, {
      keyAttributes: 'id'
  }), [targetArr]);
  const clipboard = useMemo(() => new DemoDataTransfer(), []);

  const handleDragOver = (event: DragEvent) => {
      const hasListViewItemData = Array.from(event.dataTransfer?.types ?? []).includes(LISTVIEW_ITEM_MIME_TYPE);
      if (hasListViewItemData || dragItemDataRef.current != null) {
          event.preventDefault();
          if (event.dataTransfer) {
              event.dataTransfer.dropEffect = 'move';
          }
      }
  };

  const handleDrop = (event: DragEvent, context: ojListView.ItemsDropContext) => {
      event.preventDefault();
      let index = -1;
      if (context.item) {
          const itemContext = targetListRef.current?.getContextByNode(context.item);
          if (itemContext) {
              index = itemContext.index;
              if (context.position === 'after') {
                  index += 1;
              }
          }
      }
      const data = _getFirstTransferredItem(event.dataTransfer) ?? dragItemDataRef.current;
      if (data == null) {
          return;
      }
      _moveSourceItemToTarget(data, index);
      dragItemIdRef.current = null;
      dragItemDataRef.current = null;
      setCutItem(null);
  };

  const handleDragStart = (event: DragEvent, context: { items: TransferItem[] }) => {
      const data = context.items[0] ? getTransferData(context.items[0]) : null;
      dragItemIdRef.current = data?.id ?? null;
      dragItemDataRef.current = data;

      if (data != null) {
          event.dataTransfer?.setData(LISTVIEW_ITEM_MIME_TYPE, JSON.stringify([data]));
          if (event.dataTransfer) {
              event.dataTransfer.effectAllowed = 'move';
          }
      }
  };

  const handleDragEnd = (_event: DragEvent) => {
      dragItemIdRef.current = null;
      dragItemDataRef.current = null;
  };

	  const _getFirstTransferredItem = (dataTransfer: TransferSource): DataInfo | null => {
	      const dataStr = dataTransfer?.getData(LISTVIEW_ITEM_MIME_TYPE) ?? '';
	      if (dataStr === '') {
	          return null;
	      }
	      const parsedData = JSON.parse(dataStr) as TransferItem[] | TransferItem;
	      const [firstItem] = Array.isArray(parsedData) ? parsedData : [parsedData];
	      return firstItem ? getTransferData(firstItem) : null;
	  };

	  const _handleDataTransfer = (dataTransfer: TransferSource, index: number) => {
	      _insertTargetItem(_getFirstTransferredItem(dataTransfer), index);
	  };

	  const _removeSourceItem = (itemId: DataInfo['id'] | null) => {
	      if (itemId == null) {
	          return;
	      }
	      setSourceArr((arr) => arr.filter((item) => item.id !== itemId));
	  };

	  const _moveSourceItemToTarget = (data: DataInfo, index: number) => {
	      setSourceArr((arr) => arr.filter((item) => item.id !== data.id));
	      _insertTargetItem(data, index);
	  };

	  const _insertTargetItem = (data: DataInfo | null, index: number) => {
	      if (data == null) {
	          return;
	      }
	      setTargetArr((arr) => {
	          const nextArr = arr.filter((item) => item.id !== data.id);
	          if (index === -1) {
	              // empty list case
	              nextArr.push(data);
	          }
	          else {
	              nextArr.splice(index, 0, data);
	          }
	          return nextArr;
	      });
	  };

	  const handleMenuCut = (_event: MenuActionEvent) => {
	      _cutCurrentItem();
	  };

	  const handleKeyCut = (event: KeyboardEvent) => {
	      if ((event.ctrlKey || event.metaKey) && event.key === 'x') {
          _cutCurrentItem();
      }
  };

  const _cutCurrentItem = () => {
	      const listView = sourceListRef.current;
	      if (!listView) {
	          return;
	      }
	      const currentItem = listView.currentItem as DataInfo['id'] | null;
	      if (currentItem == null) {
	          return;
	      }
	      const data = listView.getDataForVisibleItem({ key: currentItem }) as DataInfo;
      const jsonStr = JSON.stringify([data]);
      clipboard.setData(LISTVIEW_ITEM_MIME_TYPE, jsonStr);
      setCutItem(currentItem);
  };

	  const handleMenuPaste = (_event: MenuActionEvent) => {
	      _paste();
	  };

	  const handleKeyPaste = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'v') {
          _paste();
      }
  };

  const _paste = () => {
	      const listView = targetListRef.current;
	      if (!listView) {
	          return;
	      }
	      const currentItem = listView.currentItem as DataInfo['id'] | null;
	      const index = _findIndex(targetArr, currentItem);
      _handleDataTransfer(clipboard, index + 1);
      _removeSourceItem(cutItem);
      setCutItem(null);
  };

	  const _findIndex = (arr: DataInfo[], key: DataInfo['id'] | null) => {
        if (key == null) {
            return -1;
        }
	      const keys = arr.map((data: DataInfo) => {
          return data.id;
      });
      return keys.indexOf(key);
  };

  return (
      <div id="container" class="demo-dnd-container">
            <div class="demo-dnd-column">
                    <h4 class="oj-sm-margin-2x-start">Drag Source</h4>
                    <oj-list-view ref={sourceListRef} id="source" onKeyDown={handleKeyCut} aria-label="list drag source" class="demo-dnd-list oj-listview-item-padding-off" data={sourceDataProvider} {...{ 'dnd.drag.items.data-types': `["${LISTVIEW_ITEM_MIME_TYPE}"]`, 'dnd.drag.items.drag-start': handleDragStart, 'dnd.drag.items.drag-end': handleDragEnd, 'dnd.drop.items.data-types': "[\"application/ojtablerows+json\"]" }}>
                              <oj-menu slot="contextMenu" onojMenuAction={handleMenuCut} aria-label="menu with actions"><oj-option value="cut">Cut</oj-option></oj-menu>
	                              <template slot="itemTemplate" render={(item: LegacyItemTemplateContext) => {
                                        const data = getTemplateData(item);
                                        const key = getTemplateKey(item);
                                        return (
                                            <oj-list-item-layout class={cutItem === key ? 'demo-cut-item' : ''}>
                                                <span class="oj-typography-body-md oj-text-color-primary">{data.name}</span>
                                                <oj-avatar slot="leading" size="xs" src={data.image} />
                                                <span slot="secondary" class="oj-typography-body-sm oj-text-color-secondary">{data.title}</span>
                                                <div id={key + '_draghandle'} slot="action" role="presentation" class="oj-sm-margin-4x-horizontal oj-listview-drag-handle" />
                                            </oj-list-item-layout>
                                        );
                                      }} />
                          </oj-list-view>
                </div>
            <div class="demo-dnd-column">
                    <h4 class="oj-sm-margin-2x-start">Drop Target</h4>
                    <oj-list-view ref={targetListRef} id="target" onKeyDown={handleKeyPaste} aria-label="list drop target" class="demo-dnd-list oj-listview-item-padding-off" data={targetDataProvider} {...{ 'dnd.drop.items.data-types': `["${LISTVIEW_ITEM_MIME_TYPE}"]`, 'dnd.drop.items.drag-over': handleDragOver, 'dnd.drop.items.drop': handleDrop }}>
                              <oj-menu slot="contextMenu" onojMenuAction={handleMenuPaste} aria-label="menu with actions"><oj-option value="paste" disabled={cutItem == null}>Paste</oj-option></oj-menu>
	                              <template slot="itemTemplate" render={(item: LegacyItemTemplateContext) => {
                                        const data = getTemplateData(item);
                                        return (
                                            <oj-list-item-layout>
                                                <span class="oj-typography-body-md oj-text-color-primary">{data.name}</span>
                                                <oj-avatar slot="leading" size="xs" src={data.image} />
                                            </oj-list-item-layout>
                                        );
                                      }} />
                          </oj-list-view>
                </div>
        </div>
    );
};

export default ListViewWithTableDndListView;
