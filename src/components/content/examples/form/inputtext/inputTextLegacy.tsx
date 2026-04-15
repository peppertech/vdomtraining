import { h, ComponentProps } from "preact";
import { useState, useRef } from "preact/hooks";
import * as NumberConverter from "ojs/ojconverter-number";
import * as ConverterUtilsI18n from "ojs/ojconverterutils-i18n";
import "ojs/ojformlayout";
import "ojs/ojinputtext";
import Message = require("ojs/ojmessaging");
import "ojs/ojdatetimepicker";
import "ojs/ojbutton";
import * as customMessages from "../data/messages";

//component props types
type InputTextProps = ComponentProps<"oj-input-text">;
type FormLayoutProps = ComponentProps<"oj-form-layout">;
type InputTextValueChangedEvent = Parameters<
  NonNullable<InputTextProps["onvalueChanged"]>
>[0];
type InputTextRawValueChangedEvent = Parameters<
  NonNullable<InputTextProps["onrawValueChanged"]>
>[0];

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

const error: NonNullable<InputTextProps["messagesCustom"]> = [
  { summary: "summary", detail: "detail", severity: "error" },
];
const warning: NonNullable<InputTextProps["messagesCustom"]> = [
  { summary: "summary", detail: "detail", severity: "warning" },
];
const info: NonNullable<InputTextProps["messagesCustom"]> = [
  { summary: "summary", detail: "detail", severity: "info" },
];
const confirmation: NonNullable<InputTextProps["messagesCustom"]> = [
  { summary: "summary", detail: "detail", severity: "confirmation" },
];

const InputText = () => {
  const [currentRawValue, setCurrentRawValue] = useState<InputTextProps["rawValue"] >("");
  const [labelEdgeVal, setEdge] = useState<InputTextProps["labelEdge"] >('inside');
  const [formData, setFormData] = useState({
    itemName: "Kopi Luwak beans (2 lbs)",
    itemBuyer: "",
    itemCost: "598.42",
    rawValue: "",
    value: "598.42",
    creditCardVal: "Enter credit card details",
    emailVal: "Enter email address",
    currentValue: 10,
  });

  const [isDisabled, setIsDisabled] = useState(true);
  const [density, setDensity] =
    useState<FormLayoutProps["userAssistanceDensity"]>("efficient");

  const onValueChange = (event: InputTextValueChangedEvent) => {
    setFormData({
      ...formData,
      itemCost: event.detail.value,
      rawValue: event.detail.value,
      //[event.currentTarget.id]: event.detail.value,
    });
  };

  const onRawValueChange = (event: InputTextRawValueChangedEvent) => {
    setCurrentRawValue(event.detail.value ?? "");
  };

  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
    <h5 class="oj-sm-margin-4x-top oj-sm-padding-2x-bottom"> States </h5>
      <oj-form-layout
        userAssistanceDensity={density}
        columns={3}
        maxColumns={3}
        direction="row"
       
      >
        <oj-input-text
          id='enabledVal'
          labelEdge={labelEdgeVal}
          rawValue={currentRawValue}
          onrawValueChanged={onRawValueChange}
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

        <span>Current component rawValue is: {currentRawValue}</span>
        
      </oj-form-layout>
      <h5 class="oj-typography-heading-sm"> Start and End Slots </h5>
      <oj-form-layout
        userAssistanceDensity={density}
        columns={2}
        maxColumns={3}
        direction="row"
      >
        <oj-input-text
          id="itemName1"
          value={formData.creditCardVal}
          labelHint="credit card"
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
          labelHint="Input text - using slots for icons"
          //readonly={true}
        >
          <span
            slot="end"
            class="oj-text-field-start-end-icon oj-ux-ico-email oj-sm-margin-4x-end"
            role="presentation"
          ></span>
        </oj-input-text>
      </oj-form-layout>
      <h5 class="oj-typography-heading-sm"> Help </h5>
      <oj-form-layout
        userAssistanceDensity={density}
        columns={3}
        maxColumns={3}
        direction="row"
      >
        <oj-input-text
          value={formData.itemCost}
          labelHint={lblHint}
          helpHints={hintDefinition}
          converter={eurNumberConverter}
        ></oj-input-text>

        <oj-input-text
          value={formData.itemCost}
          labelHint="Input text - using help hint source"
          helpHints={helpHintSource}
        ></oj-input-text>
      </oj-form-layout>
      {/* <span>The selected value is: {formData.itemName} </span> */}
      <h5 class="oj-typography-heading-sm">
        Required, Clear Icon, Placeholder & Max Length{" "}
      </h5>
      <oj-form-layout
        userAssistanceDensity={density}
        columns={3}
        maxColumns={3}
        direction="row"
      >
        <oj-input-text
          required={true}
          rawValue={currentRawValue}
          onrawValueChanged={onRawValueChange}
          clearIcon="always"
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
          length={length}
          labelEdge={labelEdgeVal}
          labelHint="Input text with max length, raw value"
        ></oj-input-text>
      </oj-form-layout>
      <h5 class="oj-typography-heading-sm">Messages </h5>
      <oj-form-layout
        userAssistanceDensity={density}
        columns={3}
        maxColumns={3}
        direction="row"
      >
        <oj-input-text
          messagesCustom={error}
          value="value text"
          labelHint="Input text - with error message"
        ></oj-input-text>
        <oj-input-text
          messagesCustom={warning}
          value="value text"
          labelHint="Input text - with warning"
        ></oj-input-text>
        <oj-input-text
          messagesCustom={info}
          value="value text"
          labelHint="Input text - with info"
        ></oj-input-text>
        <oj-input-text
          messagesCustom={confirmation}
          value="value text"
          labelHint="Input text - with confirmation"
        ></oj-input-text>
      </oj-form-layout>
    </div>
  );
};

export default InputText;
