import "oj-c/input-date-picker";
import 'preact';
import { useCallback,useMemo,useState } from "preact/hooks";
import {
  type InputDatePickerRawValueChangedEvent,
  type InputDatePickerValueChangedEvent,
} from "./inputDatePicker-shared";

export default function InputDatePickerRestrictRangeExample() {
  const [value, setValue] = useState("2024-05-31");
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
    <div id="inputDatePickerRestrictRange">
      <oj-c-input-date-picker
        labelHint="Date"
        value={value}
        min="2024-05-01"
        max="2024-06-01"
        maxWidth="sm"
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
