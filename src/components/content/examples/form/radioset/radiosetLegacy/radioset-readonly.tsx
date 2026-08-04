import "ojs/ojbutton";
import "ojs/ojlabel";
import "ojs/ojlabelvalue";
import "ojs/ojoption";
import "ojs/ojradioset";
import 'preact';
import { useState } from "preact/hooks";
import {
  colorOptions,
  renderRadioOptions,
  type RadiosetValueChangedEvent,
} from "./radioset-shared";

export default function RadiosetReadonlyExample() {
  const [currentColor, setCurrentColor] = useState("red");
  const [isColorReadonly, setIsColorReadonly] = useState(true);
  const [noValueColor, setNoValueColor] = useState("");
  const [isNoValueReadonly, setIsNoValueReadonly] = useState(true);

  return (
    <div>
      <div class="oj-sm-padding-5x-vertical">
        <oj-radioset
          id="radiosetReadonlyDemoId"
          labelHint="Colors"
          labelEdge="inside"
          value={currentColor}
          readonly={isColorReadonly}
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
              setIsColorReadonly((current) => !current);
            }}
          >
            Toggle Readonly
          </oj-button>
        </div>
      </div>

      <div class="oj-sm-padding-5x-vertical">
        <h5>Readonly radioset with translations.readonlyNoValue specified:</h5>
        <oj-radioset
          key={noValueColor}
          id="radiosetReadonlyNoValueDemoId"
          labelHint="No value"
          labelEdge="inside"
          value={noValueColor}
          readonly={isNoValueReadonly}
          translations={{ readonlyNoValue: "Nothing selected" }}
          onvalueChanged={(event: RadiosetValueChangedEvent) => {
            setNoValueColor(String(event.detail.value ?? ""));
          }}
        >
          {renderRadioOptions(colorOptions)}
        </oj-radioset>

        <div class="oj-sm-margin-3x-vertical">
          <oj-label-value>
            <oj-label slot="label">Current component value is</oj-label>
            <span slot="value">{noValueColor || "None"}</span>
          </oj-label-value>
        </div>

        <div class="oj-sm-margin-2x-vertical">
          <oj-button
            onojAction={() => {
              setNoValueColor("blue");
            }}
          >
            Set radioset value to "blue"
          </oj-button>
          <oj-button
            onojAction={() => {
              setIsNoValueReadonly((current) => !current);
            }}
          >
            Toggle Readonly
          </oj-button>
        </div>
      </div>
    </div>
  );
}
