import "css!./inputDateTime.css";
import "ojs/ojdatetimepicker";
import "ojs/ojformlayout";
import 'preact';
import { useCallback,useState } from "preact/hooks";
import {
  localDateTimeValue,
  type InputDateTimeValueChangedEvent,
} from "./inputDateTime-shared";

export default function InputDateTimeStylingExample() {
  const [value, setValue] = useState(localDateTimeValue);

  const handleValueChanged = useCallback(
    (event: InputDateTimeValueChangedEvent) => {
      setValue(String(event.detail.value ?? ""));
    },
    [],
  );

  return (
    <div id="inputDateTimeStyling">
      <oj-form-layout direction="row" maxColumns={2}>
        <oj-input-date-time
          id="inputdatetime"
          value={value}
          labelHint="default input datetime"
          onvalueChanged={handleValueChanged}
        />
        <oj-input-date-time
          id="inputdatetime2"
          class="demo-text-field-info"
          value={value}
          labelHint="customized input datetime"
          onvalueChanged={handleValueChanged}
        />
      </oj-form-layout>
    </div>
  );
}
