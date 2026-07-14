import "ojs/ojcheckboxset";
import "ojs/ojinputsearch";
import "ojs/ojoption";
import 'preact';
import { useMemo,useState } from "preact/hooks";
import {
  createBrowserSuggestionsDataProvider,
  DelayingDataProvider,
  InputSearchDiagnostics,
  useInputSearchExampleState,
  type BrowserSuggestion,
} from "./input-search-shared";

export default function InputSearchSuggestionsExample() {
  const {
    value,
    rawValue,
    searchTerm,
    searchItemContext,
    previousSearchTerm,
    searchTimestamp,
    handleValueChanged,
    handleRawValueChanged,
    handleValueAction,
  } = useInputSearchExampleState<string, BrowserSuggestion>();
  const [isDelayed, setIsDelayed] = useState<string[]>([]);

  const dataProvider = useMemo(() => createBrowserSuggestionsDataProvider(), []);
  const suggestions = useMemo(
    () =>
      isDelayed[0] === "delay"
        ? new DelayingDataProvider(dataProvider, 1000)
        : dataProvider,
    [dataProvider, isDelayed],
  );

  return (
    <div class="input-search-demo">
      <InputSearchDiagnostics
        value={value}
        rawValue={rawValue}
        searchTerm={searchTerm}
        searchItemContext={searchItemContext}
        previousSearchTerm={previousSearchTerm}
        searchTimestamp={searchTimestamp}
      />
      <oj-checkboxset
        aria-label="Simulate Fetch Delay"
        value={isDelayed}
        onvalueChanged={(event) => {
          setIsDelayed((event.detail.value as string[]) ?? []);
        }}
      >
        <oj-option value="delay">Simulate Fetch Delay</oj-option>
      </oj-checkboxset>
      <oj-input-search
        id="search1"
        class="oj-form-control-max-width-md"
        suggestions={suggestions}
        value={value}
        placeholder="Search..."
        aria-label="My search field"
        onvalueChanged={handleValueChanged}
        onrawValueChanged={handleRawValueChanged}
        onojValueAction={handleValueAction}
      ></oj-input-search>
    </div>
  );
}
