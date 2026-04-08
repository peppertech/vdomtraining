import { h, ComponentProps } from "preact";
import { useState, useRef } from "preact/hooks";
import * as NumberConverter from "ojs/ojconverter-number";
import * as ConverterUtilsI18n from "ojs/ojconverterutils-i18n";
import "ojs/ojformlayout";
import "ojs/ojcheckboxset";
import "ojs/ojoption";
import "ojs/ojinputtext";
import Message = require("ojs/ojmessaging");
import "ojs/ojdatetimepicker";
import ArrayDataProvider = require("ojs/ojarraydataprovider");

type InputTextProps = ComponentProps<"oj-input-text">;
type FormLayoutProps = ComponentProps<"oj-form-layout">;

const length: InputTextProps["length"] = {
  countBy: "codePoint",
  max: 5,
};

const hintDefinition: InputTextProps["helpHints"] = {
  definition: "help hint definition",
};
const helpHintSource: InputTextProps["helpHints"] = {
  source: "https://www.oracle.com",
};
const lblHint: InputTextProps["labelHint"] =
  "Input text - using converter and help hint definiton";
 
 const browsers = [
  { value: 'IE', label: 'Internet Explorer' },
  { value: 'FF', label: 'Firefox' },
  { value: 'CH', label: 'Chrome' },
  { value: 'OP', label: 'Opera' },
  { value: 'SA', label: 'Safari' },
];
const browsersDP = new ArrayDataProvider(browsers, {
  keyAttributes: 'value',
});

