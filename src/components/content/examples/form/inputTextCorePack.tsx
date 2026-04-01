import { h, ComponentProps } from "preact";
import { useState, useRef } from "preact/hooks";
import * as NumberConverter from "ojs/ojconverter-number";
import * as ConverterUtilsI18n from "ojs/ojconverterutils-i18n";
import "ojs/ojformlayout";
import "ojs/ojinputtext";
import "oj-c/input-text";
import "oj-c/form-layout";
import Message = require("ojs/ojmessaging");

type InputTextProps = ComponentProps<"oj-c-input-text">;
type FormLayoutProps = ComponentProps<"oj-c-form-layout">;
type InputTextValueChangedEvent = Parameters<
  NonNullable<InputTextProps["onvalueChanged"]>
>[0];

const hintDefinition: InputTextProps["helpHints"] = {
  definition: "cost of a single item",
};
const helpHintSource: InputTextProps["helpHints"] = {
  source: "https://www.oracle.com",
};

const length: InputTextProps["length"] = {
  countBy: "codePoint",
  max: 5,
};

const lblHint: InputTextProps["labelHint"] =
  "Input text - using converter and help hint definiton";
const eurNumberConverter = new NumberConverter.IntlNumberConverter({
  style: "currency",
  currency: "INR",
  currencyDisplay: "symbol",
});

let value: string = "598.42";
let name: string = "Third wave coffee (2 lbs)";
let rawValue: InputTextProps["rawValue"];

const error: InputTextProps["messagesCustom"] = [{ summary: "summary", detail: "detail", severity: "error" }];
const warning: InputTextProps["messagesCustom"] = [{ summary: "summary", detail: "detail", severity: "warning" }];
const info: InputTextProps["messagesCustom"] = [{ summary: "summary", detail: "detail", severity: "info" }];
const confirmation: InputTextProps["messagesCustom"] = [{ summary: "summary", detail: "detail", severity: "confirmation" }];

