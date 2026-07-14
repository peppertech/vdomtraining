import "ojs/ojcheckboxset";
import "ojs/ojformlayout";
import "ojs/ojlabel";
import "ojs/ojlabelvalue";
import 'preact';
import { useState } from "preact/hooks";
import { type CheckboxsetValueChangedEvent } from "./checkBoxSet-shared";

export default function CheckBoxSetNoItemLabelExample() {
  const [currentColor, setCurrentColor] = useState<string[]>(["blue"]);

  return (
    <div>
      <oj-form-layout>
        <oj-checkboxset
          labelHint="Colors"
          labelEdge="none"
          value={currentColor}
          onvalueChanged={(event: CheckboxsetValueChangedEvent) => {
            setCurrentColor((event.detail.value as string[]) ?? []);
          }}
        >
          <oj-option value="blue" aria-label="blue"></oj-option>
        </oj-checkboxset>
      </oj-form-layout>

      <oj-label-value>
        <oj-label slot="label">Current component value is</oj-label>
        <span slot="value">{currentColor.join(", ")}</span>
      </oj-label-value>
    </div>
  );
}
