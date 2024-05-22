import { h, ComponentProps } from "preact";
import { useState, useRef } from "preact/hooks";
import * as NumberConverter from "ojs/ojconverter-number";
import * as ConverterUtilsI18n from "ojs/ojconverterutils-i18n";
import "ojs/ojformlayout";
import "ojs/ojinputtext";
import "oj-c/input-text";
import "oj-c/form-layout"
import Message = require("ojs/ojmessaging");


type InputTextProps = ComponentProps<"oj-c-input-text">;
type FormLayoutProps = ComponentProps<"oj-c-form-layout">;

const hintDefinition: InputTextProps["helpHints"] = {
  definition: "cost of a single item",
};
const length: InputTextProps['length'] ={
  countBy : "codePoint",
  max: 5
}
const placeholder: InputTextProps["placeholder"] = "Enter the item cost";
const lblHint: InputTextProps["labelHint"] = "Item Cost";
const eurNumberConverter = new NumberConverter.IntlNumberConverter({
  style: "currency",
  currency: "INR",
  currencyDisplay: "symbol",
});

let value: string = "598.42";
let name: string = "Third wave coffee (2 lbs)";
let rawValue :any;

const error:Message[] = [{ summary: "summary", detail: "detail", severity: "error" }];
const warning = [{ summary: "summary", detail: "detail", severity: "warning" }];
const info = [{ summary: "summary", detail: "detail", severity: "info" }];
const confirmation = [{ summary: "summary", detail: "detail", severity: "confirmation" }];
  
// 'any' type is being used because method is used by multiple ..
const InputTextCorePack = () => {
  const [formData, setFormData] = useState({
    itemName: "Third wave coffee(2 lbs)",
    itemBuyer: "Kaushal Deo",
    itemCost: "598.42",
    rawValue:"",
    value:""
  });

  const [isDisabled, setIsDisabled] = useState(true);
  const [density, setDensity] = useState<
    FormLayoutProps["userAssistanceDensity"]
  >("efficient");

  const onvalueChange = (event: any) => {
    setFormData({
      ...formData,
      [event.currentTarget.id]: event.detail.value,
    });
  };

  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
      {/* <h4 class="oj-typography-heading-sm"> Input Text - Core Pack </h4> */}
     <h4>Input Text Core Pack (oj-c-input-text) - Examples</h4>
     <oj-c-form-layout
      userAssistanceDensity={density}
      columns={3}
      class="oj-md-margin-4x-horizontal"
      maxColumns={3} 
      direction="row">
      <oj-c-input-text labelEdge="top" value="value text" labelHint="Input text - enabled with value "></oj-c-input-text>
      <oj-c-input-text  labelEdge="top" labelHint="Input text - enabled no value"></oj-c-input-text>
      <oj-c-input-text
                id="itdis"
                value="value text"
                labelEdge="top"
                labelHint="Input text - disabled"
                disabled={true}>                
      </oj-c-input-text>
      <oj-c-input-text  labelEdge="top" labelHint="disabled no value" disabled={true}></oj-c-input-text>
      <oj-c-input-text
                id="itro"
                value="value text"
                labelHint="readonly"
                readonly={true}>   
      </oj-c-input-text>
      <oj-c-input-text labelEdge="top" labelHint="readonly no value" readonly={true}></oj-c-input-text>
    
     <oj-c-input-text
          id="itemName"
          value={formData.itemName}
          labelEdge="top"
          labelHint="Name (Input text using slots)"
          onvalueChanged={onvalueChange}
        >
          <span
            slot="end"//slot value can either be 'start' or 'end'
            class="oj-text-field-start-end-icon oj-ux-ico-coffee oj-sm-margin-4x-end"
            role="presentation"
          ></span>
     </oj-c-input-text>
        {/* <span>The selected value is: {formData.itemName} </span> */}

        <oj-c-input-text
          id="itemCost"
          labelEdge="top"
          value={formData.itemCost}
          placeholder="Enter the item cost (Input text - using Converters)"
          labelHint={lblHint}
          helpHints={hintDefinition}
          onvalueChanged={onvalueChange}
          converter={eurNumberConverter}
        ></oj-c-input-text>

        {/* <span>The selected value is: {formData.itemCost} </span> */}

         <oj-c-input-text required={true} labelEdge="top" labelHint="Input text using required"></oj-c-input-text>
         <oj-c-input-text clearIcon="always" labelEdge="top"  labelHint="Input text using cler icon" value="value text"></oj-c-input-text>
         <oj-c-input-text labelEdge="top"  placeholder="what you want to become in your life" labelHint="Input text using placeholder"></oj-c-input-text>
         <oj-c-input-text labelEdge="top" labelHint="input-text using prefix" inputPrefix="$" value="10.00"></oj-c-input-text>
         <oj-c-input-text labelEdge="top"  labelHint="input-text using suffix" inputSuffix="lbs" value="150"></oj-c-input-text>
         {/* <oj-c-input-text help.instruction ="help.instruction text" labelHint="help.instruction"></oj-c-input-text>
             */}

          <oj-c-input-text
                messagesCustom={error as any}
                value="value text"
                labelEdge="top"
                labelHint="Input text - with error message"></oj-c-input-text> 
           <oj-c-input-text
                messagesCustom={warning as any}
                value="value text"
                labelEdge="top"
                labelHint="Input text - with warning"></oj-c-input-text>
          <oj-c-input-text 
                labelEdge="top" messagesCustom={info as any} value="value text"
                 labelHint="Input text - with info"></oj-c-input-text>
          <oj-c-input-text
                messagesCustom={confirmation as any}
                value="value text"
                labelEdge="top"
                labelHint="Input text - with confirmation"></oj-c-input-text>
          <oj-c-input-text
                id="text input"
                labelEdge="top"
                value={formData.value}
                rawValue={rawValue}
                length={length}
                labelHint="Input text with max length">
          </oj-c-input-text> 
          
        </oj-c-form-layout>      
    </div>
  );
};

export default InputTextCorePack;
