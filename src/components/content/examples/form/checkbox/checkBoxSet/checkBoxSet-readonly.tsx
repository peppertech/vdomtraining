import { h } from "preact";
import { useState } from "preact/hooks";
import "ojs/ojbutton";
import "ojs/ojcheckboxset";
import "ojs/ojlabel";
import "ojs/ojlabelvalue";
import {
  colorOptions,
  drinkOptions,
  renderCheckboxOptions,
  type CheckboxsetValueChangedEvent,
} from "./checkBoxSet-shared";

export default function CheckBoxSetReadonlyExample() {
  const [agreement, setAgreement] = useState<string[]>(["agree"]);
  const [agreementReadonly, setAgreementReadonly] = useState(true);
  const [currentColor, setCurrentColor] = useState<string[]>([
    "blue",
    "green",
    "lime",
  ]);
  const [colorReadonly, setColorReadonly] = useState(true);
  const [currentDrink, setCurrentDrink] = useState<string[]>(["coffee", "tea"]);
  const [drinkReadonly, setDrinkReadonly] = useState(true);
  const [noValueDrink, setNoValueDrink] = useState<string[]>([]);
  const [noValueReadonly, setNoValueReadonly] = useState(true);

  return (
    <div>
      <div class="oj-sm-padding-5x-vertical">
        <h5>Readonly checkboxset with single item selected:</h5>
        <oj-checkboxset
          labelHint="License Agreement"
          labelEdge="inside"
          value={agreement}
          readonly={agreementReadonly}
          required
          onvalueChanged={(event: CheckboxsetValueChangedEvent) => {
            setAgreement((event.detail.value as string[]) ?? []);
          }}
        >
          <oj-option value="agree">I Agree</oj-option>
          <oj-option value="notagree">I do not Agree</oj-option>
        </oj-checkboxset>

        <div class="oj-sm-margin-3x-vertical">
          <oj-label-value>
            <oj-label slot="label">Current component value is</oj-label>
            <span slot="value">{agreement.join(", ")}</span>
          </oj-label-value>
        </div>

        <div class="oj-sm-margin-2x-vertical">
          <oj-button
            onojAction={() => {
              setAgreementReadonly((current) => !current);
            }}
          >
            Toggle Readonly
          </oj-button>
        </div>
      </div>

      <div class="oj-sm-padding-5x-vertical">
        <h5>Readonly checkboxset with multiple item selected:</h5>
        <oj-checkboxset
          labelHint="Colors"
          labelEdge="inside"
          value={currentColor}
          readonly={colorReadonly}
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
              setCurrentColor(["red", "aqua"]);
            }}
          >
            Select Red and Aqua as Current Colors
          </oj-button>
          <oj-button
            onojAction={() => {
              setColorReadonly((current) => !current);
            }}
          >
            Toggle Readonly
          </oj-button>
        </div>
      </div>

      <div class="oj-sm-padding-5x-vertical">
        <h5>Readonly inline checkboxset with multiple items selected:</h5>
        <oj-checkboxset
          class="oj-choice-direction-row"
          labelHint="Drinks"
          labelEdge="inside"
          value={currentDrink}
          readonly={drinkReadonly}
          onvalueChanged={(event: CheckboxsetValueChangedEvent) => {
            setCurrentDrink((event.detail.value as string[]) ?? []);
          }}
        >
          {renderCheckboxOptions(drinkOptions)}
        </oj-checkboxset>

        <div class="oj-sm-margin-3x-vertical">
          <oj-label-value>
            <oj-label slot="label">Current component value is</oj-label>
            <span slot="value">{currentDrink.join(", ")}</span>
          </oj-label-value>
        </div>

        <div class="oj-sm-margin-2x-vertical">
          <oj-button
            onojAction={() => {
              setCurrentDrink(["juice", "coke"]);
            }}
          >
            Select Juice and Coke as Drinks
          </oj-button>
          <oj-button
            onojAction={() => {
              setDrinkReadonly((current) => !current);
            }}
          >
            Toggle Readonly
          </oj-button>
        </div>
      </div>

      <div class="oj-sm-padding-5x-vertical">
        <h5>Readonly checkboxset with translations.readonly-no-value specified:</h5>
        <oj-checkboxset
          class="oj-choice-direction-row"
          labelHint="Drinks"
          labelEdge="inside"
          value={noValueDrink}
          translations={{ readonlyNoValue: "Nothing selected" }}
          readonly={noValueReadonly}
          onvalueChanged={(event: CheckboxsetValueChangedEvent) => {
            setNoValueDrink((event.detail.value as string[]) ?? []);
          }}
        >
          {renderCheckboxOptions(drinkOptions)}
        </oj-checkboxset>

        <div class="oj-sm-margin-3x-vertical">
          <oj-label-value>
            <oj-label slot="label">Current component value is</oj-label>
            <span slot="value">{noValueDrink.join(", ")}</span>
          </oj-label-value>
        </div>

        <div class="oj-sm-margin-2x-vertical">
          <oj-button
            onojAction={() => {
              setNoValueDrink(["coke"]);
            }}
          >
            Set checkbox value to ["coke"]
          </oj-button>
          <oj-button
            onojAction={() => {
              setNoValueReadonly((current) => !current);
            }}
          >
            Toggle Readonly
          </oj-button>
        </div>
      </div>
    </div>
  );
}
