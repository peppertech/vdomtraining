import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useRef, useState } from 'preact/hooks';
import * as jsonDataText from 'text!../data/cookbook/dataVisualizations/nBox/resources/employeesNoInitials.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { DemoDataTransfer } from './DemoDataTransfer';
import 'css!./demo.css';
import 'ojs/ojnbox';

type EmployeeNode = {
  name: string;
  position: string;
  potential: string;
  performance: string;
  image?: string;
  initials?: string;
  background?: string;
};

type ExternalNode = {
  id: string;
  name: string;
  position: string;
  image?: string;
};

type TransferNode = {
  id: string;
  name: string;
  position?: string;
  image?: string;
};

type Cell = {
  row: string;
  column: string;
  shortDesc: string;
};

type NodeTemplateContext = {
  data: EmployeeNode;
};

type NBoxCellContext = {
  row: string;
  column: string;
};

type ClipboardAction = 'cut' | 'copy' | 'none' | null;

const initialEmployees = JSON.parse(jsonDataText as string) as EmployeeNode[];
const initialDragData: ExternalNode[] = [
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
];

export const NBoxDndEvents = () => {
  const [data, setData] = useState<EmployeeNode[]>(initialEmployees);
  const [dragData, setDragData] = useState<ExternalNode[]>(initialDragData);

  const latestNboxActionRef = useRef<ClipboardAction>('none');
  const latestExtActionRef = useRef<ClipboardAction>('none');
  const dropTargetRef = useRef<HTMLDivElement | null>(null);
  const accInfoRef = useRef<HTMLDivElement | null>(null);
  const eventContainerRef = useRef<HTMLDivElement | null>(null);
  const externalItemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const clipboard = useMemo(() => new DemoDataTransfer(), []);
  const rows = useMemo(() => [{ id: '0' }, { id: '1' }, { id: '2' }], []);
  const columns = useMemo(() => [{ id: '0' }, { id: '1' }, { id: '2' }], []);
  const cells = useMemo<Cell[]>(() => [
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
  const dataProvider = useMemo(() => new ArrayDataProvider<EmployeeNode['name'], EmployeeNode>(data, {
      keyAttributes: 'name'
  }), [data]);

  const onNBoxDragStart = (event: DragEvent, context: DatavizNBoxDragContext) => {
      const transferData: TransferNode[] = [];
      const nodes = context.nodes;
      for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          const transferNode = {
              id: node.id,
              position: node.secondaryLabel,
              name: node.label
          };
          transferData.push(transferNode);
      }
      event.dataTransfer?.setData('text/node', JSON.stringify(transferData));
      setStatusText('');
  };

  const onNBoxDrop = (event: DragEvent, context: NBoxCellContext) => {
      const dropData = event.dataTransfer?.getData('text/node') ?? '';
      _drop(context.row, context.column, false, dropData, false);
  };

  const onDragOver = (event: DragEvent) => {
      const dataTypes = event.dataTransfer?.types ?? [];
      for (let i = 0; i < dataTypes.length; i++) {
          if (dataTypes[i] === 'text/node') {
              // Adding background color feedback for user
              const dropTarget = dropTargetRef.current;
              if (dropTarget) {
                  dropTarget.style.backgroundColor = 'rgb(208,234,193)';
              }
              event.preventDefault();
          }
      }
  };

  const cutRequest = (event: DatavizNBoxKeyboardRequestEvent) => {
      _keyboardCutCopy(event, 'cut');
  };

  const copyRequest = (event: DatavizNBoxKeyboardRequestEvent) => {
      _keyboardCutCopy(event, 'copy');
  };

  const pasteRequest = (event: DatavizNBoxKeyboardRequestEvent) => {
      const isCopy = latestNboxActionRef.current === 'copy' || latestExtActionRef.current === 'copy';
      let dataStr;
      dataStr = clipboard.getData('application/nbox');
      if (!dataStr)
          return;
      const target = event.detail.target;
      if (!target) {
          return;
      }
      const row = target.row;
      const column = target.column;
      _drop(row, column, isCopy, dataStr, true);
  };

  const _keyboardCutCopy = (event: DatavizNBoxKeyboardRequestEvent, type: 'cut' | 'copy') => {
      const src = event.detail.source ?? [];
      const jsonStr = JSON.stringify(src);
      clipboard.setData('application/nbox', jsonStr);
      latestNboxActionRef.current = type;
      _updateAcc(`${src[0].id} ${type === 'copy' ? 'Copied' : 'Cut'}`);
  };

  const _drop = (row: string, column: string, isCopy: boolean, dropData: string, keyboard: boolean) => {
      if (!dropData) {
          return;
      }
      const dataObj = JSON.parse(dropData) as TransferNode[];
      const names: string[] = [];
      for (let i = 0; i < dataObj.length; i++) {
          names.push(dataObj[i].id);
      }
      let newNames: Array<EmployeeNode | TransferNode> = [];
      const nodesInNBox = data.filter((s) => names.includes(s.name));
      const externalDrag = nodesInNBox.length === 0;
      if (!externalDrag && !isCopy) {
          newNames = nodesInNBox;
      }
      if (externalDrag) {
          for (let i = 0; i < dataObj.length; i++) {
              newNames.push(dataObj[i]);
              if (isCopy) {
                  externalItemRefs.current[dataObj[i].id]?.setAttribute('class', 'demo-parent-element');
              }
          }
          if (!isCopy) {
              setDragData((items) => items.filter((item) => !names.includes(item.id)));
          }
      }
      if (newNames.length > 0) {
          const movedNodes: EmployeeNode[] = newNames.map((newName) => ({
              ...newName,
              potential: row,
              performance: column
          } as EmployeeNode));
          const remainingNodes = !externalDrag && !isCopy
              ? data.filter((item) => !names.includes(item.name))
              : data;
          setData([...movedNodes, ...remainingNodes]);
          let accText;
          const cell = _findCellDesc(column.toString(), row.toString());
          if (newNames.length > 1) {
              accText = `Moved multiple nodes to ${cell} cell`;
          }
          else {
              accText = `Moved node ${dataObj[0].id} to NBox in ${cell} cell`;
          }
          accText = accText + (keyboard ? ' via keyboard' : ' via drag and drop');
          setStatusText(accText);
      }
      else {
          const accText = 'Cannot paste. No new items.';
          setStatusText(accText);
      }
      latestExtActionRef.current = null;
      latestNboxActionRef.current = null;
  };

  const _findCellDesc = (col: string, row: string) => {
      for (let i = 0; i < cells.length; i++) {
          const cell = cells[i];
          if (cell.row === row && cell.column === col) {
              return cell.shortDesc;
          }
      }
  };

  const onDragLeave = () => {
      const dropTarget = dropTargetRef.current;
      if (dropTarget) {
          dropTarget.style.backgroundColor = '';
      }
  };

  const onDrop = (event: DragEvent) => {
      const dropData = event.dataTransfer?.getData('text/node') ?? '';
      _externalDrop(false, dropData, false);
      const dropTarget = dropTargetRef.current;
      if (dropTarget) {
          dropTarget.style.backgroundColor = '';
      }
  };

  const handleKeyPaste = (event: KeyboardEvent) => {
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
      if (!dropData) {
          return;
      }
      const dataObj = JSON.parse(dropData) as TransferNode[];
      const names: string[] = [];
      for (let i = 0; i < dataObj.length; i++) {
          names.push(dataObj[i].id);
      }
      const newNames = data.filter((s) => names.includes(s.name));
      if (!isCopy) {
          setData((items) => items.filter((item) => !names.includes(item.name)));
      }
      setDragData((items) => [
          ...items,
          ...newNames.map((item) => ({
              name: item.name,
              position: item.position,
              image: item.image,
              id: item.name
          }))
      ]);
      let text;
      if (dataObj.length > 1) {
          text = 'Dropped multiple nodes on uncategorized list element';
      }
      else {
          text = `Dropped node ${dataObj[0].id} on uncategorized list element`;
      }
      text = text + (keyboard ? ' via keyboard' : ' via drag and drop');
      setStatusText(text);
      latestExtActionRef.current = null;
      latestNboxActionRef.current = null;
  };

  const onDragStart = (event: DragEvent) => {
      const eventId = (event.target as HTMLElement).id;
      const data = _getListData(eventId);
      if (!data) {
          return;
      }
      const nodeData = [
          {
              id: eventId,
              position: data.position,
              image: data.image,
              name: data.name
          }
      ];
      event.dataTransfer?.setData('text/node', JSON.stringify(nodeData));
      setStatusText('');
  };

  const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'x') {
          _extKeyboardHelper(event, 'cut');
      }
      else if ((event.ctrlKey || event.metaKey) && event.key === 'c') {
          _extKeyboardHelper(event, 'copy');
      }
  };

  const _extKeyboardHelper = (event: KeyboardEvent, type: 'cut' | 'copy') => {
      const eventId = (event.target as HTMLElement).id;
      const data = _getListData(eventId);
      if (!data) {
          return;
      }
      const jsonStr = JSON.stringify([data]);
      clipboard.setData('application/nbox', jsonStr);
      latestExtActionRef.current = type;
      if (type === 'cut') {
          const target = event.target as HTMLElement | null;
          if (target) {
              target.className += ' demo-cut-item';
          }
      }
      _updateAcc(`${data.name} ${type === 'copy' ? 'Copied' : 'Cut'}`);
  };

  const _updateAcc = (text: string) => {
      const acc = accInfoRef.current;
      if (acc) {
          acc.textContent = text;
      }
  };

  const setStatusText = (text: string) => {
      const eventContainer = eventContainerRef.current;
      if (eventContainer) {
          eventContainer.textContent = text;
      }
      _updateAcc(text);
  };

  const _getListData = (id: string) => {
      for (let i = 0; i < dragData.length; i++) {
          if (dragData[i].id === id) {
              return dragData[i];
          }
      }
  };

  const nboxDndProps = useMemo(
      () =>
          ({
              dnd: {
                  drag: {
                      nodes: {
                          dataTypes: ['text/node'],
                          dragStart: onNBoxDragStart
                      }
                  },
                  drop: {
                      cells: {
                          dataTypes: ['text/node'],
                          drop: onNBoxDrop
                      }
                  }
              },
              dataTransferOptions: {
                  cut: 'enable',
                  copy: 'enable',
                  paste: 'enable'
              }
          }) as unknown as Partial<ComponentProps<'oj-n-box'>>,
      [data]
  );

  const nodeTemplateRenderer = (current: NodeTemplateContext) => {
      const employee = current.data;

      return (
          <oj-n-box-node
              label={employee.name}
              secondaryLabel={employee.position}
              row={employee.potential}
              column={employee.performance}
              shortDesc={`${employee.name} - ${employee.position}`}
              icon={{
                  source: employee.image ? `images/hcm/placeholder-${employee.image}.png` : '',
                  initials: employee.initials,
                  background: employee.background
              }}
          />
      );
  };

  return (
      <div id="nbox-container">
            <div class="oj-sm-padding-1x demo-text">
                    <div class="oj-typography-heading-xs oj-typography-bold oj-sm-margin-2x-vertical">Interactions:</div>
                    <div ref={eventContainerRef} id="nboxEvents" />
                </div>
            <div class="oj-sm-odd-cols-9">
                    <div class="oj-flex">
                              <div class="oj-flex-item oj-sm-padding-2x">
                                          <oj-n-box
                                            animationOnDataChange="auto"
                                            data={dataProvider}
                                            rows={rows}
                                            columns={columns}
                                            cells={cells}
                                            rowsTitle="Potential"
                                            columnsTitle="Performance"
                                            onojCutRequest={cutRequest}
                                            onojCopyRequest={copyRequest}
                                            onojPasteRequest={pasteRequest}
                                            {...nboxDndProps}
                                          >
                                                        <template slot="nodeTemplate" render={nodeTemplateRenderer} />
                                                    </oj-n-box>
                                      </div>
                              <div ref={dropTargetRef} class="oj-flex-item oj-panel oj-sm-margin-4x-top" tabIndex={0} onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop} onKeyDown={handleKeyPaste} role="application" aria-label="Drag and drop/Cut, copy, and paste nodes here from the nbox" id="dropTarget">
                                          <div class="oj-sm-padding-3x-start oj-typography-body-md oj-typography-bold">Drag and drop/Cut, copy, and paste nodes here from the nbox</div>
                                          {
                                                      (dragData ?? []).map(($current, index) => (
                                                        <>
                                                          <div ref={(element) => { externalItemRefs.current[$current.id] = element; }} class="demo-parent-element" onDragStart={onDragStart} onKeyDown={onKeyDown} draggable={true} tabIndex={0} aria-label={$current.name + ' ' + $current.position} role="img" id={$current.id}>
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
            <div ref={accInfoRef} id="accInfo" aria-live="polite" class="oj-helper-hidden-accessible" />
        </div>
    );
};

export default NBoxDndEvents;
