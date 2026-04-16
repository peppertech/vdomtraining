import { h, ComponentProps } from "preact";
import { useState, useCallback } from "preact/hooks";
import * as peopleData from "text!../data/peopleData.json";
import * as employeeData from "text!../data/employeeData.json";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import "ojs/ojselectsingle";
import { ItemContext } from "ojs/ojcommontypes";
import "ojs/ojknockout";
import "ojs/ojselectsingle";
import "ojs/ojhighlighttext";
import "ojs/ojlistitemlayout";
import "ojs/ojavatar";
import { KeySetImpl, KeySet } from "ojs/ojkeyset";
import "oj-c/select-multiple";
import "oj-c/select-single";
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import "oj-c/form-layout";
import "oj-c/list-item-layout";
import "oj-c/avatar";
import "oj-c/selector";
import "oj-c/highlight-text";
  import 'oj-c/table';
import { CSelectMultipleElement } from "oj-c/select-multiple";
import { ojSelectSingle } from "ojs/ojselectsingle";
import { CSelectSingleElement } from "oj-c/select-single";
import { CellTemplateContext } from "@oracle/oraclejet-core-pack/oj-c/types/table/table";
import "ojs/ojtable";
import { ojTable } from "ojs/ojtable";

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

// basic select single data
const employeesData: Array<Person> = [];
JSON.parse(peopleData).map((item: Employee) => {
  employeesData.push({ id: item.id, value: item.name, label: item.name });
});

let selectVal = new Set([
  "Chris Black",
  "Christine Cooper",
  "Chris Benalamore",
]);

let selectedEmployee = new Set([101, 102]);

const employeeDataProvider = new MutableArrayDataProvider<
  Person["value"],
  Person
>(employeesData, {
  keyAttributes: "value",
});

// item text data
const oracleEmployeeDataProvider = new MutableArrayDataProvider(
  JSON.parse(employeeData),
  {
    keyAttributes: "EMPLOYEE_ID",
    textFilterAttributes: ["FIRST_NAME", "LAST_NAME", "PHONE_NUMBER"],
  }
);

type FormLayoutProps = ComponentProps<"oj-form-layout">;
type ListViewProps = ComponentProps<"oj-list-view">;
const gridlinesItemVisible: ListViewProps["gridlines"] = { item: "visible" };
const INIT_SELECTEDITEMS = new KeySetImpl([]) as KeySet<
  OracleEmployee["EMPLOYEE_ID"]
>;

const tableColumns = {
      firstName: { headerText: 'First Name', field: 'FIRST_NAME', template: 'cellTemplate' },
      lastName: { headerText: 'Last Name', field: 'LAST_NAME', template: 'cellTemplate' },
      department: { headerText: 'Department', field: 'DEPARTMENT_ID', template: 'cellTemplate' },
      salary: { headerText: 'Salary', field: 'SALARY', template: 'cellTemplate' }
  };

