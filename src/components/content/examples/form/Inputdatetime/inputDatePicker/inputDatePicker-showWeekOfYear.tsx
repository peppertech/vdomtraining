import { h } from "preact";
import { useCallback, useState } from "preact/hooks";
import "oj-c/input-date-picker";
import { type InputDatePickerValueChangedEvent } from "./inputDatePicker-shared";

export default function InputDatePickerShowWeekOfYearExample() {
  const [value, setValue] = useState("2024-12-15");

  const handleValueChanged = useCallback(
    (event: InputDatePickerValueChangedEvent) => {
      setValue(String(event.detail.value ?? ""));
    },
    [],
  );

  return (
    <div id="inputDatePickerShowWeekOfYear">
      <h6>Week Display</h6>
      <oj-c-input-date-picker
        id="weekofyearInputDate"
        value={value}
        weekDisplay="number"
        maxWidth="sm"
        labelHint="Week Of Year"
        onvalueChanged={handleValueChanged}
      />
      <div class="oj-sm-margin-4x-vertical">
        <div class="oj-sm-margin-4x-vertical">
          <span>Current component value is:</span> <span>{value}</span>
        </div>
      </div>
    </div>
  );
}
