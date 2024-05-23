import { ComponentProps } from "preact";
import { useState, useRef } from "preact/hooks";
import * as NumberConverter from "ojs/ojconverter-number";
import * as ConverterUtilsI18n from "ojs/ojconverterutils-i18n";
import Message = require("ojs/ojmessaging");
import "oj-c/input-number";
import "oj-c/form-layout";

type InputNumberProps = ComponentProps<"oj-input-number">;
type FormLayoutProps = ComponentProps<"oj-form-layout">;

const hintDefinition: InputNumberProps["helpHints"] = {
  definition: "cost of a single item",
};
const hintSource: InputNumberProps["helpHints"] = {
  source: "https://www.oracle.com",
};
const error: Message[] = [
  { summary: "summary", detail: "detail", severity: "error" },
];
const warning: Message[] = [
  { summary: "summary", detail: "detail", severity: "warning" },
];
const info: Message[] = [
  { summary: "summary", detail: "detail", severity: "info" },
];
const confirmation: Message[] = [
  { summary: "summary", detail: "detail", severity: "confirmation" },
];

const InputNumberCorePack = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [density, setDensity] =
    useState<FormLayoutProps["userAssistanceDensity"]>("efficient");

  const [formData, setFormData] = useState({
    itemCost: 598.42,
    rawValue: "",
    value: "",
    currentValue: 30,
  });

  const onValueChange = (event: any) => {
    console.log(event.detail.value);
  };

  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
      <h6 class="oj-typography-heading-sm"> States </h6>
      <oj-c-form-layout
        userAssistanceDensity={density}
        columns={3}
        labelEdge="inside"
        class="oj-md-margin-4x-horizontal"
        maxColumns={3}
        direction="row"
      >
        <oj-c-input-number
          id="inputtext1"
          value={formData.currentValue}
          labelHint="step 0 enabled"
          min={0}
          max={100}
          onvalueChanged={onValueChange}
          step={0}
        ></oj-c-input-number>
        <oj-c-input-number
          value={20}
          id="inputtext2"
          labelHint="step 0 disabled"
          disabled
          min={0}
          max={100}
          step={0}
        ></oj-c-input-number>
        <oj-c-input-number
          value={20}
          id="inputtext3"
          labelHint="step 0 readonly"
          readonly
          min={0}
          max={100}
          step={0}
        ></oj-c-input-number>
        <oj-c-input-number
          id="inputtext4"
          value={20}
          labelHint="step 1 enabled"
          min={0}
          max={100}
          step={1}
        ></oj-c-input-number>
        <oj-c-input-number
          value={20}
          id="inputtext5"
          labelHint="step 1 disabled"
          disabled
          min={0}
          max={100}
          step={1}
        ></oj-c-input-number>
        <oj-c-input-number
          value={20}
          id="inputtext6"
          labelHint="step 1 readonly"
          readonly
          min={0}
          max={100}
          step={1}
        ></oj-c-input-number>
        <oj-c-input-number
          labelHint="step 1 enabled no value"
          id="inputtext7"
          min={0}
          max={100}
          step={1}
        ></oj-c-input-number>
        <oj-c-input-number
          labelHint="step 1 disabled no value"
          id="inputtext8"
          disabled
          min={0}
          max={100}
          step={1}
        ></oj-c-input-number>
        <oj-c-input-number
          labelHint="step 1 readonly no value"
          id="inputtext9"
          readonly
          min={0}
          max={100}
          step={1}
        ></oj-c-input-number>
      </oj-c-form-layout>
      <h6 class="oj-typography-heading-sm"> Required & Placeholder </h6>
      <oj-c-form-layout
        userAssistanceDensity={density}
        columns={3}
        labelEdge="inside"
        class="oj-md-margin-4x-horizontal"
        maxColumns={3}
        direction="row"
      >
        <oj-c-input-number required labelHint="required"></oj-c-input-number>
        <oj-c-input-number
          placeholder="placeholder text"
          labelHint="placeholder"
        ></oj-c-input-number>
      </oj-c-form-layout>
      <h4 class="oj-sm-margin-4x-top">Help</h4>
      <oj-c-form-layout maxColumns={3} direction="row" labelEdge="inside">
        <oj-c-input-number
          labelHint="helpHints definition"
          helpHints={hintDefinition}
        ></oj-c-input-number>

        <oj-c-input-number
          helpHints={hintSource}
          labelHint="helpHints source"
        ></oj-c-input-number>
      </oj-c-form-layout>

      <h4 class="oj-sm-margin-4x-top">Messages</h4>
      <oj-c-form-layout max-columns={3} direction="row" labelEdge="inside">
        <oj-c-input-number
          messagesCustom={error as any}
          value={20}
          labelHint="error"
        ></oj-c-input-number>
        <oj-c-input-number
          messagesCustom={warning as any}
          value={20}
          labelHint="warning"
        ></oj-c-input-number>
        <oj-c-input-number
          messagesCustom={info as any}
          value={20}
          labelHint="info"
        ></oj-c-input-number>
        <oj-c-input-number
          messagesCustom={confirmation as any}
          value={20}
          labelHint="confirmation"
        ></oj-c-input-number>
      </oj-c-form-layout>
    </div>
  );
};

export default InputNumberCorePack;
