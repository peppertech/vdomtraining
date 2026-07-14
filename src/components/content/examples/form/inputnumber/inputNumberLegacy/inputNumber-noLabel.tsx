import "ojs/ojformlayout";
import "ojs/ojinputnumber";
import 'preact';
import { useState } from "preact/hooks";
import { type InputNumberValueChangedEvent } from "./inputNumber-shared";

export default function InputNumberNoLabelExample() {
  const [value, setValue] = useState(12340);

  return (
    <oj-form-layout direction="row" maxColumns={2}>
      <oj-input-number
        id="in"
        value={value}
        labelHint="Input Number No Visual Label"
        labelEdge="none"
        min={0}
        max={100000}
        onvalueChanged={(event: InputNumberValueChangedEvent) => {
          setValue(Number(event.detail.value ?? 0));
        }}
      />
      <oj-input-number
        id="in2"
        labelHint="Input Number No Visual Label With Placeholder"
        labelEdge="none"
        min={0}
        max={100}
        placeholder="input number placeholder"
      />
    </oj-form-layout>
  );
}
