import { h } from "preact";
import { useState } from "preact/hooks";
import "ojs/ojbutton";
import "ojs/ojcheckboxset";
import "ojs/ojlabel";
import "ojs/ojlabelvalue";
import {
  type CheckboxsetValueChangedEvent,
  colorOptions,
  renderCheckboxOptions,
} from "./checkBoxSet-shared";

export default function CheckBoxSetBasicExample() {
  const [agreement, setAgreement] = useState<string[]>([]);
  const [currentColor, setCurrentColor] = useState<string[]>(["red"]);

  return (
    <div>
      <oj-checkboxset
        id="checkboxSetAgreeId"
        labelHint="License Agreement"
        labelEdge="inside"
        value={agreement}
        required
        onvalueChanged={(event: CheckboxsetValueChangedEvent) => {
          setAgreement((event.detail.value as string[]) ?? []);
        }}
      >
        <oj-option value="agree">I Agree</oj-option>
      </oj-checkboxset>
      <div class="oj-sm-margin-3x-vertical">
        <oj-label-value>
          <oj-label slot="label">Current component value is</oj-label>
          <span slot="value">{agreement.join(", ")}</span>
        </oj-label-value>
      </div>

      <oj-checkboxset
        id="checkboxSetId"
        labelHint="Colors"
        labelEdge="inside"
        value={currentColor}
        onvalueChanged={(event: CheckboxsetValueChangedEvent) => {
          setCurrentColor((event.detail.value as string[]) ?? []);
        }}
      >
        {renderCheckboxOptions(colorOptions)}
      </oj-checkboxset>
      <div class="oj-sm-margin-3x-vertical">
        <oj-label-value>
          <oj-label slot="label">Current component value is</oj-label>
          <span slot="value">{currentColor.join(", ")}</span>
        </oj-label-value>
      </div>

      <div class="oj-sm-margin-2x-vertical">
        <oj-button
          onojAction={() => {
            setCurrentColor(["aqua", "blue"]);
          }}
        >
          Set model currentColor to aqua, blue
        </oj-button>
      </div>
    </div>
  );
}
