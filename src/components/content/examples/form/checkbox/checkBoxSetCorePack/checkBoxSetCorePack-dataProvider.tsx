import "oj-c/button";
import "oj-c/checkboxset";
import { useCallback,useState } from "preact/hooks";
import {
  browserDataProviderOptions,
  browserShortListOptions,
  type CheckboxsetOption,
  type CheckboxsetValueChangedEvent,
} from "./checkBoxSetCorePack-shared";

import ArrayDataProvider = require("ojs/ojarraydataprovider");

export default function CheckBoxSetCorePackDataProviderExample() {
  const [selectVal, setSelectVal] = useState<string[]>(["CH"]);
  const [browsersDP, setBrowsersDP] = useState(
    new ArrayDataProvider<string, CheckboxsetOption>(browserDataProviderOptions, {
      keyAttributes: "value",
    }),
  );

  const handleValueChanged = useCallback(
    (event: CheckboxsetValueChangedEvent) => {
      setSelectVal((event.detail.value as string[] | null | undefined) ?? []);
    },
    [],
  );

  const setToBrowserShortList = useCallback(() => {
    setSelectVal(["FF"]);
    setBrowsersDP(
      new ArrayDataProvider<string, CheckboxsetOption>(browserShortListOptions, {
        keyAttributes: "value",
      }),
    );
  }, []);

  return (
    <div id="containerDiv">
      <oj-c-checkboxset
        labelHint="Checkboxset with ArrayDataProvider for the options"
        labelEdge="inside"
        options={browsersDP}
        value={selectVal}
        onvalueChanged={handleValueChanged}
      />

      <div class="oj-sm-margin-3x-vertical">
        <strong>Current component value is</strong>
        <div class="oj-sm-margin-1x-top">
          {selectVal.length ? selectVal.join(", ") : "Nothing selected"}
        </div>
      </div>

      <div class="oj-sm-margin-2x-vertical">
        <oj-c-button
          label="Change Checkboxset Options"
          onojAction={setToBrowserShortList}
        />
      </div>
    </div>
  );
}
