import { h,ComponentProps} from "preact";
import { useState } from "preact/hooks";
import * as peopleData from "text!./data/peopleData.json";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import "ojs/ojselectcombobox";

const employees: Array<Employee> = [];

type Employee = {
  id: number;
  value: string;
  label: string;
};

type Person = {
  id: number;
  name: string;
  title: string;
  image: string;
  department: string;
};

type FormLayoutProps = ComponentProps<"oj-form-layout">;

JSON.parse(peopleData).map((item: Person) => {
  employees.push({ id: item.id, value: item.name, label: item.name });
});
const employeeData = new MutableArrayDataProvider<Employee["value"], Employee>(employees, {
  keyAttributes: "value",
});


const SelectSingle = () => {

const [selectSingleData, setSelectSingleValue] = useState({selectedValue: "Chris Black"});
const [comboboxData, setComboboxData] = useState({selectedValue: "FF"});
const [density, setDensity] = useState<FormLayoutProps["userAssistanceDensity"]>("efficient");

const onSelectionChange = (event: any) => {
    setSelectSingleValue({
      ...selectSingleData,
      selectedValue: event.detail.value
    });
  };

  const onComboboxChange = (event:any) =>{
    //console.log(event.detail.value);
     setComboboxData({
      ...comboboxData,
      selectedValue: event.detail.value
    });
  }

  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
      <oj-form-layout
        userAssistanceDensity={density}
        labelEdge="inside"
        columns={1}
        class="oj-md-margin-4x-horizontal" direction="row" maxColumns={3}>
        <h6 class="oj-typography-heading-sm"> Select Single</h6>
        <oj-select-single
          id="empSelector"
          labelHint="Employee"
          data={employeeData}
          value={selectSingleData.selectedValue}
          onvalueChanged={onSelectionChange}>
        </oj-select-single>
        <span>The selected value is: {selectSingleData.selectedValue} </span>
        <hr />

        <h6 class="oj-typography-heading-sm"> Combobox one</h6>
          <oj-combobox-one
                id="combobox1"
                value={comboboxData.selectedValue}
                label-hint="Combobox One with Inline Options"
                label-edge="inside"
                onvalueChanged={onComboboxChange}
                class="oj-form-control-max-width-md">
                  <oj-option value="IE">Internet Explorer</oj-option>
                  <oj-option value="FF">Firefox</oj-option>
                  <oj-option value="CH">Chrome</oj-option>
                  <oj-option value="OP">Opera</oj-option>
                  <oj-option value="SA">Safari</oj-option>
          </oj-combobox-one>
           <span>The selected value is: {comboboxData.selectedValue} </span>
        <hr />
      </oj-form-layout>
    </div>
  );
};
export default SelectSingle;