import "oj-c/input-date-text";
import 'preact';
import { useCallback,useState } from "preact/hooks";
import { type InputDateTextValueChangedEvent } from "./inputDateText-shared";

export default function InputDateTextRestrictRangeExample() {
  const [value, setValue] = useState("2023-04-27");

  const handleValueChanged = useCallback(
    (event: InputDateTextValueChangedEvent) => {
      setValue(String(event.detail.value ?? ""));
    },
    [],
  );

  return (
    <div id="inputDateTextRestrictRange">
      <oj-c-input-date-text
        id="date"
        labelHint="Date with Min + Max Restriction"
        maxWidth="md"
        value={value}
        min="2023-04-01"
        max="2023-04-30"
        onvalueChanged={handleValueChanged}
      />

      <div class="oj-sm-margin-4x-vertical">
        <span>Current component value is:</span> <span>{value}</span>
      </div>
    </div>
  );
}

