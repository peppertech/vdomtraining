import { h } from "preact";
import { useState } from "preact/hooks";
import "oj-c/form-layout";
import "oj-c/input-password";
import "oj-c/input-text";
import "oj-c/text-area";

export default function InputTextCorePackNoLabelExample() {
  const [textVal, setTextVal] = useState("text");
  const [textAreaVal, setTextAreaVal] = useState("text area text");
  const [passwordVal, setPasswordVal] = useState("mypassword");

  return (
    <oj-c-form-layout direction="row" maxColumns={2}>
      <oj-c-input-text
        value={textVal}
        labelHint="Input Text No Visual Label"
        labelEdge="none"
        onvalueChanged={(event: any) => {
          setTextVal(event.detail.value ?? "");
        }}
      ></oj-c-input-text>
      <oj-c-input-text
        labelHint="Input Text No Visual Label With Placeholder"
        labelEdge="none"
        placeholder="input text placeholder"
      ></oj-c-input-text>

      <oj-c-text-area
        value={textAreaVal}
        labelHint="Text Area No Visual Label"
        labelEdge="none"
        onvalueChanged={(event: any) => {
          setTextAreaVal(event.detail.value ?? "");
        }}
      ></oj-c-text-area>
      <oj-c-text-area
        labelHint="Text Area No Visual Label With Placeholder"
        labelEdge="none"
        placeholder="text area placeholder"
      ></oj-c-text-area>

      <oj-c-input-password
        value={passwordVal}
        labelHint="Input Password No Visual Label"
        labelEdge="none"
        onvalueChanged={(event: any) => {
          setPasswordVal(event.detail.value ?? "");
        }}
      ></oj-c-input-password>
      <oj-c-input-password
        labelHint="Input Password No Visual Label With Placeholder"
        labelEdge="none"
        placeholder="input password placeholder"
      ></oj-c-input-password>
    </oj-c-form-layout>
  );
}
