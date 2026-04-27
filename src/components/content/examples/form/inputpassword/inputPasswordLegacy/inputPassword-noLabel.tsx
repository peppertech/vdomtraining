import { h } from "preact";
import { useState } from "preact/hooks";
import "ojs/ojformlayout";
import "ojs/ojinputtext";
import { type InputPasswordValueChangedEvent } from "./inputPassword-shared";

export default function InputPasswordNoLabelExample() {
  const [value, setValue] = useState("mypassword");

  return (
    <oj-form-layout direction="row" maxColumns={2}>
      <oj-input-password
        id="inputpwd"
        value={value}
        labelHint="Input Password No Visual Label"
        labelEdge="none"
        onvalueChanged={(event: InputPasswordValueChangedEvent) => {
          setValue(String(event.detail.value ?? ""));
        }}
      />
      <oj-input-password
        id="inputpwd2"
        labelHint="Input Password No Visual Label With Placeholder"
        labelEdge="none"
        placeholder="input password placeholder"
      />
    </oj-form-layout>
  );
}
