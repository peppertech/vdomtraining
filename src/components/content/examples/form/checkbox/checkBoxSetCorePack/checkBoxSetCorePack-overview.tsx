import "oj-c/checkboxset";
import "oj-c/form-layout";

import {
  browserDataProvider,
  confirmationMessages,
  errorMessages,
  infoMessages,
  warningMessages,
  wrappingDataProvider,
} from "./checkBoxSetCorePack-shared";

export default function CheckBoxSetCorePackOverviewExample() {
  return (
    <div>
      <h5>States</h5>
      <oj-c-form-layout maxColumns={3} direction="row">
        <oj-c-checkboxset
          value={["chrome", "edge"]}
          options={browserDataProvider}
          labelHint="Enabled"
        />
        <oj-c-checkboxset
          value={["chrome", "edge"]}
          options={browserDataProvider}
          labelHint="Disabled"
          disabled={true}
        />
        <oj-c-checkboxset
          value={["chrome", "edge"]}
          options={browserDataProvider}
          labelHint="Readonly"
          readonly={true}
        />
      </oj-c-form-layout>

      <h5>Row Direction</h5>
      <oj-c-form-layout maxColumns={1} direction="row">
        <oj-c-checkboxset
          value={["chrome", "edge"]}
          direction="row"
          options={browserDataProvider}
          labelHint="Direction Row Enabled"
        />
        <oj-c-checkboxset
          value={["chrome", "edge"]}
          direction="row"
          options={browserDataProvider}
          labelHint="Direction Row Disabled"
          disabled={true}
        />
        <oj-c-checkboxset
          value={["chrome", "edge"]}
          direction="row"
          options={browserDataProvider}
          labelHint="Direction Row Readonly"
          readonly={true}
        />
      </oj-c-form-layout>

      <h5>Label Edge</h5>
      <div class="oj-flex">
        <div class="oj-sm-12 oj-md-6 oj-lg-3 oj-flex-item">
          <oj-c-checkboxset
            labelHint="Label Edge Inside"
            labelEdge="inside"
            options={browserDataProvider}
          />
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-3 oj-flex-item">
          <oj-c-checkboxset
            labelHint="Label Edge Top"
            labelEdge="top"
            options={browserDataProvider}
          />
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-3 oj-flex-item">
          <oj-c-checkboxset
            labelHint="Label Edge Start"
            labelEdge="start"
            options={browserDataProvider}
          />
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-3 oj-flex-item">
          <oj-c-checkboxset
            aria-label="Checkboxset with aria label"
            labelEdge="none"
            options={browserDataProvider}
          />
        </div>
      </div>

      <h5>Required and Help</h5>
      <oj-c-form-layout maxColumns={4} direction="row">
        <oj-c-checkboxset required={true} options={browserDataProvider} labelHint="Required" />
        <oj-c-checkboxset
          value={["chrome", "edge"]}
          help={{ instruction: "help.instruction text" }}
          options={browserDataProvider}
          labelHint="Help Instruction"
        />
        <oj-c-checkboxset
          value={["chrome", "edge"]}
          helpHints={{ definition: "help-hints.definition text" }}
          options={browserDataProvider}
          labelHint="Help-hints Definition"
        />
        <oj-c-checkboxset
          value={["chrome", "edge"]}
          helpHints={{
            definition: "help-hints.definition text",
            source: "https://www.oracle.com",
            sourceText: "help-hints.source-text",
          }}
          options={browserDataProvider}
          labelHint="Help-hints Source"
        />
      </oj-c-form-layout>

      <h5 class="oj-sm-margin-4x-top">Standard Messages</h5>
      <oj-c-form-layout maxColumns={4} direction="row">
        <oj-c-checkboxset
          messagesCustom={errorMessages}
          value={["chrome", "edge"]}
          options={browserDataProvider}
          labelHint="Error"
        />
        <oj-c-checkboxset
          messagesCustom={warningMessages}
          value={["chrome", "edge"]}
          options={browserDataProvider}
          labelHint="Warning"
        />
        <oj-c-checkboxset
          messagesCustom={infoMessages}
          value={["chrome", "edge"]}
          options={browserDataProvider}
          labelHint="Information"
        />
        <oj-c-checkboxset
          messagesCustom={confirmationMessages}
          value={["chrome", "edge"]}
          options={browserDataProvider}
          labelHint="Confirmation"
        />
      </oj-c-form-layout>

      <h5 class="oj-sm-margin-4x-top">Wrapping</h5>
      <div class="demo-form-layout oj-sm-padding-2x-horizontal">
        <oj-c-form-layout>
          <oj-c-checkboxset
            labelHint="Direction Column"
            options={wrappingDataProvider}
            value={["salmon", "scallops"]}
          />
          <oj-c-checkboxset
            labelHint="Direction Row"
            options={wrappingDataProvider}
            value={["salmon", "scallops"]}
            direction="row"
          />
        </oj-c-form-layout>
      </div>
    </div>
  );
}
