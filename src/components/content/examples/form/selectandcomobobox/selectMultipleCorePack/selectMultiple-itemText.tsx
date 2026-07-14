import "oj-c/select-multiple";
import 'preact';
import { type ComponentProps } from 'preact';
import { useCallback,useMemo,useState } from "preact/hooks";

import {
  createOracleEmployeeDataProvider,
  getEmployeeItemText,
  getEmployeeNames,
  type OracleEmployee,
} from "./selectMultiple-shared";

type ValueEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-select-multiple">["onvalueChanged"]>
>[0];
export default function SelectMultipleItemTextExample() {
  const dataProvider = useMemo(() => createOracleEmployeeDataProvider(), []);
  const [selectVal, setSelectVal] = useState<Set<OracleEmployee["EMPLOYEE_ID"]> | null>(
    new Set([101, 102]),
  );

  const handleValueChanged = useCallback((event: ValueEvent) => {
    setSelectVal((event.detail.value as Set<OracleEmployee["EMPLOYEE_ID"]> | null));
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
