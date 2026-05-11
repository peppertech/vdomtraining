/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'ojs/ojtable';
import { ojTable } from 'ojs/ojtable';
import { ojButton } from 'ojs/ojbutton';
import 'ojs/ojbutton';
import 'ojs/ojoption';
import * as empData from 'text!../../../data/cookbook/dataCollections/table/shared/employeeData.json';

interface EmployeeData {
    EmployeeId: number;
    FirstName: string;
    LastName: string;
    Revenue: number;
    Rating: number;
    Status: string;
}

export const TableActionTablecorepack = () => {
  const [empArray, setEmpArray] = useState<any[]>(JSON.parse(empData));
  const columns = useMemo<ComponentProps<'oj-table'>['columns']>(() => [
      { headerText: 'Employee Id', field: 'EmployeeId', id: 'id' },
      { headerText: 'Employee Name', template: 'empNameTemplate', id: 'name' },
      { headerText: 'Sales Revenue', field: 'Revenue', id: 'revenue' },
      { headerText: 'Rating', field: 'Rating', id: 'rating' },
      { headerText: 'Status', field: 'Status', id: 'status' },
      {
          headerText: 'Action',
          maxWidth: '10rem',
          frozenEdge: 'all',
          headerClassName: 'oj-helper-text-align-end',
          className: 'oj-helper-text-align-end oj-sm-padding-0-vertical',
          template: 'actionTemplate',
          id: 'action'
      }
  ], []);
  const ojTableProps: Partial<ComponentProps<'oj-table'>> = {
      accessibility: { rowHeader: 'name' },
      columnsDefault: { sortable: 'disabled' }
  };

  const dataprovider = useMemo(() => new ArrayDataProvider<EmployeeData['EmployeeId'], EmployeeData>(empArray, {
      keyAttributes: 'EmployeeId',
      implicitSort: [{ attribute: 'EmployeeId', direction: 'ascending' }]
  }), [empArray]);

  const handleApprove = (event: ojButton.ojAction, context: ojTable.CellTemplateContext<EmployeeData['EmployeeId'], EmployeeData>) => {
      setEmpArray((current) => current.map((row) => row.EmployeeId === context.item.data.EmployeeId ? { ...row, Status: 'Approved' } : row));
  };

  return (
      <oj-table id="table" aria-label="Departments Table" class="demo-table-container" data={dataprovider} selectionMode={{ row: 'single' }} dnd={{ reorder: { columns: 'enabled' } }} scrollPolicy="loadMoreOnScroll" scrollPolicyOptions={{ fetchSize: 10 }} columns={columns} {...ojTableProps}>
            <template slot="empNameTemplate" render={(cell) => (
                  <>
                      {cell.item.data.FirstName + ' ' + cell.item.data.LastName}
                  </>
                )} />
            <template slot="actionTemplate" render={(cell) => (
                  <>
                      <oj-button chroming="borderless" display="icons" class="oj-button-sm" disabled={cell.item.data.Status === "Approved"} onojAction={(event) => handleApprove(event, cell)} data-oj-clickthrough="disabled">
                                  <span slot="startIcon" class="oj-ux-ico-check" />
                                  Approve
                              </oj-button>
                  </>
                )} />
        </oj-table>
    );
};

export default TableActionTablecorepack;
