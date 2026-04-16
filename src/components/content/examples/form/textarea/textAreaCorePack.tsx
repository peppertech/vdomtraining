import { ComponentProps } from "preact";
import { useState, useRef } from "preact/hooks";
import Message = require("ojs/ojmessaging");
import "oj-c/text-area";
import "oj-c/form-layout";

const draftMessage: string =
  "This is a really long sample text to show text area value. This is a really long sample text to show text area value.";
type TextAreaProps = ComponentProps<"oj-c-text-area">;
const hintHintDefinition: TextAreaProps["helpHints"] = {
  definition: "cost of a single item",
};
const helpHintSource: TextAreaProps["helpHints"] = {
  source: "https://www.oracle.com",
};
const length: TextAreaProps["length"] = {
  countBy: "codePoint",
  max: 15,
  counter: "remaining",
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

const TextAreaCorePack = () => {
  const [formData, setFormData] = useState({
    rawValue: "",
    value: "",
  });
  return (
    <div>
      <h4>States </h4>
      <oj-c-form-layout maxColumns={3} labelEdge="inside" direction="row">
        <oj-c-text-area
          class="oj-sm-width-1"
          length={{
            max: 4000,
            counter: "remaining",
          }}
          rows={3}
          maxRows={5}
          value={draftMessage}
          aria-label="Edit instructions"
      
        ></oj-c-text-area>

        <oj-c-text-area
          value="This is a really long sample text to show text area value."
          labelHint="enabled"
          rows={3}
        ></oj-c-text-area>
        <oj-c-text-area
          id="disabled1"
          value="This is a really long sample text to show text area value."
          labelHint="disabled"
          disabled={true}
          rows={3}
        ></oj-c-text-area>
        <oj-c-text-area
          id="readonly1"
          value="This is a really long sample text to show text area value."
          labelHint="readonly"
          readonly={true}
          rows={3}
        ></oj-c-text-area>
        <oj-c-text-area labelHint="enabled no value"></oj-c-text-area>
        <oj-c-text-area
          labelHint="disabled no value"
          disabled={true}
        ></oj-c-text-area>
        <oj-c-text-area
          labelHint="readonly no value"
          readonly={true}
        ></oj-c-text-area>
      </oj-c-form-layout>

      <h4>States outside oj-c-form-layout</h4>
      <div class="oj-flex oj-sm-padding-2x-vertical">
        <oj-c-text-area
          class="oj-sm-12 oj-md-4 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal"
          value="This is a really long sample text to show text area value."
          labelHint="enabled"
          rows={3}
        ></oj-c-text-area>
        <oj-c-text-area
          class="oj-sm-12 oj-md-4 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal"
          id="disabled1"
          value="This is a really long sample text to show text area value."
          labelHint="disabled"
          disabled={true}
          rows={3}
        ></oj-c-text-area>
        <oj-c-text-area
          class="oj-sm-12 oj-md-4 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal"
          id="readonly1"
          value="This is a really long sample text to show text area value."
          labelHint="readonly"
          readonly={true}
          rows={3}
        ></oj-c-text-area>
      </div>
      <div class="oj-flex oj-sm-padding-2x-vertical">
        <oj-c-text-area
          class="oj-sm-12 oj-md-4 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal"
          labelHint="enabled no value"
        ></oj-c-text-area>
        <oj-c-text-area
          class="oj-sm-12 oj-md-4 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal"
          labelHint="disabled no value"
          disabled={true}
        ></oj-c-text-area>
        <oj-c-text-area
          class="oj-sm-12 oj-md-4 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal"
          labelHint="readonly no value"
          readonly={true}
        ></oj-c-text-area>
      </div>

      <h4 class="oj-sm-margin-4x-top">Required, Placeholder & Max Length</h4>
      <oj-c-form-layout maxColumns={3} labelEdge="inside" direction="row">
        <oj-c-text-area required={true} labelHint="required"></oj-c-text-area>
        <oj-c-text-area
          placeholder="placeholder text"
          labelHint="placeholder"
        ></oj-c-text-area>
        <oj-c-text-area
          id="text-area"
          value={formData.value}
          rawValue={formData.rawValue as any}
          length={length}
          labelHint="max length"
        ></oj-c-text-area>
      </oj-c-form-layout>

      <h4 class="oj-sm-margin-4x-top">Help</h4>
      <oj-c-form-layout maxColumns={3} direction="row" labelEdge="inside">
        <oj-c-text-area
          helpHints={hintHintDefinition}
          labelHint="help.instruction"
        ></oj-c-text-area>

        <oj-c-text-area
          helpHints={helpHintSource}
          labelHint="help-hints.source"
        ></oj-c-text-area>
      </oj-c-form-layout>

      <h4 class="oj-sm-margin-4x-top">Messages</h4>
      <oj-c-form-layout maxColumns={3} direction="row" labelEdge="inside">
        <oj-c-text-area
          messagesCustom={error as any}
          value="This is a really long sample text to show text area value."
          labelHint="error"
          rows={3}
        ></oj-c-text-area>
        <oj-c-text-area
          messagesCustom={warning as any}
          value="This is a really long sample text to show text area value."
          labelHint="warning"
          rows={3}
        ></oj-c-text-area>
        <oj-c-text-area
          messagesCustom={info as any}
          value="This is a really long sample text to show text area value."
          labelHint="info"
          rows={3}
        ></oj-c-text-area>
        <oj-c-text-area
          messagesCustom={confirmation as any}
          value="This is a really long sample text to show text area value."
          labelHint="confirmation"
          rows={3}
        ></oj-c-text-area>
      </oj-c-form-layout>
      <h4 class="oj-sm-margin-4x-top">Resize behaviour</h4>
      <oj-c-form-layout maxColumns={3} direction="row" labelEdge="inside">
        <oj-c-text-area
          id="none"
          value={formData.value}
          labelHint="This text area has the default resize-behavior of 'none'"
        ></oj-c-text-area>
        <oj-c-text-area
          id="both"
          value={formData.value}
          resizeBehavior="both"
          labelHint="This text area has resize-behavior of 'both'"
        ></oj-c-text-area>
        <oj-c-text-area
          id="horizontal"
          value={formData.value}
          resizeBehavior="horizontal"
          labelHint="This text area has resize-behavior of 'horizontal'"
        ></oj-c-text-area>
        <oj-c-text-area
          id="vertical"
          value={formData.value}
          resizeBehavior="vertical"
          labelHint="This text area has resize-behavior of 'vertical'"
        ></oj-c-text-area>
      </oj-c-form-layout>
    </div>
  );
};

export default TextAreaCorePack;
