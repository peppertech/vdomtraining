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
import 'oj-c/list-item-layout';
import 'oj-c/avatar';
import 'oj-c/selector';
import 'oj-c/highlight-text';
import { CSelectMultipleElement } from "oj-c/select-multiple";
import { ojSelectSingle } from "ojs/ojselectsingle";


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

let selectVal = new Set(['Chris Black', 'Christine Cooper', 'Chris Benalamore']);

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
    selectedValue: 103, //"Chris Black",
  });
 // for select multiple
  const [selectMultipleData, setSelectMultipleValue] = useState({
    selectedValue: selectVal,
  });
  const [selectMultipleItemTextData, setItemTextSelectSingleData] = useState<any>(
    { selectedValue: selectVal }
  );

  // const [selectedListViewItem, setListViewItem] = useState<any>({
  //   selectedValue: 103,
  // });

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
    console.log(event.detail.value);
    setItemTextSelectSingleData({
      selectedValue: event.detail.value,
    });
  };

   const getItemTextLabel = (
    itemContext: ItemContext<string, Record<string, string | number>>
  ) => {
    return `${itemContext.data.label}`;
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
                itemText="label"
                value={selectMultipleData.selectedValue}
                onvalueChanged={onBasicSelectMultipleChange}
                labelHint="enabled">
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
              itemText={getItemTextLabel}>
        </oj-c-select-multiple>
        <span>The selected values are: {selectMultipleItemTextData.selectedValue? Array.from(selectMultipleItemTextData.selectedValue).join(', ') : ''} </span>

        <h6 class="oj-typography-heading-sm"> Select Multiple - Core Pack (Item Template)</h6>
        {/* <oj-c-select-multiple
              id="select1"
              labelHint="Select Multiple"
              labelEdge="inside"
              data={employeeDataProvider}
             value={selectMultipleItemTextData.selectVal}
              itemText={getItemText}>
              <template
                  slot="itemTemplate"
                  render={itemTemplateRenderer}>
             </template>       
            </oj-c-select-multiple> */}


      <h6 class="oj-typography-heading-sm"> Select Multiple - Core Pack (Collection Template)</h6>   

      </oj-c-form-layout>
    </div>
  );
};
export default SelectMultiple;
