import "oj-c/table";
import { ImmutableKeySet,KeySetImpl } from "ojs/ojkeyset";
import 'preact';
import { ComponentProps } from 'preact';
import { useMemo,useState } from "preact/hooks";
import * as deptData from "text!../data/departmentData.json";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");

type Department = {
  DepartmentId: number;
  DepartmentName: string;
  LocationId: number;
  ManagerId: number;
  EmployeeCount: number;
};

type DepartmentKey = Department["DepartmentId"];
type TableProps = ComponentProps<"oj-c-table">;
type ColumnKey = "departmentId" | "departmentName" | "locationId" | "managerId" | "employeeCount";
type SortState = {
  columnKey: ColumnKey;
  direction: "ascending" | "descending";
} | null;
type HeaderTemplateContext = {
  key: ColumnKey;
  headerText?: string;
  isTabbable: boolean;
};

const departmentData = JSON.parse(deptData as string) as Department[];
const cloneDepartmentData = () => departmentData.map((entry) => ({ ...entry }));

const columns: Record<ColumnKey, NonNullable<TableProps["columns"]>[string]> = {
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

const columnOrder: ColumnKey[] = [
  "departmentId",
  "departmentName",
  "locationId",
  "managerId",
  "employeeCount",
];

const fieldByColumnKey: Record<ColumnKey, keyof Department> = {
  departmentId: "DepartmentId",
  departmentName: "DepartmentName",
  locationId: "LocationId",
  managerId: "ManagerId",
  employeeCount: "EmployeeCount",
};

const sortRows = (rows: Department[], sortState: SortState) => {
  if (sortState == null) {
    return rows;
  }

  const field = fieldByColumnKey[sortState.columnKey];

  return [...rows].sort((left, right) => {
    const leftValue = left[field];
    const rightValue = right[field];

    if (typeof leftValue === "number" && typeof rightValue === "number") {
      return sortState.direction === "ascending"
        ? leftValue - rightValue
        : rightValue - leftValue;
    }

    const comparison = String(leftValue).localeCompare(String(rightValue));
    return sortState.direction === "ascending" ? comparison : -comparison;
  });
};

const CorePackTable = () => {
  const [selectedRows, setSelectedRows] = useState<ImmutableKeySet<DepartmentKey>>(
    () => new KeySetImpl<DepartmentKey>([]),
  );
  const [sortState, setSortState] = useState<SortState>(null);

  const sortedRows = useMemo(
    () => sortRows(cloneDepartmentData(), sortState),
    [sortState],
  );

  const dataProvider = useMemo(
    () =>
      new MutableArrayDataProvider<DepartmentKey, Department>(sortedRows, {
        keyAttributes: "DepartmentId",
      }),
    [sortedRows],
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

  const handleSort = (columnKey: ColumnKey) => {
    setSortState((currentSortState) => {
      if (currentSortState?.columnKey === columnKey) {
        return {
          columnKey,
          direction:
            currentSortState.direction === "ascending"
              ? "descending"
              : "ascending",
        };
      }

      return {
        columnKey,
        direction: "ascending",
      };
    });
  };

  const renderHeader: import("ojs/ojvcomponent").TemplateSlot<HeaderTemplateContext> = (context) => {
    const isSortedColumn = sortState?.columnKey === context.key;
    const iconStyle = isSortedColumn
      ? sortState.direction === "ascending"
        ? "transform: rotate(180deg); opacity: 1;"
        : "transform: rotate(0deg); opacity: 1;"
      : "transform: rotate(0deg); opacity: 0.45;";

    return (
      <button
        type="button"
        data-oj-clickthrough="disabled"
        tabIndex={context.isTabbable ? 0 : -1}
        onClick={() => handleSort(context.key)}
        aria-label={`${context.headerText ?? columns[context.key].headerText} ${
          isSortedColumn ? sortState.direction : "unsorted"
        }`}
        style="all: unset; cursor: pointer; display: inline-flex; align-items: center; gap: 0.35rem; font: inherit;"
      >
        {context.headerText ?? columns[context.key].headerText}
        <span
          aria-hidden="true"
          class="oj-ux-ico-chevron-down"
          style={`font-size: 0.875rem; transition: transform 160ms ease, opacity 160ms ease; ${iconStyle}`}
        />
      </button>
    );
  };

  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
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
      >
        <template slot="headerTemplate" render={renderHeader} />
      </oj-c-table>
    </div>
  );
};

export default CorePackTable;
