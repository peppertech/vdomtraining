import { h, ComponentProps } from "preact";
import { useState, useRef } from "preact/hooks";
import * as NumberConverter from "ojs/ojconverter-number";
import * as ConverterUtilsI18n from "ojs/ojconverterutils-i18n";
import "ojs/ojformlayout";
import "ojs/ojinputtext";

type InputTextProps = ComponentProps<"oj-input-text">;
type FormLayoutProps = ComponentProps<"oj-form-layout">;

const hintDefinition: InputTextProps["helpHints"] = {
  definition: "cost of a single item",
};
const placeholder: InputTextProps["placeholder"] = "Enter item cost";
const lblHint: InputTextProps["labelHint"] = "Item Cost";
const eurNumberConverter = new NumberConverter.IntlNumberConverter({
  style: "currency",
  currency: "INR",
  currencyDisplay: "symbol",
});

let value: string = "598.42";
let name: string = "Kopi Luwak beans (2 lbs)";

// 'any' type is being used because method is used by multiple ..

const InputText = () => {
  const [formData, setFormData] = useState({
    itemName: "Kopi Luwak beans (2 lbs)",
    itemBuyer: "",
    itemCost: "598.42",
  });

  const [isDisabled, setIsDisabled] = useState(true);
  const [density, setDensity] = useState<
    FormLayoutProps["userAssistanceDensity"]
  >("efficient");

  const onChange = (event: any) => {
    setFormData({
      ...formData,
      [event.currentTarget.id]: event.detail.value,
    });
  };

  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
      <oj-form-layout
        userAssistanceDensity={density}
        labelEdge="inside"
        columns={1}
        class="oj-md-margin-4x-horizontal"
      >
        <h4 class="oj-typography-heading-sm"> Input Text </h4>

        <oj-input-text
          id="itemName"
          value={formData.itemName}
          labelHint="Name"
          onvalueChanged={onChange}
        >
          <span
            slot="end"
            class="oj-text-field-start-end-icon oj-ux-ico-coffee oj-sm-margin-4x-end"
            role="presentation"
          ></span>
        </oj-input-text>
        <span>The selected value is: {formData.itemName} </span>

        <h4 class="oj-typography-heading-sm"> Input Text (using converter) </h4>

        <oj-input-text
          id="itemCost"
          value={formData.itemCost}
          placeholder={placeholder}
          labelHint={lblHint}
          helpHints={hintDefinition}
          onvalueChanged={onChange}
          converter={eurNumberConverter}
        ></oj-input-text>
        <span>The selected value is: {formData.itemCost} </span>
      </oj-form-layout>
    </div>
  );
};

export default InputText;
