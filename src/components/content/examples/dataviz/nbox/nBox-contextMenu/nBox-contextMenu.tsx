import { h } from 'preact';
import { useMemo, useRef, useState } from 'preact/hooks';
import * as jsonDataText from 'text!../data/cookbook/dataVisualizations/nBox/resources/employees.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { ojNBox } from 'ojs/ojnbox';
import { ojMenu } from 'ojs/ojmenu';
import 'ojs/ojnbox';
import 'ojs/ojmenu';
import 'ojs/ojoption';

type Employee = {
  name: string;
  position: string;
  potential: string;
  performance: string;
  image?: string;
  initials?: string;
  background?: string;
};

type Cell = {
  row: string;
  column: string;
  shortDesc: string;
};

type NodeTemplateContext = {
  data: Employee;
};

type SelectionKey = string | number;
type SelectionChangedEvent = CustomEvent<{ value?: SelectionKey[] }>;

const employees = JSON.parse(jsonDataText as string) as Employee[];

export const NBoxContextMenu = () => {
  const nboxRef = useRef<ojNBox<number, Employee> | null>(null);
  const [selectedMenuItem, setSelectedMenuItem] = useState('(None selected yet)');
  const [selectedItemsValue, setSelectedItemsValue] = useState<SelectionKey[]>([]);

  const cellRef = useRef<Cell | null>(null);
  const nodeRef = useRef<Employee | null>(null);

  const rows = useMemo(() => [
      {
          id: '0'
      },
      {
          id: '1'
      },
      {
          id: '2'
      }
  ], []);
  const columns = useMemo(() => [
      {
          id: '0'
      },
      {
          id: '1'
      },
      {
          id: '2'
      }
  ], []);
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
  const dataProvider = useMemo(() => new ArrayDataProvider<number, Employee>(employees, {
      keyAttributes: '@index'
  }), []);

  const handleSelectedItemsValueSelectionChanged = (event: SelectionChangedEvent) => {
    setSelectedItemsValue(event.detail.value ?? []);
  };

  const beforeOpenFunction = (event: ojMenu.ojBeforeOpen) => {
      nodeRef.current = null;
      cellRef.current = null;
      const target = event.detail.originalEvent.target as HTMLElement;
      if (target.id === 'nbox1') {
          // Handle keyboard interaction.
          const selection = selectedItemsValue;
          if (selection.length > 0) {
              nodeRef.current = employees[Number(selection[0])];
          }
      }
      else {
          // Handle mouse interaction
          const context = nboxRef.current?.getContextByNode(target);
          if (context != null) {
              if (context.subId == 'oj-nbox-node') {
                  nodeRef.current = employees[Number(context['id'])];
              }
              else if (context.subId == 'oj-nbox-cell') {
                  for (const obj of cells) {
                      if (obj.row == context.row && obj.column == context.column) {
                          cellRef.current = obj;
                          break;
                      }
                  }
              }
          }
      }
  };

  const menuItemAction = (event: ojMenu.ojMenuAction) => {
      const text = String(event.detail.selectedValue);
      if (nodeRef.current) {
          setSelectedMenuItem(text + ' from Node ' + nodeRef.current.name);
      }
      else if (cellRef.current) {
          setSelectedMenuItem(text + ' from Cell ' + cellRef.current.shortDesc);
      }
      else {
          setSelectedMenuItem(text + ' from NBox background');
      }
  };

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
            <oj-n-box
              ref={nboxRef}
              id="nbox1"
              animationOnDataChange="auto"
              data={dataProvider}
              rows={rows}
              columns={columns}
              cells={cells}
              rowsTitle="Potential"
              onselectionChanged={handleSelectedItemsValueSelectionChanged}
              selection={selectedItemsValue}
              selectionMode="single"
              columnsTitle="Performance"
            >
                    <template slot="nodeTemplate" render={nodeTemplateRenderer} />
                    <oj-menu slot="contextMenu" aria-label="Edit" onojMenuAction={menuItemAction} onojBeforeOpen={beforeOpenFunction}>
                              <oj-option value="Action 1">Action 1</oj-option>
                              <oj-option value="Action 2">Action 2</oj-option>
                              <oj-option value="Action 3">Action 3</oj-option>
                          </oj-menu>
                </oj-n-box>
            <p>
                    Last selected menu item:
                    <span id="results" class="italic bold">{selectedMenuItem}</span>
                </p>
        </div>
    );
};

export default NBoxContextMenu;
