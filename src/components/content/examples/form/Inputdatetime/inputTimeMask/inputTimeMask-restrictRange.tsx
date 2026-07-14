import "oj-c/input-time-mask";
import 'preact';
import { useCallback,useState } from "preact/hooks";
import { type InputTimeMaskValueChangedEvent } from "./inputTimeMask-shared";

export default function InputTimeMaskRestrictRangeVdomExample() {
  const [value, setValue] = useState("T12:30");

  const handleValueChanged = useCallback(
    (event: InputTimeMaskValueChangedEvent) => {
      setValue(String(event.detail.value ?? ""));
    },
    [],
  );

  return (
    <div id="inputTimeMaskRestrictRangeVdom">
      <oj-c-input-time-mask
        id="time"
        labelHint="Time with Min + Max Restriction"
        value={value}
        min="T08:00"
        max="T16:00"
        onvalueChanged={handleValueChanged}
      />

      <div class="oj-sm-margin-4x-vertical">
        <span>Current component value is:</span> <span>{value}</span>
      </div>
    </div>
  );
}

