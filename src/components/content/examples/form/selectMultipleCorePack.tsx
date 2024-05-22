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
import { KeySetImpl, KeySet } from "ojs/ojkeyset";
import 'oj-c/select-multiple';
import 'oj-c/select-single';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'oj-c/form-layout';

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

let selectVal = new Set([]);

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

const SelectMultiple = () => {
  const [selectSingleData, setSelectSingleValue] = useState({
    selectedValue: "Chris Black",
  });
 // for select multiple
  const [selectMultipleData, setSelectMultipleValue] = useState({
    selectedValue: selectVal,
  });
  const [selectMultipleItemTextData, setItemTextSelectSingleData] = useState<any>(
    { selectedValue: selectVal }
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
    setItemTextSelectSingleData({
      selectedValue: event.detail.value,
    });
  };

  const getItemText = (
    itemContext: ItemContext<string, Record<string, string | number>>
  ) => {
    return `${itemContext.data.label}`;
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

        <h6 class="oj-typography-heading-sm"> Select Multiple - Core Pack (Basic)</h6>
         <oj-c-select-multiple
                 id="basicSelect"
                data={employeeDataProvider}
                item-text="label"
                value={selectMultipleData.selectedValue}
                onvalueChanged={onBasicSelectMultipleChange}
                label-hint="enabled">
        </oj-c-select-multiple>

        <span>The selected values are: {selectMultipleData.selectedValue? Array.from(selectMultipleData.selectedValue).join(', ') : ''} </span>


        <h6 class="oj-typography-heading-sm"> Select Multiple - Core Pack (Item Text)</h6>
         <oj-c-select-multiple
              id="itemtextSelect"
              labelHint="Select Multiple with item-text"
              labelEdge="inside"
              class="oj-form-control-max-width-md"
              data={employeeDataProvider}
              value={selectMultipleItemTextData.selectedValue}
              onvalueChanged={onItemTextSelectMultipleChange}
              itemText={getItemText}>
          </oj-c-select-multiple>
           <span>The selected values are: {selectMultipleItemTextData.selectedValue? Array.from(selectMultipleItemTextData.selectedValue).join(', ') : ''} </span>

      </oj-c-form-layout>
    </div>
  );
};
export default SelectMultiple;
