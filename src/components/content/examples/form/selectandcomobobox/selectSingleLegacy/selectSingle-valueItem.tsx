import { h } from "preact";
import { useCallback, useEffect, useMemo, useState } from "preact/hooks";
import "ojs/ojselectsingle";
import {
  browserOptions,
  createBrowserDataProvider,
} from "./selectSingle-shared";

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

export default function SelectSingleLegacyValueItemExample() {
  const emptyDataProvider = useMemo(() => createBrowserDataProvider([]), []);
  const loadedDataProvider = useMemo(
    () => createBrowserDataProvider(browserOptions),
    [],
  );
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

  const handleValueItemSelectChanged = useCallback((event: any) => {
    setSelectVal1(event.detail.value ?? null);
  }, []);

  const handleValueItemChanged = useCallback((event: any) => {
    setSelectValItem(event.detail.value ?? null);
  }, []);

  const handleValueChanged = useCallback((event: any) => {
    setSelectVal2(event.detail.value);
  }, []);

  return (
    <div id="containerDiv">
      <oj-select-single
        id="selectSingleLegacyValueItem"
        class="oj-form-control-max-width-md"
        labelHint="Select Single with valueItem"
        labelEdge="inside"
        data={activeDataProvider}
        itemText="label"
        value={selectVal1}
        valueItem={selectValItem as any}
        onvalueChanged={handleValueItemSelectChanged}
        onvalueItemChanged={handleValueItemChanged}
      ></oj-select-single>
      <div class="oj-sm-margin-4x-vertical">
        <div>Current selected value and valueItem</div>
        <span id="selectedval1">{JSON.stringify(selectVal1)}</span>
        <br />
        <span id="valitems1">{JSON.stringify(trimmedValItem)}</span>
      </div>

      <oj-select-single
        id="selectSingleLegacyValueOnly"
        class="oj-form-control-max-width-md oj-sm-margin-4x-top"
        labelHint="Select Single with value"
        labelEdge="inside"
        data={activeDataProvider}
        itemText="label"
        value={selectVal2}
        onvalueChanged={handleValueChanged}
      ></oj-select-single>
      <div class="oj-sm-margin-4x-vertical">
        <div>Current selected value</div>
        <span id="selectedval2">{JSON.stringify(selectVal2)}</span>
      </div>
    </div>
  );
}
