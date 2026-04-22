import { h } from "preact";
import { useCallback, useEffect, useMemo, useRef, useState } from "preact/hooks";
import type { CSelectMultipleElement } from "oj-c/select-multiple";
import "oj-c/select-multiple";
import {
  browserOptions,
  createBrowserDataProvider,
  type BrowserOption,
} from "./selectMultiple-shared";

const toOptionKey = (searchText: string) =>
  searchText.trim().toUpperCase().replace(/[^A-Z0-9]+/g, "_");

export default function SelectMultipleAddToListExample() {
  const selectRef = useRef<CSelectMultipleElement<string, Record<string, any>> | null>(null);
  const [options, setOptions] = useState<BrowserOption[]>(browserOptions);
  const [selectVal, setSelectVal] = useState<Set<string> | null>(
    new Set(["CH", "FF"]),
  );
  const dataProvider = useMemo(() => createBrowserDataProvider(options), [options]);

  const handleValueChanged = useCallback((event: any) => {
    setSelectVal(event.detail.value);
  }, []);

  const handleAddToListAction = useCallback((event: Event) => {
    const searchText =
      ((event as CustomEvent<{ searchText?: string }>).detail?.searchText ?? "").trim();
    if (!searchText) {
      return;
    }

    const existingOption = options.find(
      (option) => option.label.toLowerCase() === searchText.toLowerCase(),
    );
    const optionValue = existingOption?.value ?? toOptionKey(searchText);

    if (!existingOption) {
      setOptions((currentOptions) => [
        ...currentOptions,
        {
          value: optionValue,
          label: searchText,
        },
      ]);
    }

    setSelectVal((currentValue) => {
      const nextValue = new Set(currentValue ?? []);
      nextValue.add(optionValue);
      return nextValue;
    });
  }, [options]);

  useEffect(() => {
    const element = selectRef.current;
    if (!element) {
      return;
    }

    element.setAttribute("add-to-list", "on");
    element.addEventListener(
      "ojAddToListAction",
      handleAddToListAction as EventListener,
    );

    return () => {
      element.removeEventListener(
        "ojAddToListAction",
        handleAddToListAction as EventListener,
      );
    };
  }, [handleAddToListAction]);

  return (
    <div id="container" class="select-multiple-add-to-list-demo">
      <oj-c-select-multiple
        ref={selectRef as any}
        id="selectMultipleAddToList"
        labelHint="Select Multiple"
        labelEdge="inside"
        maxWidth="md"
        data={dataProvider}
        itemText="label"
        value={selectVal}
        onvalueChanged={handleValueChanged}
      ></oj-c-select-multiple>
    </div>
  );
}
