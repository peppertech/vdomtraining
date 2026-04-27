import { h } from "preact";
import { useCallback, useState } from "preact/hooks";
import "ojs/ojdatetimepicker";
import "ojs/ojlabel";
import {
  sampleDateTimeValue,
  type InputDateTimeValueChangedEvent,
} from "./inputDateTime-shared";

export default function InputDateTimeSimpleExample() {
  const [value, setValue] = useState(sampleDateTimeValue);

  const handleValueChanged = useCallback(
    (event: InputDateTimeValueChangedEvent) => {
      setValue(String(event.detail.value ?? ""));
    },
    [],
  );

  return (
    <div id="inputDateTimeSimple">
      <oj-label for="dateTime">inputDateTime</oj-label>
      <oj-input-date-time
        id="dateTime"
        value={value}
        onvalueChanged={handleValueChanged}
      />

      <br />
      <br />

      <span class="oj-label">Current component iso string value is:</span>{" "}
      <span>{value}</span>
    </div>
  );
}
