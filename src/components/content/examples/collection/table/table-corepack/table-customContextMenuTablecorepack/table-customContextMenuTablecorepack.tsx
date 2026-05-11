/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'ojs/ojtable';
import { ojTable } from 'ojs/ojtable';
import * as deptData from 'text!../../../data/cookbook/dataCollections/table/shared/departmentData.json';
import { ojMenu, ojMenuEventMap } from 'ojs/ojmenu';
import 'ojs/ojmenu';
import 'ojs/ojoption';

interface DepartmentData {
    DepartmentId: number;
    DepartmentName: string;
    LocationId: number;
    ManagerId: number;
}

export const TableCustomContextMenuTablecorepack = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState<any>('None selected yet');
  const [launchedFrom, setLaunchedFrom] = useState<any>('None launched yet');
  const columns = useMemo<ComponentProps<'oj-table'>['columns']>(() => [
      { headerText: 'Department Id', field: 'DepartmentId', id: 'depId' },
      { headerText: 'Department Name', field: 'DepartmentName', id: 'depName' },
      { headerText: 'Location Id', field: 'LocationId', id: 'locId' },
      { headerText: 'Manager Id', field: 'ManagerId', id: 'manId' }
  ], []);
  const ojTableProps: Partial<ComponentProps<'oj-table'>> = {
      accessibility: { rowHeader: 'depName' }
  };

  const deptArray: any = JSON.parse(deptData);
  const dataprovider = useMemo(() => new ArrayDataProvider<DepartmentData['DepartmentId'], DepartmentData>(deptArray, {
      keyAttributes: 'DepartmentId'
  }), [deptArray]);

  const myActionFunction = (event: ojMenuEventMap['ojMenuAction']) => {
      setSelectedMenuItem(event.detail.selectedValue);
  };

  const myBeforeOpenFunction = (event: ojMenu.ojBeforeOpen) => {
      const target = event.detail.originalEvent.target;
      const context = (document.getElementById('table') as ojTable<DepartmentData['DepartmentId'], DepartmentData>).getContextByNode(target);
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
            <oj-table id="table" aria-label="Departments Table" data={dataprovider} columns={columns} class="demo-table-container" {...ojTableProps}>
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
