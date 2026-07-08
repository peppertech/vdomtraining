import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as employeeDataText from 'text!../../../data/cookbook/dataCollections/table/shared/employeeData.json';
import 'ojs/ojbutton';
import 'ojs/ojformlayout';
import 'ojs/ojinputnumber';
import 'ojs/ojoption';
import 'ojs/ojtable';
import "css!./demo.css";

type Employee = {
  EmployeeId: number;
  FirstName: string;
  LastName: string;
  Revenue: number;
  TargetComplete: number;
  Rating: number;
  Status: string;
  Salary: number;
  Bonus: number;
  DepartmentId: number;
};

type NumberChangedEvent = Parameters<NonNullable<ComponentProps<'oj-input-number'>['onvalueChanged']>>[0];
type ButtonsetChangedEvent = Parameters<NonNullable<ComponentProps<'oj-buttonset-one'>['onvalueChanged']>>[0];
type ScrollPolicyValue = 'loadMoreOnScroll' | 'loadAll';

const baseEmployeeData = JSON.parse(employeeDataText as string) as Employee[];
const defaultRowCount = 1000;
const defaultColumnCount = 10;
const allColumns: NonNullable<ComponentProps<'oj-table'>['columns']> = [
  {
    headerText: 'Employee Id',
    field: 'EmployeeId',
    id: 'employeeId',
    headerClassName: 'oj-helper-text-align-end',
    className: 'oj-helper-text-align-end'
  },
  { headerText: 'First Name', field: 'FirstName', id: 'firstName' },
  { headerText: 'Last Name', field: 'LastName', id: 'lastName' },
  {
    headerText: 'Revenue',
    field: 'Revenue',
    id: 'revenue',
    headerClassName: 'oj-helper-text-align-end',
    className: 'oj-helper-text-align-end'
  },
  {
    headerText: 'Target Complete',
    field: 'TargetComplete',
    id: 'targetComplete',
    headerClassName: 'oj-helper-text-align-end',
    className: 'oj-helper-text-align-end'
  },
  {
    headerText: 'Rating',
    field: 'Rating',
    id: 'rating',
    headerClassName: 'oj-helper-text-align-end',
    className: 'oj-helper-text-align-end'
  },
  { headerText: 'Status', field: 'Status', id: 'status' },
  {
    headerText: 'Salary',
    field: 'Salary',
    id: 'salary',
    headerClassName: 'oj-helper-text-align-end',
    className: 'oj-helper-text-align-end'
  },
  {
    headerText: 'Bonus',
    field: 'Bonus',
    id: 'bonus',
    headerClassName: 'oj-helper-text-align-end',
    className: 'oj-helper-text-align-end'
  },
  {
    headerText: 'Department Id',
    field: 'DepartmentId',
    id: 'departmentId',
    headerClassName: 'oj-helper-text-align-end',
    className: 'oj-helper-text-align-end'
  }
];

const createRows = (rowCount: number) => {
  return Array.from({ length: rowCount }, (_value, index) => {
    const source = baseEmployeeData[index % baseEmployeeData.length];
    const copyIndex = Math.floor(index / baseEmployeeData.length);
    return {
      ...source,
      EmployeeId: index + 1,
      LastName: copyIndex === 0 ? source.LastName : `${source.LastName} ${copyIndex + 1}`
    };
  });
};

export const TablePerformanceTable = () => {
  const [rowInputValue, setRowInputValue] = useState(defaultRowCount);
  const [columnInputValue, setColumnInputValue] = useState(defaultColumnCount);
  const [rowCount, setRowCount] = useState(defaultRowCount);
  const [columnCount, setColumnCount] = useState(defaultColumnCount);
  const [scrollPolicyValue, setScrollPolicyValue] = useState<ScrollPolicyValue>('loadMoreOnScroll');
  const [renderTime, setRenderTime] = useState(0);
  const [renderKey, setRenderKey] = useState(0);
  const rows = useMemo(() => createRows(rowCount), [rowCount]);
  const dataProvider = useMemo(
    () => new ArrayDataProvider<Employee['EmployeeId'], Employee>(rows, { keyAttributes: 'EmployeeId' }),
    [rows]
  );
  const columns = useMemo<ComponentProps<'oj-table'>['columns']>(
    () => allColumns.slice(0, columnCount),
    [columnCount]
  );
  const tableProps: Partial<ComponentProps<'oj-table'>> = {
    accessibility: { rowHeader: 'employeeId' },
    columnsDefault: { sortable: 'disabled' }
  };
  const scrollPolicyOptions = useMemo<ComponentProps<'oj-table'>['scrollPolicyOptions']>(
    () => ({ fetchSize: 25, maxCount: rowCount }),
    [rowCount]
  );

  const handleRowCountChanged = (event: NumberChangedEvent) => {
    setRowInputValue(event.detail.value ?? defaultRowCount);
  };

  const handleColumnCountChanged = (event: NumberChangedEvent) => {
    setColumnInputValue(event.detail.value ?? defaultColumnCount);
  };

  const handleScrollPolicyChanged = (event: ButtonsetChangedEvent) => {
    setScrollPolicyValue((event.detail.value ?? 'loadMoreOnScroll') as ScrollPolicyValue);
  };

  const handleReRender = () => {
    const start = performance.now();
    setRowCount(rowInputValue);
    setColumnCount(columnInputValue);
    setRenderKey((current) => current + 1);
    requestAnimationFrame(() => {
      setRenderTime(Math.round(performance.now() - start));
    });
  };

  return (
    <div id="container">
      <div class="oj-panel oj-bg-neutral-30 oj-sm-margin-4x-bottom demo-table-performance-panel">
        <oj-form-layout max-columns="1" direction="row" aria-controls="table">
          <div class="demo-table-performance-inputs">
            <oj-input-number
              id="row-count-input"
              class="demo-table-input-number"
              label-hint="Rows"
              min={50}
              max={10000}
              step={500}
              value={rowInputValue}
              onvalueChanged={handleRowCountChanged}
            />
            <oj-input-number
              id="column-count-input"
              class="demo-table-input-number"
              label-hint="Columns"
              min={1}
              max={allColumns.length}
              step={1}
              value={columnInputValue}
              onvalueChanged={handleColumnCountChanged}
            />
          </div>
        </oj-form-layout>
        <div class="demo-table-performance-actions">
          <oj-buttonset-one
            id="scroll-policy-buttonset"
            class="oj-buttonset-width-auto"
            aria-label="Choose only one scroll policy."
            aria-controls="table"
            onvalueChanged={handleScrollPolicyChanged}
            value={scrollPolicyValue}
          >
            <oj-option value="loadMoreOnScroll">High-Water Mark Scrolling</oj-option>
            <oj-option value="loadAll">None</oj-option>
          </oj-buttonset-one>
          <oj-button id="re-render-table-button" onojAction={handleReRender}>
            Re-Render Table
          </oj-button>
          <span class="demo-table-render-time">Time: {renderTime}ms</span>
        </div>
      </div>
      <oj-table
        key={renderKey}
        id="table"
        aria-label="Employee Performance Table"
        class="demo-table-container"
        data={dataProvider}
        columns={columns}
        scrollPolicy={scrollPolicyValue}
        scrollPolicyOptions={scrollPolicyValue === 'loadMoreOnScroll' ? scrollPolicyOptions : undefined}
        layout="fixed"
        {...tableProps}
      />
    </div>
  );
};

export default TablePerformanceTable;
