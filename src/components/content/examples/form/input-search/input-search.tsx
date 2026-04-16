import { InputSearchElement } from "ojs/ojinputsearch";
import { ItemContext } from "ojs/ojcommontypes";
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import { useState } from "preact/hooks";
import "ojs/ojinputsearch";
import "css!./input-search.css";

type SearchSuggestion = {
  value: string;
  label: string;
};

const suggestions: SearchSuggestion[] = [
  { value: "jet", label: "Oracle JET" },
  { value: "vdom", label: "VDOM Components" },
  { value: "redwood", label: "Redwood Design System" },
  { value: "accessibility", label: "Accessibility Guidance" },
  { value: "cookbook", label: "Cookbook Recipes" },
];

const suggestionsDataProvider = new ArrayDataProvider<
  SearchSuggestion["value"],
  SearchSuggestion
>(suggestions, {
  keyAttributes: "value",
});

const formatTime = () => {
  const date = new Date();
  return `${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes(),
  ).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}.${String(
    date.getMilliseconds(),
  ).padStart(3, "0")}`;
};

const trimItemContext = (
  itemContext?: ItemContext<string, SearchSuggestion> | null,
) => {
  if (!itemContext) {
    return "";
  }

  return JSON.stringify({
    key: itemContext.key,
    data: itemContext.data,
    metadata: itemContext.metadata
      ? {
          key: itemContext.metadata.key,
        }
      : undefined,
  });
};

export const InputSearchBasic = () => {
  const [value, setValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchItemContext, setSearchItemContext] = useState("");
  const [previousSearchTerm, setPreviousSearchTerm] = useState("");
  const [searchTimestamp, setSearchTimestamp] = useState("");

  const handleValueChanged = (
    event: InputSearchElement.valueChanged<string, string>,
  ) => {
    setValue(event.detail.value ?? "");
  };

  const handleValueAction = (
    event: InputSearchElement.ojValueAction<string, SearchSuggestion>,
  ) => {
    const { detail } = event;

    setValue(detail.value ?? "");
    setSearchTerm(detail.value ?? "");
    setSearchItemContext(trimItemContext(detail.itemContext));
    setPreviousSearchTerm(detail.previousValue ?? "");
    setSearchTimestamp(formatTime());
  };

  return (
    <div class="input-search-demo">
      <oj-input-search
        aria-label="Search cookbook topics"
        class="oj-form-control-max-width-md"
        placeholder="Search cookbook topics"
        value={value}
        suggestions={suggestionsDataProvider}
        onvalueChanged={handleValueChanged}
        onojValueAction={handleValueAction}
      />

      <dl class="input-search-demo__results oj-typography-body-sm">
        <dt>Current value</dt>
        <dd>{value || "None"}</dd>

        <dt>Submitted search term</dt>
        <dd>{searchTerm || "None"}</dd>

        <dt>Selected suggestion</dt>
        <dd>{searchItemContext || "None"}</dd>

        <dt>Previous search term</dt>
        <dd>{previousSearchTerm || "None"}</dd>

        <dt>Search timestamp</dt>
        <dd>{searchTimestamp || "None"}</dd>
      </dl>
    </div>
  );
};

export default InputSearchBasic;
