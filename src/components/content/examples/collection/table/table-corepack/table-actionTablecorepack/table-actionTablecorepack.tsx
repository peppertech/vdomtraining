import 'ojs/ojbutton';
import { ojButton } from 'ojs/ojbutton';
import 'ojs/ojoption';
import 'oj-c/table';
import type { CTableElement } from 'oj-c/table';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import * as empData from 'text!../../../data/cookbook/dataCollections/table/shared/employeeData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

interface EmployeeData {
    EmployeeId: number;
    FirstName: string;
    LastName: string;
    Revenue: number;
    Rating: number;
    Status: string;
}

export default function TableActionTablecorepack() {
  const [empArray, setEmpArray] = useState<EmployeeData[]>(() => JSON.parse(empData as string) as EmployeeData[]);
  type ColumnKey = 'id' | 'name' | 'revenue' | 'rating' | 'status' | 'action';
  const columns = useMemo<NonNullable<ComponentProps<'oj-c-table'>['columns']>>(() => ({
      id: { headerText: 'Employee Id', field: 'EmployeeId' },
      name: { headerText: 'Employee Name', template: 'empNameTemplate' },
      revenue: { headerText: 'Sales Revenue', field: 'Revenue' },
      rating: { headerText: 'Rating', field: 'Rating' },
      status: { headerText: 'Status', field: 'Status' },
      action: {
          headerText: 'Action',
          maxWidth: 160,
          sticky: 'enabled',
          horizontalAlignment: 'end',
          padding: { top: 'disabled', bottom: 'disabled' },
          template: 'actionTemplate'
      }
  }), []);

  const dataprovider = useMemo(() => new ArrayDataProvider<EmployeeData['EmployeeId'], EmployeeData>(empArray, {
      keyAttributes: 'EmployeeId',
      implicitSort: [{ attribute: 'EmployeeId', direction: 'ascending' }]
  }), [empArray]);

  const handleApprove = (_event: ojButton.ojAction, context: CTableElement.CellTemplateContext<EmployeeData['EmployeeId'], EmployeeData, ColumnKey>) => {
      setEmpArray((current) => current.map((row) => row.EmployeeId === context.item.data.EmployeeId ? { ...row, Status: 'Approved' } : row));
  };

  return (
      <oj-c-table id="table" aria-label="Employees Table" class="demo-table-container" data={dataprovider} selectionMode={{ row: 'single' }} scrollPolicyOptions={{ fetchSize: 10 }} columns={columns} row={{ accessibleRowHeader: 'name' }}>
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
        </oj-c-table>
    );
}

export { TableActionTablecorepack };
