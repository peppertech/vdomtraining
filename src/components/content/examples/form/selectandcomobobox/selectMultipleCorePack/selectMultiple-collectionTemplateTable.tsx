import { h, type ComponentProps } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "oj-c/select-multiple";
import type { CSelectMultipleElement } from "oj-c/select-multiple";

import {
  createOracleEmployeeDataProvider,
  getEmployeeItemText,
  getEmployeeNames,
  renderEmployeeCollectionTable,
  type OracleEmployee,
} from "./selectMultiple-shared";

type ValueEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-select-multiple">["onvalueChanged"]>
>[0];
export default function SelectMultipleCollectionTemplateTableExample() {
  const dataProvider = useMemo(() => createOracleEmployeeDataProvider(), []);
  const [selectVal, setSelectVal] = useState<Set<OracleEmployee["EMPLOYEE_ID"]> | null>(
    new Set([101, 102]),
  );

  const handleValueChanged = useCallback((event: ValueEvent) => {
    setSelectVal((event.detail.value as Set<OracleEmployee["EMPLOYEE_ID"]> | null));
  }, []);

  const collectionTemplate = useCallback(
    (
      collection: CSelectMultipleElement.CollectionTemplateContext<
        OracleEmployee["EMPLOYEE_ID"],
        OracleEmployee
      >,
    ) => renderEmployeeCollectionTable(collection),
    [],
  );

  return (
    <div id="containerDiv">
      <oj-c-select-multiple
        id="selectMultipleCollectionTable"
        labelHint="Select Multiple - Collection Template"
        labelEdge="inside"
        maxWidth="md"
        data={dataProvider}
        value={selectVal}
        itemText={getEmployeeItemText}
        onvalueChanged={handleValueChanged}
      >
        <template slot="collectionTemplate" render={collectionTemplate}></template>
      </oj-c-select-multiple>

      <div class="oj-sm-margin-4x-top">
        <div>Current selected employees</div>
        <span>{getEmployeeNames(selectVal)}</span>
      </div>
    </div>
  );
}
