import { h } from "preact";
import { useMemo } from "preact/hooks";
import "ojs/ojhighlighttext";
import "ojs/ojinputsearch";
import {
  createEmployeeTemplateDataProvider,
  InputSearchDiagnostics,
  type OracleEmployee,
  renderEmployeeSuggestionItem,
  useInputSearchExampleState,
} from "./input-search-shared";

export default function InputSearchSuggestionItemTemplateExample() {
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
  const suggestions = useMemo(() => createEmployeeTemplateDataProvider(), []);

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
      >
        <template
          slot="suggestionItemTemplate"
          render={renderEmployeeSuggestionItem}
        ></template>
      </oj-input-search>
    </div>
  );
}
