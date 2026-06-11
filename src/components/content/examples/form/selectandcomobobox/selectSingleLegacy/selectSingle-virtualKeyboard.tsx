import { h, type ComponentProps } from 'preact';
import { useCallback, useMemo, useState } from "preact/hooks";
import "ojs/ojformlayout";
import "ojs/ojoption";
import "ojs/ojradioset";
import "ojs/ojselectsingle";
import { createBrowserDataProvider } from "./selectSingle-shared";

type ValueEvent = Parameters<
  NonNullable<ComponentProps<"oj-select-single">["onvalueChanged"]>
>[0];
type VirtualKeyboardEvent = Parameters<
  NonNullable<ComponentProps<"oj-radioset">["onvalueChanged"]>
>[0];
export default function SelectSingleLegacyVirtualKeyboardExample() {
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
      <oj-form-layout id="legacySelectSingleVirtualKeyboardLayout">
        <oj-radioset
          id="legacySelectSingleVirtualKeyboard"
          value={virtualKeyboard}
          labelHint="Virtual keyboard"
          onvalueChanged={handleVirtualKeyboardChanged}
        >
          <oj-option value="email">email</oj-option>
          <oj-option value="number">number</oj-option>
          <oj-option value="search">search</oj-option>
          <oj-option value="tel">tel</oj-option>
          <oj-option value="text">text</oj-option>
          <oj-option value="url">url</oj-option>
        </oj-radioset>
        <oj-select-single
          id="legacySelectSingleVirtualKeyboardField"
          labelHint="Select Single with virtual-keyboard"
          data={dataProvider}
          itemText="label"
          value={selectVal}
          virtualKeyboard={virtualKeyboard as ComponentProps<'oj-select-single'>['virtualKeyboard']}
          class="oj-form-control-max-width-md"
          onvalueChanged={handleValueChanged}
        ></oj-select-single>
      </oj-form-layout>
      <div>
        <div>Current selected value</div>
        <span id="selectedval">{selectVal}</span>
      </div>
    </div>
  );
}
