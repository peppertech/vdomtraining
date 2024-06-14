import { ComponentProps } from "preact";
import { useState, useRef } from "preact/hooks";
import Message = require("ojs/ojmessaging");
import "ojs/ojinputtext";
import "ojs/ojlabel";
import "ojs/ojformlayout";

type TextAreaProps = ComponentProps<"oj-text-area">;
const hintHintDefinition: TextAreaProps["helpHints"] = {
  definition: "cost of a single item",
};
const helpHintSource: TextAreaProps["helpHints"] = {
  source: "https://www.oracle.com",
};
const length: TextAreaProps["length"] = {
  countBy: "codePoint",
  max: 5,
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

const TextArea = () => {
  const [formData, setFormData] = useState({
    rawValue: "",
    value: "",
  });
  return (
    <div>
      <h4>States</h4>
      <oj-form-layout maxColumns={3} labelEdge="inside" direction="row">
        <oj-text-area
          value="This is a really long sample text to show text area value."
          labelHint="enabled"
          rows={3}
        ></oj-text-area>
        <oj-text-area
          id="disabled1"
          value="This is a really long sample text to show text area value."
          labelHint="disabled"
          disabled={true}
          rows={3}
        ></oj-text-area>
        <oj-text-area
          id="readonly1"
          value="This is a really long sample text to show text area value."
          labelHint="readonly"
          readonly={true}
          rows={3}
        ></oj-text-area>
        <oj-text-area labelHint="enabled no value"></oj-text-area>
        <oj-text-area
          labelHint="disabled no value"
          disabled={true}
        ></oj-text-area>
        <oj-text-area
          labelHint="readonly no value"
          readonly={true}
        ></oj-text-area>
      </oj-form-layout>

      <h4 class="oj-sm-margin-4x-top">Required, Placeholder & Max Length</h4>
      <oj-form-layout maxColumns={3} labelEdge="inside" direction="row">
        <oj-text-area required={true} labelHint="required"></oj-text-area>
        <oj-text-area
          placeholder="placeholder text"
          labelHint="placeholder"
        ></oj-text-area>
        <oj-text-area
          id="text-area"
          value={formData.value}
          rawValue={formData.rawValue}
          length={length}
          labelHint="max length"
        ></oj-text-area>
      </oj-form-layout>

      <h4 class="oj-sm-margin-4x-top">Help</h4>
      <oj-form-layout maxColumns={3} direction="row" labelEdge="inside">
        <oj-text-area
          helpHints={hintHintDefinition}
          labelHint="help.instruction"
        ></oj-text-area>

        <oj-text-area
          helpHints={helpHintSource}
          labelHint="help-hints.source"
        ></oj-text-area>
      </oj-form-layout>

      <h4 class="oj-sm-margin-4x-top">Messages</h4>
      <oj-form-layout maxColumns={3} direction="row" labelEdge="inside">
        <oj-text-area
          messages-custom={error}
          value="This is a really long sample text to show text area value."
          labelHint="error"
          rows={3}
        ></oj-text-area>
        <oj-text-area
          messages-custom={warning}
          value="This is a really long sample text to show text area value."
          labelHint="warning"
          rows={3}
        ></oj-text-area>
        <oj-text-area
          messages-custom={info}
          value="This is a really long sample text to show text area value."
          labelHint="info"
          rows={3}
        ></oj-text-area>
        <oj-text-area
          messagesCustom={confirmation}
          value="This is a really long sample text to show text area value."
          labelHint="confirmation"
          rows={3}
        ></oj-text-area>
      </oj-form-layout>
      <h4 class="oj-sm-margin-4x-top">Resize behaviour</h4>
      <oj-form-layout maxColumns={3} direction="row" labelEdge="inside">
        <oj-text-area
          id="none"
          value={formData.value}
          labelHint="This text area has the default resize-behavior of 'none'"
        ></oj-text-area>
        <oj-text-area
          id="both"
          value={formData.value}
          resizeBehavior="both"
          labelHint="This text area has resize-behavior of 'both'"
        ></oj-text-area>
        <oj-text-area
          id="horizontal"
          value={formData.value}
          resizeBehavior="horizontal"
          labelHint="This text area has resize-behavior of 'horizontal'"
        ></oj-text-area>
        <oj-text-area
          id="vertical"
          value={formData.value}
          resizeBehavior="vertical"
          labelHint="This text area has resize-behavior of 'vertical'"
        ></oj-text-area>
      </oj-form-layout>
    </div>
  );
};

export default TextArea;
