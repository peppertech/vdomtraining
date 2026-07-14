import "ojs/ojformlayout";
import "ojs/ojinputtext";
import "ojs/ojlabelvalue";
import 'preact';
import { useState } from "preact/hooks";
import { type InputPasswordValueChangedEvent } from "./inputPassword-shared";

export default function InputPasswordBindingExample() {
  const [value, setValue] = useState("What");

  return (
    <div id="inputPasswordBinding">
      <oj-form-layout>
        <oj-input-password
          id="password"
          value={value}
          labelHint="password"
          maskIcon="visible"
          onvalueChanged={(event: InputPasswordValueChangedEvent) => {
            setValue(String(event.detail.value ?? ""));
          }}
        />
      </oj-form-layout>

      <oj-label-value>
        <oj-label slot="label">
          Value (never mirror the password like this in a real app) is
        </oj-label>
        <span slot="value">{value}</span>
      </oj-label-value>
    </div>
  );
}
