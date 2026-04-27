import { h } from "preact";
import { useCallback, useState } from "preact/hooks";
import "oj-c/form-layout";
import "oj-c/input-date-picker";
import { todayIsoDate, type InputDatePickerValueChangedEvent } from "./inputDatePicker-shared";

export default function InputDatePickerSelectRangeExample() {
  const [value, setValue] = useState(todayIsoDate);
  const [toValue, setToValue] = useState<string | null>(null);

  const handleFromValueChanged = useCallback(
    (event: InputDatePickerValueChangedEvent) => {
      setValue(String(event.detail.value ?? ""));
    },
    [],
  );

  const handleToValueChanged = useCallback(
    (event: InputDatePickerValueChangedEvent) => {
      setToValue((event.detail.value as string | null) ?? null);
    },
    [],
  );

  return (
    <div id="inputDatePickerSelectRange">
      <oj-c-form-layout direction="column">
        <oj-c-input-date-picker
          labelHint="From"
          max={toValue ?? undefined}
          value={value}
          onvalueChanged={handleFromValueChanged}
        />
        <br />

        <oj-c-input-date-picker
          labelHint="To"
          min={value}
          value={toValue ?? undefined}
          onvalueChanged={handleToValueChanged}
        />
      </oj-c-form-layout>

      <div class="oj-sm-margin-1x-vertical">
        <div class="oj-sm-margin-1x-vertical">
          <span>From component value is:</span> <span>{value}</span>
        </div>
        <div class="oj-sm-margin-6x-vertical">
          <span>To component value is:</span> <span>{JSON.stringify(toValue)}</span>
        </div>
      </div>
    </div>
  );
}
