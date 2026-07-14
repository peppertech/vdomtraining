import "ojs/ojinputsearch";
import 'preact';
import { useMemo,useState } from "preact/hooks";
import { createBrowserSuggestionsDataProvider } from "./input-search-shared";

export default function InputSearchHeroExample() {
  const [value, setValue] = useState("");
  const suggestions = useMemo(() => createBrowserSuggestionsDataProvider(), []);

  return (
    <div class="input-search-demo input-search-demo--hero">
      <div class="input-search-demo__metrics oj-sm-margin-4x-bottom">
        <div class="input-search-demo__metric">
          <span class="input-search-demo__metric-label">Value:</span>
          <span>{value || "None"}</span>
        </div>
      </div>
      <oj-input-search
        id="search1"
        class="oj-input-search-hero"
        suggestions={suggestions}
        value={value}
        placeholder="Search..."
        aria-label="My search field"
        onvalueChanged={(event) => {
          setValue((event.detail.value as string | null | undefined) ?? "");
        }}
      ></oj-input-search>
    </div>
  );
}
