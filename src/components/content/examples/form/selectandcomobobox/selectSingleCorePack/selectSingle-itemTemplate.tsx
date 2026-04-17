import { h } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "oj-c/select-single";
import {
  createOracleEmployeeDataProvider,
  getEmployeeItemText,
  renderEmployeeItemTemplate,
} from "./selectSingle-shared";

export default function SelectSingleItemTemplateExample() {
  const dataProvider = useMemo(() => createOracleEmployeeDataProvider(), []);
  const [selectVal, setSelectVal] = useState<number | null>(null);

  const handleValueChanged = useCallback((event: any) => {
    setSelectVal(event.detail.value ?? null);
  }, []);

  return (
    <div id="containerDiv">
      <oj-c-select-single
        id="selectSingleItemTemplate"
        labelHint="Select Single"
        labelEdge="inside"
        maxWidth="md"
        data={dataProvider}
        value={selectVal}
        itemText={getEmployeeItemText}
        onvalueChanged={handleValueChanged}
      >
        <template slot="itemTemplate" render={renderEmployeeItemTemplate}></template>
      </oj-c-select-single>

      <div class="oj-sm-margin-4x-top">
        <div>Current selected value</div>
        <span id="selectedval">{JSON.stringify(selectVal)}</span>
      </div>
    </div>
  );
}
