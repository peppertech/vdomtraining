import 'css!./demo.css';
import 'oj-c/table';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

interface Department {
  DepartmentId: number;
  DepartmentName: string;
  LocationId: number;
  ManagerId: number;
}

export default function TableBackgroundColorcorepack() {
  const departments = useMemo<Department[]>(() => [
    { DepartmentId: 10, DepartmentName: 'Administration', LocationId: 200, ManagerId: 300 },
    { DepartmentId: 20, DepartmentName: 'Marketing', LocationId: 200, ManagerId: 300 },
    { DepartmentId: 30, DepartmentName: 'Purchasing', LocationId: 200, ManagerId: 300 }
  ], []);
  const columns = useMemo<NonNullable<ComponentProps<'oj-c-table'>['columns']>>(() => ({
    depId: { headerText: 'Department Id', field: 'DepartmentId' },
    depName: { headerText: 'Department Name', field: 'DepartmentName' },
    locId: { headerText: 'Location Id', field: 'LocationId' }
  }), []);
  const dataProvider = useMemo(() => new ArrayDataProvider<number, Department>(departments, {
    keyAttributes: 'DepartmentId',
    implicitSort: [{ attribute: 'DepartmentId', direction: 'ascending' }]
  }), [departments]);
  const row = { accessibleRowHeader: 'depName' } as const;

  return (
    <div id="demoContainer">
      <div class="demo-no-current-color oj-sm-padding-4x-horizontal oj-sm-padding-8x-vertical">
        <p>
          In this example the background color was changed in class <code>demo-no-current-color</code>
          without also setting --oj-current-bg-color. The table background does not blend in.
        </p>
        <oj-c-table id="table1" aria-label="Departments Table" data={dataProvider} columns={columns} row={row} />
      </div>
      <div class="demo-with-current-color oj-sm-padding-4x-horizontal oj-sm-padding-8x-vertical">
        <p>
          In this example the background color and --oj-current-bg-color were both set to the same value
          in class <code>demo-with-current-color</code>, so the table background blends in.
        </p>
        <oj-c-table id="table2" aria-label="Departments Table" data={dataProvider} columns={columns} row={row} />
      </div>
      <div class="oj-bg-warning-20 oj-sm-padding-4x-horizontal oj-sm-padding-8x-vertical">
        <p>
          Here <code>oj-bg-warning-20</code>, a built-in background class, also lets the table blend in.
        </p>
        <oj-c-table id="table3" aria-label="Departments Table" data={dataProvider} columns={columns} row={row} />
      </div>
    </div>
  );
}

export { TableBackgroundColorcorepack };
