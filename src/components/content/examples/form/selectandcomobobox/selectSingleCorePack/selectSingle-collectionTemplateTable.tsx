import { h } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "oj-c/select-single";
import {
  createOracleEmployeeDataProvider,
  getEmployeeItemText,
  renderEmployeeCollectionTable,
} from "./selectSingle-shared";

export default function SelectSingleCollectionTemplateTableExample() {
  const dataProvider = useMemo(() => createOracleEmployeeDataProvider(), []);
  const [selectVal, setSelectVal] = useState<number | null>(103);

  const handleValueChanged = useCallback((event: any) => {
    setSelectVal(event.detail.value ?? null);
  }, []);

  const collectionTemplate = useCallback(
    (collection: any) =>
      renderEmployeeCollectionTable(collection, (value) => setSelectVal(value)),
    [],
  );

  return (
    <div id="containerDiv">
      <oj-c-select-single
        labelHint="Select Single"
        labelEdge="inside"
        maxWidth="md"
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

      <div class="oj-sm-margin-4x-top">
        <div>Current selected value</div>
        <span id="selectedval">{JSON.stringify(selectVal)}</span>
      </div>
    </div>
  );
}
