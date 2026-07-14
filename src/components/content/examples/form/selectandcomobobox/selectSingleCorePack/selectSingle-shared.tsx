import "oj-c/avatar";
import "oj-c/highlight-text";
import "oj-c/list-item-layout";
import "oj-c/list-view";
import type { CSelectSingleElement } from "oj-c/select-single";
import "oj-c/table";
import type { ItemContext } from "ojs/ojcommontypes";
import type { ojTable } from "ojs/ojtable";
import 'preact';
import { type ComponentProps } from 'preact';
import * as employeeDataText from "text!../../data/employeeData.json";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");

type CurrentItemEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-list-view">["oncurrentItemChanged"]>
>[0];
type ItemActionEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-list-view">["onojItemAction"]>
>[0];
type CurrentCellEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-table">["oncurrentCellChanged"]>
>[0];
type RowActionEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-table">["onojRowAction"]>
>[0];
export type BrowserOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type OracleEmployee = {
  EMPLOYEE_ID: number;
  FIRST_NAME: string;
  LAST_NAME: string;
  EMAIL: string;
  PHONE_NUMBER: string;
  HIRE_DATE: string;
  SALARY: number;
  DEPARTMENT_ID: number;
  TITLE: string;
  IMAGE: string;
};

export const browserOptions: BrowserOption[] = [
  { value: "IE", label: "Internet Explorer" },
  { value: "FF", label: "Firefox" },
  { value: "CH", label: "Chrome" },
  { value: "OP", label: "Opera" },
  { value: "SA", label: "Safari" },
];

export const browserOptionsWithDisabled: BrowserOption[] = [
  { value: "IE", label: "Internet Explorer" },
  { value: "FF", label: "Firefox" },
  { value: "CH", label: "Chrome" },
  { value: "OP", label: "Opera", disabled: true },
  { value: "SA", label: "Safari" },
];

export const labelEdgeOptions = [
  { value: "inside", label: "inside" },
  { value: "start", label: "start" },
  { value: "top", label: "top" },
];

export const virtualKeyboardOptions = [
  { value: "email", label: "email" },
  { value: "number", label: "number" },
  { value: "search", label: "search" },
  { value: "tel", label: "tel" },
  { value: "text", label: "text" },
  { value: "url", label: "url" },
];

const oracleEmployees = JSON.parse(employeeDataText) as OracleEmployee[];

export const createBrowserDataProvider = (
  items: BrowserOption[] = browserOptions,
) =>
  new MutableArrayDataProvider<string, BrowserOption>(items, {
    keyAttributes: "value",
  });

export const createOracleEmployeeDataProvider = () =>
  new MutableArrayDataProvider<OracleEmployee["EMPLOYEE_ID"], OracleEmployee>(
    oracleEmployees,
    {
      keyAttributes: "EMPLOYEE_ID",
      textFilterAttributes: [
        "FIRST_NAME",
        "LAST_NAME",
        "TITLE",
        "PHONE_NUMBER",
        "DEPARTMENT_ID",
        "SALARY",
        "EMAIL",
      ],
    },
  );

export const getEmployeeItemText = (
  itemContext: ItemContext<string, Record<string, string | number>>,
) => `${itemContext.data.FIRST_NAME} ${itemContext.data.LAST_NAME}`;

export const tableColumns = [
  {
    headerText: "First Name",
    field: "FIRST_NAME",
    template: "cellTemplate",
    id: "firstName",
  },
  {
    headerText: "Last Name",
    field: "LAST_NAME",
    template: "cellTemplate",
    id: "lastName",
  },
  {
    headerText: "Department",
    field: "DEPARTMENT_ID",
    template: "cellTemplate",
    id: "department",
  },
  {
    headerText: "Salary",
    field: "SALARY",
    template: "cellTemplate",
    id: "salary",
  },
];