const SelectMultiple = () => {
  const [selectSingleData, setSelectSingleValue] = useState({
    selectedValue: 103,
  });
  // for select multiple
  const [selectMultipleData, setSelectMultipleValue] = useState({
    selectedValue: selectVal,
  });
  const [selectMultipleItemTextData, setItemTextSelectSingleData] =
    useState<any>({ selectedValue: selectVal });

  const [selectedItemTemplate, setItemTemplateValue] = useState<any>({
    selectedValue: selectedEmployee,
  });

   const [selectedCollTemplateItem, setCollectionTemplateValue] = useState<any>({
    selectedValue: selectedEmployee,
  });

  const [density, setDensity] =
    useState<FormLayoutProps["userAssistanceDensity"]>("efficient");

  // set select
  const onBasicSelectSingleChange = (event: any) => {
    setSelectSingleValue({
      selectedValue: event.detail.value,
    });
  };

  const onItemTextSelectSingleChange = (event: any) => {
    setSelectSingleValue({
      selectedValue: event.detail.value,
    });
  };

  const onBasicSelectMultipleChange = (event: any) => {
    setSelectMultipleValue({
      selectedValue: event.detail.value,
    });
  };

  const onItemTextSelectMultipleChange = (event: any) => {
    //console.log(event.detail.value);
    setItemTextSelectSingleData({
      selectedValue: event.detail.value,
    });
  };

  const onItemSelectMultipleItemTemplateChange = (event: any) => {
    setItemTemplateValue({
      selectedValue: event.detail.value,
    });
  };

   const onItemSelectMultipleCollectionTemplateChange = (event: any) => {
    setCollectionTemplateValue({
      selectedValue: event.detail.value,
    });
  };

  const getItemTextLabel = (
    itemContext: ItemContext<string, Record<string, string | number>>
  ) => {
    return `${itemContext.data.label}`;
  };

  const getItemText = (
    itemCtx: ItemContext<string, Record<string, string | number>>
  ) => {
    return `${itemCtx.data.FIRST_NAME} ${itemCtx.data.LAST_NAME}`;
  };

 
  const collectionTemplateRenderer = (
     colCtx: CSelectMultipleElement.CollectionTemplateContext<
      OracleEmployee["EMPLOYEE_ID"],
      OracleEmployee>
  ) =>{

    const cellRenderer =(cellCtx: ojTable.CellTemplateContext<any, any>) =>{
    return (
       <oj-c-highlight-text 
                text={String(cellCtx.data)}
                matchText={colCtx.searchText}
       ></oj-c-highlight-text> 
     );
    };
    
     return (
      <oj-c-table
                  aria-label='select results'
                  horizontal-grid-visible="disabled"
                  verticalGridVisible="disabled"
                  selectAllControl="hidden"
                  selectionMode ={{row: "multiple"}}
                  columns={tableColumns}
                  data={colCtx.data as any}
                  selected={{ row: colCtx.selected}}
                  currentCellOverride={colCtx.currentRowOverride}
                  oncurrentCellChanged= { (event) => event.detail.value && colCtx.onCurrentRowChanged({ rowKey: event.detail.value.type === 'data' ? event.detail.value.rowKey : undefined })}
                  onselectedChanged={ (event) => colCtx.onSelectedChanged({ value: event.detail.value?.row }) }>
                <template
                  slot="cellTemplate"
                  render={cellRenderer }>
                </template>
      </oj-c-table>
     );
  };

  const itemTemplateRenderer = (
    itemCtx: CSelectMultipleElement.ItemTemplateContext<
      OracleEmployee["EMPLOYEE_ID"],
      OracleEmployee
    >
  ) => {
    return (
      <oj-c-list-item-layout class="oj-listitemlayout-padding-off">
        <oj-c-selector
          aria-label="selector"
          selectedKeys={itemCtx.selectedKeys}
          onselectedKeysChanged={itemCtx.onSelectedKeysChanged as any}
          selectionMode="multiple"
          rowKey={itemCtx.item.metadata.key}
          slot="selector"
        ></oj-c-selector>
        <span className="oj-typography-body-md oj-text-color-primary">
          <oj-c-highlight-text
            text={
              itemCtx.item.data.FIRST_NAME + " " + itemCtx.item.data.LAST_NAME
            }
            matchText={itemCtx.searchText}
          ></oj-c-highlight-text>
        </span>
        <oj-c-avatar
          slot="leading"
          role="img"
          size="xs"
          shape="circle"
          src={itemCtx.item.data.IMAGE}
          title={"Avatar of " + itemCtx.item.data.FIRST_NAME}
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
          {" "}
          Select Multiple - Core Pack (Basic)
        </h6>
        <oj-c-select-multiple
          id="basicSelect"
          data={employeeDataProvider}
          itemText="label"
          value={selectMultipleData.selectedValue}
          onvalueChanged={onBasicSelectMultipleChange}
          labelHint="enabled"
        ></oj-c-select-multiple>

        <span>
          The selected values are:{" "}
          {selectMultipleData.selectedValue
            ? Array.from(selectMultipleData.selectedValue).join(", ")
            : ""}{" "}
        </span>

    <h6 class="oj-typography-heading-sm">
          {" "}
          Select Multiple - Core Pack (Item Text)
        </h6>
        <oj-c-select-multiple
          id="selectItemText"
          labelHint="Select Multiple with item-text"
          labelEdge="inside"
          class="oj-form-control-max-width-md"
          data={employeeDataProvider}
          value={selectMultipleItemTextData.selectedValue}
          onvalueChanged={onItemTextSelectMultipleChange}
          itemText={getItemTextLabel}
        ></oj-c-select-multiple>
        <span>
          The selected values are:{" "}
          {selectMultipleItemTextData.selectedValue
            ? Array.from(selectMultipleItemTextData.selectedValue).join(", ")
            : ""}{" "}
        </span> 

    <h6 class="oj-typography-heading-sm">
          {" "}
          Select Multiple - Core Pack (Item Template)
        </h6>
        <oj-c-select-multiple
          id="selectItemTemplate"
          labelHint="Select Multiple - Item Template"
          labelEdge="inside"
          maxWidth="md"
          data={oracleEmployeeDataProvider}
          value={selectedItemTemplate.selectedValue}
          itemText={getItemText}
          onvalueChanged={onItemSelectMultipleItemTemplateChange}
        >
          <template
            slot="itemTemplate"
            render={itemTemplateRenderer}
          ></template>
        </oj-c-select-multiple>
        <span>
          The selected values are:{" "}
          {selectedItemTemplate.selectedValue
            ? Array.from(selectedItemTemplate.selectedValue).join(", ")
            : ""}{" "}
        </span> 

    <h6 class="oj-typography-heading-sm"> Select Multiple - Core Pack (Collection Template - Tabular View)</h6> 
        <oj-c-select-multiple
          id="selectColTemplate"
          labelHint="Select Multiple - Collection Template"
          labelEdge="inside"
          maxWidth="md"
          data={oracleEmployeeDataProvider}
          value={selectedCollTemplateItem.selectedValue}
          itemText={getItemText}
          onvalueChanged={onItemSelectMultipleCollectionTemplateChange}
        >
          <template
            slot="collectionTemplate"
            render={collectionTemplateRenderer}
          ></template>
        </oj-c-select-multiple>
        <span>
          The selected values are:{" "}
          {selectedCollTemplateItem.selectedValue
            ? Array.from(selectedCollTemplateItem.selectedValue).join(", ")
            : ""}{" "}
        </span> 
      </oj-c-form-layout>
    </div>
  );
};
export default SelectMultiple;
