import "oj-c/input-date-mask";
import 'preact';
import { useCallback,useState } from "preact/hooks";
import { type InputDateMaskValueChangedEvent } from "./inputDateMask-shared";

export default function InputDateMaskRestrictRangeExample() {
  const [value, setValue] = useState("2023-04-27");

  const handleValueChanged = useCallback(
    (event: InputDateMaskValueChangedEvent) => {
      setValue(String(event.detail.value ?? ""));
    },
    [],
  );

  return (
    <div id="inputDateMaskRestrictRange">
      <oj-c-input-date-mask
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
