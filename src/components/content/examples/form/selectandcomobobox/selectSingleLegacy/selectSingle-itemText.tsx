import { h } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "ojs/ojselectsingle";
import {
  createOracleEmployeeDataProvider,
  getEmployeeItemText,
} from "./selectSingle-shared";

export default function SelectSingleLegacyItemTextExample() {
  const dataProvider = useMemo(() => createOracleEmployeeDataProvider(), []);
  const [selectVal, setSelectVal] = useState<number | null>(102);

  const handleValueChanged = useCallback((event: any) => {
    setSelectVal(event.detail.value ?? null);
  }, []);

  return (
    <div id="containerDiv">
      <oj-select-single
        id="selectSingleLegacyItemText"
        labelHint="Select Single with item-text"
        labelEdge="inside"
        class="oj-form-control-max-width-md"
        data={dataProvider}
        value={selectVal}
        itemText={getEmployeeItemText}
        onvalueChanged={handleValueChanged}
      ></oj-select-single>

      <div class="oj-sm-margin-4x-top">
        <div>Current selected value</div>
        <span id="selectedval">{JSON.stringify(selectVal)}</span>
      </div>
    </div>
  );
}
