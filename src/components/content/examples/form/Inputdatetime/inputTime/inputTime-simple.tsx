import { h } from "preact";
import { useCallback, useState } from "preact/hooks";
import "ojs/ojdatetimepicker";
import { shortTimeValue, type InputTimeValueChangedEvent } from "./inputTime-shared";

export default function InputTimeSimpleExample() {
  const [value, setValue] = useState(shortTimeValue);

  const handleValueChanged = useCallback((event: InputTimeValueChangedEvent) => {
    setValue(String(event.detail.value ?? ""));
  }, []);

  return (
    <div id="inputTimeSimple">
      <oj-input-time
        id="time"
        value={value}
        labelHint="Input Time"
        onvalueChanged={handleValueChanged}
      />

      <br />
      <br />

      <span class="oj-label">Current component iso string value is:</span>{" "}
      <span>{value}</span>
    </div>
  );
}
