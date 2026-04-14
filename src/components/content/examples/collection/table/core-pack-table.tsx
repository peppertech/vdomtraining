import { h, ComponentProps } from "preact";
import { useMemo, useState } from "preact/hooks";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import { KeySetImpl, ImmutableKeySet } from "ojs/ojkeyset";
import "oj-c/table";
import * as deptData from "text!../data/departmentData.json";

type Department = {
  DepartmentId: number;
  DepartmentName: string;
  LocationId: number;
  ManagerId: number;
  EmployeeCount: number;
};

type DepartmentKey = Department["DepartmentId"];
type TableProps = ComponentProps<"oj-c-table">;

const departmentData = JSON.parse(deptData as string) as Department[];

const columns: NonNullable<TableProps["columns"]> = {
  departmentId: {
    headerText: "Department Id",
    field: "DepartmentId",
  },
  departmentName: {
    headerText: "Department Name",
    field: "DepartmentName",
  },
  locationId: {
    headerText: "Location Id",
    field: "LocationId",
  },
  managerId: {
    headerText: "Manager Id",
    field: "ManagerId",
  },
  employeeCount: {
    headerText: "Employee Count",
    field: "EmployeeCount",
  },
};

const columnOrder = [
  "departmentId",
  "departmentName",
  "locationId",
  "managerId",
  "employeeCount",
] as const;

const CorePackTable = () => {
  const [selectedRows, setSelectedRows] = useState<ImmutableKeySet<DepartmentKey>>(
    () => new KeySetImpl<DepartmentKey>([]),
  );

  const dataProvider = useMemo(
    () =>
      new MutableArrayDataProvider<DepartmentKey, Department>(departmentData, {
        keyAttributes: "DepartmentId",
      }),
    [],
  );

  type SelectedChangedEvent = Parameters<
    NonNullable<TableProps["onselectedChanged"]>
  >[0];

  const handleSelectedChanged = (event: SelectedChangedEvent) => {
    setSelectedRows(
      (event.detail.value?.row as ImmutableKeySet<DepartmentKey>) ??
        new KeySetImpl<DepartmentKey>([]),
    );
  };

  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
      <div class="oj-sm-margin-4x-bottom">
        <h3 class="oj-typography-heading-sm oj-sm-margin-0">Department List</h3>
      </div>
      <oj-c-table
        aria-label="Departments Table"
        data={dataProvider as TableProps["data"]}
        columns={columns}
        columnOrder={[...columnOrder]}
        selectionMode={{ row: "multiple" }}
        selected={{ row: selectedRows }}
        selectAllControl="visible"
        onselectedChanged={handleSelectedChanged}
        class="table-sizing"
      ></oj-c-table>
    </div>
  );
};

export default CorePackTable;
