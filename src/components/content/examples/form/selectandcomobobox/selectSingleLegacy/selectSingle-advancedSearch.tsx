import { h } from "preact";

export default function SelectSingleLegacyAdvancedSearchExample() {
  return (
    <div class="oj-panel oj-panel-alt2 oj-sm-padding-4x">
      <h5 class="oj-typography-heading-sm oj-sm-margin-0">
        Advanced Search Is Not Supported
      </h5>
      <p class="oj-sm-margin-2x-top oj-sm-margin-0-bottom">
        The legacy <code>oj-select-single</code> component does not provide the
        Core Pack <code>advancedSearch</code> capability or an{" "}
        <code>ojAdvancedSearchAction</code> event.
      </p>
    </div>
  );
}
