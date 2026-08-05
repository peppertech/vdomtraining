import "oj-c/text-area";

import {
  maxRowsDefaultValue,
  maxRowsPositiveValue,
  maxRowsStretchValue,
} from "./textAreaCorePack-shared";

export default function TextAreaCorePackMaxRowsExample() {
  return (
    <div>
      <h4>Enabled</h4>
      <div
        class="oj-sm-display-grid oj-sm-gap-4x"
        style="grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));"
      >
        <oj-c-text-area
          labelHint="max-rows = 0, rows defaults to 2"
          value={maxRowsDefaultValue}
          maxRows={0}
        />
        <oj-c-text-area
          labelHint="max-rows = -1"
          value={maxRowsStretchValue}
          maxRows={-1}
        />
        <oj-c-text-area
          labelHint="max-rows = 3"
          value={maxRowsPositiveValue}
          maxRows={3}
          rows={1}
        />
      </div>

      <h4 class="oj-sm-margin-4x-top">Enabled, No Value</h4>
      <div
        class="oj-sm-display-grid oj-sm-gap-4x"
        style="grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));"
      >
        <oj-c-text-area labelHint="max-rows = 0, rows set to 3" maxRows={0} rows={3} />
        <oj-c-text-area
          labelHint="max-rows = -1, rows set to 4"
          maxRows={-1}
          rows={4}
        />
        <oj-c-text-area labelHint="max-rows = 8, rows set to 5" maxRows={8} rows={5} />
      </div>

      <h4 class="oj-sm-margin-4x-top">Readonly</h4>
      <div
        class="oj-sm-display-grid oj-sm-gap-4x"
        style="grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));"
      >
        <oj-c-text-area
          labelHint="max-rows = 0, rows defaults to 2"
          readonly={true}
          containerReadonly={false}
          value={maxRowsDefaultValue}
          maxRows={0}
        />
        <oj-c-text-area
          labelHint="max-rows = -1"
          readonly={true}
          value={maxRowsStretchValue}
          maxRows={-1}
          containerReadonly={false}
        />
        <oj-c-text-area
          labelHint="max-rows = 3"
          readonly={true}
          value={maxRowsPositiveValue}
          maxRows={3}
          rows={1}
          containerReadonly={false}
        />
      </div>
    </div>
  );
}
