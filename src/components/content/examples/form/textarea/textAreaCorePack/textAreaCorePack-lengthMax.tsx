import "oj-c/text-area";

import {
  hiddenLengthConfig,
  lengthSampleValue,
  remainingLengthConfig,
} from "./textAreaCorePack-shared";

export default function TextAreaCorePackLengthMaxExample() {
  return (
    <div>
      <h4>Enabled</h4>
      <div
        class="oj-sm-display-grid oj-sm-gap-4x"
        style="grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));"
      >
        <oj-c-text-area
          labelHint="length.max='100', length.counter='remaining'"
          length={remainingLengthConfig}
          value={lengthSampleValue}
        />
        <oj-c-text-area
          labelHint="length.max='100', length.counter='none'"
          length={hiddenLengthConfig}
          value={lengthSampleValue}
        />
      </div>

      <h4 class="oj-sm-margin-4x-top">Readonly</h4>
      <div
        class="oj-sm-display-grid oj-sm-gap-4x"
        style="grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));"
      >
        <oj-c-text-area
          labelHint="length.max='100', length.counter='remaining'"
          length={remainingLengthConfig}
          readonly={true}
          value={lengthSampleValue}
        />
      </div>
    </div>
  );
}
