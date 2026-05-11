import type { ComponentProps } from "preact";
import { useEffect, useMemo, useState } from "preact/hooks";
import "css!./demo.css";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import * as empData from "text!./employeeStatusData.json";
import type { CTableElement } from "oj-c/table";
import "oj-c/table";
import "oj-c/menu-button";

interface EmployeeStatus {
  EmployeeId: number;
  FirstName: string;
  LastName: string;
  Revenue: number;
  Rating: number;
  Status: string;
  TargetComplete: number;
  Salary: number;
}

type ColumnKey = "col1" | "col2" | "col3" | "col4" | "col5" | "col6" | "col7" | "col8";
type TableColumns = NonNullable<ComponentProps<"oj-c-table">["columns"]>;
type TableSelectionMode = NonNullable<ComponentProps<"oj-c-table">["selectionMode"]>;
type MenuItems = NonNullable<ComponentProps<"oj-c-menu-button">["items"]>;
type MenuActionEvent = Parameters<NonNullable<ComponentProps<"oj-c-menu-button">["onojMenuAction"]>>[0];
type EmployeeNameTemplateContext = CTableElement.CellTemplateContext<
  EmployeeStatus["EmployeeId"],
  EmployeeStatus,
  ColumnKey
>;
type ActionTemplateContext = CTableElement.CellTemplateContext<
  EmployeeStatus["EmployeeId"],
  EmployeeStatus,
  ColumnKey
>;

const columns: TableColumns = {
  col1: {
    field: "EmployeeId",
    headerText: "Employee Id",
    sticky: "enabled"
  },
  col2: {
    field: "FirstName",
    template: "empNameTemplate",
    headerText: "Employee Name"
  },
  col3: {
    field: "Rating",
    headerText: "Rank",
    sticky: "enabled",
    horizontalAlignment: "right"
  },
  col4: {
    field: "Revenue",
    headerText: "Revenue",
    horizontalAlignment: "right"
  },
  col5: {
    field: "Status",
    headerText: "Status"
  },
  col6: {
    field: "TargetComplete",
    headerText: "Target Achieved",
    horizontalAlignment: "right"
  },
  col7: {
    field: "Salary",
    headerText: "Salary",
    horizontalAlignment: "right"
  },
  col8: {
    headerText: "Action",
    template: "actionTemplate",
    padding: {
      top: "disabled",
      bottom: "disabled"
    },
    sticky: "enabled",
    horizontalAlignment: "end"
  }
};

const selectionMode: TableSelectionMode = {
  row: "multiple",
  column: "multiple"
};

const createMenuItems = (rowData: EmployeeStatus): MenuItems => [
  {
    label: "Approve",
    key: "approve",
    startIcon: { class: "oj-ux-ico-check" },
    disabled: rowData.Status === "Approved"
  },
  {
    label: "Delete",
    key: "delete",
    startIcon: { class: "oj-ux-ico-delete-circle" }
  }
];

const renderEmployeeNameTemplate = (context: EmployeeNameTemplateContext) => {
  const { FirstName, LastName } = context.item.data;
  return <span>{`${FirstName} ${LastName}`}</span>;
};

const createMenuActionHandler =
  (
    rowData: EmployeeStatus,
    handleMenuSelection: (rowData: EmployeeStatus, actionKey: string) => void
  ) =>
  (event: MenuActionEvent) => {
    handleMenuSelection(rowData, String(event.detail.key));
  };

const createRenderActionTemplate =
  (handleMenuSelection: (rowData: EmployeeStatus, actionKey: string) => void) =>
  (context: ActionTemplateContext) => (
    <oj-c-menu-button
      label="Action"
      id={`menuButton-${context.item.metadata.key}`}
      chroming="borderless"
      display="icons"
      items={createMenuItems(context.item.data)}
      onojMenuAction={createMenuActionHandler(context.item.data, handleMenuSelection)}
    >
      <span slot="endIcon" class="oj-ux-ico-overflow-h" />
    </oj-c-menu-button>
  );

export const TableStickyColumnTablecorepack = () => {
  const initialRows = useMemo(() => JSON.parse(empData) as EmployeeStatus[], []);
  const [rows, setRows] = useState<EmployeeStatus[]>(initialRows);
  const dataProvider = useMemo(
    () =>
      new MutableArrayDataProvider<EmployeeStatus["EmployeeId"], EmployeeStatus>(initialRows, {
        keyAttributes: "EmployeeId"
      }),
    [initialRows]
  );

  useEffect(() => {
    dataProvider.data = rows;
  }, [dataProvider, rows]);

  const handleMenuSelection = (rowData: EmployeeStatus, actionKey: string) => {
    if (actionKey === "delete") {
      setRows((currentRows) => currentRows.filter((row) => row.EmployeeId !== rowData.EmployeeId));
      return;
    }

    if (actionKey === "approve") {
      setRows((currentRows) =>
        currentRows.map((row) =>
          row.EmployeeId === rowData.EmployeeId ? { ...row, Status: "Approved" } : row
        )
      );
    }
  };

  const renderActionTemplate = useMemo(
    () => createRenderActionTemplate(handleMenuSelection),
    []
  );

  return (
    <oj-c-table
      id="table"
      aria-label="Employees"
      data={dataProvider}
      columns={columns}
      row={{ accessibleRowHeader: "col2" }}
      selectionMode={selectionMode}
      class="demo-table-container"
    >
      <template slot="empNameTemplate" render={renderEmployeeNameTemplate} />
      <template slot="actionTemplate" render={renderActionTemplate} />
    </oj-c-table>
  );
};

export default TableStickyColumnTablecorepack;
