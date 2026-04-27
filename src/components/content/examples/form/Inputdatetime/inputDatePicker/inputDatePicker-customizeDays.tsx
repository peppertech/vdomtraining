import { h } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "oj-c/input-date-picker";
import {
  getWeekday,
  type CalendarDateRequired,
  type InputDatePickerProps,
  type InputDatePickerRawValueChangedEvent,
  type InputDatePickerValueChangedEvent,
} from "./inputDatePicker-shared";

export default function InputDatePickerCustomizeDaysExample() {
  const [value, setValue] = useState("2023-12-01");
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

  const dayFormatter = useCallback<
    NonNullable<InputDatePickerProps["dayFormatter"]>
  >((date) => {
    const calendarDate = date as CalendarDateRequired;
    const weekday = getWeekday(calendarDate);

    if (weekday === "Sun" || weekday === "Sat") {
      return { state: "restricted" };
    }

    if (weekday === "Mon") {
      return { state: "disabled" };
    }

    if (
      (calendarDate.day === 25 && calendarDate.month === 12) ||
      (calendarDate.day === 1 && calendarDate.month === 1)
    ) {
      return { state: "restricted" };
    }

    if (calendarDate.month === 3) {
      return { state: "disabled" };
    }

    return { state: "enabled" };
  }, []);

  return (
    <div id="inputDatePickerCustomizeDays">
      <oj-c-input-date-picker
        labelHint="Date"
        maxWidth="md"
        value={value}
        dayFormatter={dayFormatter}
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