// 'any' type is being used because method is used by multiple ..
const InputTextCorePack = () => {
  const [formData, setFormData] = useState({
    itemName: "Third wave coffee(2 lbs)",
    itemBuyer: "Kaushal Deo",
    itemCost: "598.42",
    rawValue: "",
    value: "",
    emailID: 'abrakadabra@gmail.com'
  });

  const [isDisabled, setIsDisabled] = useState(true);
  const [density, setDensity] =
    useState<FormLayoutProps["userAssistanceDensity"]>("efficient");

    //please change the variable depending upon the control that you are using
  const onTextvalueChange = (event: InputTextValueChangedEvent) => {
    //console.log(event.detail);
   
   if(event.detail.updatedFrom =='external'){
    setFormData({
      ...formData,
      itemName: event.detail.value || "",
    });
   }
    
  };

   const onvalChange = (event: InputTextValueChangedEvent) => {
    alert(event.detail);
   }

  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
      <h6 class="oj-typography-heading-sm"> States inside oj-form-layout </h6>
      <oj-c-form-layout
        userAssistanceDensity={density}
        columns={3}
        maxColumns={3}
        labelEdge="inside"
        direction="row"
      >
        <oj-c-input-text
          id="ITC-1"
          value={formData.itemBuyer}
          onvalueChanged={onvalChange} 
          clear-icon="always"  
          labelHint="Input text - enabled with value "
        ></oj-c-input-text>

        <oj-c-input-text 
         id="ITC-2"
         labelHint="Input text - enabled no value">
        </oj-c-input-text>

        <oj-c-input-text
          id="ITC-3"
          value="value text"
          labelHint="Input text - disabled"
          disabled={true}
        ></oj-c-input-text>
        <oj-c-input-text
          id="ITC-4"
          labelHint="disabled no value"
          disabled={true}
        ></oj-c-input-text>
        <oj-c-input-text
         id="ITC-5"
          value="value text"
          labelHint="readonly"
          readonly={true}
          containerReadonly={false}
        ></oj-c-input-text>
        <oj-c-input-text
          id="ITC-6"
          labelHint="readonly no value"
          readonly={true}
          containerReadonly={false}
        ></oj-c-input-text>
      </oj-c-form-layout>
      <h6 class="oj-typography-heading-sm"> Start and End slots</h6>
      <oj-c-form-layout
        userAssistanceDensity={density}
        columns={2}
        maxColumns={3}
        labelEdge="inside"
        direction="row"
      >
        <oj-c-input-text
          id="itemSlot1"
          value={formData.itemName}
          labelHint="Input text - using start slots"
          onvalueChanged={onTextvalueChange}
        >
          <span
            slot="start"
            class="oj-text-field-start-end-icon oj-ux-ico-cc-card oj-sm-margin-4x-end"
            role="presentation"
          ></span>
        </oj-c-input-text>
        <oj-c-input-text
          id="itemSlot2"
          value={formData.emailID}
          labelHint="Input text - using end slots KK"
          //readonly={true}
           //onvalueChanged={onTextvalueChange}
        >
          <span
            slot="end"
            class="oj-text-field-start-end-icon oj-ux-ico-email oj-sm-margin-4x-end"
            role="presentation"
          ></span>
        </oj-c-input-text>
        {/* <span>The selected value is: {formData.itemName} </span> */}
      </oj-c-form-layout>
      <h6 class="oj-typography-heading-sm"> Help</h6>
      <oj-c-form-layout
        userAssistanceDensity={density}
        columns={2}
        maxColumns={3}
        labelEdge="inside"
        direction="row"
      >
        <oj-c-input-text
           id="ITC-7"
          value={formData.itemCost}
          labelHint={lblHint}
          helpHints={hintDefinition}
          //onvalueChanged={onTextvalueChange}
          converter={eurNumberConverter}
        ></oj-c-input-text>
        <oj-c-input-text
          id="ITC-8"
          value={formData.itemCost}
          labelHint="Input text - using help hint source"
          helpHints={helpHintSource}
          //onvalueChanged={onTextvalueChange}
        ></oj-c-input-text>

        {/* <span>The selected value is: {formData.itemCost} </span> */}
      </oj-c-form-layout>
      <h6 class="oj-typography-heading-sm">
        {" "}
        Required, Clear Icon, Placeholder & Max Length
      </h6>
      <oj-c-form-layout
        userAssistanceDensity={density}
        columns={3}
        maxColumns={3}
        labelEdge="inside"
        direction="row"
      >
        <oj-c-input-text
           id="ITC-9"
          required={true}
          labelHint="Input text using required"
        ></oj-c-input-text>
        <oj-c-input-text
           id="ITC-10"
          clearIcon="always"
          labelHint="Input text using clear icon"
          value="value text"
        ></oj-c-input-text>
        <oj-c-input-text
          id="ITC-11"
          placeholder="what you want to become in your life"
          labelHint="Input text using placeholder"
        ></oj-c-input-text>
        <oj-c-input-text
          id="ITC-12"
          value={formData.value}
          rawValue={rawValue}
          length={length}
          labelHint="Input text with max length"
        ></oj-c-input-text>
      </oj-c-form-layout>
      <h6 class="oj-typography-heading-sm"> Prefix and Suffix</h6>
      <oj-c-form-layout
        userAssistanceDensity={density}
        columns={2}
        maxColumns={3}
        labelEdge="inside"
        direction="row"
      >
        <oj-c-input-text
          id="ITC-13"
          labelHint="input-text using prefix"
          inputPrefix="$"
          value="10.00"
        ></oj-c-input-text>
        <oj-c-input-text
           id="ITC-14"
          labelHint="input-text using suffix"
          inputSuffix="lbs"
          value="150"
        ></oj-c-input-text>
        {/* <oj-c-input-text help.instruction ="help.instruction text" labelHint="help.instruction"></oj-c-input-text>
         */}
      </oj-c-form-layout>
      <h6 class="oj-typography-heading-sm">Messages</h6>
      <oj-c-form-layout
        userAssistanceDensity={density}
        columns={3}
        maxColumns={3}
        labelEdge="inside"
        direction="row"
      >
        <oj-c-input-text
           id="ITC-15"
          messagesCustom={error}
          value="value text"
          labelHint="Input text - with error message"
        ></oj-c-input-text>
        <oj-c-input-text
           id="ITC-16"
          messagesCustom={warning}
          value="value text"
          labelHint="Input text - with warning"
        ></oj-c-input-text>
        <oj-c-input-text
           id="ITC-17"
          messagesCustom={info}
          value="value text"
          labelHint="Input text - with info"
        ></oj-c-input-text>
        <oj-c-input-text
          id="ITC-18"
          messagesCustom={confirmation}
          value="value text"
          labelHint="Input text - with confirmation"
        ></oj-c-input-text>
      </oj-c-form-layout>
    </div>
  );
};

export default InputTextCorePack;
