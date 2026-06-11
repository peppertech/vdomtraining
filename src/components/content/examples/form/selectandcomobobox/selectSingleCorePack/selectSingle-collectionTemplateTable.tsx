import { h, type ComponentProps } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "oj-c/select-single";
import type { CSelectSingleElement } from "oj-c/select-single";

import {
  createOracleEmployeeDataProvider,
  getEmployeeItemText,
  renderEmployeeCollectionTable,
  type OracleEmployee,
} from "./selectSingle-shared";

type ValueEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-select-single">["onvalueChanged"]>
>[0];
export default function SelectSingleCollectionTemplateTableExample() {
  const dataProvider = useMemo(() => createOracleEmployeeDataProvider(), []);
  const [selectVal, setSelectVal] = useState<number | null>(103);

  const handleValueChanged = useCallback((event: ValueEvent) => {
    setSelectVal((event.detail.value as number | null | null | undefined) ?? null);
  }, []);

  const collectionTemplate = useCallback(
    (
      collection: CSelectSingleElement.CollectionTemplateContext<
        OracleEmployee["EMPLOYEE_ID"],
        OracleEmployee
      >,
    ) =>
      renderEmployeeCollectionTable(collection, (value) => setSelectVal(value)),
    [],
  );

  return (
    <div id="containerDiv">
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

      <div class="oj-sm-margin-4x-top">
        <div>Current selected value</div>
        <span id="selectedval">{JSON.stringify(selectVal)}</span>
      </div>
    </div>
  );
}
