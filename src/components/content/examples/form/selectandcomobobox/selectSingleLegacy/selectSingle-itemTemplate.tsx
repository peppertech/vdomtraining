import { h } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "ojs/ojselectsingle";
import {
  createOracleEmployeeDataProvider,
  getEmployeeItemText,
  renderEmployeeItemTemplate,
} from "./selectSingle-shared";

export default function SelectSingleLegacyItemTemplateExample() {
  const dataProvider = useMemo(() => createOracleEmployeeDataProvider(), []);
  const [selectVal, setSelectVal] = useState<number | null>(102);

  const handleValueChanged = useCallback((event: any) => {
    setSelectVal(event.detail.value ?? null);
  }, []);

  return (
    <div id="containerDiv">
      <oj-select-single
        id="selectSingleLegacyItemTemplate"
        labelHint="Select Single"
        labelEdge="inside"
        class="oj-form-control-max-width-md"
        data={dataProvider}
        value={selectVal}
        itemText={getEmployeeItemText}
        onvalueChanged={handleValueChanged}
      >
        <template slot="itemTemplate" render={renderEmployeeItemTemplate}></template>
      </oj-select-single>

      <div class="oj-sm-margin-4x-top">
        <div>Current selected value</div>
        <span id="selectedval">{JSON.stringify(selectVal)}</span>
      </div>
    </div>
  );
}
