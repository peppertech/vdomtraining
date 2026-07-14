import "oj-c/avatar";
import "oj-c/form-layout";
import "oj-c/highlight-text";
import "oj-c/list-item-layout";
import "oj-c/list-view";
import type { CListViewElement } from "oj-c/list-view";
import "oj-c/select-single";
import type { CSelectSingleElement } from "oj-c/select-single";
import "oj-c/table";
import type { CTableElement } from "oj-c/table";
import type { ItemContext } from "ojs/ojcommontypes";
import 'preact';
import { type ComponentProps } from 'preact';
import { useState } from "preact/hooks";
import * as employeeData from "text!../data/employeeData.json";
import * as peopleData from "text!../data/peopleData.json";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import ArrayDataProvider = require("ojs/ojarraydataprovider");

//  data types
type Person = {
  id: number;
  value: string;
  label: string;
};

type Employee = {
  id: number;
  name: string;
  title: string;
  image: string;
  department: string;
};

type OracleEmployee = {
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
type SelectedValueState<T> = {
  selectedValue: T;
};

const browsers = [
  { value: "IE", label: "Internet Explorer" },
  { value: "FF", label: "Firefox" },
  { value: "CH", label: "Chrome" },
  { value: "OP", label: "Opera" },
  { value: "SA", label: "Safari" },
];

const browsersDP = new ArrayDataProvider(browsers, {
  keyAttributes: "value",
});

// basic select single data
const employeesData: Person[] = (JSON.parse(peopleData) as Employee[]).map(
  (item) => ({ id: item.id, value: item.name, label: item.name }),
);

const employeeDataProvider = new MutableArrayDataProvider<
  Person["value"],
  Person
>(employeesData, {
  keyAttributes: "value",
});

// item text data
const oracleEmployees = JSON.parse(employeeData) as OracleEmployee[];
const oracleEmployeeDataProvider = new MutableArrayDataProvider<
  OracleEmployee["EMPLOYEE_ID"],
  OracleEmployee
>(
  oracleEmployees,
  {
    keyAttributes: "EMPLOYEE_ID",
    textFilterAttributes: ["FIRST_NAME", "LAST_NAME", "EMAIL"],
  },
);

type FormLayoutProps = ComponentProps<"oj-c-form-layout">;
type TableColumnKey = "first" | "last" | "depId" | "salary";
type TableColumnDefinition = {
  headerText: string;
  field: keyof OracleEmployee;
  template: "cellTemplate";
};
type PersonValueChangedEvent = CSelectSingleElement.valueChanged<
  Person["value"],
  Person
>;
type OracleEmployeeValueChangedEvent = CSelectSingleElement.valueChanged<
  OracleEmployee["EMPLOYEE_ID"],
  OracleEmployee
>;

const tableColumns = {
  first: {
    headerText: "First Name",
    field: "FIRST_NAME",
    template: "cellTemplate",
  },
  last: {
    headerText: "Last Name",
    field: "LAST_NAME",
    template: "cellTemplate",
  },
  depId: {
    headerText: "Department",
    field: "DEPARTMENT_ID",
    template: "cellTemplate",
  },
  salary: {
    headerText: "Salary",
    field: "SALARY",
    template: "cellTemplate",
  },
} satisfies Record<TableColumnKey, TableColumnDefinition>;

const SelectSingleCorePack = () => {
  const [selectSingleData, setSelectSingleValue] = useState({
    selectedValue: "Chris Black",
  });

  const [selectedOracleEmployee, setOracleEmployeeSelectSingle] =
    useState<SelectedValueState<OracleEmployee["EMPLOYEE_ID"] | null>>({
      selectedValue: 102,
    });

  const [selectedListViewItem, setListViewItem] = useState<
    SelectedValueState<OracleEmployee["EMPLOYEE_ID"] | null>
  >({
    selectedValue: 103,
  });

  const [selectedCollTemplateItem, setCollectionTemplateValue] = useState<
    SelectedValueState<OracleEmployee["EMPLOYEE_ID"] | null>
  >({
    selectedValue: 101,
  });

  const [density] =
    useState<FormLayoutProps["userAssistanceDensity"]>("efficient");

  const onBasicSelectSingleChange = (event: PersonValueChangedEvent) => {
    setSelectSingleValue({
      selectedValue: event.detail.value ?? "",
    });
  };

  const onItemTextSelectionChange = (event: OracleEmployeeValueChangedEvent) => {
    setOracleEmployeeSelectSingle({
      selectedValue: event.detail.value ?? null,
    });
  };

  const onColTemplateValueChange = (event: OracleEmployeeValueChangedEvent) => {
    setCollectionTemplateValue({
      selectedValue: event.detail.value ?? null,
    });
  };

  const getItemText = (
    itemContext: ItemContext<OracleEmployee["EMPLOYEE_ID"], OracleEmployee>,
  ) => {
    return `${itemContext.data.FIRST_NAME} ${itemContext.data.LAST_NAME}`;
  };

  const itemTemplateRenderer = (
    itemCtx: CSelectSingleElement.ItemTemplateContext<
      OracleEmployee["EMPLOYEE_ID"],
      OracleEmployee
    >,
  ) => {
    return (
      <oj-c-list-item-layout class="oj-listitemlayout-padding-off">
        <span className="oj-typography-body-md oj-text-color-primary">
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
        <span
          slot="secondary"
          className="oj-typography-body-sm oj-text-color-secondary"
        >
          <oj-c-highlight-text
            text={itemCtx.item.data.TITLE}
            matchText={itemCtx.searchText}
          ></oj-c-highlight-text>
        </span>
        <span
          slot="metadata"
          className="oj-typography-body-sm oj-text-color-secondary"
        >
          <oj-c-highlight-text
            text={itemCtx.item.data.PHONE_NUMBER}
            matchText={itemCtx.searchText}
          ></oj-c-highlight-text>
        </span>
      </oj-c-list-item-layout>
    );
  };

  const collectionTemplateRendererForListView = (
    collection: CSelectSingleElement.CollectionTemplateContext<
      OracleEmployee["EMPLOYEE_ID"],
      OracleEmployee
    >,
  ) => {
    const itemRenderer = (
      itemCtx: CSelectSingleElement.ItemTemplateContext<
        OracleEmployee["EMPLOYEE_ID"],
        OracleEmployee
      >,
    ) => {
      return (
        <oj-c-list-item-layout class="oj-listitemlayout-padding-off">
          <span className="oj-typography-body-md oj-text-color-primary">
            <oj-c-highlight-text
              text={`${itemCtx.item.data.FIRST_NAME} ${itemCtx.item.data.LAST_NAME}`}
              matchText={collection.searchText}
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
          <span
            slot="secondary"
            className="oj-typography-body-sm oj-text-color-secondary"
          >
            <oj-c-highlight-text
              text={itemCtx.item.data.TITLE}
              matchText={collection.searchText}
            ></oj-c-highlight-text>
          </span>
          <span
            slot="metadata"
            className="oj-typography-body-sm oj-text-color-secondary"
          >
            <oj-c-highlight-text
              text={itemCtx.item.data.PHONE_NUMBER}
              matchText={collection.searchText}
            ></oj-c-highlight-text>
          </span>
        </oj-c-list-item-layout>
      );
    };

    const handleCurrentItemChanged = (
      event: CListViewElement.currentItemChanged<
        OracleEmployee["EMPLOYEE_ID"],
        OracleEmployee
      >,
    ) => {
      collection.onCurrentRowChanged({
        rowKey: event.detail.value,
      });
      setListViewItem({
        selectedValue: event.detail.value,
      });
    };

    const handleItemAction = (
      event: CListViewElement.ojItemAction<
        OracleEmployee["EMPLOYEE_ID"],
        OracleEmployee
      >,
    ) => {
      collection.onRowAction({ item: event.detail.context.item });
    };

    return (
      <oj-c-list-view
        id="listview"
        aria-label="list of employees"
        data={collection.data}
        selectionMode="single"
        selected={collection.selected}
        currentItemOverride={collection.currentRowOverride}
        oncurrentItemChanged={handleCurrentItemChanged}
        onojItemAction={handleItemAction}
        class="oj-select-results oj-group-header-sm"
      >
        <template
          slot="itemTemplate"
          render={itemRenderer}
        ></template>
      </oj-c-list-view>
    );
  };

  const collectionTemplateRendererForTabularView = (
    colCtx: CSelectSingleElement.CollectionTemplateContext<
      OracleEmployee["EMPLOYEE_ID"],
      OracleEmployee
    >,
  ) => {
    const cellRenderer = (
      cellCtx: CTableElement.CellTemplateContext<
        OracleEmployee["EMPLOYEE_ID"],
        OracleEmployee,
        TableColumnKey
      >,
    ) => {
      return (
        <oj-c-highlight-text
          text={String(cellCtx.data)}
          matchText={colCtx.searchText}
        ></oj-c-highlight-text>
      );
    };

    const handleTableCurrentCellChanged = (
      event: CTableElement.currentCellChanged<
        OracleEmployee["EMPLOYEE_ID"],
        OracleEmployee,
        TableColumnKey
      >,
    ) => {
      const currentCell = event.detail.value;
      colCtx.onCurrentRowChanged({
        rowKey:
          currentCell?.type === "data"
            ? currentCell.rowKey
            : undefined,
      });
    };

    const handleTableRowAction = (
      event: CTableElement.ojRowAction<
        OracleEmployee["EMPLOYEE_ID"],
        OracleEmployee
      >,
    ) => {
      colCtx.onRowAction({ item: event.detail.context.item });
    };

    return (
      <oj-c-table
        aria-label="select results"
        horizontal-grid-visible="disabled"
        verticalGridVisible="disabled"
        selectAllControl="hidden"
        selectionMode={{ row: "single" }}
        columns={tableColumns}
        data={colCtx.data ?? undefined}
        selected={{ row: colCtx.selected }}
        currentCellOverride={colCtx.currentRowOverride}
        oncurrentCellChanged={handleTableCurrentCellChanged}
        onojRowAction={handleTableRowAction}
      >
        <template
          slot="cellTemplate"
          render={cellRenderer}
        ></template>
      </oj-c-table>
    );
  };

  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
      <oj-c-form-layout
        userAssistanceDensity={density}
        labelEdge="inside"
        columns={1}
        class="oj-md-margin-4x-horizontal"
        direction="row"
        maxColumns={3}
      >
        <h6 class="oj-typography-heading-sm">
          Select Single - Core Pack (Basic)
        </h6>
        <oj-c-select-single
          data={browsersDP}
          itemText="label"
          labelHint="Select Single enabled with no value"
        ></oj-c-select-single>

        <oj-c-select-single
          id="employeeSelector"
          labelHint="Select Single with ArrayDataProvider"
          labelEdge="inside"
          class="oj-form-control-max-width-md"
          data={employeeDataProvider}
          value={selectSingleData.selectedValue}
          onvalueChanged={onBasicSelectSingleChange}
          itemText="label"
        ></oj-c-select-single>

        <span>The selected values are: {selectSingleData.selectedValue} </span>

        <h6 class="oj-typography-heading-sm">
          Select Single Core pack (Item Text)
        </h6>
        <oj-c-select-single
          id="itemTextSelector"
          labelHint="Select Single - Item text"
          data={oracleEmployeeDataProvider}
          value={selectedOracleEmployee.selectedValue}
          onvalueChanged={onItemTextSelectionChange}
          itemText={getItemText}
        ></oj-c-select-single>
        <span>
          The selected value is: {selectedOracleEmployee.selectedValue}{" "}
        </span>

        <h6 class="oj-typography-heading-sm"> Select Single (Item Template)</h6>

        <oj-c-select-single
          id="itemTemplateSelector"
          labelHint="Select single - Item Template"
          labelEdge="inside"
          data={oracleEmployeeDataProvider}
          value={selectedOracleEmployee.selectedValue}
          onvalueChanged={onItemTextSelectionChange}
          itemText={getItemText}
        >
          <template
            slot="itemTemplate"
            render={itemTemplateRenderer}
          ></template>
        </oj-c-select-single>
        <span>
          The selected value is: {selectedOracleEmployee.selectedValue}{" "}
        </span>

        <h4 class="oj-typography-heading-sm">
          Select Single (Collection Template - List View)
        </h4>
        <oj-c-select-single
          id="collectionTemplateSelector"
          labelHint="Select Single Collection Template for List View"
          labelEdge="inside"
          data={oracleEmployeeDataProvider}
          value={selectedListViewItem.selectedValue}
          itemText={getItemText}
        >
          <template
            slot="collectionTemplate"
            render={collectionTemplateRendererForListView}
          ></template>
        </oj-c-select-single>
        <span>The selected value is: {selectedListViewItem.selectedValue}</span>

        <h6 class="oj-typography-heading-sm">
          Select Single (Collection Template - Tabular View)
        </h6>
        <oj-c-select-single
          id="tableCollectionTemplateSelector"
          labelHint="Select Single Collection Template for Tabular View"
          labelEdge="inside"
          data={oracleEmployeeDataProvider}
          value={selectedCollTemplateItem.selectedValue}
          itemText={getItemText}
          onvalueChanged={onColTemplateValueChange}
        >
          <template
            slot="collectionTemplate"
            render={collectionTemplateRendererForTabularView}
          ></template>
        </oj-c-select-single>
        <span>
          The selected value is: {selectedCollTemplateItem.selectedValue}
        </span>
      </oj-c-form-layout>
    </div>
  );
};

export default SelectSingleCorePack;
