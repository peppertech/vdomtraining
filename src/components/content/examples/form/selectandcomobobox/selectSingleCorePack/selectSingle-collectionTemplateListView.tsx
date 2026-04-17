import { h } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "oj-c/form-layout";
import "oj-c/select-single";
import {
  createOracleEmployeeDataProvider,
  getEmployeeItemText,
  renderEmployeeCollectionListView,
} from "./selectSingle-shared";

export default function SelectSingleCollectionTemplateListViewExample() {
  const dataProvider = useMemo(() => createOracleEmployeeDataProvider(), []);
  const [selectVal, setSelectVal] = useState<number | null>(103);

  const handleValueChanged = useCallback((event: any) => {
    setSelectVal(event.detail.value ?? null);
  }, []);

  const collectionTemplate = useCallback(
    (collection: any) =>
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
