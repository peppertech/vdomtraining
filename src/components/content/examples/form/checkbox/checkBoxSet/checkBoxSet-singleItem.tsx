import "ojs/ojcheckboxset";
import "ojs/ojformlayout";
import 'preact';
import { useState } from "preact/hooks";
import { type CheckboxsetValueChangedEvent } from "./checkBoxSet-shared";

export default function CheckBoxSetSingleItemExample() {
  const [agreement, setAgreement] = useState<string[]>([]);
  const [agreement2, setAgreement2] = useState<string[]>([]);

  return (
    <div>
      <h3>Outside a form</h3>
      <div class="oj-flex">
        <div class="oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-checkboxset
            labelHint="License Agreement"
            labelEdge="inside"
            value={agreement}
            onvalueChanged={(event: CheckboxsetValueChangedEvent) => {
              setAgreement((event.detail.value as string[]) ?? []);
            }}
          >
            <oj-option value="agree">I Agree</oj-option>
          </oj-checkboxset>
        </div>
      </div>

      <h3>Inside a form</h3>
      <oj-form-layout>
        <oj-checkboxset
          value={agreement2}
          labelHint="License Agreement"
          onvalueChanged={(event: CheckboxsetValueChangedEvent) => {
            setAgreement2((event.detail.value as string[]) ?? []);
          }}
        >
          <oj-option value="agree">I Agree</oj-option>
        </oj-checkboxset>
      </oj-form-layout>
    </div>
  );
}
