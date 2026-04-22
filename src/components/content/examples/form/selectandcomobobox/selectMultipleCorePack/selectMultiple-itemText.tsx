import { h } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "oj-c/select-multiple";
import {
  createOracleEmployeeDataProvider,
  getEmployeeItemText,
  getEmployeeNames,
  type OracleEmployee,
} from "./selectMultiple-shared";

export default function SelectMultipleItemTextExample() {
  const dataProvider = useMemo(() => createOracleEmployeeDataProvider(), []);
  const [selectVal, setSelectVal] = useState<Set<OracleEmployee["EMPLOYEE_ID"]> | null>(
    new Set([101, 102]),
  );

  const handleValueChanged = useCallback((event: any) => {
    setSelectVal(event.detail.value);
  }, []);

  return (
    <div id="containerDiv">
      <oj-c-select-multiple
        id="selectMultipleItemText"
        labelHint="Select Multiple with item-text"
        labelEdge="inside"
        maxWidth="md"
        data={dataProvider}
        value={selectVal}
        itemText={getEmployeeItemText}
        onvalueChanged={handleValueChanged}
      ></oj-c-select-multiple>

      <div class="oj-sm-margin-4x-top">
        <div>Current selected employees</div>
        <span>{getEmployeeNames(selectVal)}</span>
      </div>
    </div>
  );
}
