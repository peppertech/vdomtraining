/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'ojs/ojtable';
import { ojTable } from 'ojs/ojtable';
import 'ojs/ojbutton';
import 'ojs/ojoption';
import * as empData from 'text!../../../data/cookbook/dataCollections/table/shared/employeeData.json';
import { ojMenuEventMap } from 'ojs/ojmenu';
import 'ojs/ojmenu';
import 'ojs/ojbutton';

interface EmployeeData {
    EmployeeId: number;
    FirstName: string;
    LastName: string;
    Revenue: number;
    Rating: number;
    Status: string;
    Salary: number;
    TargetComplete: string;
}

export const TableFrozenColumnTable = () => {
  const [empArray, setEmpArray] = useState<any[]>(JSON.parse(empData));
  const columns = useMemo<ComponentProps<'oj-table'>['columns']>(() => [
      { headerText: 'Emp Id', field: 'EmployeeId', frozenEdge: 'all', id: 'id' },
      { headerText: 'Employee Name', template: 'empNameTemplate', minWidth: '12rem', id: 'name' },
      { headerText: 'Rank', field: 'Rating', frozenEdge: 'all', id: 'rank' },
      { headerText: 'Sales Revenue', field: 'Revenue', minWidth: '8rem', id: 'revenue' },
      { headerText: 'Salary', field: 'Salary', minWidth: '8rem', id: 'salary' },
      { headerText: 'Target Achieved', field: 'TargetComplete', minWidth: '8rem', id: 'target' },
      { headerText: 'Status', field: 'Status', minWidth: '8rem', id: 'status' },
      {
          frozenEdge: 'all',
          minWidth: '5rem',
          headerClassName: 'oj-helper-text-align-end',
          className: 'oj-helper-text-align-end',
          template: 'actionTemplate',
          id: 'action'
      }
  ], []);
  const ojTableProps: Partial<ComponentProps<'oj-table'>> = {
      accessibility: { rowHeader: 'name' },
      columnsDefault: { resizable: 'disabled', sortable: 'disabled' }
  };

  const dataprovider = useMemo(() => new ArrayDataProvider<EmployeeData['EmployeeId'], EmployeeData>(empArray, {
      keyAttributes: 'EmployeeId'
  }), [empArray]);

  const menuListener = (event: ojMenuEventMap['ojMenuAction'], context: ojTable.CellTemplateContext<EmployeeData['EmployeeId'], EmployeeData>) => {
      if (event.detail.selectedValue === 'delete') {
          setEmpArray((current) => current.filter((row) => row.EmployeeId !== context.item.data.EmployeeId));
      }
      else if (event.detail.selectedValue === 'approve') {
          setEmpArray((current) => current.map((row) => row.EmployeeId === context.item.data.EmployeeId ? { ...row, Status: 'Approved' } : row));
      }
  };

  return (
      <oj-table id="table" aria-label="Employee Table" class="demo-table-container" data={dataprovider} selectionMode={{ row: 'multiple' }} scrollPolicy="loadMoreOnScroll" scrollPolicyOptions={{ fetchSize: 10 }} columns={columns} {...ojTableProps}>
            <template slot="empNameTemplate" render={(cell) => (
                  <>
                      {cell.item.data.FirstName + ' ' + cell.item.data.LastName}
                  </>
                )} />
            <template slot="actionTemplate" render={(cell) => (
                  <>
                      <oj-menu-button chroming="borderless" class="oj-button-sm" display="icons" data-oj-clickthrough="disabled">
                                  Action
                                  <oj-menu slot="menu" onojMenuAction={(event) => menuListener(event, cell)} aria-label="menu with actions">
                                                <oj-option value="approve" disabled={cell.item.data.Status === 'Approved'}>
                                                                <span class="oj-ux-ico-check" slot="startIcon" />
                                                                Approve
                                                            </oj-option>
                                                <oj-option value="delete">
                                                                <span class="oj-ux-ico-delete-circle" slot="startIcon" />
                                                                Delete
                                                            </oj-option>
                                            </oj-menu>
                              </oj-menu-button>
                  </>
                )} />
        </oj-table>
    );
};

export default TableFrozenColumnTable;
