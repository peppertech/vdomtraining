import { h, ComponentProps } from "preact";
import { useMemo, useState } from "preact/hooks";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import { KeySetImpl, ImmutableKeySet } from "ojs/ojkeyset";
import type { CellTemplateContext } from "oj-c/table";
import "oj-c/table";

type Department = {
  DepartmentId: number;
  DepartmentName: string;
  LocationId: number;
  ManagerId: number;
  StartDate: string;
  EmployeeCount: number;
  Type: string;
  Currency: string;
  Rating: number;
  TargetComplete: number;
};

type TableProps = ComponentProps<"oj-c-table">;

type DepartmentKey = Department["DepartmentId"];

const departmentData: Department[] = [
  {
    DepartmentId: 10,
    DepartmentName: "Finance 9",
    LocationId: 300,
    ManagerId: 7001,
    StartDate: "2014-06-13",
    EmployeeCount: 335,
    Type: "Sales",
    Currency: "EUR",
    Rating: 3,
    TargetComplete: 90,
  },
  {
    DepartmentId: 60,
    DepartmentName: "Finance 10",
    LocationId: 400,
    ManagerId: 5001,
    StartDate: "2017-01-17",
    EmployeeCount: 304,
    Type: "Sales",
    Currency: "JPY",
    Rating: 3,
    TargetComplete: 80,
  },
  {
    DepartmentId: 70,
    DepartmentName: "Operations 9",
    LocationId: 400,
    ManagerId: 6001,
    StartDate: "2015-05-24",
    EmployeeCount: 334,
    Type: "Sales",
    Currency: "EUR",
    Rating: 2,
    TargetComplete: 60,
  },
  {
    DepartmentId: 80,
    DepartmentName: "Sales and Marketing 18",
    LocationId: 500,
    ManagerId: 4001,
    StartDate: "2017-03-25",
    EmployeeCount: 211,
    Type: "Finance",
    Currency: "JPY",
    Rating: 1,
    TargetComplete: 70,
  },
  {
    DepartmentId: 90,
    DepartmentName: "Inventory 6",
    LocationId: 400,
    ManagerId: 5001,
    StartDate: "2017-12-18",
    EmployeeCount: 429,
    Type: "Finance",
    Currency: "EUR",
    Rating: 1,
    TargetComplete: 70,
  },
  {
    DepartmentId: 100,
    DepartmentName: "Billing 22",
    LocationId: 400,
    ManagerId: 6001,
    StartDate: "2014-06-26",
    EmployeeCount: 219,
    Type: "Sales",
    Currency: "EUR",
    Rating: 3,
    TargetComplete: 80,
  },
  {
    DepartmentId: 110,
    DepartmentName: "Finance 1",
    LocationId: 100,
    ManagerId: 3001,
    StartDate: "2020-02-12",
    EmployeeCount: 412,
    Type: "Finance",
    Currency: "USD",
    Rating: 5,
    TargetComplete: 70,
  },
  {
    DepartmentId: 120,
    DepartmentName: "Sales and Marketing 28",
    LocationId: 300,
    ManagerId: 2001,
    StartDate: "2014-07-11",
    EmployeeCount: 373,
    Type: "HR",
    Currency: "USD",
    Rating: 5,
    TargetComplete: 60,
  },
  {
    DepartmentId: 130,
    DepartmentName: "Operations 22",
    LocationId: 300,
    ManagerId: 1001,
    StartDate: "2015-05-26",
    EmployeeCount: 245,
    Type: "Marketing",
    Currency: "USD",
    Rating: 2,
    TargetComplete: 80,
  },
  {
    DepartmentId: 140,
    DepartmentName: "Human Resources 22",
    LocationId: 200,
    ManagerId: 1001,
    StartDate: "2015-09-08",
    EmployeeCount: 217,
    Type: "Finance",
    Currency: "USD",
    Rating: 5,
    TargetComplete: 70,
  },
  {
    DepartmentId: 150,
    DepartmentName: "Shipping 17",
    LocationId: 300,
    ManagerId: 6001,
    StartDate: "2017-10-04",
    EmployeeCount: 441,
    Type: "HR",
    Currency: "USD",
    Rating: 5,
    TargetComplete: 60,
  },
  {
    DepartmentId: 160,
    DepartmentName: "Administration 8",
    LocationId: 400,
    ManagerId: 2001,
    StartDate: "2014-12-21",
    EmployeeCount: 332,
    Type: "HR",
    Currency: "USD",
    Rating: 2,
    TargetComplete: 60,
  },
  {
    DepartmentId: 170,
    DepartmentName: "Purchasing 14",
    LocationId: 400,
    ManagerId: 4001,
    StartDate: "2019-01-25",
    EmployeeCount: 282,
    Type: "Marketing",
    Currency: "EUR",
    Rating: 2,
    TargetComplete: 70,
  },
  {
    DepartmentId: 180,
    DepartmentName: "Operations 13",
    LocationId: 400,
    ManagerId: 2001,
    StartDate: "2016-01-18",
    EmployeeCount: 336,
    Type: "Finance",
    Currency: "EUR",
    Rating: 4,
    TargetComplete: 90,
  },
  {
    DepartmentId: 190,
    DepartmentName: "Control And Credit 18",
    LocationId: 100,
    ManagerId: 1001,
    StartDate: "2014-03-11",
    EmployeeCount: 391,
    Type: "Sales",
    Currency: "JPY",
    Rating: 4,
    TargetComplete: 50,
  },
  {
    DepartmentId: 200,
    DepartmentName: "Purchasing 10",
    LocationId: 200,
    ManagerId: 7001,
    StartDate: "2014-02-06",
    EmployeeCount: 211,
    Type: "Sales",
    Currency: "JPY",
    Rating: 4,
    TargetComplete: 80,
  },
  {
    DepartmentId: 300,
    DepartmentName: "Finance 23",
    LocationId: 300,
    ManagerId: 1001,
    StartDate: "2020-09-20",
    EmployeeCount: 327,
    Type: "Finance",
    Currency: "EUR",
    Rating: 3,
    TargetComplete: 60,
  },
];

