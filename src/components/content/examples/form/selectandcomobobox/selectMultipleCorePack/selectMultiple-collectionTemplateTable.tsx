import { h } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "oj-c/select-multiple";
import {
  createOracleEmployeeDataProvider,
  getEmployeeItemText,
  getEmployeeNames,
  renderEmployeeCollectionTable,
  type OracleEmployee,
} from "./selectMultiple-shared";

export default function SelectMultipleCollectionTemplateTableExample() {
  const dataProvider = useMemo(() => createOracleEmployeeDataProvider(), []);
  const [selectVal, setSelectVal] = useState<Set<OracleEmployee["EMPLOYEE_ID"]> | null>(
    new Set([101, 102]),
  );

  const handleValueChanged = useCallback((event: any) => {
    setSelectVal(event.detail.value);
  }, []);

  const collectionTemplate = useCallback(
    (collection: any) => renderEmployeeCollectionTable(collection),
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
