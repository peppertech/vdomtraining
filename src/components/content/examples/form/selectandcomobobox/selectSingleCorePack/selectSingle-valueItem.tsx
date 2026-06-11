import { h, type ComponentProps } from 'preact';
import { useCallback, useEffect, useMemo, useState } from "preact/hooks";
import "oj-c/select-single";

import {
  browserOptions,
  createBrowserDataProvider,
} from "./selectSingle-shared";

type ValueItemSelectEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-select-single">["onvalueChanged"]>
>[0];
type ValueItemEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-select-single">["onvalueItemChanged"]>
>[0];
type ValueEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-select-single">["onvalueChanged"]>
>[0];
type BrowserValueItem = {
  key: string;
  data: {
    value: string;
    label: string;
  };
  metadata?: {
    key: string;
  };
};

export default function SelectSingleValueItemExample() {
  const emptyDataProvider = useMemo(() => createBrowserDataProvider([]), []);
  const loadedDataProvider = useMemo(() => createBrowserDataProvider(browserOptions), []);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectVal1, setSelectVal1] = useState<string | null>(null);
  const [selectVal2, setSelectVal2] = useState("CH");
  const [selectValItem, setSelectValItem] = useState<BrowserValueItem | null>({
    key: "CH",
    data: { value: "CH", label: "Chrome" },
  });

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoaded(true), 1000);
    return () => window.clearTimeout(timer);
  }, []);

  const activeDataProvider = isLoaded ? loadedDataProvider : emptyDataProvider;

  const trimmedValItem = useMemo(() => {
    if (!selectValItem) {
      return selectValItem;
    }
    return {
      key: selectValItem.key,
      data: selectValItem.data,
      ...(selectValItem.metadata
        ? { metadata: { key: selectValItem.metadata.key } }
        : {}),
    };
  }, [selectValItem]);

  const handleValueItemSelectChanged = useCallback((event: ValueItemSelectEvent) => {
    setSelectVal1((event.detail.value as string | null | null | undefined) ?? null);
  }, []);

  const handleValueItemChanged = useCallback((event: ValueItemEvent) => {
    setSelectValItem((event.detail.value as BrowserValueItem | null | undefined) ?? null);
  }, []);

  const handleValueChanged = useCallback((event: ValueEvent) => {
    setSelectVal2((event.detail.value as string));
  }, []);

  return (
    <div id="containerDiv">
      <oj-c-select-single
        id="selectSingleValueItem"
        maxWidth="md"
        labelHint="Select Single with valueItem"
        labelEdge="inside"
        data={activeDataProvider}
        itemText="label"
        value={selectVal1}
        valueItem={selectValItem as ComponentProps<'oj-c-select-single'>['valueItem']}
        onvalueChanged={handleValueItemSelectChanged}
        onvalueItemChanged={handleValueItemChanged}
      ></oj-c-select-single>
      <div class="oj-sm-margin-4x-vertical">
        <div>Current selected value and valueItem</div>
        <span id="selectedval1">{JSON.stringify(selectVal1)}</span>
        <br />
        <span id="valitems1">{JSON.stringify(trimmedValItem)}</span>
      </div>

      <oj-c-select-single
        id="selectSingleValueOnly"
        class="oj-sm-margin-4x-top"
        maxWidth="md"
        labelHint="Select Single with value"
        labelEdge="inside"
        data={activeDataProvider}
        itemText="label"
        value={selectVal2}
        onvalueChanged={handleValueChanged}
      ></oj-c-select-single>
      <div class="oj-sm-margin-4x-vertical">
        <div>Current selected value</div>
        <span id="selectedval2">{JSON.stringify(selectVal2)}</span>
      </div>
    </div>
  );
}
