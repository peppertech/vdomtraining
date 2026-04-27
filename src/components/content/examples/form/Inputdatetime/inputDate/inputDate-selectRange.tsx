import { h } from "preact";
import { useCallback, useState } from "preact/hooks";
import { IntlConverterUtils } from "ojs/ojconverterutils-i18n";
import "ojs/ojdatetimepicker";
import "ojs/ojlabel";
import { type InputDateValueChangedEvent } from "./inputDate-shared";

const initialFrom =
  IntlConverterUtils.dateToLocalIsoDateString(new Date(2015, 11, 17)) ?? "";

export default function InputDateSelectRangeVdomExample() {
  const [value, setValue] = useState(initialFrom);
  const [toValue, setToValue] = useState("");

  const handleFromChanged = useCallback(
    (event: InputDateValueChangedEvent) => {
      setValue(String(event.detail.value ?? ""));
    },
    [],
  );

  const handleToChanged = useCallback(
    (event: InputDateValueChangedEvent) => {
      setToValue(String(event.detail.value ?? ""));
    },
    [],
  );

  return (
    <div id="inputDateSelectRangeVdom">
      <oj-label for="from-vdom">From</oj-label>
      <oj-input-date
        id="from-vdom"
        value={value}
        max={toValue || undefined}
        class="oj-form-control-max-width-sm"
        onvalueChanged={handleFromChanged}
      />
      <br />

      <oj-label for="to-vdom">To</oj-label>
      <oj-input-date
        id="to-vdom"
        value={toValue}
        min={value}
        class="oj-form-control-max-width-sm"
        onvalueChanged={handleToChanged}
      />
      <br />
      <br />

      <span class="oj-label">From component value is:</span> <span>{value}</span>

      <br />
      <br />

      <span class="oj-label">To component value is:</span> <span>{toValue}</span>
    </div>
  );
}
