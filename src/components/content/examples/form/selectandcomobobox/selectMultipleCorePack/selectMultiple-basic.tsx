import "oj-c/select-multiple";
import 'preact';
import { type ComponentProps } from 'preact';
import { useCallback,useMemo,useState } from "preact/hooks";

import {
  createBrowserDataProvider,
  getBrowserLabels,
} from "./selectMultiple-shared";

type ValueEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-select-multiple">["onvalueChanged"]>
>[0];
export default function SelectMultipleBasicExample() {
  const dataProvider = useMemo(() => createBrowserDataProvider(), []);
  const [selectVal, setSelectVal] = useState<Set<string> | null>(
    new Set(["CH", "FF"]),
  );

  const handleValueChanged = useCallback((event: ValueEvent) => {
    setSelectVal((event.detail.value as Set<string> | null));
  }, []);

  return (
    <div id="containerDiv">
      <oj-c-select-multiple
        id="selectMultipleBasic"
        labelHint="Select Multiple"
        labelEdge="inside"
        maxWidth="md"
        data={dataProvider}
        itemText="label"
        value={selectVal}
        onvalueChanged={handleValueChanged}
      ></oj-c-select-multiple>

      <div class="oj-sm-margin-4x-top">
        <div>Current selected values</div>
        <span>{getBrowserLabels(selectVal)}</span>
      </div>
    </div>
  );
}
