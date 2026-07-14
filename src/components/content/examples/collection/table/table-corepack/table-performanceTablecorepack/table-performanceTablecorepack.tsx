import "css!./demo.css";
import "oj-c/button";
import "oj-c/input-number";
import "oj-c/table";
import 'preact';
import type { ComponentProps } from "preact";
import { useMemo,useState } from "preact/hooks";
import * as employeeDataText from "text!../../../data/cookbook/dataCollections/table/shared/employeeData.json";
import ArrayDataProvider = require("ojs/ojarraydataprovider");

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

type NumberChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-input-number">["onvalueChanged"]>
>[0];
type TableColumns = NonNullable<ComponentProps<"oj-c-table">["columns"]>;

const baseEmployeeData = JSON.parse(employeeDataText as string) as Employee[];
const defaultRowCount = 20;
const defaultColumnCount = 10;
const columnOrder = [
  "employeeId",
  "firstName",
  "lastName",
  "revenue",
  "targetComplete",
  "rating",
  "status",
  "salary",
  "bonus",
  "departmentId"
] as const;

const columns: TableColumns = {
  employeeId: {
    headerText: "Employee Id",
    field: "EmployeeId",
    horizontalAlignment: "end"
  },
  firstName: { headerText: "First Name", field: "FirstName" },
  lastName: { headerText: "Last Name", field: "LastName" },
  revenue: {
    headerText: "Revenue",
    field: "Revenue",
    horizontalAlignment: "end"
  },
  targetComplete: {
    headerText: "Target Complete",
    field: "TargetComplete",
    horizontalAlignment: "end"
  },
  rating: {
    headerText: "Rating",
    field: "Rating",
    horizontalAlignment: "end"
  },
  status: { headerText: "Status", field: "Status" },
  salary: {
    headerText: "Salary",
    field: "Salary",
    horizontalAlignment: "end"
  },
  bonus: {
    headerText: "Bonus",
    field: "Bonus",
    horizontalAlignment: "end"
  },
  departmentId: {
    headerText: "Department Id",
    field: "DepartmentId",
    horizontalAlignment: "end"
  }
};

const createRows = (rowCount: number): Employee[] =>
  Array.from({ length: rowCount }, (_value, index) => {
    const source = baseEmployeeData[index % baseEmployeeData.length];
    const copyIndex = Math.floor(index / baseEmployeeData.length);
    return {
      ...source,
      EmployeeId: index + 1,
      LastName: copyIndex === 0 ? source.LastName : `${source.LastName} ${copyIndex + 1}`
    };
  });

export const TablePerformanceTablecorepack = () => {
  const [rowInputValue, setRowInputValue] = useState(defaultRowCount);
  const [columnInputValue, setColumnInputValue] = useState(defaultColumnCount);
  const [rowCount, setRowCount] = useState(defaultRowCount);
  const [columnCount, setColumnCount] = useState(defaultColumnCount);
  const [renderTime, setRenderTime] = useState(0);
  const [renderKey, setRenderKey] = useState(0);

  const rows = useMemo(() => createRows(rowCount), [rowCount]);
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider<Employee["EmployeeId"], Employee>(rows, {
        keyAttributes: "EmployeeId"
      }),
    [rows]
  );
  const visibleColumnOrder = useMemo(
    () => columnOrder.slice(0, columnCount),
    [columnCount]
  );

  const handleRowCountChanged = (event: NumberChangedEvent) => {
    setRowInputValue(event.detail.value ?? defaultRowCount);
  };

  const handleColumnCountChanged = (event: NumberChangedEvent) => {
    setColumnInputValue(event.detail.value ?? defaultColumnCount);
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
      <div
        class="oj-panel oj-bg-neutral-30 oj-sm-margin-4x-bottom demo-table-performance-panel"
        aria-controls="table">
        <oj-c-input-number
          id="row-count-input"
          class="demo-table-performance-input-number"
          labelHint="Rows"
          min={1}
          max={10000}
          step={1}
          value={rowInputValue}
          onvalueChanged={handleRowCountChanged}
        />
        <oj-c-input-number
          id="column-count-input"
          class="demo-table-performance-input-number"
          labelHint="Columns"
          min={1}
          max={columnOrder.length}
          step={1}
          value={columnInputValue}
          onvalueChanged={handleColumnCountChanged}
        />
        <div class="demo-table-performance-actions">
          <oj-c-button
            id="re-render-table-button"
            size="lg"
            label="Re-Render Table"
            onojAction={handleReRender}
          />
          <span class="demo-table-render-time" aria-live="polite">
            Time: {renderTime}ms
          </span>
        </div>
      </div>
      <oj-c-table
        key={renderKey}
        id="table"
        aria-label="Employee Performance Table"
        class="demo-table-performance-table"
        data={dataProvider}
        columns={columns}
        columnOrder={visibleColumnOrder}
        row={{ accessibleRowHeader: "employeeId" }}
        scrollPolicyOptions={{ fetchSize: 25 }}
        layout="fixed"
      />
    </div>
  );
};

export default TablePerformanceTablecorepack;
