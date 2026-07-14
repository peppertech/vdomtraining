import "oj-c/form-layout";
import "oj-c/rich-checkboxset";

import {
  confirmationMessages,
  errorMessages,
  industryOptions,
  infoMessages,
  warningMessages,
} from "./richCheckBoxsetCorePack-shared";

export default function RichCheckBoxsetCorePackOverviewExample() {
  return (
    <div id="div1">
      <h5>States</h5>
      <oj-c-form-layout fullWidth direction="row">
        <oj-c-rich-checkboxset
          layout="md"
          value={["automotive"]}
          options={industryOptions}
          labelHint="Enabled"
        />
        <oj-c-rich-checkboxset
          layout="md"
          value={["automotive"]}
          labelHint="Disabled"
          options={industryOptions}
          disabled={true}
        />
        <oj-c-rich-checkboxset
          layout="md"
          value={["automotive"]}
          labelHint="Readonly"
          options={industryOptions}
          readonly={true}
        />
      </oj-c-form-layout>

      <h5>Label Edge</h5>
      <oj-c-form-layout fullWidth direction="row">
        <oj-c-rich-checkboxset
          layout="md"
          value={["automotive"]}
          labelHint="Label Edge Inside"
          options={industryOptions}
        />
        <oj-c-rich-checkboxset
          layout="md"
          value={["automotive"]}
          labelHint="Label Edge Top"
          labelEdge="top"
          options={industryOptions}
        />
        <oj-c-rich-checkboxset
          layout="md"
          value={["automotive"]}
          labelHint="Label Edge Start"
          labelEdge="start"
          options={industryOptions}
        />
      </oj-c-form-layout>

      <h5>Required and Help</h5>
      <oj-c-form-layout fullWidth direction="row">
        <oj-c-rich-checkboxset
          layout="md"
          required={true}
          options={industryOptions}
          labelHint="Required"
        />
        <oj-c-rich-checkboxset
          layout="md"
          value={["automotive"]}
          help={{ instruction: "help.instruction text" }}
          options={industryOptions}
          labelHint="Help Instruction"
        />
        <oj-c-rich-checkboxset
          layout="md"
          value={["automotive"]}
          helpHints={{ definition: "help-hints.definition text" }}
          options={industryOptions}
          labelHint="Help-hints Definition"
        />
        <oj-c-rich-checkboxset
          layout="md"
          value={["automotive"]}
          helpHints={{
            source: "https://www.oracle.com",
            sourceText: "Learn More",
          }}
          options={industryOptions}
          labelHint="Help-hints Source"
        />
      </oj-c-form-layout>

      <h5 class="oj-sm-margin-4x-top">Messages</h5>
      <oj-c-form-layout fullWidth direction="row">
        <oj-c-rich-checkboxset
          layout="md"
          messagesCustom={errorMessages}
          value={["automotive"]}
          options={industryOptions}
          labelHint="Error"
        />
        <oj-c-rich-checkboxset
          layout="md"
          messagesCustom={warningMessages}
          value={["automotive"]}
          options={industryOptions}
          labelHint="Warning"
        />
        <oj-c-rich-checkboxset
          layout="md"
          messagesCustom={infoMessages}
          value={["automotive"]}
          options={industryOptions}
          labelHint="Information"
        />
        <oj-c-rich-checkboxset
          layout="md"
          messagesCustom={confirmationMessages}
          value={["automotive"]}
          options={industryOptions}
          labelHint="Confirmation"
        />
      </oj-c-form-layout>

      <h5 class="oj-sm-margin-4x-top">Selection Rules Preview</h5>
      <oj-c-form-layout direction="row" fullWidth>
        <oj-c-rich-checkboxset
          layout="sm"
          options={industryOptions}
          labelHint="Range Selection, (min-selected=2 and max-selected=3)"
          help={{ instruction: "Select 2 to 3 industries." }}
          minSelected={2}
          maxSelected={3}
        />
      </oj-c-form-layout>

      <h5 class="oj-sm-margin-4x-top">Layouts Preview</h5>
      <oj-c-form-layout fullWidth direction="row">
        <oj-c-rich-checkboxset
          layout="xl"
          value={["automotive"]}
          options={industryOptions}
          labelHint="XL Layout"
        />
        <oj-c-rich-checkboxset
          layout="md"
          value={["automotive"]}
          options={industryOptions}
          labelHint="MD Layout"
        />
        <oj-c-rich-checkboxset
          layout="sm"
          value={["automotive"]}
          options={industryOptions}
          labelHint="SM Layout"
        />
      </oj-c-form-layout>
    </div>
  );
}