export const renderEmployeeItemTemplate = (
  itemCtx: CSelectSingleElement.ItemTemplateContext<
    OracleEmployee["EMPLOYEE_ID"],
    OracleEmployee
  >,
) => (
  <oj-c-list-item-layout class="oj-listitemlayout-padding-off">
    <span class="oj-typography-body-md oj-text-color-primary">
      <oj-c-highlight-text
        text={`${itemCtx.item.data.FIRST_NAME} ${itemCtx.item.data.LAST_NAME}`}
        matchText={itemCtx.searchText}
      ></oj-c-highlight-text>
    </span>
    <oj-c-avatar
      slot="leading"
      role="img"
      size="xs"
      shape="circle"
      src={itemCtx.item.data.IMAGE}
      title={`Avatar of ${itemCtx.item.data.FIRST_NAME}`}
    ></oj-c-avatar>
    <span slot="secondary" class="oj-typography-body-sm oj-text-color-secondary">
      <oj-c-highlight-text
        text={itemCtx.item.data.TITLE}
        matchText={itemCtx.searchText}
      ></oj-c-highlight-text>
    </span>
    <span slot="metadata" class="oj-typography-body-sm oj-text-color-secondary">
      <oj-c-highlight-text
        text={itemCtx.item.data.PHONE_NUMBER}
        matchText={itemCtx.searchText}
      ></oj-c-highlight-text>
    </span>
  </oj-c-list-item-layout>
);

export const renderEmployeeCollectionListView = (
  collection: CSelectSingleElement.CollectionTemplateContext<
    OracleEmployee["EMPLOYEE_ID"],
    OracleEmployee
  >,
  onSelectionChange?: (value: OracleEmployee["EMPLOYEE_ID"] | null) => void,
) => {
  const handleCurrentItemChanged = (event: CurrentItemEvent) => {
    const value = event.detail.value as OracleEmployee["EMPLOYEE_ID"] | null;
    if (value != null) {
      collection.onCurrentRowChanged({ rowKey: value });
      onSelectionChange?.(value);
    }
  };

  const handleItemAction = (event: ItemActionEvent) => {
    const item = event.detail.context?.item as Parameters<
      typeof collection.onRowAction
    >[0]["item"];
    collection.onRowAction({ item });
  };

  return (
    <oj-c-list-view
      aria-label="Select results"
      class="oj-select-results oj-group-header-sm"
      data={collection.data}
      selectionMode="single"
      selected={collection.selected}
      currentItemOverride={collection.currentRowOverride}
      oncurrentItemChanged={handleCurrentItemChanged}
      onojItemAction={handleItemAction}
    >
      <template
        slot="itemTemplate"
        render={(
          itemCtx: CSelectSingleElement.ItemTemplateContext<
            OracleEmployee["EMPLOYEE_ID"],
            OracleEmployee
          >,
        ) => renderEmployeeItemTemplate(itemCtx)}
      ></template>
    </oj-c-list-view>
  );
};

export const renderEmployeeCollectionTable = (
  collection: CSelectSingleElement.CollectionTemplateContext<
    OracleEmployee["EMPLOYEE_ID"],
    OracleEmployee
  >,
  onSelectionChange?: (value: OracleEmployee["EMPLOYEE_ID"] | null) => void,
) => {
  const handleCurrentCellChanged = (event: CurrentCellEvent) => {
    const currentCell = event.detail.value as
      | { type?: string; rowKey?: OracleEmployee["EMPLOYEE_ID"] }
      | undefined;
    const rowKey =
      currentCell && currentCell.type === "data"
        ? currentCell.rowKey ?? null
        : null;
    collection.onCurrentRowChanged({ rowKey: rowKey ?? undefined });
    onSelectionChange?.(rowKey);
  };

  const handleRowAction = (event: RowActionEvent) => {
    const item = event.detail.context?.item as Parameters<
      typeof collection.onRowAction
    >[0]["item"];
    collection.onRowAction({ item });
  };

  const cellRenderer = (
    cellCtx: ojTable.CellTemplateContext<
      OracleEmployee["EMPLOYEE_ID"],
      OracleEmployee
    >,
  ) => (
    <oj-c-highlight-text  style={{ maxWidth: "400px" }}
      text={String(cellCtx.data)}
      matchText={collection.searchText}
    ></oj-c-highlight-text>
  );

  return (
    <oj-c-table 
      aria-label="Select results"
      horizontal-grid-visible="disabled"
      verticalGridVisible="disabled"
      selectAllControl="hidden"
      selectionMode={{ row: "single" }}
      columns={tableColumns as unknown as ComponentProps<'oj-c-table'>['columns']}
      data={collection.data as ComponentProps<'oj-c-table'>['data']}
      selected={{ row: collection.selected }}
      currentCellOverride={collection.currentRowOverride}
      oncurrentCellChanged={handleCurrentCellChanged}
      onojRowAction={handleRowAction}
    >
      <template slot="cellTemplate" render={cellRenderer}></template>
    </oj-c-table>
  );
};
