import "css!./demo.css";
import "oj-c/table";
import type { ComponentProps } from "preact";
import { useMemo } from "preact/hooks";
import * as deptData from "text!./departmentData.json";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");

interface Department {
  DepartmentId: number;
  DepartmentName: string;
  LocationId: number;
  ManagerId: number;
  EmployeeCount: number;
}

type TableColumns = NonNullable<ComponentProps<"oj-c-table">["columns"]>;
type TableSelectionMode = NonNullable<ComponentProps<"oj-c-table">["selectionMode"]>;

const columns: TableColumns = {
  col1: {
    field: "DepartmentId",
    headerText: "Department Id"
  },
  col2: {
    field: "DepartmentName",
    headerText: "Department Name"
  },
  col3: {
    field: "LocationId",
    headerText: "Location Id"
  },
  col4: {
    field: "ManagerId",
    headerText: "Manager Id"
  },
  col5: {
    field: "EmployeeCount",
    headerText: "Employee Count",
    horizontalAlignment: "right"
  }
};

const selectionMode: TableSelectionMode = {
  row: "multiple",
  column: "multiple"
};

export const TableOverviewcorepack = () => {
  const departments = useMemo(() => JSON.parse(deptData) as Department[], []);
  const dataProvider = useMemo(
    () =>
      new MutableArrayDataProvider<Department["DepartmentId"], Department>(departments, {
        keyAttributes: "DepartmentId"
      }),
    [departments]
  );

  return (
    <oj-c-table
      id="table"
      aria-label="Departments"
      data={dataProvider}
      columns={columns}
      row={{ accessibleRowHeader: "col2" }}
      selectionMode={selectionMode}
      class="demo-table-container"
    />
  );
};

export default TableOverviewcorepack;
