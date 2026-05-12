// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, h } from 'preact';
import { useMemo, useRef, useState } from 'preact/hooks';
import { ojListView } from 'ojs/ojlistview';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import DemoDataTransfer from './DemoDataTransfer';
import 'ojs/ojlistviewdnd';
import 'ojs/ojavatar';
import 'ojs/ojlistitemlayout';
import 'ojs/ojmenu';
import 'ojs/ojoption';

interface DataInfo {
    id: string;
    name: string;
    title: string;
    image: string;
}

export const ListViewWithTableDndListView = () => {
  const sourceData = useMemo(() => [
      {
          id: 'i1',
          name: 'Chris Black',
          title: 'Oracle Cloud Infrastructure GTM Channel Director EMEA',
          image: '../images/hcm/placeholder-male-01.png'
      },
      {
          id: 'i2',
          name: 'Christine Cooper',
          title: 'Senior Principal Escalation Manager',
          image: '../images/hcm/placeholder-female-01.png'
      },
      {
          id: 'i3',
          name: 'Chris Benalamore',
          title: 'Area Business Operations Director EMEA & JAPAC',
          image: '../images/hcm/placeholder-male-03.png'
      },
      {
          id: 'i4',
          name: 'Christopher Johnson',
          title: 'Vice-President HCM Application Development',
          image: '../images/hcm/placeholder-male-04.png'
      },
      {
          id: 'i5',
          name: 'Samire Christian',
          title: 'Consulting Project Technical Manager',
          image: '../images/hcm/placeholder-male-05.png'
      },
      {
          id: 'i6',
          name: 'Kurt Marchris',
          title: 'Customer Service Analyst',
          image: '../images/hcm/placeholder-male-06.png'
      },
      {
          id: 'i7',
          name: 'Jennifer Christy',
          title: 'Area Business Operations Director EMEA & JAPAC',
          image: '../images/hcm/placeholder-female-03.png'
      }
  ], []);
  const targetData = useMemo(() => [
      {
          id: 'i8',
          name: 'Zelda Christian Cooperman',
          title: 'Senior Principal Escalation Manager',
          image: '../images/hcm/placeholder-female-02.png'
      },
      {
          id: 'i9',
          name: 'Christian Wu',
          title: 'Senior Principal Escalation Manager',
          image: '../images/hcm/placeholder-male-07.png'
      },
      {
          id: 'i10',
          name: 'Christine Ellis',
          title: 'Vice-President HCM Application Development',
          image: '../images/hcm/placeholder-female-04.png'
      },
      {
          id: 'i11',
          name: 'Patrick Chrismon',
          title: 'Consulting Project Technical Manager',
          image: '../images/hcm/placeholder-male-08.png'
      },
      {
          id: 'i12',
          name: 'Alfred Marchris',
          title: 'Principal Developer',
          image: '../images/hcm/placeholder-male-13.png'
      }
  ], []);
  const [sourceArr, setSourceArr] = useState<any[]>(sourceData);
  const [targetArr, setTargetArr] = useState<any[]>(targetData);
  const [cutItem, setCutItem] = useState<any>(undefined);

  const dragItemIdRef = useRef<any>(null);
  const sourceDataProvider = useMemo(() => new ArrayDataProvider(sourceArr, {
      keyAttributes: 'id'
  }), [sourceArr]);
  const targetDataProvider = useMemo(() => new ArrayDataProvider(targetArr, {
      keyAttributes: 'id'
  }), [targetArr]);
  const clipboard = useMemo(() => new DemoDataTransfer(), []);

  const handleDrop = (event: DragEvent, context: ojListView.ItemsDropContext) => {
      event.preventDefault();
      let index = -1;
      if (context.item) {
          const itemContext = (document.getElementById('target') as ojListView<DataInfo['id'], DataInfo>).getContextByNode(context.item);
          index = itemContext.index;
          if (context.position === 'after') {
              index += 1;
          }
      }
      _handleDataTransfer(event.dataTransfer, index);
  };

  const handleDragStart = (event: DragEvent) => {
      const dataStr = event.dataTransfer.getData('application/ojlistviewitems+json');
      const data = JSON.parse(dataStr);
      dragItemIdRef.current = data[0].id;
  };

  const handleDragEnd = (event: DragEvent) => {
      if (event.dataTransfer.dropEffect !== 'none') {
          _removeSourceItem(dragItemIdRef.current);
      }
  };

  const _handleDataTransfer = (dataTransfer: any, index: any) => {
      const dataStr = dataTransfer.getData('application/ojlistviewitems+json');
      const data = JSON.parse(dataStr)[0];
      _insertTargetItem(data, index);
  };

  const _removeSourceItem = (itemId: any) => {
      const arr = sourceArr;
      for (let j = 0; j < arr.length; j++) {
          // remove the selected items from array
          if (arr[j].id === itemId) {
              arr.splice(j, 1)[0];
              break;
          }
      }
      sourceArr.valueHasMutated();
  };

  const _insertTargetItem = (data: any, index: any) => {
      const arr = targetArr;
      if (index === -1) {
          // empty list case
          arr.push(data);
      }
      else {
          arr.splice(index, 0, data);
      }
      targetArr.valueHasMutated();
  };

  const handleMenuCut = (event: any) => {
      _cutCurrentItem();
  };

  const handleKeyCut = (event: any) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'x') {
          _cutCurrentItem();
      }
  };

  const _cutCurrentItem = () => {
      const listView = document.getElementById('source') as ojListView<DataInfo['id'], DataInfo>;
      const currentItem = listView.currentItem;
      const data = listView.getDataForVisibleItem({ key: currentItem });
      const jsonStr = JSON.stringify([data]);
      clipboard.setData('application/ojlistviewitems+json', jsonStr);
      setCutItem(currentItem);
  };

  const handleMenuPaste = (event: any) => {
      _paste();
  };

  const handleKeyPaste = (event: any) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'v') {
          _paste();
      }
  };

  const _paste = () => {
      const listView = document.getElementById('target') as ojListView<DataInfo['id'], DataInfo>;
      const currentItem = listView.currentItem;
      const index = _findIndex(targetData, currentItem);
      _handleDataTransfer(clipboard, index + 1);
      _removeSourceItem(cutItem);
      setCutItem(null);
  };

  const _findIndex = (arr: any, key: any) => {
      const keys = arr.map((data: any) => {
          return data.id;
      });
      return keys.indexOf(key);
  };

  return (
      <div id="container">
            <div class="oj-sm-float-start">
                    <h4 class="oj-sm-margin-2x-start">Drag Source</h4>
                    <oj-list-view id="source" onkeydown={handleKeyCut} aria-label="list drag source" class="demo-list oj-listview-item-padding-off" data={sourceDataProvider} {...{ 'dnd.drag.items.data-types': "[\"application/ojlistviewitems+json\"]", 'dnd.drag.items.drag-start': handleDragStart, 'dnd.drag.items.drag-end': handleDragEnd, 'dnd.drop.items.data-types': "[\"application/ojtablerows+json\"]" }}>
                              <oj-menu slot="contextMenu" onojMenuAction={handleMenuCut} aria-label="menu with actions"><oj-option value="cut">Cut</oj-option></oj-menu>
                              <template slot="itemTemplate" render={(item: any) => (
                                        <>
                                            <li class={cutItem === item.key ? 'demo-cut-item' : ''}>
                                                            <oj-list-item-layout>
                                                                              <span class="oj-typography-body-md oj-text-color-primary">{item.data.name}</span>
                                                                              <oj-avatar slot="leading" size="xs" src={item.data.image} />
                                                                              <span slot="secondary" class="oj-typography-body-sm oj-text-color-secondary">{item.data.title}</span>
                                                                              <div id={item.metadata.key + '_draghandle'} slot="action" role="presentation" class="oj-sm-margin-4x-horizontal oj-listview-drag-handle" />
                                                                          </oj-list-item-layout>
                                                        </li>
                                        </>
                                      )} />
                          </oj-list-view>
                </div>
            <div class="oj-sm-float-start oj-sm-margin-4x-start">
                    <h4 class="oj-sm-margin-2x-start">Drop Target</h4>
                    <oj-list-view id="target" onkeydown={handleKeyPaste} aria-label="list drop target" class="demo-list oj-listview-item-padding-off" data={targetDataProvider} {...{ 'dnd.drop.items.data-types': "[\"application/ojlistviewitems+json\"]", 'dnd.drop.items.drop': handleDrop }}>
                              <oj-menu slot="contextMenu" onojMenuAction={handleMenuPaste} aria-label="menu with actions"><oj-option value="paste" disabled={cutItem == null}>Paste</oj-option></oj-menu>
                              <template slot="itemTemplate" render={(item: any) => (
                                        <>
                                            <oj-list-item-layout>
                                                            <span class="oj-typography-body-md oj-text-color-primary">{item.data.name}</span>
                                                            <oj-avatar slot="leading" size="xs" src={item.data.image} />
                                                        </oj-list-item-layout>
                                        </>
                                      )} />
                          </oj-list-view>
                </div>
        </div>
    );
};

export default ListViewWithTableDndListView;
