import { h, type ComponentProps } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "oj-c/select-single";

import {
  createOracleEmployeeDataProvider,
  getEmployeeItemText,
} from "./selectSingle-shared";

type ValueEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-select-single">["onvalueChanged"]>
>[0];
export default function SelectSingleItemTextExample() {
  const dataProvider = useMemo(() => createOracleEmployeeDataProvider(), []);
  const [selectVal, setSelectVal] = useState<number | null>(null);

  const handleValueChanged = useCallback((event: ValueEvent) => {
    setSelectVal((event.detail.value as number | null | null | undefined) ?? null);
  }, []);

  return (
    <div id="containerDiv">
      <oj-c-select-single
        id="selectSingleItemText"
        labelHint="Select Single with item-text"
        labelEdge="inside"
        maxWidth="md"
        data={dataProvider}
        value={selectVal}
        itemText={getEmployeeItemText}
        onvalueChanged={handleValueChanged}
      ></oj-c-select-single>

      <div class="oj-sm-margin-4x-top">
        <div>Current selected value</div>
        <span id="selectedval">{JSON.stringify(selectVal)}</span>
      </div>
    </div>
  );
}
