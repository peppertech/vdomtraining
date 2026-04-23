import { h } from "preact";
import { useMemo } from "preact/hooks";
import "ojs/ojinputsearch";
import {
  createEmployeeLastNameDataProvider,
  InputSearchDiagnostics,
  type OracleEmployee,
  useInputSearchExampleState,
} from "./input-search-shared";

export default function InputSearchSuggestionItemTextExample() {
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
  } = useInputSearchExampleState<OracleEmployee["EMPLOYEE_ID"], OracleEmployee>();
  const suggestions = useMemo(() => createEmployeeLastNameDataProvider(), []);

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
      <oj-input-search
        id="search1"
        class="oj-form-control-max-width-md"
        suggestions={suggestions}
        suggestionItemText="LAST_NAME"
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
