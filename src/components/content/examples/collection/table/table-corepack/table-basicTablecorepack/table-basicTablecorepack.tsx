import "css!./demo.css";
import 'ojs/ojtable';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';
import * as departmentDataText from 'text!../../../data/cookbook/dataCollections/table/shared/departmentData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
export const TableBasicTablecorepack = () => {
    type Department = {
        DepartmentId: number;
        DepartmentName: string;
        LocationId: number;
        ManagerId: number;
        EmployeeCount: number;
    };
    const departmentData = JSON.parse(departmentDataText as string) as Department[];
    const columns = useMemo<ComponentProps<'oj-table'>['columns']>(() => [
        { headerText: 'Department Id', field: 'DepartmentId', id: 'departmentId' },
        { headerText: 'Department Name', field: 'DepartmentName', id: 'departmentName' },
        { headerText: 'Location Id', field: 'LocationId', id: 'locationId' },
        { headerText: 'Manager Id', field: 'ManagerId', id: 'managerId' },
        { headerText: 'Employee Count', field: 'EmployeeCount', id: 'employeeCount' }
    ], []);
    const dataProvider = useMemo(() => new ArrayDataProvider<number, Department>(departmentData, { keyAttributes: 'DepartmentId' }), []);
    const ojTableProps: Partial<ComponentProps<'oj-table'>> = { accessibility: {
            rowHeader: 'departmentName'
        } };
    return (<div class="demo-layout-template__table-demo">
      <oj-table id="basicTable" aria-label="Departments Table" data={dataProvider} columns={columns} class="demo-table-container" {...ojTableProps}/>
    </div>);
};
export default TableBasicTablecorepack;
