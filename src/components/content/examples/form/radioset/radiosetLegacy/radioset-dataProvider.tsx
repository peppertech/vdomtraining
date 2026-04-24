import { h } from "preact";
import { useState } from "preact/hooks";
import "ojs/ojbutton";
import "ojs/ojlabel";
import "ojs/ojlabelvalue";
import "ojs/ojradioset";
import {
  browserOptions,
  browserShortListOptions,
  createRadiosetOptionsDataProvider,
  type RadiosetValueChangedEvent,
} from "./radioset-shared";

export default function RadiosetDataProviderExample() {
  const [selectVal, setSelectVal] = useState("CH");
  const [browsersDP, setBrowsersDP] = useState(() =>
    createRadiosetOptionsDataProvider(browserOptions),
  );

  return (
    <div>
      <oj-radioset
        labelHint="Radioset with ArrayDataProvider for the options"
        labelEdge="inside"
        options={browsersDP}
        value={selectVal}
        onvalueChanged={(event: RadiosetValueChangedEvent) => {
          setSelectVal(String(event.detail.value ?? ""));
        }}
      ></oj-radioset>

      <div class="oj-sm-margin-3x-vertical">
        <oj-label-value>
          <oj-label slot="label">Current component value is</oj-label>
          <span slot="value">{selectVal}</span>
        </oj-label-value>
      </div>

      <div class="oj-sm-margin-2x-vertical">
        <oj-button
          onojAction={() => {
            setSelectVal("FF");
            setBrowsersDP(
              createRadiosetOptionsDataProvider(browserShortListOptions),
            );
          }}
        >
          Change Radioset Options
        </oj-button>
      </div>
    </div>
  );
}
