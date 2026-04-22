import { h } from "preact";
import { useCallback, useEffect, useMemo, useState } from "preact/hooks";
import "oj-c/select-multiple";
import {
  browserOptions,
  createBrowserDataProvider,
  trimValueItems,
  type BrowserValueItems,
} from "./selectMultiple-shared";

export default function SelectMultipleValueItemsExample() {
  const emptyDataProvider = useMemo(() => createBrowserDataProvider([]), []);
  const loadedDataProvider = useMemo(
    () => createBrowserDataProvider(browserOptions),
    [],
  );
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectVal1, setSelectVal1] = useState<Set<string> | null>(null);
  const [selectVal2, setSelectVal2] = useState<Set<string> | null>(
    new Set(["CH"]),
  );
  const [selectValItems, setSelectValItems] = useState<BrowserValueItems>(
    () =>
      new Map([
        [
          "CH",
          {
            key: "CH",
            data: { value: "CH", label: "Chrome" },
            metadata: { key: "CH" },
          },
        ],
      ]),
  );

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoaded(true), 1000);
    return () => window.clearTimeout(timer);
  }, []);

  const activeDataProvider = isLoaded ? loadedDataProvider : emptyDataProvider;
  const selectedWithValueItems =
    selectVal1 ?? new Set(Array.from(selectValItems.keys()));

  const handleValueItemsValueChanged = useCallback((event: any) => {
    setSelectVal1(event.detail.value ?? null);
  }, []);

  const handleValueItemsChanged = useCallback((event: any) => {
    setSelectValItems(event.detail.value ?? new Map());
  }, []);

  const handleValueChanged = useCallback((event: any) => {
    setSelectVal2(event.detail.value ?? null);
  }, []);

  return (
    <div id="containerDiv">
      <oj-c-select-multiple
        id="selectMultipleValueItems"
        maxWidth="md"
        labelHint="Select Multiple with valueItems"
        labelEdge="inside"
        data={activeDataProvider}
        itemText="label"
        value={selectVal1}
        valueItems={selectValItems as any}
        onvalueChanged={handleValueItemsValueChanged}
        onvalueItemsChanged={handleValueItemsChanged}
      ></oj-c-select-multiple>
      <div class="oj-sm-margin-4x-vertical">
        <div>Current selected value and valueItems</div>
        <span>{JSON.stringify(Array.from(selectedWithValueItems))}</span>
        <br />
        <span>{JSON.stringify(trimValueItems(selectValItems))}</span>
      </div>

      <oj-c-select-multiple
        id="selectMultipleValueOnly"
        class="oj-sm-margin-4x-top"
        maxWidth="md"
        labelHint="Select Multiple with value"
        labelEdge="inside"
        data={activeDataProvider}
        itemText="label"
        value={selectVal2}
        onvalueChanged={handleValueChanged}
      ></oj-c-select-multiple>
      <div class="oj-sm-margin-4x-vertical">
        <div>Current selected value</div>
        <span>{JSON.stringify(Array.from(selectVal2 ?? []))}</span>
      </div>
    </div>
  );
}
