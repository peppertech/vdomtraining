import 'css!./demo.css';
import 'ojs/ojgauge';
import 'ojs/ojtable';
import type { ojTable } from 'ojs/ojtable';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';
import * as deptDataText from 'text!../../../data/cookbook/dataCollections/table/shared/departmentData.json';
import * as empDataText from 'text!../../../data/cookbook/dataCollections/table/shared/employeeData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

interface EmployeeData {
  EmployeeId: number;
  DepartmentId: number;
  FirstName: string;
  LastName: string;
  TargetComplete: number;
}

interface DepartmentData {
  DepartmentId: number;
  DepartmentName: string;
  TargetComplete: number;
}

type TableColumns = ComponentProps<'oj-table'>['columns'];
type EmployeeCellContext = ojTable.CellTemplateContext<EmployeeData['EmployeeId'], EmployeeData>;
type DepartmentCellContext = ojTable.CellTemplateContext<DepartmentData['DepartmentId'], DepartmentData>;
type GaugeThresholds = ComponentProps<'oj-status-meter-gauge'>['thresholds'];

export const TableColumnRenderer = () => {
  const employees = useMemo<EmployeeData[]>(() => JSON.parse(empDataText as string) as EmployeeData[], []);
  const departments = useMemo<DepartmentData[]>(
    () => JSON.parse(deptDataText as string) as DepartmentData[],
    []
  );

  const empDataprovider = useMemo(
    () => new ArrayDataProvider<EmployeeData['EmployeeId'], EmployeeData>(employees, { keyAttributes: 'EmployeeId' }),
    [employees]
  );
  const deptDataprovider = useMemo(
    () =>
      new ArrayDataProvider<DepartmentData['DepartmentId'], DepartmentData>(departments, {
        keyAttributes: 'DepartmentId'
      }),
    [departments]
  );

  const thresholdValues = useMemo<GaugeThresholds>(() => [{ max: 33 }, { max: 67 }, {}], []);

  const employeeColumnArray = useMemo<TableColumns>(
    () => [
      { headerText: 'Employee Id', field: 'EmployeeId', id: 'empId' },
      {
        headerText: 'Employee Name',
        sortable: 'enabled',
        template: 'employeeNameTemplate',
        sortProperty: 'FirstName',
        id: 'name'
      },
      { headerText: 'Department Id', field: 'DepartmentId', id: 'depId' },
      {
        headerText: 'Sales Target Achievement',
        sortable: 'disabled',
        template: 'employeeTargetTemplate',
        id: 'target'
      }
    ],
    []
  );
  const departmentColumnArray = useMemo<TableColumns>(
    () => [
      { headerText: 'Department Id', field: 'DepartmentId', id: 'depId' },
      { headerText: 'Department Name', field: 'DepartmentName', id: 'depName' },
      {
        headerText: 'Sales Target Achievement',
        sortable: 'disabled',
        template: 'departmentTargetTemplate',
        id: 'target'
      }
    ],
    []
  );

  const employeeNameTemplateRenderer = (cell: EmployeeCellContext) => (
    <span>{`${cell.item.data.FirstName} ${cell.item.data.LastName}`}</span>
  );

  const employeeTargetTemplateRenderer = (cell: EmployeeCellContext) => (
    <div class="oj-flex demo-gauge-row">
      <oj-status-meter-gauge
        class="demo-table-gauge"
        min={0}
        max={100}
        value={cell.item.data.TargetComplete}
        thresholds={thresholdValues}
        readonly={true}
        aria-label="Status meter gauge showing completed target"
      />
      <div>{cell.item.data.TargetComplete}</div>
    </div>
  );

  const departmentTargetTemplateRenderer = (cell: DepartmentCellContext) => (
    <div class="oj-flex demo-gauge-row">
      <oj-status-meter-gauge
        class="demo-table-gauge"
        min={0}
        max={100}
        value={cell.item.data.TargetComplete}
        thresholds={thresholdValues}
        readonly={true}
        aria-label="Status meter gauge showing completed target"
      />
      <div>{cell.item.data.TargetComplete}</div>
    </div>
  );

  const employeeTableProps: Partial<ComponentProps<'oj-table'>> = {
    accessibility: { rowHeader: 'name' }
  };
  const departmentTableProps: Partial<ComponentProps<'oj-table'>> = {
    accessibility: { rowHeader: 'depName' }
  };

  return (
    <div id="demoContainer">
      <h3>Employee Target Achievement</h3>
      <oj-table
        id="table"
        aria-label="Sales Representative Table"
        data={empDataprovider}
        columns={employeeColumnArray}
        class="demo-table-container"
        {...employeeTableProps}
      >
        <template slot="employeeNameTemplate" render={employeeNameTemplateRenderer} />
        <template slot="employeeTargetTemplate" render={employeeTargetTemplateRenderer} />
      </oj-table>
      <br />
      <br />
      <h3>Department Target Achievement</h3>
      <oj-table
        id="departmentTable"
        aria-label="Department Target Achievement Table"
        data={deptDataprovider}
        columns={departmentColumnArray}
        class="demo-table-container"
        {...departmentTableProps}
      >
        <template slot="departmentTargetTemplate" render={departmentTargetTemplateRenderer} />
      </oj-table>
    </div>
  );
};

export default TableColumnRenderer;
