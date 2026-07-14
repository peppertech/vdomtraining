import 'ojs/ojtable';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';
import * as deptData from 'text!../../../data/cookbook/dataCollections/table/shared/departmentData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import ListDataProviderView = require('ojs/ojlistdataproviderview');

interface EmployeeData {
    DepartmentId: number;
    DepartmentName: string;
    LocationId: number;
    ManagerId: number;
}

export const TableInitialSortTable = () => {
  const deptArray: Array<EmployeeData> = JSON.parse(deptData);
  const columns = useMemo<ComponentProps<'oj-table'>['columns']>(() => [
      { headerText: 'Department Id', field: 'DepartmentId', id: 'depId' },
      { headerText: 'Department Name', field: 'DepartmentName', id: 'depName' },
      { headerText: 'Location Id', field: 'LocationId', id: 'locId' },
      { headerText: 'Manager Id', field: 'ManagerId', id: 'manId' }
  ], []);
  const ojTableProps: Partial<ComponentProps<'oj-table'>> = {
      accessibility: { rowHeader: 'depName' }
  };
  const dataprovider = useMemo(() => new ArrayDataProvider<number, EmployeeData>(deptArray, { keyAttributes: 'DepartmentId' }), [deptArray]);
  const dataproviderView = useMemo(() => new ListDataProviderView<number, EmployeeData, number, EmployeeData>(dataprovider, {
      sortCriteria: [{ attribute: 'DepartmentId', direction: 'descending' }]
  }), [dataprovider]);

  return (
      <oj-table id="table" aria-label="Departments Table" data={dataproviderView} scrollPolicy="loadMoreOnScroll" scrollPolicyOptions={{ fetchSize: 10 }} columns={columns} class="demo-table-container" {...ojTableProps} />
    );
};

export default TableInitialSortTable;
