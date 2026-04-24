import { h } from "preact";
import { useState } from "preact/hooks";
import "ojs/ojbutton";
import "ojs/ojlabel";
import "ojs/ojlabelvalue";
import "ojs/ojoption";
import "ojs/ojradioset";
import {
  colorOptions,
  renderRadioOptions,
  type RadiosetValueChangedEvent,
} from "./radioset-shared";

export default function RadiosetBasicExample() {
  const [currentColor, setCurrentColor] = useState("red");

  return (
    <div>
      <oj-radioset
        id="radiosetBasicDemoId"
        labelHint="Colors"
        labelEdge="inside"
        value={currentColor}
        onvalueChanged={(event: RadiosetValueChangedEvent) => {
          setCurrentColor(String(event.detail.value ?? ""));
        }}
      >
        {renderRadioOptions(colorOptions)}
      </oj-radioset>

      <div class="oj-sm-margin-3x-vertical">
        <oj-label-value>
          <oj-label slot="label">Current component value is</oj-label>
          <span slot="value">{currentColor}</span>
        </oj-label-value>
      </div>

      <div class="oj-sm-margin-2x-vertical">
        <oj-button
          onojAction={() => {
            setCurrentColor("blue");
          }}
        >
          Set model currentColor to blue
        </oj-button>
      </div>
    </div>
  );
}
