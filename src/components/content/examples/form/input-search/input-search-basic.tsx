import "ojs/ojinputsearch";
import 'preact';
import {
  InputSearchDiagnostics,
  useInputSearchExampleState,
} from "./input-search-shared";

export default function InputSearchBasicExample() {
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
  } = useInputSearchExampleState<string, unknown>();

  return (
    <div class="input-search-demo">
      <InputSearchDiagnostics
        value={value}
        rawValue={rawValue}
        searchTerm={searchTerm}
        searchItemContext={searchItemContext}
        previousSearchTerm={previousSearchTerm}
        searchTimestamp={searchTimestamp}
        itemContextNote="Context is only populated from suggestions and therefore always empty in this demo."
      />
      <oj-input-search
        id="search1"
        class="oj-form-control-max-width-md"
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
