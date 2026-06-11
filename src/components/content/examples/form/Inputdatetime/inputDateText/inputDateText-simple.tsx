import { h } from "preact";
import { useCallback, useState } from "preact/hooks";
import "oj-c/input-date-text";
import {
  todayIsoDate,
  type InputDateTextValueChangedEvent,
} from "./inputDateText-shared";

export default function InputDateTextSimpleExample() {
  const [value, setValue] = useState(todayIsoDate);

  const handleValueChanged = useCallback(
    (event: InputDateTextValueChangedEvent) => {
      setValue(String(event.detail.value ?? ""));
    },
    [],
  );

  return (
    <div id="inputDateTextSimple">
      <oj-c-input-date-text
        labelHint="Date"
        id="date"
        maxWidth="md"
        value={value}
        onvalueChanged={handleValueChanged}
      />

      <div class="oj-sm-margin-4x-vertical">
        <span>Current component value is:</span> <span>{value}</span>
      </div>
    </div>
  );
}

