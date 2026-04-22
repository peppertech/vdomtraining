import { h } from "preact";
import * as employeeDataText from "text!../../data/employeeData.json";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import type { ItemContext } from "ojs/ojcommontypes";
import type { CSelectMultipleElement } from "oj-c/select-multiple";
import type { ojTable } from "ojs/ojtable";
import "oj-c/avatar";
import "oj-c/highlight-text";
import "oj-c/list-item-layout";
import "oj-c/selector";
import "oj-c/table";

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

export type BrowserValueItem = {
  key: BrowserOption["value"];
  data: BrowserOption;
  metadata?: {
    key: BrowserOption["value"];
  };
};

export type BrowserValueItems = Map<BrowserOption["value"], BrowserValueItem>;

export const browserOptions: BrowserOption[] = [
  { value: "IE", label: "Internet Explorer" },
  { value: "FF", label: "Firefox" },
  { value: "CH", label: "Chrome" },
  { value: "OP", label: "Opera" },
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

export const oracleEmployees = JSON.parse(employeeDataText) as OracleEmployee[];

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

export const getBrowserLabels = (value: Set<string> | null | undefined) =>
  value ? Array.from(value).join(", ") : "";

export const getEmployeeNames = (
  value: Set<OracleEmployee["EMPLOYEE_ID"]> | null | undefined,
) =>
  value
    ? oracleEmployees
        .filter((employee) => value.has(employee.EMPLOYEE_ID))
        .map((employee) => `${employee.FIRST_NAME} ${employee.LAST_NAME}`)
        .join(", ")
    : "";

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

export const trimValueItems = (valueItems: BrowserValueItems | null | undefined) =>
  valueItems
    ? Array.from(valueItems.values()).map((item) => ({
        key: item.key,
        data: item.data,
        ...(item.metadata ? { metadata: { key: item.metadata.key } } : {}),
      }))
    : [];

export const renderEmployeeItemTemplate = (
  itemCtx: CSelectMultipleElement.ItemTemplateContext<
    OracleEmployee["EMPLOYEE_ID"],
    OracleEmployee
  >,
) => (
  <oj-c-list-item-layout class="oj-listitemlayout-padding-off">
    <oj-c-selector
      aria-label="selector"
      slot="selector"
      selectedKeys={itemCtx.selectedKeys}
      onselectedKeysChanged={itemCtx.onSelectedKeysChanged as any}
      selectionMode="multiple"
      rowKey={itemCtx.item.metadata.key}
    ></oj-c-selector>
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

export const renderEmployeeCollectionTable = (
  collection: CSelectMultipleElement.CollectionTemplateContext<
    OracleEmployee["EMPLOYEE_ID"],
    OracleEmployee
  >,
) => {
  const handleCurrentCellChanged = (event: any) => {
    const currentCell = event.detail.value as
      | { type?: string; rowKey?: OracleEmployee["EMPLOYEE_ID"] }
      | undefined;
    collection.onCurrentRowChanged({
      rowKey:
        currentCell && currentCell.type === "data"
          ? currentCell.rowKey
          : undefined,
    });
  };

  const handleSelectedChanged = (event: any) => {
    collection.onSelectedChanged({ value: event.detail.value?.row });
  };

  const cellRenderer = (cellCtx: ojTable.CellTemplateContext<any, any>) => (
    <oj-c-highlight-text
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
      selectionMode={{ row: "multiple" }}
      columns={tableColumns as any}
      data={collection.data as any}
      selected={{ row: collection.selected }}
      currentCellOverride={collection.currentRowOverride}
      oncurrentCellChanged={handleCurrentCellChanged}
      onselectedChanged={handleSelectedChanged}
    >
      <template slot="cellTemplate" render={cellRenderer}></template>
    </oj-c-table>
  );
};
