import { h } from "preact";
import "ojs/ojcheckboxset";
import "ojs/ojformlayout";
import {
  confirmationMessages,
  errorMessages,
  infoMessages,
  renderCheckboxOptions,
  technologyOptions,
  warningMessages,
  wrappingOptions,
} from "./checkBoxSet-shared";

export default function CheckBoxSetOverviewExample() {
  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
      <h5>States</h5>
      <oj-form-layout maxColumns={3} direction="row">
        <oj-checkboxset value={["laptop", "tablet"]} labelHint="Enabled">
          {renderCheckboxOptions(technologyOptions)}
        </oj-checkboxset>
        <oj-checkboxset
          value={["laptop", "tablet"]}
          labelHint="Disabled"
          disabled
        >
          {renderCheckboxOptions(technologyOptions)}
        </oj-checkboxset>
        <oj-checkboxset
          value={["laptop", "tablet"]}
          labelHint="Readonly"
          readonly
        >
          {renderCheckboxOptions(technologyOptions)}
        </oj-checkboxset>
      </oj-form-layout>

      <oj-form-layout maxColumns={1} direction="row">
        <oj-checkboxset
          value={["laptop", "tablet"]}
          class="oj-choice-direction-row"
          labelHint="Direction Row Enabled"
        >
          {renderCheckboxOptions(technologyOptions)}
        </oj-checkboxset>
        <oj-checkboxset
          value={["laptop", "tablet"]}
          class="oj-choice-direction-row"
          labelHint="Direction Row Disabled"
          disabled
        >
          {renderCheckboxOptions(technologyOptions)}
        </oj-checkboxset>
        <oj-checkboxset
          value={["laptop", "tablet"]}
          class="oj-choice-direction-row"
          labelHint="Direction Row Readonly"
          readonly
        >
          {renderCheckboxOptions(technologyOptions)}
        </oj-checkboxset>
        <oj-checkboxset
          value={[]}
          class="oj-choice-direction-row"
          labelHint="Readonly No Value Customized Text"
          readonly
          translations={{ readonlyNoValue: "Nothing selected" }}
        >
          {renderCheckboxOptions(technologyOptions)}
        </oj-checkboxset>
      </oj-form-layout>

      <h5 class="oj-sm-margin-4x-top">Required &amp; Help</h5>
      <oj-form-layout maxColumns={3} direction="row">
        <oj-checkboxset required labelHint="Label for Required Checkboxset">
          {renderCheckboxOptions(technologyOptions)}
        </oj-checkboxset>
        <oj-checkboxset
          value={["laptop", "tablet"]}
          help={{ instruction: "help.instruction text" }}
          labelHint="Help Instruction"
        >
          {renderCheckboxOptions(technologyOptions)}
        </oj-checkboxset>
        <oj-checkboxset
          value={["laptop", "tablet"]}
          helpHints={{ definition: "help-hints.definition text" }}
          labelHint="Help-hints Definition"
        >
          {renderCheckboxOptions(technologyOptions)}
        </oj-checkboxset>
        <oj-checkboxset
          value={["laptop", "tablet"]}
          helpHints={{ source: "https://www.oracle.com" }}
          labelHint="Help-hints Source"
        >
          {renderCheckboxOptions(technologyOptions)}
        </oj-checkboxset>
      </oj-form-layout>

      <h5 class="oj-sm-margin-4x-top">Messages</h5>
      <oj-form-layout maxColumns={3} direction="row">
        <oj-checkboxset
          messagesCustom={errorMessages}
          value={["laptop", "tablet"]}
          labelHint="Error"
        >
          {renderCheckboxOptions(technologyOptions)}
        </oj-checkboxset>
        <oj-checkboxset
          messagesCustom={warningMessages}
          value={["laptop", "tablet"]}
          labelHint="Warning"
        >
          {renderCheckboxOptions(technologyOptions)}
        </oj-checkboxset>
        <oj-checkboxset
          messagesCustom={infoMessages}
          value={["laptop", "tablet"]}
          labelHint="Information"
        >
          {renderCheckboxOptions(technologyOptions)}
        </oj-checkboxset>
        <oj-checkboxset
          messagesCustom={confirmationMessages}
          value={["laptop", "tablet"]}
          labelHint="Confirmation"
        >
          {renderCheckboxOptions(technologyOptions)}
        </oj-checkboxset>
      </oj-form-layout>

      <h5 class="oj-sm-margin-4x-top">Wrapping</h5>
      <oj-form-layout class="oj-sm-padding-2x-horizontal">
        <oj-checkboxset labelHint="Direction Column" value={["laptop", "tablet"]}>
          {renderCheckboxOptions(wrappingOptions)}
        </oj-checkboxset>
        <oj-checkboxset
          labelHint="Direction Row"
          value={["laptop", "tablet"]}
          class="oj-choice-direction-row"
        >
          {renderCheckboxOptions(wrappingOptions)}
        </oj-checkboxset>
      </oj-form-layout>
    </div>
  );
}
