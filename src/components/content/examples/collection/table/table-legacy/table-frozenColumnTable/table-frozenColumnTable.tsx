import { h } from "preact";
import type { ComponentProps } from "preact";
import { useMemo, useState } from "preact/hooks";
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import type { ojMenuEventMap } from "ojs/ojmenu";
import type { ojTable } from "ojs/ojtable";
import "ojs/ojmenu";
import "ojs/ojbutton";
import "ojs/ojoption";
import "ojs/ojtable";
import "css!./demo.css";
import * as empData from "text!../../../data/cookbook/dataCollections/table/shared/employeeData.json";

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

type TableColumns = NonNullable<ComponentProps<"oj-table">["columns"]>;
type TableSelectionMode = NonNullable<ComponentProps<"oj-table">["selectionMode"]>;
type CellTemplateContext = ojTable.CellTemplateContext<
  EmployeeStatus["EmployeeId"],
  EmployeeStatus
>;

const endAlignedColumnClasses = {
  headerClassName: "oj-helper-text-align-end",
  className: "oj-helper-text-align-end"
};

const columns: TableColumns = [
  {
    id: "id",
    field: "EmployeeId",
    headerText: "Employee Id",
    frozenEdge: "all"
  },
  {
    id: "name",
    field: "FirstName",
    template: "empNameTemplate",
    headerText: "Employee Name",
    minWidth: "12rem"
  },
  {
    id: "rank",
    field: "Rating",
    headerText: "Rank",
    frozenEdge: "all",
    ...endAlignedColumnClasses
  },
  {
    id: "revenue",
    field: "Revenue",
    headerText: "Revenue",
    minWidth: "8rem",
    ...endAlignedColumnClasses
  },
  {
    id: "status",
    field: "Status",
    headerText: "Status",
    minWidth: "8rem"
  },
  {
    id: "target",
    field: "TargetComplete",
    headerText: "Target Achieved",
    minWidth: "8rem",
    ...endAlignedColumnClasses
  },
  {
    id: "salary",
    field: "Salary",
    headerText: "Salary",
    minWidth: "8rem",
    ...endAlignedColumnClasses
  },
  {
    id: "action",
    headerText: "Action",
    template: "actionTemplate",
    frozenEdge: "all",
    minWidth: "5rem",
    ...endAlignedColumnClasses
  }
];

const selectionMode: TableSelectionMode = {
  row: "multiple",
  column: "multiple"
};

export const TableFrozenColumnTable = () => {
  const [rows, setRows] = useState<EmployeeStatus[]>(
    () => JSON.parse(empData as string) as EmployeeStatus[]
  );
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider<EmployeeStatus["EmployeeId"], EmployeeStatus>(rows, {
        keyAttributes: "EmployeeId"
      }),
    [rows]
  );

  const handleMenuAction = (
    event: ojMenuEventMap["ojMenuAction"],
    context: CellTemplateContext
  ) => {
    if (event.detail.selectedValue === "delete") {
      setRows((currentRows) =>
        currentRows.filter((row) => row.EmployeeId !== context.item.data.EmployeeId)
      );
      return;
    }

    if (event.detail.selectedValue === "approve") {
      setRows((currentRows) =>
        currentRows.map((row) =>
          row.EmployeeId === context.item.data.EmployeeId
            ? { ...row, Status: "Approved" }
            : row
        )
      );
    }
  };

  return (
    <oj-table
      id="table"
      aria-label="Employees"
      class="demo-frozen-column-table-container"
      data={dataProvider}
      columns={columns}
      accessibility={{ rowHeader: "name" }}
      columnsDefault={{ resizable: "disabled", sortable: "disabled" }}
      selectionMode={selectionMode}
      scrollPolicy="loadMoreOnScroll"
      scrollPolicyOptions={{ fetchSize: 10 }}
    >
      <template
        slot="empNameTemplate"
        render={(context: CellTemplateContext) => (
          <span>{`${context.item.data.FirstName} ${context.item.data.LastName}`}</span>
        )}
      />
      <template
        slot="actionTemplate"
        render={(context: CellTemplateContext) => (
          <oj-menu-button
            chroming="borderless"
            class="oj-button-sm"
            display="icons"
            data-oj-clickthrough="disabled"
          >
            Action
            <oj-menu
              slot="menu"
              aria-label="Actions"
              onojMenuAction={(event) => handleMenuAction(event, context)}
            >
              <oj-option value="approve" disabled={context.item.data.Status === "Approved"}>
                <span class="oj-ux-ico-check" slot="startIcon" />
                Approve
              </oj-option>
              <oj-option value="delete">
                <span class="oj-ux-ico-delete-circle" slot="startIcon" />
                Delete
              </oj-option>
            </oj-menu>
          </oj-menu-button>
        )}
      />
    </oj-table>
  );
};

export default TableFrozenColumnTable;
