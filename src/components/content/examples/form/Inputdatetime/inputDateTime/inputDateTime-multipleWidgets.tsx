import { IntlDateTimeConverter } from "ojs/ojconverter-datetime";
import "ojs/ojdatetimepicker";
import "ojs/ojlabel";
import 'preact';
import { useCallback,useState } from "preact/hooks";
import {
  localDateTimeValue,
  type InputDateTimeValueChangedEvent,
} from "./inputDateTime-shared";

const secondConverter = new IntlDateTimeConverter({
  formatType: "datetime",
  dateFormat: "full",
  timeFormat: "full",
});

export default function InputDateTimeMultipleWidgetsExample() {
  const [value, setValue] = useState(localDateTimeValue);

  const handleValueChanged = useCallback(
    (event: InputDateTimeValueChangedEvent) => {
      setValue(String(event.detail.value ?? ""));
    },
    [],
  );

  return (
    <div id="inputDateTimeMultipleWidgets">
      <oj-label for="first">First</oj-label>
      <oj-input-date-time
        id="first"
        value={value}
        onvalueChanged={handleValueChanged}
      />

      <oj-label for="second">second</oj-label>
      <oj-input-date-time
        id="second"
        converter={secondConverter}
        value={value}
        onvalueChanged={handleValueChanged}
      />

      <br />
      <br />

      <span class="oj-label">Current component value is:</span>{" "}
      <span>{value}</span>
    </div>
  );
}
