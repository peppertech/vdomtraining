import { ComponentProps } from "preact";
import { useState, useRef } from "preact/hooks";
import * as NumberConverter from "ojs/ojconverter-number";
import * as ConverterUtilsI18n from "ojs/ojconverterutils-i18n";

import Message = require("ojs/ojmessaging");
import "ojs/ojinputnumber";
import "ojs/ojformlayout";

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

const InputNumber = () => {
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
    // setFormData({
    //   ...formData,
    //   [event.currentTarget.id]: event.detail.value,
    // });
  };

  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
      <h6 class="oj-typography-heading-sm"> States </h6>
      <oj-form-layout
        userAssistanceDensity={density}
        columns={3}
        labelEdge="inside"
        class="oj-md-margin-4x-horizontal"
        maxColumns={3}
        direction="row"
      >
        <oj-input-number
          id="inputtext1"
          value={formData.currentValue}
          labelHint="step 0 enabled"
          min={0}
          max={100}
          onvalueChanged={onValueChange}
          step={0}
        ></oj-input-number>
        <oj-input-number
          value={20}
          id="inputtext2"
          labelHint="step 0 disabled"
          disabled
          min={0}
          max={100}
          step={0}
        ></oj-input-number>
        <oj-input-number
          value={20}
          id="inputtext3"
          labelHint="step 0 readonly"
          readonly
          min={0}
          max={100}
          step={0}
        ></oj-input-number>
        <oj-input-number
          id="inputtext4"
          value={20}
          labelHint="step 1 enabled"
          min={0}
          max={100}
          step={1}
        ></oj-input-number>
        <oj-input-number
          value={20}
          id="inputtext5"
          labelHint="step 1 disabled"
          disabled
          min={0}
          max={100}
          step={1}
        ></oj-input-number>
        <oj-input-number
          value={20}
          id="inputtext6"
          labelHint="step 1 readonly"
          readonly
          min={0}
          max={100}
          step={1}
        ></oj-input-number>
        <oj-input-number
          labelHint="step 1 enabled no value"
          id="inputtext7"
          min={0}
          max={100}
          step={1}
        ></oj-input-number>
        <oj-input-number
          labelHint="step 1 disabled no value"
          id="inputtext8"
          disabled
          min={0}
          max={100}
          step={1}
        ></oj-input-number>
        <oj-input-number
          labelHint="step 1 readonly no value"
          id="inputtext9"
          readonly
          min={0}
          max={100}
          step={1}
        ></oj-input-number>
      </oj-form-layout>
      <h6 class="oj-typography-heading-sm"> Required & Placeholder </h6>
      <oj-form-layout
        userAssistanceDensity={density}
        columns={3}
        labelEdge="inside"
        class="oj-md-margin-4x-horizontal"
        maxColumns={3}
        direction="row"
      >
        <oj-input-number required labelHint="required"></oj-input-number>
        <oj-input-number
          placeholder="placeholder text"
          labelHint="placeholder"
        ></oj-input-number>
      </oj-form-layout>
      <h4 class="oj-sm-margin-4x-top">Help</h4>
      <oj-form-layout maxColumns={3} direction="row" labelEdge="inside">
        <oj-input-number
          labelHint="helpHints definition"
          helpHints={hintDefinition}
        ></oj-input-number>

        <oj-input-number
          helpHints={hintSource}
          labelHint="helpHints source"
        ></oj-input-number>
      </oj-form-layout>

      <h4 class="oj-sm-margin-4x-top">Messages</h4>
      <oj-form-layout max-columns={3} direction="row" labelEdge="inside">
        <oj-input-number
          messagesCustom={error}
          value={20}
          labelHint="error"
        ></oj-input-number>
        <oj-input-number
          messagesCustom={warning}
          value={20}
          labelHint="warning"
        ></oj-input-number>
        <oj-input-number
          messagesCustom={info}
          value={20}
          labelHint="info"
        ></oj-input-number>
        <oj-input-number
          messagesCustom={confirmation}
          value={20}
          labelEdge="provided"
          labelHint="confirmation"
        ></oj-input-number>
      </oj-form-layout>
    </div>
  );
};

export default InputNumber;
