import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'ojs/ojtable';
import 'ojs/ojgauge';
// import 'ojs/ojratinggauge';
import * as deptDataText from 'text!../../../data/cookbook/dataCollections/table/shared/departmentData.json';

interface DepartmentData {
  DepartmentId: number;
  DepartmentName: string;
  LocationId: number;
  ManagerId: number;
  EmployeeCount: number;
  Rating: number;
}

export const TableTemplateSlotTablecorepack = () => {
  const departments = useMemo<DepartmentData[]>(() => JSON.parse(deptDataText as string) as DepartmentData[], []);
  const totalEmployees = useMemo(
    () => departments.reduce((sum, department) => sum + department.EmployeeCount, 0),
    [departments]
  );
  const ojTableProps: Partial<ComponentProps<'oj-table'>> = {
    accessibility: { rowHeader: 'depName' },
    columnsDefault: { sortable: 'disabled' }
  };
  const dataprovider = useMemo(
    () => new ArrayDataProvider<number, DepartmentData>(departments, { keyAttributes: 'DepartmentId' }),
    [departments]
  );
  const columnArray = useMemo(
    () => [
      { headerText: 'Department Id', field: 'DepartmentId', id: 'depId', minWidth: '9rem' },
      { headerText: 'Department Name', field: 'DepartmentName', id: 'depName', minWidth: '10rem' },
      { headerText: 'Location Id', field: 'LocationId', id: 'locId', minWidth: '8rem' },
      { headerText: 'Manager Id', field: 'ManagerId', id: 'manId', minWidth: '8rem' },
      {
        headerText: 'Employee Count',
        field: 'EmployeeCount',
        footerTemplate: 'totalFooterTemplate',
        id: 'count',
        minWidth: '10rem'
      },
      {
        headerText: 'Rating',
        field: 'Rating',
        template: 'ratingCellTemplate',
        id: 'rating',
        minWidth: '8rem'
      }
    ],
    []
  );

  return (
    <oj-table id="table" aria-label="Departments Table" data={dataprovider} columns={columnArray} class="demo-table-container" {...ojTableProps}>
      <template
        slot="cellTemplate"
        render={(cell: { data: unknown }) => (
          <>
            {cell.data}
          </>
        )}
      />
      <template
        slot="ratingCellTemplate"
        render={(cell: { data: number }) => (
          <oj-rating-gauge value={cell.data} readonly class="demo-table-rating-cell" aria-label="rating gauge" />
        )}
      />
      <template
        slot="headerTemplate"
        render={(header: { data: string }) => (
          <div class="demo-header">{header.data}</div>
        )}
      />
      <template
        slot="totalFooterTemplate"
        render={() => (
          <div id="table:emp_total">{totalEmployees}</div>
        )}
      />
    </oj-table>
  );
};

export default TableTemplateSlotTablecorepack;
