// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, h } from 'preact';
import { useMemo, useRef, useState } from 'preact/hooks';
import * as jsonData from 'text!../data/cookbook/dataVisualizations/nBox/resources/employeesNoInitials.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'ojs/ojnbox';
import { DemoDataTransfer } from './DemoDataTransfer';
import 'ojs/ojlistview';
import 'ojs/ojlistviewdnd';
import 'ojs/ojavatar';
import 'ojs/ojlistitemlayout';
import { ojListView } from 'ojs/ojlistview';

interface DataInfo {
    id: string;
    name: string;
    title: string;
    image: string;
}

type PropertyChangedEvent<T> = CustomEvent<{ value: T }>;

const initialListData = [
  {
      id: 'i1',
      name: 'Chris Black',
      title: 'Oracle Cloud Infrastructure GTM Channel Director EMEA',
      image: 'images/hcm/placeholder-male-01.png'
  },
  {
      id: 'i2',
      name: 'Christine Cooper',
      title: 'Senior Principal Escalation Manager',
      image: 'images/hcm/placeholder-female-01.png'
  },
  {
      id: 'i3',
      name: 'Chris Benalamore',
      title: 'Area Business Operations Director EMEA & JAPAC',
      image: 'images/hcm/placeholder-male-03.png'
  },
  {
      id: 'i4',
      name: 'Christopher Johnson',
      title: 'Vice-President HCM Application Development',
      image: 'images/hcm/placeholder-male-04.png'
  },
  {
      id: 'i5',
      name: 'Samire Christian',
      title: 'Consulting Project Technical Manager',
      image: 'images/hcm/placeholder-male-05.png'
  },
  {
      id: 'i6',
      name: 'Kurt Marchris',
      title: 'Customer Service Analyst',
      image: 'images/hcm/placeholder-male-06.png'
  }
];

