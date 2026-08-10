import "ojs/ojselectsingle";
import 'preact';
import { type ComponentProps } from 'preact';
import { useCallback,useMemo,useState } from "preact/hooks";
import { createBrowserDataProvider } from "./selectSingle-shared";

type ValueEvent = Parameters<
  NonNullable<ComponentProps<"oj-select-single">["onvalueChanged"]>
>[0];

export default function SelectSingleLegacyAddToListExample() {
  const dataProvider = useMemo(() => createBrowserDataProvider(), []);
  const [selectVal, setSelectVal] = useState<string | null>("CH");

  const handleValueChanged = useCallback((event: ValueEvent) => {
    setSelectVal((event.detail.value as string | null | undefined) ?? null);
  }, []);

  return (
    <div id="containerDiv">
      <oj-select-single
        id="selectSingleLegacyAddToList"
        labelHint="Select Single with ArrayDataProvider"
        labelEdge="inside"
        class="oj-form-control-max-width-md"
        data={dataProvider}
        value={selectVal}
        itemText="label"
        onvalueChanged={handleValueChanged}
      ></oj-select-single>

      <div class="oj-sm-margin-4x-top">
        <div>Current selected value</div>
        <span id="selectedval">{selectVal ?? ""}</span>
      </div>
    </div>
  );
}
