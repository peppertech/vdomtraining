import "css!./demo.css";
import 'oj-c/table';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';
import * as departmentDataText from 'text!../../../data/cookbook/dataCollections/table/shared/departmentData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
export default function TableBasicTablecorepack() {
    type Department = {
        DepartmentId: number;
        DepartmentName: string;
        LocationId: number;
        ManagerId: number;
        EmployeeCount: number;
    };
    const departmentData = JSON.parse(departmentDataText as string) as Department[];
    const columns = useMemo<NonNullable<ComponentProps<'oj-c-table'>['columns']>>(() => ({
        departmentId: { headerText: 'Department Id', field: 'DepartmentId' },
        departmentName: { headerText: 'Department Name', field: 'DepartmentName' },
        locationId: { headerText: 'Location Id', field: 'LocationId' },
        managerId: { headerText: 'Manager Id', field: 'ManagerId' },
        employeeCount: { headerText: 'Employee Count', field: 'EmployeeCount' }
    }), []);
    const dataProvider = useMemo(() => new ArrayDataProvider<number, Department>(departmentData, { keyAttributes: 'DepartmentId' }), []);
    return (<div class="demo-layout-template__table-demo">
      <oj-c-table
        id="basicTable"
        aria-label="Departments Table"
        data={dataProvider}
        columns={columns}
        row={{ accessibleRowHeader: 'departmentName' }}
        class="demo-table-container"
      />
    </div>);
}

export { TableBasicTablecorepack };