const dataProvider = new MutableArrayDataProvider<DepartmentKey, Department>(departmentData, {
  keyAttributes: "DepartmentId",
});

const departmentById = new Map<number, Department>(
  departmentData.map((dept) => [dept.DepartmentId, dept]),
);

const columns: NonNullable<TableProps["columns"]> = {
  departmentName: {
    headerText: "Department",
    field: "DepartmentName",
    minWidth: 220,
    template: "customCell",
    weight: 2,
  },
  type: {
    headerText: "Type",
    field: "Type",
    minWidth: 120,
  },
  locationId: {
    headerText: "Location",
    field: "LocationId",
    horizontalAlignment: "end",
    minWidth: 100,
  },
  managerId: {
    headerText: "Manager",
    field: "ManagerId",
    horizontalAlignment: "end",
    minWidth: 110,
  },
  employeeCount: {
    headerText: "Employees",
    field: "EmployeeCount",
    horizontalAlignment: "end",
    minWidth: 120,
  },
  currency: {
    headerText: "Currency",
    field: "Currency",
    minWidth: 100,
  },
  startDate: {
    headerText: "Start Date",
    template: "customCell",
    minWidth: 140,
  },
  rating: {
    headerText: "Rating",
    template: "customCell",
    minWidth: 140,
  },
  targetComplete: {
    headerText: "Target Complete %",
    field: "TargetComplete",
    horizontalAlignment: "end",
    minWidth: 160,
  },
} as const;

type ColumnKey = keyof typeof columns;
type TableCellContext = CellTemplateContext<DepartmentKey, Department, ColumnKey>;

const renderCustomCell = (
  cell: TableCellContext,
  dateFormatter: Intl.DateTimeFormat,
) => {
  switch (cell.columnKey) {
    case "departmentName": {
      const department = cell.item.data;
      return (
        <div>
          <div class="oj-typography-body-md oj-typography-bold">
            {department.DepartmentName}
          </div>
          <div class="oj-typography-body-sm">
            #{department.DepartmentId} · {department.Type}
          </div>
        </div>
      );
    }
    case "startDate": {
      const formattedDate = dateFormatter.format(
        new Date(cell.item.data.StartDate),
      );
      return <span>{formattedDate}</span>;
    }
    case "rating": {
      const ratingValue = cell.item.data.Rating;
      return (
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <meter
            min={0}
            max={5}
            value={ratingValue}
            aria-label={`Rating ${ratingValue} out of 5`}
          ></meter>
          <span class="oj-typography-body-sm">{ratingValue}/5</span>
        </div>
      );
    }
    default:
      return <span>{String(cell.data ?? "")}</span>;
  }
};

const CorePackTable = () => {
  const [selectedRows, setSelectedRows] = useState<ImmutableKeySet<DepartmentKey>>(
    () => new KeySetImpl<DepartmentKey>([]),
  );
  const [activeDepartment, setActiveDepartment] = useState<Department | null>(
    null,
  );

  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    [],
  );

  type SelectedChangedEvent = Parameters<
    NonNullable<TableProps["onselectedChanged"]>
  >[0];

  const handleSelectedChanged = (event: SelectedChangedEvent) => {
    const rowSelection = event.detail.value?.row;

    if (rowSelection && !rowSelection.isAddAll()) {
      const keysObj = rowSelection.keys;

      if (!keysObj.all) {
        const iterator = keysObj.keys.values();
        const firstKey = iterator.next().value as DepartmentKey | undefined;

        if (typeof firstKey === "number") {
          setSelectedRows(new KeySetImpl([firstKey]));
          setActiveDepartment(departmentById.get(firstKey) ?? null);
          return;
        }
      }
    }

    setSelectedRows(new KeySetImpl([]));
    setActiveDepartment(null);
  };

  const cellTemplateRenderer = (cell: TableCellContext) =>
    renderCustomCell(cell, dateFormatter);

  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
     <oj-c-table
        aria-label="Department targets"
        data={dataProvider as TableProps["data"]}
        columns={columns}
        selectionMode={{ row: "single" }}
        selected={{ row: selectedRows }}
        horizontal-grid-visible="enabled"
        verticalGridVisible="disabled"
        onselectedChanged={handleSelectedChanged}
        layout="contents"
      >
        <template
          slot="cellTemplate"
          data-oj-as="cell"
          render={cellTemplateRenderer}
        ></template>
      </oj-c-table>
      <div class="oj-sm-margin-4x-top oj-typography-body-sm">
        {activeDepartment ? (
          <span>
            Selected: <strong>{activeDepartment.DepartmentName}</strong> —
            Target completion {activeDepartment.TargetComplete}% with team size {" "}
            {activeDepartment.EmployeeCount}.
          </span>
        ) : (
          <span>Select a row to view department details.</span>
        )}
      </div>
    </div>
  );
};

export default CorePackTable;
