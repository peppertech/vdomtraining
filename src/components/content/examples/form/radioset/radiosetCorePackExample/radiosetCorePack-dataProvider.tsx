import "oj-c/button";
import "oj-c/radioset";
import "ojs/ojlabel";
import "ojs/ojlabelvalue";
import 'preact';
import { useCallback,useState } from "preact/hooks";
import {
  browserOptions,
  browserShortListOptions,
  createOptionsDataProvider,
  type RadiosetValueChangedEvent,
} from "./radiosetCorePack-shared";

export default function RadiosetCorePackDataProviderExample() {
  const [selectVal, setSelectVal] = useState("CH");
  const [browsersDP, setBrowsersDP] = useState(() =>
    createOptionsDataProvider(browserOptions),
  );

  const handleValueChanged = useCallback((event: RadiosetValueChangedEvent) => {
    setSelectVal(String(event.detail.value ?? ""));
  }, []);

  return (
    <div id="form-container">
      <div class="oj-panel oj-bg-info-30 oj-sm-margin-4x-bottom">
        <oj-c-button
          label="Change Radioset Options"
          onojAction={() => {
            setSelectVal("FF");
            setBrowsersDP(createOptionsDataProvider(browserShortListOptions));
          }}
        />
      </div>

      <div id="radioset-container">
        <oj-c-radioset
          labelHint="Radioset with ArrayDataProvider for the options"
          labelEdge="inside"
          options={browsersDP}
          value={selectVal}
          onvalueChanged={handleValueChanged}
        />

        <div class="oj-sm-margin-3x-vertical">
          <oj-label-value>
            <oj-label slot="label">Current component value is</oj-label>
            <span slot="value">{selectVal}</span>
          </oj-label-value>
        </div>
      </div>
    </div>
  );
}
