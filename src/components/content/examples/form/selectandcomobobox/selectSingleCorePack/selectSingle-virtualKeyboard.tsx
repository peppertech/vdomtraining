import { h, type ComponentProps } from 'preact';
import { useCallback, useMemo, useState } from "preact/hooks";
import "oj-c/form-layout";
import "oj-c/radioset";
import "oj-c/select-single";

import {
  createBrowserDataProvider,
  virtualKeyboardOptions,
} from "./selectSingle-shared";

type ValueEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-select-single">["onvalueChanged"]>
>[0];
type VirtualKeyboardEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-radioset">["onvalueChanged"]>
>[0];
export default function SelectSingleVirtualKeyboardExample() {
  const dataProvider = useMemo(() => createBrowserDataProvider(), []);
  const [selectVal, setSelectVal] = useState("CH");
  const [virtualKeyboard, setVirtualKeyboard] = useState("search");

  const handleValueChanged = useCallback((event: ValueEvent) => {
    setSelectVal((event.detail.value as string));
  }, []);

  const handleVirtualKeyboardChanged = useCallback((event: VirtualKeyboardEvent) => {
    setVirtualKeyboard((event.detail.value as string));
  }, []);

  return (
    <div id="containerDiv">
      <oj-c-form-layout id="selectSingleVirtualKeyboardLayout">
        <oj-c-radioset
          id="selectVK"
          value={virtualKeyboard}
          labelHint="Virtual keyboard"
          options={virtualKeyboardOptions}
          onvalueChanged={handleVirtualKeyboardChanged}
        ></oj-c-radioset>
        <oj-c-select-single
          id="selectSingleVirtualKeyboard"
          labelHint="Select Single with virtual-keyboard"
          data={dataProvider}
          itemText="label"
          value={selectVal}
          virtualKeyboard={virtualKeyboard as ComponentProps<'oj-c-select-single'>['virtualKeyboard']}
          onvalueChanged={handleValueChanged}
        ></oj-c-select-single>
      </oj-c-form-layout>

      <div>
        <div>Current selected value</div>
        <span id="selectedval">{selectVal}</span>
      </div>
    </div>
  );
}
