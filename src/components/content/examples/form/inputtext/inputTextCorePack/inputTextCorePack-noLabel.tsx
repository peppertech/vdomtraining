import "oj-c/form-layout";
import "oj-c/input-password";
import "oj-c/input-text";
import "oj-c/text-area";
import 'preact';
import { useState } from "preact/hooks";

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
        onvalueChanged={(event) => {
          setTextVal((event.detail.value as string | null | undefined) ?? "");
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
        onvalueChanged={(event) => {
          setTextAreaVal((event.detail.value as string | null | undefined) ?? "");
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
        onvalueChanged={(event) => {
          setPasswordVal((event.detail.value as string | null | undefined) ?? "");
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
