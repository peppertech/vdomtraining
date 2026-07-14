import "oj-c/rich-radioset";
import 'preact';
import { useCallback,useState } from "preact/hooks";
import {
  extendedIndustryOptions,
  type RichRadiosetValueChangedEvent,
} from "./richRadioSet-shared";

export default function RichRadioSetBasicExample() {
  const [currentSelection, setCurrentSelection] =
    useState<string>("automotive");

  const handleValueChanged = useCallback(
    (event: RichRadiosetValueChangedEvent) => {
      setCurrentSelection(String(event.detail.value ?? ""));
    },
    [],
  );

  return (
    <div id="form-container">
      <div id="rich-radioset-container">
        <oj-c-rich-radioset
          layout="xl"
          id="richRadiosetBasicDemoId"
          labelHint="Industries"
          labelEdge="inside"
          options={extendedIndustryOptions}
          value={currentSelection}
          onvalueChanged={handleValueChanged}
        />

        <div class="oj-sm-margin-3x-vertical">
          <span>Current component value is: </span>
          <span>{currentSelection}</span>
        </div>
      </div>
    </div>
  );
}
