import 'ojs/ojmenu';
import { ojMenu,ojMenuEventMap } from 'ojs/ojmenu';
import 'ojs/ojoption';
import 'ojs/ojtable';
import { ojTable } from 'ojs/ojtable';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useRef,useState } from 'preact/hooks';
import * as deptData from 'text!../../../data/cookbook/dataCollections/table/shared/departmentData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

interface DepartmentData {
    DepartmentId: number;
    DepartmentName: string;
    LocationId: number;
    ManagerId: number;
}

export const TableCustomContextMenuTablecorepack = () => {
  const tableRef = useRef<ojTable<DepartmentData['DepartmentId'], DepartmentData> | null>(null);
  const [selectedMenuItem, setSelectedMenuItem] = useState('None selected yet');
  const [launchedFrom, setLaunchedFrom] = useState('None launched yet');
  const columns = useMemo<ComponentProps<'oj-table'>['columns']>(() => [
      { headerText: 'Department Id', field: 'DepartmentId', id: 'depId' },
      { headerText: 'Department Name', field: 'DepartmentName', id: 'depName' },
      { headerText: 'Location Id', field: 'LocationId', id: 'locId' },
      { headerText: 'Manager Id', field: 'ManagerId', id: 'manId' }
  ], []);
  const ojTableProps: Partial<ComponentProps<'oj-table'>> = {
      accessibility: { rowHeader: 'depName' }
  };

  const deptArray: DepartmentData[] = JSON.parse(deptData as string) as DepartmentData[];
  const dataprovider = useMemo(() => new ArrayDataProvider<DepartmentData['DepartmentId'], DepartmentData>(deptArray, {
      keyAttributes: 'DepartmentId'
  }), [deptArray]);

  const myActionFunction = (event: ojMenuEventMap['ojMenuAction']) => {
      setSelectedMenuItem(event.detail.selectedValue);
  };

  const myBeforeOpenFunction = (event: ojMenu.ojBeforeOpen) => {
      const target = event.detail.originalEvent.target;
      const context = tableRef.current?.getContextByNode(target);
      if (context != null) {
          if (context.subId === 'oj-table-header') {
              setLaunchedFrom('Header: [' + context.index + ']');
          }
          else if (context.subId === 'oj-table-cell') {
              setLaunchedFrom('Cell: [' + context.rowIndex + ', ' + context.columnIndex + ']');
          }
      }
  };

  return (
      <div id="tableWrapper">
            <oj-table ref={tableRef} id="table" aria-label="Departments Table" data={dataprovider} columns={columns} class="demo-table-container" {...ojTableProps}>
                    <oj-menu slot="contextMenu" onojMenuAction={myActionFunction} onojBeforeOpen={myBeforeOpenFunction} aria-label="Employee Edit">
                              <oj-option value="My First Item">My First Item</oj-option>
                              <oj-option value="Sort Ascending" data-oj-command="oj-table-sortAsc" />
                              <oj-option value="Sort Descending" data-oj-command="oj-table-sortDsc" />
                              <oj-option value="My Other Item">My Other Item</oj-option>
                          </oj-menu>
                </oj-table>
            <p class="bold">
                    Last selected menu item:
                    <span id="results1">{selectedMenuItem}</span>
                </p>
            <p class="bold">
                    Launched from:
                    <span id="results">{launchedFrom}</span>
                </p>
        </div>
    );
};

export default TableCustomContextMenuTablecorepack;
