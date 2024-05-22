import { h, ComponentProps } from "preact";
import { useState, useCallback } from "preact/hooks";
import * as peopleData from "text!./data/peopleData.json";
import * as employeeData from "text!./data/employeeData.json";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import "ojs/ojselectsingle";
import { ItemContext } from "ojs/ojcommontypes";
import "ojs/ojknockout";
import "ojs/ojselectsingle";
import "ojs/ojhighlighttext";
import "ojs/ojlistitemlayout";
import "ojs/ojavatar";
import { ojSelectSingle } from "ojs/ojselectsingle";
import { KeySetImpl, KeySet } from "ojs/ojkeyset";
import { ojListView } from "ojs/ojlistview";

import 'oj-c/select-single';
 import 'oj-c/list-item-layout';
import { CSelectSingleElement } from "oj-c/select-single";
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'oj-c/form-layout';
import 'oj-c/avatar';
import 'oj-c/highlight-text';


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

const SelectSingleCorePack = () => {
  const [selectSingleData, setSelectSingleValue] = useState({
    selectedValue: "Chris Black",
  });
  const [selectedOracleEmployee, setOracleEmployeeSelectSingle] = useState<any>(
    { selectedValue: 102 }
  );

  const [selectedListViewItem, setListViewItem] = useState<any>({
    selectedValue: 103,
  });

  const [density, setDensity] = useState<
    FormLayoutProps["userAssistanceDensity"]
  >("efficient");

  const onBasicSelectSingleChange = (event: any) => {
    setSelectSingleValue({
      selectedValue: event.detail.value,
    });
  };

  const onItemTextSelectionChange = (event: any) => {
    setOracleEmployeeSelectSingle({
      selectedValue: event.detail.value,
    });
  };

  const getItemText = (
    itemContext: ItemContext<string, Record<string, string | number>>
  ) => {
    return `${itemContext.data.FIRST_NAME} ${itemContext.data.LAST_NAME}`;
  };

  const itemTemplateRenderer = useCallback(
    (
      item: ojSelectSingle.ItemTemplateContext<
        OracleEmployee["EMPLOYEE_ID"],
        OracleEmployee
      >
    ) => {
      return (
       <oj-c-list-item-layout class="oj-listitemlayout-padding-off">
         <span className="oj-typography-body-md oj-text-color-primary">
            <oj-c-highlight-text
              text={item.data.FIRST_NAME + " " + item.data.LAST_NAME}
              matchText={item.searchText}
            ></oj-c-highlight-text>
          </span>
          <oj-c-avatar
            slot="leading"
            role="img"
            size="xs"
            shape="circle"
            src={item.data.IMAGE}
            title={"Avatar of " + item.data.FIRST_NAME}
          ></oj-c-avatar>
          <span
            slot="secondary"
            className="oj-typography-body-sm oj-text-color-secondary"
          >
            <oj-c-highlight-text
              text={item.data.TITLE}
              matchText={item.searchText}
            ></oj-c-highlight-text>
          </span>
          <span
            slot="metadata"
            className="oj-typography-body-sm oj-text-color-secondary"
          >
            <oj-c-highlight-text
              text={item.data.PHONE_NUMBER}
              matchText={item.searchText}
            ></oj-c-highlight-text>
          </span>
        </oj-c-list-item-layout> 
      );
    },
    []
  );

  const collectionTemplateRenderer = (
    collection: ojSelectSingle.CollectionTemplateContext<
      OracleEmployee["EMPLOYEE_ID"],
      OracleEmployee
    >
  ) => {
    const collectionItemRenderer = (
      item: ojSelectSingle.ItemTemplateContext<
        OracleEmployee["EMPLOYEE_ID"],
        OracleEmployee
      >
    ) => {
      return (
        <oj-list-item-layout class="oj-listitemlayout-padding-off">
          <span className="oj-typography-body-md oj-text-color-primary">
            <oj-highlight-text
              text={item.data.FIRST_NAME + " " + item.data.LAST_NAME}
              matchText={collection.searchText}
            ></oj-highlight-text>
          </span>
          <oj-avatar
            slot="leading"
            role="img"
            size="xs"
            shape="circle"
            src={item.data.IMAGE}
            title={"Avatar of " + item.data.FIRST_NAME}
          ></oj-avatar>
          <span
            slot="secondary"
            className="oj-typography-body-sm oj-text-color-secondary"
          >
            <oj-highlight-text
              text={item.data.TITLE}
              matchText={collection.searchText}
            ></oj-highlight-text>
          </span>
          <span
            slot="metadata"
            className="oj-typography-body-sm oj-text-color-secondary"
          >
            <oj-highlight-text
              text={item.data.PHONE_NUMBER}
              matchText={collection.searchText}
            ></oj-highlight-text>
          </span>
        </oj-list-item-layout>
      );
    };

    const handleRowAction = (value: ojListView.ojItemAction<any, any>) => {
      collection.handleRowAction(value, value.detail.context);
      setListViewItem({
        selectedValue: value.detail.context.data["EMPLOYEE_ID"],
      });
    };

    return (
      <oj-list-view
        id="listview"
        aria-label="list of employees"
        data={collection.data}
        selectionMode={"single"}
        selected={collection.selected}
        currentItem={collection.currentRow.rowKey}
        onojItemAction={handleRowAction as any}
        class="oj-select-results oj-group-header-sm"
      >
        <template
          slot="itemTemplate"
          render={collectionItemRenderer}
        ></template>
      </oj-list-view>
    );
  };

  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
      <oj-form-layout
        userAssistanceDensity={density}
        labelEdge="inside"
        columns={1}
        class="oj-md-margin-4x-horizontal"
        direction="row"
        maxColumns={3}
      >

        <h6 class="oj-typography-heading-sm"> Select Single - Core Pack (Basic)</h6>
        <oj-c-select-single
          id="employeeSelector"
          label-hint="Select Single with ArrayDataProvider"
          label-edge="inside"
          class="oj-form-control-max-width-md"
          data={employeeDataProvider}
          value={selectSingleData.selectedValue}
          onvalueChanged={onBasicSelectSingleChange}
          itemText="label"
        ></oj-c-select-single>

        <span>The selected values are: {selectSingleData.selectedValue} </span>

        <h6 class="oj-typography-heading-sm"> Select Single Core pack (Item Text)</h6>
        <oj-c-select-single
          id="itemTextSelector"
          aria-label="Employee Selector"
          labelHint="Select single Item text"
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
          aria-label="Employee Selector item template"
          labelHint="Select single Item Template"
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
          The selected value is: {selectedOracleEmployee.selectedValue}
        </span>

    
        {/* <h6 class="oj-typography-heading-sm">
          Select Single (Collection Template - List View) 
          collection template is yet to be implemented in core pack 
        </h6>
        <oj-c-select-single
          id="collectionTemplateSelector"
          aria-label="Employee Selector Collection template"
          labelHint="Select single Item Template"
          labelEdge="inside"
          data={oracleEmployeeDataProvider}
          value={selectedListViewItem.selectedValue}
          itemText={getItemText}
        >
          <template
            slot="collectionTemplate"
            render={collectionTemplateRenderer}
          ></template>
        </oj-c-select-single>
        <span>The selected value is: {selectedListViewItem.selectedValue}</span> */}
        
      </oj-form-layout>
    </div>
  );
};

export default SelectSingleCorePack;
