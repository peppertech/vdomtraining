import "ojs/ojselectsingle";
import 'preact';
import { useMemo,useState } from "preact/hooks";
import {
  createOracleEmployeeDataProvider,
  getEmployeeItemText,
  renderEmployeeCollectionTable,
} from "./selectSingle-shared";

export default function SelectSingleLegacyCollectionTemplateTableExample() {
  const dataProvider = useMemo(() => createOracleEmployeeDataProvider(), []);
  const [selectVal, setSelectVal] = useState<number | null>(103);

  return (
    <div id="containerDiv">
      <oj-select-single
        id="selectSingleLegacyCollectionTable"
        labelHint="Select Single"
        labelEdge="inside"
        class="oj-form-control-max-width-md"
        data={dataProvider}
        value={selectVal}
        itemText={getEmployeeItemText}
      >
        <template
          slot="collectionTemplate"
          render={(collection) =>
            renderEmployeeCollectionTable(collection, (value) =>
              setSelectVal(value),
            )}
        ></template>
      </oj-select-single>

      <div class="oj-sm-margin-4x-top">
        <div>Current selected value</div>
        <span id="selectedval">{JSON.stringify(selectVal)}</span>
      </div>
    </div>
  );
}
