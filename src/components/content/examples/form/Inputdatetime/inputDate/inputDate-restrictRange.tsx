import { IntlConverterUtils } from "ojs/ojconverterutils-i18n";
import "ojs/ojdatetimepicker";
import "ojs/ojlabel";
import 'preact';
import { useCallback,useState } from "preact/hooks";
import { type InputDateValueChangedEvent } from "./inputDate-shared";

const initialValue =
  IntlConverterUtils.dateToLocalIsoDateString(new Date(2013, 10, 26)) ?? "";
const minValue =
  IntlConverterUtils.dateToLocalIsoDateString(new Date(2013, 10, 25)) ?? "";

export default function InputDateRestrictRangeVdomExample() {
  const [value, setValue] = useState(initialValue);

  const handleValueChanged = useCallback(
    (event: InputDateValueChangedEvent) => {
      setValue(String(event.detail.value ?? ""));
    },
    [],
  );

  return (
    <div id="inputDateRestrictRangeVdom">
      <oj-label for="minmax-vdom">Min + Max Restriction</oj-label>
      <oj-input-date
        id="minmax-vdom"
        value={value}
        min={minValue}
        max="2013-12-06"
        class="oj-form-control-max-width-sm"
        onvalueChanged={handleValueChanged}
      />

      <br />
      <br />

      <span class="oj-label">Current component value is:</span> <span>{value}</span>
    </div>
  );
}
