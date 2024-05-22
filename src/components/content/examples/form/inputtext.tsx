import { h, ComponentProps } from "preact";
import { useState, useRef } from "preact/hooks";
import * as NumberConverter from "ojs/ojconverter-number";
import * as ConverterUtilsI18n from "ojs/ojconverterutils-i18n";
import "ojs/ojformlayout";
import "ojs/ojinputtext";
import Message = require("ojs/ojmessaging");

type InputTextProps = ComponentProps<"oj-input-text">;
type FormLayoutProps = ComponentProps<"oj-form-layout">;

const length: InputTextProps['length'] ={
  countBy : "codePoint",
  max: 5
}
const hintDefinition: InputTextProps["helpHints"] = {
  definition: "cost of a single item",
};
const placeholder: InputTextProps["placeholder"] = "Enter item cost";
const lblHint: InputTextProps["labelHint"] = "Input text - using converter";
const eurNumberConverter = new NumberConverter.IntlNumberConverter({
  style: "currency",
  currency: "INR",
  currencyDisplay: "symbol",
});

let rawValue :any;

const error:Message[] = [{ summary: "summary", detail: "detail", severity: "error" }];
const warning = [{ summary: "summary", detail: "detail", severity: "warning" }];
const info = [{ summary: "summary", detail: "detail", severity: "info" }];
const confirmation = [{ summary: "summary", detail: "detail", severity: "confirmation" }];
// 'any' type is being used because method is used by multiple ..
const InputText = () => {
  const [formData, setFormData] = useState({
    itemName: "Kopi Luwak beans (2 lbs)",
    itemBuyer: "",
    itemCost: "598.42",
    rawValue:"",
    value:""
  });

  const [isDisabled, setIsDisabled] = useState(true);
  const [density, setDensity] = useState<
    FormLayoutProps["userAssistanceDensity"]
  >("efficient");

  const onValueChange = (event: any) => {
    setFormData({
      ...formData,
      [event.currentTarget.id]: event.detail.value,
    });
  };

  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
      <h4 class="oj-typography-heading-sm"> Input Text (oj-input-text) - Examples </h4>
      <oj-form-layout
        userAssistanceDensity={density}
        columns={3}
        labelEdge="top" 
        class="oj-md-margin-4x-horizontal"
        maxColumns={3} 
        direction="row"
      >
      <oj-input-text labelEdge='provided'  value="value text" labelHint="Input text - enabled with value "></oj-input-text>
      <oj-input-text labelEdge='provided'  labelHint="Input text - enabled no value"></oj-input-text>
      <oj-input-text
                id="enabledNoVal"
                labelEdge='provided' 
                value="value text"
                labelHint="Input text - disabled"
                disabled={true}>                
      </oj-input-text>
      <oj-input-text labelEdge='provided'  labelHint="disabled no value" disabled={true}></oj-input-text>
      <oj-input-text
                id="disabledNoVal"
                labelEdge='provided' 
                value="value text"
                labelHint="readonly"
                readonly={true}>   
      </oj-input-text>
      <oj-input-text  labelEdge='provided'  labelHint="readonly no value" readonly={true}></oj-input-text>
    
       <oj-input-text
          id="itemName"
           labelEdge='provided' 
          value={formData.itemName}
          labelHint="Input text - using slots"
          onvalueChanged={onValueChange}
        >
          <span
            slot="end"//slot value can either be 'start' or 'end'
            class="oj-text-field-start-end-icon oj-ux-ico-coffee oj-sm-margin-4x-end"
            role="presentation"
          ></span>
     </oj-input-text>
        {/* <span>The selected value is: {formData.itemName} </span> */}

        <oj-input-text
          id="itemCost"
           labelEdge='provided' 
          value={formData.itemCost}
          placeholder="Enter the item cost (Input text - using Converters)"
          labelHint={lblHint}
          helpHints={hintDefinition}
          onvalueChanged={onValueChange}
          converter={eurNumberConverter}
        ></oj-input-text>

        {/* <span>The selected value is: {formData.itemCost} </span> */}

         <oj-input-text  labelEdge='provided' required={true}  labelHint="Input text using required"></oj-input-text>
         <oj-input-text  labelEdge='provided'  clearIcon="always"  labelHint="Input text using cler icon" value="value text"></oj-input-text>
         <oj-input-text  labelEdge='provided'   placeholder="what you want to become in your life" labelHint="Input text using placeholder"></oj-input-text>
         
          <oj-input-text
                messagesCustom={error as any}
                value="value text"
                 labelEdge='provided' 
                labelHint="Input text - with error message"></oj-input-text> 
           <oj-input-text
                messagesCustom={warning as any}
                value="value text"
                 labelEdge='provided' 
                labelHint="Input text - with warning"></oj-input-text>
          <oj-input-text 
                 messagesCustom={info as any} value="value text"  labelEdge='provided' 
                 labelHint="Input text - with info"></oj-input-text>
          <oj-input-text
                messagesCustom={confirmation as any}
                value="value text"  labelEdge='provided' 
                labelHint="Input text - with confirmation"></oj-input-text>
          <oj-input-text
                id="text input"
                value={formData.value}
                rawValue={rawValue}
                length={length}
                 labelEdge='provided' 
                labelHint="Input text with max length">
          </oj-input-text> 

      </oj-form-layout>
    </div>
  );
};

export default InputText;
