import "ojs/ojdatetimepicker";
import "ojs/ojlabel";
import 'preact';
import { useCallback,useState } from "preact/hooks";
import { sampleIsoDate,type InputDateValueChangedEvent } from "./inputDate-shared";

export default function InputDateSimpleVdomExample() {
  const [value, setValue] = useState(sampleIsoDate);

  const handleValueChanged = useCallback(
    (event: InputDateValueChangedEvent) => {
      setValue(String(event.detail.value ?? ""));
    },
    [],
  );

  return (
    <div id="inputDateSimpleVdom">
      <oj-label for="date-vdom">InputDate</oj-label>
      <oj-input-date
        id="date-vdom"
        value={value}
        class="oj-form-control-max-width-sm"
        onvalueChanged={handleValueChanged}
      />

      <br />
      <br />

      <span class="oj-label">Current component iso string value is:</span>{" "}
      <span>{value}</span>
    </div>
  );
}
