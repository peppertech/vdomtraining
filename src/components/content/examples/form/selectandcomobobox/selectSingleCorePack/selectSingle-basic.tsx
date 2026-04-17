import { h } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "oj-c/select-single";
import { createBrowserDataProvider } from "./selectSingle-shared";

export default function SelectSingleBasicExample() {
  const dataProvider = useMemo(() => createBrowserDataProvider(), []);
  const [selectVal, setSelectVal] = useState("CH");

  const handleValueChanged = useCallback((event: any) => {
    setSelectVal(event.detail.value);
  }, []);

  return (
    <div id="containerDiv">
      <oj-c-select-single
        id="selectSingleBasic"
        labelHint="Select Single with ArrayDataProvider"
        labelEdge="inside"
        maxWidth="md"
        data={dataProvider}
        value={selectVal}
        itemText="label"
        onvalueChanged={handleValueChanged}
      ></oj-c-select-single>

      <div class="oj-sm-margin-4x-top">
        <div>Current selected value</div>
        <span id="selectedval">{selectVal}</span>
      </div>
    </div>
  );
}
