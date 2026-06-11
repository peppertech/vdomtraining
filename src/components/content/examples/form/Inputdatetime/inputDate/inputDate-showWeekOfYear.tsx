import { h, type ComponentProps } from 'preact';
import { useCallback, useState } from "preact/hooks";
import "ojs/ojdatetimepicker";
import "ojs/ojlabel";
import { todayIsoDate, type InputDateValueChangedEvent } from "./inputDate-shared";

export default function InputDateShowWeekOfYearVdomExample() {
  const [value, setValue] = useState(todayIsoDate);

  const handleValueChanged = useCallback(
    (event: InputDateValueChangedEvent) => {
      setValue(String(event.detail.value ?? ""));
    },
    [],
  );

  return (
    <div id="inputDateShowWeekOfYearVdom">
      <oj-label for="weekofyearInputDate-vdom">Week Display</oj-label>
      <oj-input-date
        id="weekofyearInputDate-vdom"
        value={value}
        datePicker={{ weekDisplay: "number" } as ComponentProps<'oj-input-date'>['datePicker']}
        class="oj-form-control-max-width-sm"
        onvalueChanged={handleValueChanged}
      />

      <br />
      <br />

      <span class="oj-label">Current component value is:</span> <span>{value}</span>
    </div>
  );
}
