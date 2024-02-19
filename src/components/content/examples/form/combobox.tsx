import { h, ComponentProps } from "preact";
import { useState } from "preact/hooks";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import "ojs/ojselectcombobox";

type Browser = {
  id: number;
  label: string;
  value: string;
};
type FormLayoutProps = ComponentProps<"oj-form-layout">;

const browserData = [
  { id: 1, value: "IE", label: "Internet Explorer" },
  { id: 2, value: "FF", label: "Firefox" },
  { id: 3, value: "CH", label: "Chrome" },
  { id: 4, value: "OP", label: "Opera" },
  { id: 5, value: "SA", label: "Safari" },
];
const browserDP = new MutableArrayDataProvider<Browser["value"], Browser>(
  browserData,
  {
    keyAttributes: "value",
  }
);

const ComboBox = () => {
  const [comboboxData, setComboboxData] = useState({ selectedValue: "FF" });
  const [density, setDensity] = useState<
    FormLayoutProps["userAssistanceDensity"]
  >("efficient");

  const onComboboxChange = (event: any) => {
    //console.log(event.detail.value);
    setComboboxData({
      ...comboboxData,
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
        <h6 class="oj-typography-heading-sm"> Combobox one</h6>
        <oj-combobox-one
          id="comboboxOne"
          value={comboboxData.selectedValue}
          aria-label="combobox one"
          labelHint="Combobox One with Inline Options"
          labelEdge="inside"
          options={browserDP}
          onvalueChanged={onComboboxChange}
          class="oj-form-control-max-width-md"
        ></oj-combobox-one>

        <span>The selected value is: {comboboxData.selectedValue} </span>
        <hr />
      </oj-form-layout>
    </div>
  );
};
export default ComboBox;
