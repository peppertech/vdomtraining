import "ojs/ojselectsingle";
import 'preact';
import { type ComponentProps } from 'preact';
import { useCallback,useMemo,useState } from "preact/hooks";

import {
  createOracleEmployeeDataProvider,
  getEmployeeItemText,
  type OracleEmployee,
} from "./selectSingle-shared";

type ValueEvent = Parameters<
  NonNullable<ComponentProps<"oj-select-single">["onvalueChanged"]>
>[0];
type ValueItemEvent = Parameters<
  NonNullable<ComponentProps<"oj-select-single">["onvalueItemChanged"]>
>[0];
type EmployeeValueItem = {
  key: number;
  data: OracleEmployee;
  metadata?: {
    key: number;
  };
};

const trimValueItem = (valueItem: EmployeeValueItem | null) => {
  if (!valueItem) {
    return valueItem;
  }

  return {
    key: valueItem.key,
    data: valueItem.data,
    ...(valueItem.metadata
      ? { metadata: { key: valueItem.metadata.key } }
      : {}),
  };
};

export default function SelectSingleLegacyAdvancedSearchExample() {
  const dataProvider = useMemo(() => createOracleEmployeeDataProvider(), []);
  const [selectVal, setSelectVal] = useState<number | null>(null);
  const [selectValItem, setSelectValItem] =
    useState<EmployeeValueItem | null>(null);

  const handleValueChanged = useCallback((event: ValueEvent) => {
    setSelectVal((event.detail.value as number | null | undefined) ?? null);
  }, []);

  const handleValueItemChanged = useCallback((event: ValueItemEvent) => {
    setSelectValItem(
      (event.detail.value as EmployeeValueItem | null | undefined) ?? null,
    );
  }, []);

  return (
    <div id="containerDiv">
      <oj-select-single
        id="selectSingleLegacyAdvancedSearch"
        labelHint="Select Single Filtering All Fields"
        labelEdge="inside"
        class="oj-form-control-max-width-md"
        data={dataProvider}
        value={selectVal}
        valueItem={
          selectValItem as ComponentProps<"oj-select-single">["valueItem"]
        }
        itemText={getEmployeeItemText}
        onvalueChanged={handleValueChanged}
        onvalueItemChanged={handleValueItemChanged}
      ></oj-select-single>

      <div class="oj-sm-margin-4x-top">
        <div>Current selected value</div>
        <span id="selectedval">{JSON.stringify(selectVal)}</span>
      </div>
      <div class="oj-sm-margin-4x-top">
        <div>Current selected value-item</div>
        <span id="selectedvalitem" style={{ wordBreak: "break-all" }}>
          {JSON.stringify(trimValueItem(selectValItem))}
        </span>
      </div>
    </div>
  );
}