const error: Message[] = [{ summary: "summary", detail: "detail", severity: "error" }];
const warning: Message[] = [{ summary: "summary", detail: "detail", severity: "warning"}];
const info: Message[] = [{ summary: "summary", detail: "detail", severity: "info" }];
const confirmation: Message[] = [{ summary: "summary", detail: "detail", severity: "confirmation"}];
// 'any' type is being used because method is used by multiple ..
const CheckBoxSet = () => {
  //-- for date
  const [formData, setFormData] = useState({
    initialValue: ["laptop","tablet"],
  });

   const [formDatas, setFormDatas] = useState({
    selectedValue: ["FF","CH"],
  });

  const [isDisabled, setIsDisabled] = useState(true);
  const [density, setDensity] = useState<FormLayoutProps["userAssistanceDensity"]>("efficient");

  const onValueChange = (event: any) => {
    setFormData({
      ...formData,
      //itemCost: event.detail.value
      //[event.currentTarget.id]: event.detail.value,
    });
  };

  const onCheckBoxSelectionChange =(event:any)=>{
    console.log(event.detail.value);
    setFormDatas({
      ...formDatas,
      selectedValue: event.detail.value
    });
  }

  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
      <h5 class="oj-sm-margin-4x-top oj-sm-padding-2x-bottom"> States </h5>
      <oj-form-layout
        userAssistanceDensity={density}
        columns={3}
        maxColumns={3}
        direction="row"
      >
         <oj-checkboxset id="enabledCheckboxset" value={formData.initialValue} labelHint="Enabled">
                <oj-option value="desktop">Desktop</oj-option>
                <oj-option value="laptop">Laptop</oj-option>
                <oj-option value="tablet">Tablet</oj-option>
        </oj-checkboxset>

          <oj-checkboxset id="disabledCheckboxset" value={formData.initialValue} label-hint="Disabled" disabled>
                <oj-option value="desktop">Desktop</oj-option>
                <oj-option value="laptop">Laptop</oj-option>
                <oj-option value="tablet">Tablet</oj-option>
        </oj-checkboxset>
       
        <oj-checkboxset id="readonlyCheckboxset" value={formData.initialValue} label-hint="Readonly" readonly>
                <oj-option value="desktop">Desktop</oj-option>
                <oj-option value="laptop">Laptop</oj-option>
                <oj-option value="tablet">Tablet</oj-option>
        </oj-checkboxset>
  
      </oj-form-layout>

       <oj-form-layout  maxColumns={1}direction="row">
        <oj-checkboxset
         onvalueChanged={onCheckBoxSelectionChange}
          labelHint="Exclude Selected Encounter Classes"
          labelEdge="inside"
          options={browsersDP}
          value={formDatas.selectedValue}
          disabled={false}>
        </oj-checkboxset> 

          <oj-checkboxset
                id="rowDirectionEnabledCheckboxset"
                value= {["laptop","tablet"]}
                class="oj-choice-direction-row"
                labelHint="Direction Row Enabled">
                <oj-option value="desktop">Desktop</oj-option>
                <oj-option value="laptop">Laptop</oj-option>
                <oj-option value="tablet">Tablet</oj-option>
          </oj-checkboxset>

              <oj-checkboxset
                value={["laptop","tablet"]}
                class="oj-choice-direction-row"
                labelHint="Direction Row Disabled"
                disabled>
                <oj-option value="desktop">Desktop</oj-option>
                <oj-option value="laptop">Laptop</oj-option>
                <oj-option value="tablet">Tablet</oj-option>
              </oj-checkboxset>

              <oj-checkboxset
                value={["laptop","tablet"]}
                class="oj-choice-direction-row"
                labelHint="Direction Row Readonly"
                readonly>
                <oj-option value="desktop">Desktop</oj-option>
                <oj-option value="laptop">Laptop</oj-option>
                <oj-option value="tablet">Tablet</oj-option>
              </oj-checkboxset>

              <oj-checkboxset
                value={[]}
                class="oj-choice-direction-row"
                labelHint="Readonly No Value Customized Text"
                readonly
                //translations.readonly-no-value="Nothing selected"
                >
                <oj-option value="desktop">Desktop</oj-option>
                <oj-option value="laptop">Laptop</oj-option>
                <oj-option value="tablet">Tablet</oj-option>
              </oj-checkboxset>

       </oj-form-layout>
       <h5 class="oj-sm-margin-4x-top oj-sm-padding-2x-bottom"> Required &amp; Help</h5>
       <oj-form-layout maxColumns={3} direction="row">
              <oj-checkboxset required labelHint="Label for Required Checkboxset">
                <oj-option value="desktop">Desktop</oj-option>
                <oj-option value="laptop">Laptop</oj-option>
                <oj-option value="tablet">Tablet</oj-option>
              </oj-checkboxset>
              <oj-checkboxset
                value={["laptop","tablet"]}
                labelHint={lblHint}>
                <oj-option value="desktop">Desktop</oj-option>
                <oj-option value="laptop">Laptop</oj-option>
                <oj-option value="tablet">Tablet</oj-option>
              </oj-checkboxset>
              <oj-checkboxset
                value={["laptop","tablet"]}
                 helpHints={hintDefinition}>
                <oj-option value="desktop">Desktop</oj-option>
                <oj-option value="laptop">Laptop</oj-option>
                <oj-option value="tablet">Tablet</oj-option>
              </oj-checkboxset>
              <oj-checkboxset
                value={["laptop","tablet"]}
               helpHints={helpHintSource}>
                <oj-option value="desktop">Desktop</oj-option>
                <oj-option value="laptop">Laptop</oj-option>
                <oj-option value="tablet">Tablet</oj-option>
              </oj-checkboxset>
       </oj-form-layout>

        <h5 class="oj-sm-margin-4x-top oj-sm-padding-2x-bottom"> Messages</h5>
        <oj-form-layout maxColumns={3} direction="row">
              <oj-checkboxset messagesCustom={error} value={["laptop","tablet"]} labelHint="Error">
                <oj-option value="desktop">Desktop</oj-option>
                <oj-option value="laptop">Laptop</oj-option>
                <oj-option value="tablet">Tablet</oj-option>
              </oj-checkboxset>
              <oj-checkboxset messagesCustom={warning} value={["laptop","tablet"]} labelHint="Warning">
                <oj-option value="desktop">Desktop</oj-option>
                <oj-option value="laptop">Laptop</oj-option>
                <oj-option value="tablet">Tablet</oj-option>
              </oj-checkboxset>
              <oj-checkboxset messagesCustom={info} value={["laptop","tablet"]} labelHint="Information">
                <oj-option value="desktop">Desktop</oj-option>
                <oj-option value="laptop">Laptop</oj-option>
                <oj-option value="tablet">Tablet</oj-option>
              </oj-checkboxset>
              <oj-checkboxset messagesCustom={confirmation} value={["laptop","tablet"]}   label-hint="Confirmation">
                <oj-option value="desktop">Desktop</oj-option>
                <oj-option value="laptop">Laptop</oj-option>
                <oj-option value="tablet">Tablet</oj-option>
              </oj-checkboxset>
        </oj-form-layout>

        <h5 class="oj-sm-margin-4x-top oj-sm-padding-2x-bottom">Wrapping</h5>
        <oj-form-layout class="oj-sm-padding-2x-horizontal demo-form-layout oj-form-layout oj-complete oj-formlayout-max-cols-1">
              <oj-checkboxset labelHint="Direction Column" value={["laptop","tablet"]}>
                <oj-option value="desktop">Desktop</oj-option>
                <oj-option value="laptop">Laptop</oj-option>
                <oj-option value="tablet">Tablet - Apple - iPad with Wi-Fi - 32GB - Space Gray</oj-option>
                <oj-option value="phone">Phone</oj-option>
              </oj-checkboxset>

              <oj-checkboxset
                labelHint="Direction Row"
                value={["laptop","tablet"]}
                class="oj-choice-direction-row">
                <oj-option value="desktop">Desktop</oj-option>
                <oj-option value="laptop">Laptop</oj-option>
                <oj-option value="tablet">Tablet - Apple - iPad with Wi-Fi - 32GB - Space Gray</oj-option>
                <oj-option value="phone">Phone</oj-option>
              </oj-checkboxset>

        </oj-form-layout>
    </div>
  );
};

export default CheckBoxSet;