export const NBoxDndSample = () => {
  const [data, setData] = useState<any[]>(JSON.parse(jsonData));
  const [cutItem, setCutItem] = useState<any>(undefined);
  const [currentItem, setCurrentItem] = useState<any>(undefined);
  const [listArr, setListArr] = useState<any[]>(initialListData);

  const latestNboxActionRef = useRef<any>('none');
  const latestListviewActionRef = useRef<any>('none');
  const dragItemIdRef = useRef<any>(null);

  const clipboard = useMemo(() => new DemoDataTransfer(), []);
  const rows = useMemo(() => [{ id: '0' }, { id: '1' }, { id: '2' }], []);
  const columns = useMemo(() => [{ id: '0' }, { id: '1' }, { id: '2' }], []);
  const cells = useMemo(() => [
      {
          row: '0',
          column: '0',
          shortDesc: 'Low Potential, Poor Performance'
      },
      {
          row: '0',
          column: '1',
          shortDesc: 'Low Potential, Fair Performance'
      },
      {
          row: '0',
          column: '2',
          shortDesc: 'Low Potential, Good Performance'
      },
      {
          row: '1',
          column: '0',
          shortDesc: 'Medium Potential, Poor Performance'
      },
      {
          row: '1',
          column: '1',
          shortDesc: 'Medium Potential, Fair Performance'
      },
      {
          row: '1',
          column: '2',
          shortDesc: 'Medium Potential, Good Performance'
      },
      {
          row: '2',
          column: '0',
          shortDesc: 'High Potential, Poor Performance'
      },
      {
          row: '2',
          column: '1',
          shortDesc: 'High Potential, Fair Performance'
      },
      {
          row: '2',
          column: '2',
          shortDesc: 'High Potential, Good Performance'
      }
  ], []);
  const dataProvider1 = useMemo(() => new ArrayDataProvider(data, {
      keyAttributes: 'name'
  }), [data]);
  const _: any = undefined;
  const listDataProvider = useMemo(() => new ArrayDataProvider(listArr, {
      keyAttributes: 'id'
  }), [listArr]);

  const handleCurrentItemCurrentItemChanged = (event: PropertyChangedEvent<any>) => {
    setCurrentItem(event.detail.value);
  };

  const onNBoxDrop = (event: DragEvent, context: {
      row: number;
      column: number;
  }) => {
      let fromLS = false;
      let dropData = event.dataTransfer?.getData('application/nbox');
      if (!dropData) {
          dropData = event.dataTransfer?.getData('application/ojlistviewitems');
          fromLS = true;
      }
      if (dropData) {
          _drop(context.row, context.column, dropData, false, fromLS);
      }
  };

  const cutRequest = (event: any) => {
      _keyboardCutCopy(event, 'cut');
  };

  const copyRequest = (event: any) => {
      _keyboardCutCopy(event, 'copy');
  };

  const pasteRequest = (event: any) => {
      const isCopy = latestNboxActionRef.current === 'copy';
      let fromLS = false;
      let dropData = clipboard.getData('application/nbox');
      if (!dropData) {
          dropData = clipboard.getData('application/ojlistviewitems');
          fromLS = true;
      }
      clipboard.setData('application/nbox', null);
      if (!dropData)
          return;
      const target = event.detail.target;
      const row = target.row;
      const column = target.column;
      if (isCopy && !fromLS)
          return;
      _drop(row, column, dropData, true, fromLS);
      setCutItem(null);
  };

  const _drop = (row: number, column: number, dropData: string, keyboard: boolean, fromLS: boolean) => {
      const data = JSON.parse(dropData);
      let dataObj = data;
      const names = [];
      for (let i = 0; i < dataObj.length; i++) {
          names.push(dataObj[i].name || dataObj[i].id);
      }
      const newNames = [];
      if (fromLS) {
          listArr.remove((s: any) => {
              if (names.includes(s.name)) {
                  newNames.push(s);
                  return latestListviewActionRef.current !== 'copy' ? true : false;
              }
              return false;
          });
          listArr.valueHasMutated();
      }
      else {
          data.remove((s: any) => {
              if (names.includes(s.name)) {
                  newNames.push(s);
                  return true;
              }
              return false;
          });
      }
      for (let i = 0; i < newNames.length; i++) {
          const newName = newNames[i];
          newName.potential = row;
          newName.performance = column;
          if (fromLS) {
              newName.image = newName.image.split('placeholder-')[1].split('.png')[0];
              newName.position = newName.title;
          }
          data.unshift(newName);
      }
      let accText;
      const cell = _findCellDesc(column.toString(), row.toString());
      if (newNames.length > 1) {
          accText = `Moved multiple nodes from ${fromLS ? 'listview ' : ''}to ${cell} cell`;
      }
      else {
          accText = `Moved node ${fromLS ? dataObj[0].name : dataObj[0].label} from ${fromLS ? 'listview ' : 'nbox '} to ${cell} cell`;
      }
      accText = accText + (keyboard ? ' via keyboard' : ' via drag and drop');
      _updateAcc(accText);
      latestListviewActionRef.current = 'none';
      latestNboxActionRef.current = 'none';
      clipboard.setData('application/nbox', null);
      clipboard.setData('application/ojlistviewitems', null);
  };

  const _keyboardCutCopy = (event: any, type: any) => {
      const src = event.detail.source;
      const jsonStr = JSON.stringify(src);
      clipboard.setData('application/nbox', jsonStr);
      latestNboxActionRef.current = type;
      _updateAcc(`${src[0].id} ${type === 'copy' ? 'Copied' : 'Cut'}`);
  };

  const _updateAcc = (text: any) => {
      const acc = document.getElementById('accInfo');
      acc.textContent = text;
  };

  const _findCellDesc = (col: string, row: string) => {
      const cells = cells;
      for (let i = 0; i < cells.length; i++) {
          const cell = cells[i];
          if (cell.row === row && cell.column === col) {
              return cell.shortDesc;
          }
      }
  };

  const handleDrop = (event: DragEvent, context: ojListView.ItemsDropContext) => {
      event.preventDefault();
      let index = -1;
      if (context.item) {
          const itemContext = (document.getElementById('listview') as ojListView<DataInfo['id'], DataInfo>).getContextByNode(context.item);
          index = itemContext.index;
          if (context.position === 'after') {
              index += 1;
          }
      }
      const dataStr = event.dataTransfer.getData('application/nbox');
      _listDrop(dataStr, false, index);
  };

  const handleDragStart = (event: DragEvent) => {
      const dataStr = event.dataTransfer.getData('application/ojlistviewitems');
      const data = JSON.parse(dataStr);
      dragItemIdRef.current = data[0].id;
  };

  const handleDragEnd = (event: DragEvent) => {
      if (event.dataTransfer.dropEffect !== 'none') {
          _removeSourceItem(dragItemIdRef.current);
      }
  };

  const handleKeyDown = (event: any) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'x') {
          _cutCurrentItem();
      }
      else if ((event.ctrlKey || event.metaKey) && event.key === 'c') {
          _copyCurrentItem();
      }
      else if ((event.ctrlKey || event.metaKey) && event.key === 'v') {
          _paste();
      }
  };

  const _cutCurrentItem = () => {
      _cutCopyKeyboardListview('cut');
  };

  const _copyCurrentItem = () => {
      _cutCopyKeyboardListview('copy');
  };

  const _cutCopyKeyboardListview = (type: any) => {
      const listView = document.getElementById('listview') as ojListView<DataInfo['id'], DataInfo>;
      const currentItem = listView.currentItem;
      const data = listView.getDataForVisibleItem({ key: currentItem });
      const jsonStr = JSON.stringify([data]);
      clipboard.setData('application/ojlistviewitems', jsonStr);
      if (type === 'cut') {
          setCutItem(currentItem);
      }
      _updateAcc(`${data.name} ${type === 'copy' ? 'Copied' : 'Cut'}`);
      latestListviewActionRef.current = type;
  };

  const _paste = () => {
      const data = clipboard.getData('application/nbox');
      if (data) {
          const listView = document.getElementById('listview') as ojListView<DataInfo['id'], DataInfo>;
          const currentItem = listView.currentItem;
          const index = _findIndex(listArr, currentItem);
          _listDrop(data, true, index + 1);
      }
  };

  const _findIndex = (arr: any, key: any) => {
      const keys = arr.map((data: any) => {
          return data.id;
      });
      return keys.indexOf(key);
  };

  const _listDrop = (dropData: string, keyboard: boolean, index: number) => {
      const data = JSON.parse(dropData);
      const arr = listArr;
      const names = [];
      for (let i = 0; i < data.length; i++) {
          names.push(data[i].id);
      }
      const newNames = [];
      data.remove((s: any) => {
          if (names.includes(s.name)) {
              newNames.push(s);
              return latestNboxActionRef.current !== 'copy' ? true : false;
          }
          return false;
      });
      for (let i = 0; i < newNames.length; i++) {
          const n = newNames[i];
          const newData = {
              id: n.name,
              name: n.name,
              title: n.position,
              image: `images/hcm/placeholder-${n.image}.png`
          };
          if (index === -1) {
              // empty list case
              arr.push(newData);
          }
          else {
              arr.splice(index, 0, newData);
          }
      }
      listArr.valueHasMutated();
      let accText;
      if (newNames.length > 1) {
          accText = `Moved multiple nodes from nbox to listView`;
      }
      else {
          accText = `Moved node ${names[0]} from nbox to listview`;
      }
      accText = accText + (keyboard ? ' via keyboard' : ' via drag and drop');
      _updateAcc(accText);
      latestListviewActionRef.current = 'none';
      latestNboxActionRef.current = 'none';
      clipboard.setData('application/nbox', null);
      clipboard.setData('application/ojlistviewitems', null);
      setCurrentItem(newNames[0].name);
  };

  const _removeSourceItem = (itemId: any) => {
      const arr = listArr;
      for (let j = 0; j < arr.length; j++) {
          // remove the selected items from array
          if (arr[j].id === itemId) {
              arr.splice(j, 1)[0];
              break;
          }
      }
      listArr.valueHasMutated();
  };

  return (
      <div id="nbox-container">
            <div class="oj-sm-odd-cols-4">
                    <div class="oj-flex">
                              <div class="oj-flex-item">
                                          <div class="oj-typography-heading-xs oj-sm-margin-2x-horizontal">Listview</div>
                                          <oj-list-view id="listview" aria-label="list drag source" class="demo-list oj-listview-item-padding-off" data={listDataProvider} oncurrentItemChanged={handleCurrentItemCurrentItemChanged} current-item={currentItem} onkeydown={handleKeyDown} {...{ 'dnd.drag.items.data-types': ["application/ojlistviewitems"], 'dnd.drag.items.drag-start': handleDragStart, 'dnd.drag.items.drag-end': handleDragEnd, 'dnd.drop.items.data-types': ["application/nbox"], 'dnd.drop.items.drop': handleDrop }}>
                                                        <template slot="itemTemplate" render={(item: any) => (
                                                                      <>
                                                                          <li class={cutItem === item.key ? 'demo-cut-item' : ''}>
                                                                                              <oj-list-item-layout>
                                                                                                                    <span class="oj-typography-body-md oj-text-color-primary">{item.item.data.name}</span>
                                                                                                                    <oj-avatar slot="leading" size="xs" src={item.item.data.image} />
                                                                                                                    <span slot="secondary" class="oj-typography-body-sm oj-text-color-secondary">{item.item.data.title}</span>
                                                                                                                    <div id={item.item.metadata.key + '_draghandle'} slot="action" role="presentation" class="oj-sm-margin-4x-horizontal oj-listview-drag-handle" />
                                                                                                                </oj-list-item-layout>
                                                                                          </li>
                                                                      </>
                                                                    )} />
                                                    </oj-list-view>
                                      </div>
                              <div class="oj-flex-item">
                                          <div class="oj-typography-heading-xs oj-sm-margin-2x-horizontal">NBox</div>
                                          <oj-n-box animation-on-data-change="auto" data={dataProvider1} rows={rows} columns={columns} cells={cells} rows-title="Potential" columns-title="Performance" onojCutRequest={cutRequest} onojCopyRequest={copyRequest} onojPasteRequest={pasteRequest} {...{ 'dnd.drag.nodes.data-types': ["application/nbox"], 'dnd.drop.cells.data-types': ["application/nbox", "application/ojlistviewitems"], 'dnd.drop.cells.drop': onNBoxDrop, 'data-transfer-options.cut': "enable", 'data-transfer-options.copy': "enable", 'data-transfer-options.paste': "enable" }}>
                                                        <template slot="nodeTemplate" render={($current: any) => (
                                                                      <>
                                                                          <oj-n-box-node label={$current.data.name} secondary-label={$current.data.position} row={$current.data.potential} column={$current.data.performance} short-desc={$current.data.name + ' - ' + $current.data.position} {...{ 'icon.source': $current.data.image ? 'images/hcm/placeholder-' + $current.data.image + '.png' : '', 'icon.initials': $current.data.initials, 'icon.background': $current.data.background }} />
                                                                      </>
                                                                    )} />
                                                    </oj-n-box>
                                      </div>
                          </div>
                </div>
            <div id="accInfo" aria-live="polite" class="oj-helper-hidden-accessible" />
        </div>
    );
};

export default NBoxDndSample;
