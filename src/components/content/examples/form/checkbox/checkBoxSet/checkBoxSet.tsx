import { h, ComponentProps } from "preact";
import { useState } from "preact/hooks";
import "ojs/ojformlayout";
import "ojs/ojcheckboxset";
import "ojs/ojoption";
import Message = require("ojs/ojmessaging");
import ArrayDataProvider = require("ojs/ojarraydataprovider");

type CheckboxsetValueChangedEvent = Parameters<
  NonNullable<CheckboxsetProps["onvalueChanged"]>
>[0];
type FormLayoutProps = ComponentProps<"oj-form-layout">;
type CheckboxsetProps = ComponentProps<"oj-checkboxset">;

const hintDefinition: CheckboxsetProps["helpHints"] = {
  definition: "help hint definition",
};
const helpHintSource: CheckboxsetProps["helpHints"] = {
  source: "https://www.oracle.com",
};
const lblHint: CheckboxsetProps["labelHint"] =
  "Checkboxset with label hint";
 
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
  const [formData] = useState({
    initialValue: ["laptop", "tablet"],
  });

  const [formDatas, setFormDatas] = useState({
    selectedValue: ["FF", "CH"],
  });

  const [density] = useState<FormLayoutProps["userAssistanceDensity"]>("efficient");

  const onCheckBoxSelectionChange = (event: CheckboxsetValueChangedEvent) => {
    setFormDatas({
      ...formDatas,
      selectedValue: event.detail.value ?? [],
    });
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
         <oj-checkboxset id="enabledCheckboxset" value={formData.initialValue} labelHint="Enabled">
                <oj-option value="desktop">Desktop</oj-option>
                <oj-option value="laptop">Laptop</oj-option>
                <oj-option value="tablet">Tablet</oj-option>
        </oj-checkboxset>

          <oj-checkboxset id="disabledCheckboxset" value={formData.initialValue} labelHint="Disabled" disabled>
                <oj-option value="desktop">Desktop</oj-option>
                <oj-option value="laptop">Laptop</oj-option>
                <oj-option value="tablet">Tablet</oj-option>
        </oj-checkboxset>
       
        <oj-checkboxset id="readonlyCheckboxset" value={formData.initialValue} labelHint="Readonly" readonly>
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
              <oj-checkboxset messagesCustom={confirmation} value={["laptop","tablet"]} labelHint="Confirmation">
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
