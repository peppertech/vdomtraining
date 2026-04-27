import { h } from "preact";
import { useCallback, useState } from "preact/hooks";
import { IntlDateTimeConverter } from "ojs/ojconverter-datetime";
import "ojs/ojdatetimepicker";
import { type InputTimeProps, type InputTimeValueChangedEvent } from "./inputTime-shared";

const localTimeConverter = new IntlDateTimeConverter({
  formatType: "time",
  timeFormat: "short",
  isoStrFormat: "local",
});

export default function InputTimeMinMaxExample() {
  const [value, setValue] = useState("T08:40:00");

  const handleValueChanged = useCallback((event: InputTimeValueChangedEvent) => {
    setValue(String(event.detail.value ?? ""));
  }, []);

  return (
    <div id="inputTimeMinMax">
      <oj-input-time
        id="time"
        converter={localTimeConverter as InputTimeProps["converter"]}
        value={value}
        min="T08:00:00"
        max="T16:00:00"
        labelHint="Time"
        onvalueChanged={handleValueChanged}
      />

      <br />
      <br />

      <span class="oj-label">Current component value is:</span> <span>{value}</span>
    </div>
  );
}
