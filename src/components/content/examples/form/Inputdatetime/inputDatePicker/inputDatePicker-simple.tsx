import { h } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "oj-c/input-date-picker";
import {
  todayIsoDate,
  type InputDatePickerRawValueChangedEvent,
  type InputDatePickerValueChangedEvent,
} from "./inputDatePicker-shared";

export default function InputDatePickerSimpleExample() {
  const [value, setValue] = useState(todayIsoDate);
  const [rawValue, setRawValue] = useState<string | null>(null);

  const rawValueText = useMemo(() => JSON.stringify(rawValue), [rawValue]);

  const handleValueChanged = useCallback(
    (event: InputDatePickerValueChangedEvent) => {
      setValue(String(event.detail.value ?? ""));
    },
    [],
  );

  const handleRawValueChanged = useCallback(
    (event: InputDatePickerRawValueChangedEvent) => {
      setRawValue((event.detail.value as string | null) ?? null);
    },
    [],
  );

  return (
    <div id="inputDatePickerSimple">
      <oj-c-input-date-picker
        labelHint="Date"
        maxWidth="md"
        value={value}
        onvalueChanged={handleValueChanged}
        onrawValueChanged={handleRawValueChanged}
      />

      <div class="oj-sm-margin-4x-vertical">
        <div class="oj-sm-margin-4x-vertical">
          <span>Current component value is:</span> <span>{value}</span>
        </div>
        <div class="oj-sm-margin-4x-vertical">
          <span>Current raw value is:</span> <span>{rawValueText}</span>
        </div>
      </div>
    </div>
  );
}
