import "ojs/ojformlayout";
import "ojs/ojselectsingle";
import 'preact';
import { useMemo,useState } from "preact/hooks";
import {
  createOracleEmployeeDataProvider,
  getEmployeeItemText,
  renderEmployeeCollectionListView,
} from "./selectSingle-shared";

export default function SelectSingleLegacyCollectionTemplateListViewExample() {
  const dataProvider = useMemo(() => createOracleEmployeeDataProvider(), []);
  const [selectVal, setSelectVal] = useState<number | null>(103);

  return (
    <div id="containerDiv">
      <oj-form-layout>
        <oj-select-single
          id="selectSingleLegacyCollectionListView"
          labelHint="Select Single"
          labelEdge="inside"
          data={dataProvider}
          value={selectVal}
          itemText={getEmployeeItemText}
        >
          <template
            slot="collectionTemplate"
            render={(collection) =>
              renderEmployeeCollectionListView(collection, (value) =>
                setSelectVal(value),
              )}
          ></template>
        </oj-select-single>
      </oj-form-layout>

      <div class="oj-sm-margin-4x-top">
        <div>Current selected value</div>
        <span id="selectedval">{JSON.stringify(selectVal)}</span>
      </div>
    </div>
  );
}
