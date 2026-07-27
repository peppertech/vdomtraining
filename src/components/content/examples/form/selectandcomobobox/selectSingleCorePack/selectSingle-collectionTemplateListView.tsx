import "oj-c/form-layout";
import "oj-c/select-single";
import type { SelectSingle } from "oj-c/select-single";
import * as employeeDataText from "text!../../data/employeeData.json";
import 'preact';
import { type ComponentProps } from 'preact';
import { useCallback,useMemo,useState } from "preact/hooks";

import {
  createOracleEmployeeDataProvider,
  getEmployeeItemText,
  renderEmployeeCollectionListView,
  type OracleEmployee,
} from "./selectSingle-shared";

type ValueEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-select-single">["onvalueChanged"]>
>[0];
const employeeData = JSON.parse(employeeDataText) as OracleEmployee[];
export default function SelectSingleCollectionTemplateListViewExample() {
  const dataProvider = useMemo(
    () => createOracleEmployeeDataProvider(employeeData),
    [],
  );
  const [selectVal, setSelectVal] = useState<number | null>(103);

  const handleValueChanged = useCallback((event: ValueEvent) => {
    setSelectVal((event.detail.value as number | null | null | undefined) ?? null);
  }, []);

  const collectionTemplate: NonNullable<
    Parameters<typeof SelectSingle<
      OracleEmployee["EMPLOYEE_ID"],
      OracleEmployee
    >>[0]["collectionTemplate"]
  > = useCallback(
    (collection) =>
      renderEmployeeCollectionListView(collection, (value) => setSelectVal(value)),
    [],
  );

  return (
    <div id="containerDiv">
      <oj-c-form-layout>
        <oj-c-select-single
          labelHint="Select Single"
          labelEdge="inside"
          data={dataProvider}
          value={selectVal}
          itemText={getEmployeeItemText}
          onvalueChanged={handleValueChanged}
        >
          <template
            slot="collectionTemplate"
            render={collectionTemplate}
          ></template>
        </oj-c-select-single>
      </oj-c-form-layout>

      <div class="oj-sm-margin-4x-top">
        <div>Current selected value</div>
        <span id="selectedval">{JSON.stringify(selectVal)}</span>
      </div>
    </div>
  );
}
