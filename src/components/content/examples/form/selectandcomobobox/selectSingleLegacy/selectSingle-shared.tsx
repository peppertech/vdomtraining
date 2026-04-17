import { h } from "preact";
import * as employeeDataText from "text!../../data/employeeData.json";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import type { ItemContext } from "ojs/ojcommontypes";
import { ojSelectSingle } from "ojs/ojselectsingle";
import "ojs/ojavatar";
import "ojs/ojhighlighttext";
import "ojs/ojlistitemlayout";
import "ojs/ojlistview";
import "ojs/ojtable";

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
    template: "itemTemplate",
    id: "firstName",
  },
  {
    headerText: "Last Name",
    field: "LAST_NAME",
    template: "itemTemplate",
    id: "lastName",
  },
  {
    headerText: "Department",
    field: "DEPARTMENT_ID",
    template: "itemTemplate",
    id: "department",
  },
  {
    headerText: "Salary",
    field: "SALARY",
    template: "itemTemplate",
    id: "salary",
  },
];

export const renderEmployeeItemTemplate = (
  itemCtx: ojSelectSingle.ItemTemplateContext<
    OracleEmployee["EMPLOYEE_ID"],
    OracleEmployee
  >,
) => (
  <oj-list-item-layout class="oj-listitemlayout-padding-off">
    <span class="oj-typography-body-md oj-text-color-primary">
      <oj-highlight-text
        text={`${itemCtx.data.FIRST_NAME} ${itemCtx.data.LAST_NAME}`}
        matchText={itemCtx.searchText}
      ></oj-highlight-text>
    </span>
    <oj-avatar
      slot="leading"
      role="img"
      size="xs"
      shape="circle"
      src={itemCtx.data.IMAGE}
      title={`Avatar of ${itemCtx.data.FIRST_NAME}`}
    ></oj-avatar>
    <span slot="secondary" class="oj-typography-body-sm oj-text-color-secondary">
      <oj-highlight-text
        text={itemCtx.data.TITLE}
        matchText={itemCtx.searchText}
      ></oj-highlight-text>
    </span>
    <span slot="metadata" class="oj-typography-body-sm oj-text-color-secondary">
      <oj-highlight-text
        text={itemCtx.data.PHONE_NUMBER}
        matchText={itemCtx.searchText}
      ></oj-highlight-text>
    </span>
  </oj-list-item-layout>
);

export const renderEmployeeCollectionListView = (
  collection: ojSelectSingle.CollectionTemplateContext<
    OracleEmployee["EMPLOYEE_ID"],
    OracleEmployee
  >,
  onSelectionChange?: (value: OracleEmployee["EMPLOYEE_ID"] | null) => void,
) => {
  const handleRowAction = (event: any) => {
    collection.handleRowAction(event, event.detail.context);
    onSelectionChange?.(event.detail.context.data.EMPLOYEE_ID ?? null);
  };

  return (
    <oj-list-view
      id="legacySelectSingleListView"
      aria-label="list of employees"
      data={collection.data}
      selectionMode="single"
      selected={collection.selected}
      currentItem={collection.currentRow.rowKey}
      onojItemAction={handleRowAction as any}
      class="oj-select-results oj-group-header-sm"
    >
      <template
        slot="itemTemplate"
        render={(
          itemCtx: ojSelectSingle.ItemTemplateContext<
            OracleEmployee["EMPLOYEE_ID"],
            OracleEmployee
          >,
        ) => renderEmployeeItemTemplate(itemCtx)}
      ></template>
    </oj-list-view>
  );
};

export const renderEmployeeCollectionTable = (
  collection: ojSelectSingle.CollectionTemplateContext<
    OracleEmployee["EMPLOYEE_ID"],
    OracleEmployee
  >,
  onSelectionChange?: (value: OracleEmployee["EMPLOYEE_ID"] | null) => void,
) => {
  const handleRowAction = (event: any) => {
    collection.handleRowAction(event, event.detail.context);
    onSelectionChange?.(event.detail.context.data.EMPLOYEE_ID ?? null);
  };

  const itemRenderer = (
    itemCtx: ojSelectSingle.ItemTemplateContext<
      OracleEmployee["EMPLOYEE_ID"],
      OracleEmployee
    >,
  ) => (
    <oj-highlight-text
      text={String(itemCtx.data)}
      matchText={collection.searchText}
    ></oj-highlight-text>
  );

  return (
    <oj-table
      id="legacySelectSingleTable"
      aria-label="select results"
      horizontalGridVisible="disabled"
      verticalGridVisible="disabled"
      selectionMode={{ row: "single" }}
      columnsDefault={{ resizable: "disabled", sortable: "disabled" }}
      columns={tableColumns}
      class="oj-select-results"
      data={collection.data}
      selected={{ row: collection.selected }}
      currentRow={collection.currentRow}
      onojRowAction={handleRowAction}
    >
      <template slot="itemTemplate" render={itemRenderer}></template>
    </oj-table>
  );
};
