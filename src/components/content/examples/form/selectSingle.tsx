import { h, ComponentProps } from "preact";
import { useState } from "preact/hooks";
import * as peopleData from "text!./data/peopleData.json";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import "ojs/ojselectsingle";
import { ItemContext } from "ojs/ojcommontypes";
import "ojs/ojknockout";
import "ojs/ojselectsingle";
import "ojs/ojhighlighttext";
import "ojs/ojlistitemlayout";
import "ojs/ojavatar";

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
const employees: Array<Employee> = [];

type FormLayoutProps = ComponentProps<"oj-form-layout">;

JSON.parse(peopleData).map((item: Person) => {
  employees.push({ id: item.id, value: item.name, label: item.name });
});

const employeeData = new MutableArrayDataProvider<Employee["value"], Employee>(
  employees,
  {
    keyAttributes: "value",
  }
);

const SelectSingle = () => {
  const [selectSingleData, setSelectSingleValue] = useState({
    selectedValue: "Chris Black",
  });

  const [density, setDensity] = useState<
    FormLayoutProps["userAssistanceDensity"]
  >("efficient");

  const onSelectionChange = (event: any) => {
    setSelectSingleValue({
      ...selectSingleData,
      selectedValue: event.detail.value,
    });
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
        <h6 class="oj-typography-heading-sm"> Select Single (Basic)</h6>

        <oj-select-single
          id="empSelector"
          aria-label="Employee"
          labelHint="Employee"
          data={employeeData}
          value={selectSingleData.selectedValue}
          onvalueChanged={onSelectionChange}
        ></oj-select-single>

        <span>The selected value is: {selectSingleData.selectedValue} </span>

        <h6 class="oj-typography-heading-sm"> Select Single (Item Template)</h6>

        <oj-select-single
          id="itemtemplateSelector"
          aria-label="Employee"
          labelHint="Employee"
          data={employeeData}
          value={selectSingleData.selectedValue}
          onvalueChanged={onSelectionChange}
        ></oj-select-single>
      </oj-form-layout>
    </div>
  );
};
export default SelectSingle;
