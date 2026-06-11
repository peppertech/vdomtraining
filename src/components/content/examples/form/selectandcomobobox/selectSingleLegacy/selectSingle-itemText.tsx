import { h, type ComponentProps } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "ojs/ojselectsingle";

import {
  createOracleEmployeeDataProvider,
  getEmployeeItemText,
} from "./selectSingle-shared";

type ValueEvent = Parameters<
  NonNullable<ComponentProps<"oj-select-single">["onvalueChanged"]>
>[0];
export default function SelectSingleLegacyItemTextExample() {
  const dataProvider = useMemo(() => createOracleEmployeeDataProvider(), []);
  const [selectVal, setSelectVal] = useState<number | null>(102);

  const handleValueChanged = useCallback((event: ValueEvent) => {
    setSelectVal((event.detail.value as number | null | null | undefined) ?? null);
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
