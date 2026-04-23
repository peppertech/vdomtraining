import { h } from "preact";
import { useState } from "preact/hooks";
import "ojs/ojbutton";
import "ojs/ojcheckboxset";
import "ojs/ojlabel";
import "ojs/ojlabelvalue";
import {
  browserOptions,
  browserShortListOptions,
  createCheckboxOptionsDataProvider,
  type CheckboxsetValueChangedEvent,
} from "./checkBoxSet-shared";

export default function CheckBoxSetDataProviderExample() {
  const [selectVal, setSelectVal] = useState<string[]>(["CH"]);
  const [browsersDP, setBrowsersDP] = useState(() =>
    createCheckboxOptionsDataProvider(browserOptions),
  );

  return (
    <div>
      <oj-checkboxset
        labelHint="Checkboxset with ArrayDataProvider for the options"
        labelEdge="inside"
        options={browsersDP}
        value={selectVal}
        onvalueChanged={(event: CheckboxsetValueChangedEvent) => {
          setSelectVal((event.detail.value as string[]) ?? []);
        }}
      ></oj-checkboxset>

      <div class="oj-sm-margin-3x-vertical">
        <oj-label-value>
          <oj-label slot="label">Current component value is</oj-label>
          <span slot="value">{selectVal.join(", ")}</span>
        </oj-label-value>
      </div>

      <div class="oj-sm-margin-2x-vertical">
        <oj-button
          onojAction={() => {
            setSelectVal(["FF"]);
            setBrowsersDP(
              createCheckboxOptionsDataProvider(browserShortListOptions),
            );
          }}
        >
          Change Checkboxset Options
        </oj-button>
      </div>
    </div>
  );
}
