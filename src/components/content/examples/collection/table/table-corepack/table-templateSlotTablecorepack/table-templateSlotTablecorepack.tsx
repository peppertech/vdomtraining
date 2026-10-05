import 'css!./demo.css';
import 'oj-c/table';
import type { CellTemplateContext, HeaderTemplateContext } from 'oj-c/table';
import 'ojs/ojgauge';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as deptDataText from 'text!../../../data/cookbook/dataCollections/table/shared/departmentData.json';

interface DepartmentData {
  DepartmentId: number;
  DepartmentName: string;
  LocationId: number;
  ManagerId: number;
  EmployeeCount: number;
  Rating: number;
}

export default function TableTemplateSlotTablecorepack() {
  const departments = useMemo<DepartmentData[]>(() => JSON.parse(deptDataText as string) as DepartmentData[], []);
  const totalEmployees = useMemo(
    () => departments.reduce((sum, department) => sum + department.EmployeeCount, 0),
    [departments]
  );
  const columns = useMemo<NonNullable<ComponentProps<'oj-c-table'>['columns']>>(() => ({
    depId: { headerText: 'Department Id', field: 'DepartmentId', minWidth: 144 },
    depName: { headerText: 'Department Name', field: 'DepartmentName', minWidth: 160 },
    locId: { headerText: 'Location Id', field: 'LocationId', minWidth: 128 },
    manId: { headerText: 'Manager Id', field: 'ManagerId', minWidth: 128 },
    count: { headerText: 'Employee Count', field: 'EmployeeCount', footerTemplate: 'totalFooterTemplate', minWidth: 160 },
    rating: { headerText: 'Rating', field: 'Rating', template: 'ratingCellTemplate', minWidth: 128 }
  }), []);
  const dataProvider = useMemo(
    () => new ArrayDataProvider<number, DepartmentData>(departments, { keyAttributes: 'DepartmentId' }),
    [departments]
  );

  return (
    <oj-c-table
      id="table"
      aria-label="Departments Table"
      data={dataProvider}
      columns={columns}
      row={{ accessibleRowHeader: 'depName' }}
      class="demo-table-container"
    >
      <template slot="cellTemplate" render={(cell: CellTemplateContext<number, DepartmentData, string>) => (
        <>{cell.data}</>
      )} />
      <template slot="ratingCellTemplate" render={(cell: CellTemplateContext<number, DepartmentData, string>) => (
        <oj-rating-gauge
          value={typeof cell.data === 'number' ? cell.data : 0}
          readonly
          class="demo-table-rating-cell"
          aria-label="rating gauge"
        />
      )} />
      <template slot="headerTemplate" render={(header: HeaderTemplateContext<string>) => (
        <div class="demo-header">{header.headerText}</div>
      )} />
      <template slot="totalFooterTemplate" render={() => (
        <div id="table:emp_total">{totalEmployees}</div>
      )} />
    </oj-c-table>
  );
}

export { TableTemplateSlotTablecorepack };
