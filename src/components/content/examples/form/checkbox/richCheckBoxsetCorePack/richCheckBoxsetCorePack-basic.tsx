import { useCallback, useState } from "preact/hooks";
import "oj-c/rich-checkboxset";

import {
  industryOptions,
  type RichCheckboxsetValueChangedEvent,
} from "./richCheckBoxsetCorePack-shared";

export default function RichCheckBoxsetCorePackBasicExample() {
  const [currentSelections, setCurrentSelections] = useState<string[]>([
    "automotive",
  ]);

  const handleValueChanged = useCallback(
    (event: RichCheckboxsetValueChangedEvent) => {
      setCurrentSelections((event.detail.value as string[] | null | undefined) ?? []);
    },
    [],
  );

  return (
    <div id="form-container">
      <div id="rich-checkboxset-container">
        <oj-c-rich-checkboxset
          layout="xl"
          id="richCheckboxsetBasicDemoId"
          labelHint="Industries"
          labelEdge="inside"
          options={industryOptions}
          value={currentSelections}
          onvalueChanged={handleValueChanged}
        />

        <div class="oj-sm-margin-3x-vertical">
          <span>Current component value is: </span>
          <span>{currentSelections.join(", ")}</span>
        </div>
      </div>
    </div>
  );
}
