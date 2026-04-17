import { h } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "ojs/ojselectsingle";
import { createBrowserDataProvider } from "./selectSingle-shared";

export default function SelectSingleLegacyBasicExample() {
  const dataProvider = useMemo(() => createBrowserDataProvider(), []);
  const [selectVal, setSelectVal] = useState("CH");

  const handleValueChanged = useCallback((event: any) => {
    setSelectVal(event.detail.value);
  }, []);

  return (
    <div id="containerDiv">
      <oj-select-single
        id="selectSingleLegacyBasic"
        labelHint="Select Single with ArrayDataProvider"
        labelEdge="inside"
        class="oj-form-control-max-width-md"
        data={dataProvider}
        value={selectVal}
        itemText="label"
        onvalueChanged={handleValueChanged}
      ></oj-select-single>

      <div class="oj-sm-margin-4x-top">
        <div>Current selected value</div>
        <span id="selectedval">{selectVal}</span>
      </div>
    </div>
  );
}
