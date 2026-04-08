import { h } from "preact";
import { useCallback, useState } from "preact/hooks";
import "ojs/ojformlayout";
import "ojs/ojradioset";
import "ojs/ojoption";
import type { ComponentProps } from "preact";

type RadiosetProps = ComponentProps<"oj-radioset">;

type RadioOption = {
  value: string;
  label: string;
};

const baseOptions: RadioOption[] = [
  { value: "desktop", label: "Desktop" },
  { value: "laptop", label: "Laptop" },
  { value: "tablet", label: "Tablet" },
  { value: "phone", label: "Phone" },
];

const errorMessages: NonNullable<RadiosetProps["messagesCustom"]> = [
  { severity: "error", summary: "Error", detail: "error" },
];
const warningMessages: NonNullable<RadiosetProps["messagesCustom"]> = [
  { severity: "warning", summary: "Warning", detail: "warning" },
];
const infoMessages: NonNullable<RadiosetProps["messagesCustom"]> = [
  { severity: "info", summary: "Information", detail: "information" },
];
const confirmationMessages: NonNullable<RadiosetProps["messagesCustom"]> = [
  { severity: "confirmation", summary: "Confirmation", detail: "confirmation" },
];

const renderOptions = (options: RadioOption[]) =>
  options.map((option) => (
    <oj-option key={option.value} value={option.value}>
      {option.label}
    </oj-option>
  ));

export const RadiosetExample = () => {
  const [value, setValue] = useState<string>("laptop");

  const handleValueChanged = useCallback((event: CustomEvent<{ value: string }>) => {
    setValue(event.detail.value);
  }, []);

  return (
    <div id="classic-radioset-demo">
      <h5>States</h5>
      <oj-form-layout max-columns={3} direction="row">
        <oj-radioset
          id="rs-enabled"
          value={value}
          labelHint="Enabled"
          onvalueChanged={handleValueChanged}
        >
          {renderOptions(baseOptions.slice(0, 3))}
        </oj-radioset>
        <oj-radioset id="rs-disabled" value={value} 
          labelHint="Disabled" disabled>
          {renderOptions(baseOptions.slice(0, 3))}
        </oj-radioset>
        <oj-radioset id="rs-readonly" value={value} labelHint="Readonly" readonly>
          {renderOptions(baseOptions.slice(0, 3))}
        </oj-radioset>
      </oj-form-layout>

      <h5>Row Direction</h5>
      <oj-form-layout max-columns={1} direction="row">
        <oj-radioset
          id="rs-row-enabled"
          class="oj-choice-direction-row"
          value={value}
          labelHint="Direction Row Enabled"
          onvalueChanged={handleValueChanged}
        >
          {renderOptions(baseOptions.slice(0, 3))}
        </oj-radioset>
        <oj-radioset
          class="oj-choice-direction-row"
          value={value}
          labelHint="Direction Row Disabled"
          disabled
        >
          {renderOptions(baseOptions.slice(0, 3))}
        </oj-radioset>
        <oj-radioset
          class="oj-choice-direction-row"
          value={value}
          labelHint="Direction Row Readonly"
          readonly
        >
          {renderOptions(baseOptions.slice(0, 3))}
        </oj-radioset>
        <oj-radioset
          class="oj-choice-direction-row"
          value=""
          readonly
          labelHint="Readonly No Value Customized Text"
          translations={{ readonlyNoValue: "Nothing selected" }}
        >
          {renderOptions(baseOptions.slice(0, 3))}
        </oj-radioset>
      </oj-form-layout>

      <h5>Required &amp; Help</h5>
      <oj-form-layout max-columns={3} direction="row">
        <oj-radioset required labelHint="Label for Required Radioset">
          {renderOptions(baseOptions.slice(0, 3))}
        </oj-radioset>
        <oj-radioset
          value={value}
          help={{ instruction: "help.instruction text" }}
          labelHint="Help Instruction"
        >
          {renderOptions(baseOptions.slice(0, 3))}
        </oj-radioset>
        <oj-radioset
          value={value}
          helpHints={{ definition: "help-hints.definition text" }}
          labelHint="Help-hints Definition"
        >
          {renderOptions(baseOptions.slice(0, 3))}
        </oj-radioset>
        <oj-radioset
          value={value}
          helpHints={{ source: "https://www.oracle.com" }}
          labelHint="Help-hints Source"
        >
          {renderOptions(baseOptions.slice(0, 3))}
        </oj-radioset>
      </oj-form-layout>

      <h5 class="oj-sm-margin-4x-top">Messages</h5>
      <oj-form-layout max-columns={3} direction="row">
        <oj-radioset
          value={value}
          messagesCustom={errorMessages}
          labelHint="Error"
          onvalueChanged={handleValueChanged}
        >
          {renderOptions(baseOptions.slice(0, 3))}
        </oj-radioset>
        <oj-radioset
          value={value}
          messagesCustom={warningMessages}
          labelHint="Warning"
          onvalueChanged={handleValueChanged}
        >
          {renderOptions(baseOptions.slice(0, 3))}
        </oj-radioset>
        <oj-radioset
          value={value}
          messagesCustom={infoMessages}
          labelHint="Information"
          onvalueChanged={handleValueChanged}
        >
          {renderOptions(baseOptions.slice(0, 3))}
        </oj-radioset>
        <oj-radioset
          value={value}
          messagesCustom={confirmationMessages}
          labelHint="Confirmation"
          onvalueChanged={handleValueChanged}
        >
          {renderOptions(baseOptions.slice(0, 3))}
        </oj-radioset>
      </oj-form-layout>

      <h5 class="oj-sm-margin-4x-top">Wrapping</h5>
      <oj-form-layout class="oj-sm-padding-2x-horizontal demo-form-layout oj-text-color-danger">
        <oj-radioset label-hint="Direction Column" value={value} onvalueChanged={handleValueChanged}>
          {renderOptions(baseOptions)}
        </oj-radioset>
        <oj-radioset
          labelHint="Direction Row"
          class="oj-choice-direction-row"
          value={value}
          onvalueChanged={handleValueChanged}
        >
          {renderOptions(baseOptions)}
        </oj-radioset>
      </oj-form-layout>
    </div>
  );
};

export default RadiosetExample;
