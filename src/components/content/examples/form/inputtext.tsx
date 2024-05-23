import { h, ComponentProps } from "preact";
import { useState, useRef } from "preact/hooks";
import * as NumberConverter from "ojs/ojconverter-number";
import * as ConverterUtilsI18n from "ojs/ojconverterutils-i18n";
import "ojs/ojformlayout";
import "ojs/ojinputtext";
import Message = require("ojs/ojmessaging");

type InputTextProps = ComponentProps<"oj-input-text">;
type FormLayoutProps = ComponentProps<"oj-form-layout">;

const length: InputTextProps["length"] = {
  countBy: "codePoint",
  max: 5,
};
const hintDefinition: InputTextProps["helpHints"] = {
  definition: "cost of a single item",
};
const helpHintSource: InputTextProps["helpHints"] = {
  source: "https://www.oracle.com",
};
const lblHint: InputTextProps["labelHint"] =
  "Input text - using converter and help hint definiton";
const eurNumberConverter = new NumberConverter.IntlNumberConverter({
  style: "currency",
  currency: "INR",
  currencyDisplay: "symbol",
});

let rawValue: any;

const error: Message[] = [
  { summary: "summary", detail: "detail", severity: "error" },
];
const warning = [{ summary: "summary", detail: "detail", severity: "warning" }];
const info = [{ summary: "summary", detail: "detail", severity: "info" }];
const confirmation = [
  { summary: "summary", detail: "detail", severity: "confirmation" },
];
// 'any' type is being used because method is used by multiple ..
const InputText = () => {
  const [formData, setFormData] = useState({
    itemName: "Kopi Luwak beans (2 lbs)",
    itemBuyer: "",
    itemCost: "598.42",
    rawValue: "",
    value: "",
    creditCardVal: "Enter credit card details",
    emailVal: "Enter email address",
  });

  const [isDisabled, setIsDisabled] = useState(true);
  const [density, setDensity] =
    useState<FormLayoutProps["userAssistanceDensity"]>("efficient");

  const onValueChange = (event: any) => {
    setFormData({
      ...formData,
      [event.currentTarget.id]: event.detail.value,
    });
  };

  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
      <h6 class="oj-typography-heading-sm"> States inside oj-form-layout </h6>
      <oj-form-layout
        userAssistanceDensity={density}
        columns={3}
        labelEdge="inside"
        class="oj-md-margin-4x-horizontal"
        maxColumns={3}
        direction="row"
      >
        <oj-input-text
          value="value text"
          labelHint="Input text - enabled with value"
        ></oj-input-text>
        <oj-input-text
          id="enabledNoVal"
          labelHint="Input text - enabled no value"
        ></oj-input-text>
        <oj-input-text
          labelEdge="inside"
          value="value text"
          labelHint="Input text - disabled"
          disabled={true}
        ></oj-input-text>
        <oj-input-text
          id="disabledNoVal"
          labelHint="disabled no value"
          disabled={true}
        ></oj-input-text>
        <oj-input-text
          id="disabledVal"
          value="value text"
          labelHint="readonly"
          readonly={true}
        ></oj-input-text>
        <oj-input-text
          labelHint="readonly no value"
          readonly={true}
        ></oj-input-text>
      </oj-form-layout>
      <h6 class="oj-typography-heading-sm"> Start and End Slots </h6>
      <oj-form-layout
        userAssistanceDensity={density}
        columns={2}
        labelEdge="inside"
        class="oj-md-margin-4x-horizontal"
        maxColumns={3}
        direction="row"
      >
        <oj-input-text
          id="itemName1"
          value={formData.creditCardVal}
          labelHint="credit card"
          onvalueChanged={onValueChange}
        >
          <span
            slot="start"
            class="oj-text-field-start-end-icon oj-ux-ico-cc-card oj-sm-margin-4x-end"
            role="presentation"
          ></span>
        </oj-input-text>
        <oj-input-text
          id="itemName2"
          value={formData.emailVal}
          labelHint="Input text - using slots"
          onvalueChanged={onValueChange}
        >
          <span
            slot="end"
            class="oj-text-field-start-end-icon oj-ux-ico-email oj-sm-margin-4x-end"
            role="presentation"
          ></span>
        </oj-input-text>
      </oj-form-layout>
      <h6 class="oj-typography-heading-sm"> Help </h6>
      <oj-form-layout
        userAssistanceDensity={density}
        columns={2}
        labelEdge="inside"
        class="oj-md-margin-4x-horizontal"
        maxColumns={3}
        direction="row"
      >
        <oj-input-text
          value={formData.itemCost}
          labelHint={lblHint}
          helpHints={hintDefinition}
          onvalueChanged={onValueChange}
          converter={eurNumberConverter}
        ></oj-input-text>

        <oj-input-text
          value={formData.itemCost}
          labelHint="Input text - using help hint source"
          helpHints={helpHintSource}
          onvalueChanged={onValueChange}
        ></oj-input-text>
      </oj-form-layout>
      {/* <span>The selected value is: {formData.itemName} </span> */}
      <h6 class="oj-typography-heading-sm">
        Required, Clear Icon, Placeholder & Max Length{" "}
      </h6>
      <oj-form-layout
        userAssistanceDensity={density}
        columns={3}
        labelEdge="inside"
        class="oj-md-margin-4x-horizontal"
        maxColumns={3}
        direction="row"
      >
        {/* <span>The selected value is: {formData.itemCost} </span> */}
        <oj-input-text
          required={true}
          labelHint="Input text using required"
        ></oj-input-text>
        <oj-input-text
          clearIcon="always"
          labelHint="Input text using cler icon"
          value="value text"
        ></oj-input-text>
        <oj-input-text
          placeholder="what you want to become in your life"
          labelHint="Input text using placeholder"
        ></oj-input-text>
        <oj-input-text
          id="text input"
          value={formData.value}
          rawValue={rawValue}
          length={length}
          labelEdge="provided"
          labelHint="Input text with max length"
        ></oj-input-text>
      </oj-form-layout>
      <h6 class="oj-typography-heading-sm">Messages </h6>
      <oj-form-layout
        userAssistanceDensity={density}
        columns={3}
        labelEdge="inside"
        class="oj-md-margin-4x-horizontal"
        maxColumns={3}
        direction="row"
      >
        <oj-input-text
          messagesCustom={error as any}
          value="value text"
          labelHint="Input text - with error message"
        ></oj-input-text>
        <oj-input-text
          messagesCustom={warning as any}
          value="value text"
          labelHint="Input text - with warning"
        ></oj-input-text>
        <oj-input-text
          messagesCustom={info as any}
          value="value text"
          labelHint="Input text - with info"
        ></oj-input-text>
        <oj-input-text
          messagesCustom={confirmation as any}
          value="value text"
          labelHint="Input text - with confirmation"
        ></oj-input-text>
      </oj-form-layout>
    </div>
  );
};

export default InputText;
