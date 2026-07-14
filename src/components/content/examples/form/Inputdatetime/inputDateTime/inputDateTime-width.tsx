import "css!./inputDateTime.css";
import "ojs/ojdatetimepicker";
import 'preact';
import { useCallback,useState } from "preact/hooks";
import {
  localDateTimeValue,
  type InputDateTimeValueChangedEvent,
} from "./inputDateTime-shared";

export default function InputDateTimeWidthExample() {
  const [value, setValue] = useState(localDateTimeValue);

  const handleValueChanged = useCallback(
    (event: InputDateTimeValueChangedEvent) => {
      setValue(String(event.detail.value ?? ""));
    },
    [],
  );

  return (
    <div id="inputDateTimeWidth">
      <h6>max width classes</h6>

      <div>
        <code>class="oj-form-control-max-width-sm"</code>
      </div>
      <oj-input-date-time
        labelEdge="inside"
        labelHint="date"
        value={value}
        class="oj-form-control-max-width-sm"
        onvalueChanged={handleValueChanged}
      />

      <div class="oj-sm-margin-4x-top">
        <code>class="oj-form-control-max-width-md"</code>
      </div>
      <oj-input-date-time
        labelEdge="inside"
        labelHint="date"
        value={value}
        class="oj-form-control-max-width-md"
        onvalueChanged={handleValueChanged}
      />

      <hr />

      <h6>width classes</h6>

      <div>
        <code>class="oj-form-control-width-sm"</code>
      </div>
      <oj-input-date-time
        labelEdge="inside"
        labelHint="date"
        value={value}
        class="oj-form-control-width-sm"
        onvalueChanged={handleValueChanged}
      />

      <div class="oj-sm-margin-4x-top">
        <code>class="oj-form-control-width-md"</code>
      </div>
      <oj-input-date-time
        labelEdge="inside"
        labelHint="date"
        value={value}
        class="oj-form-control-width-md"
        onvalueChanged={handleValueChanged}
      />

      <hr />

      <h6>custom classes</h6>
      <div>
        class that sets <code>max-width: 25rem;</code>
      </div>
      <oj-input-date-time
        labelEdge="inside"
        labelHint="date"
        value={value}
        class="demo-rem-max-width"
        onvalueChanged={handleValueChanged}
      />

      <div class="oj-sm-margin-4x-top">
        class that sets <code>width: 50%;</code>
      </div>
      <oj-input-date-time
        labelEdge="inside"
        labelHint="date"
        value={value}
        class="demo-percentage-width"
        onvalueChanged={handleValueChanged}
      />
    </div>
  );
}
