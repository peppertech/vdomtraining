import { h, ComponentProps } from "preact";
import { useMemo } from "preact/hooks";
import "ojs/ojtable";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import * as deptData from "text!../data/departmentData.json";

type Department = {
  DepartmentId: number;
  DepartmentName: string;
  LocationId: number;
  ManagerId: number;
  EmployeeCount: number;
};

type TableProps = ComponentProps<"oj-table">;

const departmentData = JSON.parse(deptData as string) as Department[];

const columnsDefault: TableProps["columnsDefault"] = {
  sortable: "enabled",
};

const selectionMode: TableProps["selectionMode"] = {
  row: "multiple",
  column: "none",
};

const columns: TableProps["columns"] = [
  {
    headerText: "Department Id",
    field: "DepartmentId",
  },
  {
    headerText: "Department Name",
    field: "DepartmentName",
  },
  {
    headerText: "Location Id",
    field: "LocationId",
  },
  {
    headerText: "Manager Id",
    field: "ManagerId",
  },
  {
    headerText: "Employee Count",
    field: "EmployeeCount",
  },
];

const Table = () => {
  const dataProvider = useMemo(
    () =>
      new MutableArrayDataProvider<Department["DepartmentId"], Department>(
        departmentData,
        {
          keyAttributes: "DepartmentId",
        },
      ),
    [],
  );

  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
      <oj-table
        id="table"
        aria-label="Departments Table"
        data={dataProvider}
        columnsDefault={columnsDefault}
        selectionMode={selectionMode}
        selectAllControl="visible"
        columns={columns}
        class="table-sizing"
      ></oj-table>
    </div>
  );
};

export default Table;
