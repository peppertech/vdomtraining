// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, h } from 'preact';
import { useMemo, useRef, useState } from 'preact/hooks';
import * as jsonData from 'text!../data/cookbook/dataVisualizations/nBox/resources/employeesNoInitials.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { DemoDataTransfer } from './DemoDataTransfer';
import 'ojs/ojnbox';

export const NBoxDndEvents = () => {
  const [data, setData] = useState<any[]>(JSON.parse(jsonData));
  const [dragData, setDragData] = useState<any[]>([
      {
          name: 'Larry Burns',
          position: 'Senior Manager',
          image: 'male-09',
          id: 'Larry'
      },
      {
          name: 'George Lee',
          position: 'Devops',
          image: 'male-10',
          id: 'George'
      }
  ]);

  const latestNboxActionRef = useRef<any>('none');
  const latestExtActionRef = useRef<any>('none');

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
  const dataProvider = useMemo(() => new ArrayDataProvider(data, {
      keyAttributes: 'name'
  }), [data]);
  const externalDataProvider = useMemo(() => new ArrayDataProvider(dragData, {
      keyAttributes: 'name'
  }), [dragData]);

  const onNBoxDragStart = (event: DragEvent, context: any) => {
      let transferData = [];
      const nodes = context.nodes;
      for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          const data = {
              id: node.id,
              position: node.secondaryLabel,
              name: node.label
          };
          transferData.push(data);
      }
      event.dataTransfer.setData('text/node', JSON.stringify(transferData));
      document.getElementById('nboxEvents').innerHTML = ``;
  };

  const onNBoxDrop = (event: DragEvent, context: {
      row: number;
      column: number;
  }) => {
      const dropData = event.dataTransfer.getData('text/node');
      _drop(context.row, context.column, false, dropData, false);
  };

  const onDragOver = (event: DragEvent) => {
      const dataTypes = event.dataTransfer.types;
      for (let i = 0; i < dataTypes.length; i++) {
          if (dataTypes[i] === 'text/node') {
              // Adding background color feedback for user
              document.getElementById('dropTarget').style.backgroundColor = 'rgb(208,234,193)';
              event.preventDefault();
          }
      }
  };

  const cutRequest = (event: any) => {
      _keyboardCutCopy(event, 'cut');
  };

  const copyRequest = (event: any) => {
      _keyboardCutCopy(event, 'copy');
  };

  const pasteRequest = (event: any) => {
      const isCopy = latestNboxActionRef.current === 'copy' || latestExtActionRef.current === 'copy';
      let dataStr;
      dataStr = clipboard.getData('application/nbox');
      if (!dataStr)
          return;
      const target = event.detail.target;
      const row = target.row;
      const column = target.column;
      _drop(row, column, isCopy, dataStr, true);
  };

  const _keyboardCutCopy = (event: any, type: any) => {
      const src = event.detail.source;
      const jsonStr = JSON.stringify(src);
      clipboard.setData('application/nbox', jsonStr);
      latestNboxActionRef.current = type;
      _updateAcc(`${src[0].id} ${type === 'copy' ? 'Copied' : 'Cut'}`);
  };

  const _drop = (row: number, column: number, isCopy: boolean, dropData: string, keyboard: boolean) => {
      const data = JSON.parse(dropData);
      let dataObj = data;
      const names = [];
      for (let i = 0; i < dataObj.length; i++) {
          names.push(dataObj[i].id);
      }
      const newNames = [];
      let externalDrag = true;
      data.remove((s: any) => {
          if (names.includes(s.name)) {
              externalDrag = false;
              if (isCopy) {
                  return false;
              }
              newNames.push(s);
              return true;
          }
          return false;
      });
      if (externalDrag) {
          for (let i = 0; i < dataObj.length; i++) {
              newNames.push(dataObj[i]);
              if (isCopy) {
                  document.getElementById(dataObj[i].id).className = 'demo-parent-element';
              }
              else {
                  dragData.remove((s: any) => {
                      if (dataObj[i].id === s.id) {
                          return true;
                      }
                      return false;
                  });
              }
          }
      }
      if (newNames.length > 0) {
          for (let i = 0; i < newNames.length; i++) {
              const newName = newNames[i];
              newName.potential = row;
              newName.performance = column;
              data.unshift(newName);
          }
          let accText;
          const cell = _findCellDesc(column.toString(), row.toString());
          if (newNames.length > 1) {
              accText = `Moved multiple nodes to ${cell} cell`;
          }
          else {
              accText = `Moved node ${dataObj[0].id} to NBox in ${cell} cell`;
          }
          accText = accText + (keyboard ? ' via keyboard' : ' via drag and drop');
          _updateAcc(accText);
          document.getElementById('nboxEvents').innerHTML = `${accText}`;
      }
      else {
          let accText = 'Cannot paste. No new items.';
          _updateAcc(accText);
          document.getElementById('nboxEvents').innerHTML = `${accText}`;
      }
      latestExtActionRef.current = null;
      latestNboxActionRef.current = null;
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

  const onDragLeave = () => {
      document.getElementById('dropTarget').style.backgroundColor = '';
  };

  const onDrop = (event: DragEvent) => {
      const dropData = event.dataTransfer.getData('text/node');
      _externalDrop(false, dropData, false);
      document.getElementById('dropTarget').style.backgroundColor = '';
  };

  const handleKeyPaste = (event: any) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'v') {
          if (latestExtActionRef.current === 'copy') {
              latestExtActionRef.current = null;
              return;
          }
          const dataStr = clipboard.getData('application/nbox');
          const isCopy = latestNboxActionRef.current == 'copy';
          _externalDrop(isCopy, dataStr, true);
      }
  };

  const _externalDrop = (isCopy: boolean, dropData: string, keyboard: boolean) => {
      const dataContext = JSON.parse(dropData);
      let dataObj = dataContext;
      const names = [];
      for (let i = 0; i < dataObj.length; i++) {
          names.push(dataObj[i].id);
      }
      const newNames = [];
      data.remove((s: any) => {
          if (names.includes(s.name)) {
              newNames.push(s);
              return isCopy ? false : true;
          }
          return false;
      });
      for (let i = 0; i < newNames.length; i++) {
          const data = newNames[i];
          dragData.push({
              name: data.name,
              position: data.position,
              image: data.image,
              id: data.name
          });
      }
      let text;
      if (dataObj.length > 1) {
          text = 'Dropped multiple nodes on uncategorized list element';
      }
      else {
          text = `Dropped node ${dataObj[0].id} on uncategorized list element`;
      }
      text = text + (keyboard ? ' via keyboard' : ' via drag and drop');
      document.getElementById('nboxEvents').innerHTML = text;
      _updateAcc(text);
      latestExtActionRef.current = null;
      latestNboxActionRef.current = null;
  };

  const onDragStart = (event: DragEvent) => {
      const eventId = (event.target as HTMLElement).id;
      const data = _getListData(eventId);
      const nodeData = [
          {
              id: eventId,
              position: data.position,
              image: data.image,
              name: data.name
          }
      ];
      event.dataTransfer.setData('text/node', JSON.stringify(nodeData));
      document.getElementById('nboxEvents').innerHTML = ``;
  };

  const onKeyDown = (event: any) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'x') {
          _extKeyboardHelper(event, 'cut');
      }
      else if ((event.ctrlKey || event.metaKey) && event.key === 'c') {
          _extKeyboardHelper(event, 'copy');
      }
  };

  const _extKeyboardHelper = (event: any, type: any) => {
      const eventId = (event.target as HTMLElement).id;
      const data = _getListData(eventId);
      const jsonStr = JSON.stringify([data]);
      clipboard.setData('application/nbox', jsonStr);
      latestExtActionRef.current = type;
      if (type === 'cut') {
          event.target.className += ' demo-cut-item';
      }
      _updateAcc(`${data.name} ${type === 'copy' ? 'Copied' : 'Cut'}`);
  };

  const _updateAcc = (text: any) => {
      const acc = document.getElementById('accInfo');
      acc.textContent = text;
  };

  const _getListData = (id: string) => {
      const data = dragData;
      for (let i = 0; i < data.length; i++) {
          if (data[i].id === id) {
              return data[i];
          }
      }
  };

  return (
      <div id="nbox-container">
            <div class="oj-sm-padding-1x demo-text">
                    <div class="oj-typography-heading-xs oj-typography-bold oj-sm-margin-2x-vertical">Interactions:</div>
                    <div id="nboxEvents" />
                </div>
            <div class="oj-sm-odd-cols-9">
                    <div class="oj-flex">
                              <div class="oj-flex-item oj-sm-padding-2x">
                                          <oj-n-box animation-on-data-change="auto" data={dataProvider} rows={rows} columns={columns} cells={cells} rows-title="Potential" columns-title="Performance" onojCutRequest={cutRequest} onojCopyRequest={copyRequest} onojPasteRequest={pasteRequest} {...{ 'dnd.drag.nodes.data-types': ["text/node"], 'dnd.drag.nodes.drag-start': onNBoxDragStart, 'dnd.drop.cells.data-types': ["text/node"], 'dnd.drop.cells.drop': onNBoxDrop, 'data-transfer-options.cut': "enable", 'data-transfer-options.copy': "enable", 'data-transfer-options.paste': "enable" }}>
                                                        <template slot="nodeTemplate" render={($current: any) => (
                                                                      <>
                                                                          <oj-n-box-node label={$current.data.name} secondary-label={$current.data.position} row={$current.data.potential} column={$current.data.performance} short-desc={$current.data.name + ' - ' + $current.data.position} {...{ 'icon.source': $current.data.image ? 'images/hcm/placeholder-' + $current.data.image + '.png' : '', 'icon.initials': $current.data.initials, 'icon.background': $current.data.background }} />
                                                                      </>
                                                                    )} />
                                                    </oj-n-box>
                                      </div>
                              <div class="oj-flex-item oj-panel oj-sm-margin-4x-top" tabindex="0" ondragover={onDragOver} ondragleave={onDragLeave} ondrop={onDrop} onkeydown={handleKeyPaste} role="application" aria-label="Drag and drop/Cut, copy, and paste nodes here from the nbox" id="dropTarget">
                                          <div class="oj-sm-padding-3x-start oj-typography-body-md oj-typography-bold">Drag and drop/Cut, copy, and paste nodes here from the nbox</div>
                                          {
                                                      (dragData ?? []).map(($current: any, index: any) => (
                                                        <>
                                                          <div class="demo-parent-element" ondragstart={onDragStart} onkeydown={onKeyDown} draggable="true" tabindex="0" aria-label={$current.name + ' ' + $current.position} role="img" id={$current.id}>
                                                                            <div>
                                                                                                <span class="oj-typography-body-md oj-text-color-primary">{$current.name}</span>
                                                                                            </div>
                                                                            <div>
                                                                                                <span class="oj-typography-body-sm oj-text-color-secondary">{$current.position}</span>
                                                                                            </div>
                                                                        </div>
                                                        </>
                                                      ))
                                                    }
                                      </div>
                          </div>
                </div>
            <div id="accInfo" aria-live="polite" class="oj-helper-hidden-accessible" />
        </div>
    );
};

export default NBoxDndEvents;
