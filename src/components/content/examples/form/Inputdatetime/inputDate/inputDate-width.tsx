import { h } from "preact";
import { useCallback, useState } from "preact/hooks";
import "ojs/ojdatetimepicker";
import "ojs/ojlabel";
import "css!../../inputtext/inputTextLegacy/inputTextLegacy.css";
import { sampleIsoDate, type InputDateValueChangedEvent } from "./inputDate-shared";

export default function InputDateWidthVdomExample() {
  const [value, setValue] = useState(sampleIsoDate);

  const handleValueChanged = useCallback(
    (event: InputDateValueChangedEvent) => {
      setValue(String(event.detail.value ?? ""));
    },
    [],
  );

  return (
    <div id="form-container">
      <h6>max width classes</h6>

      <div>
        <code>class="oj-form-control-max-width-sm"</code>
      </div>
      <oj-input-date
        labelEdge="inside"
        labelHint="date"
        value={value}
        class="oj-form-control-max-width-sm"
        onvalueChanged={handleValueChanged}
      />

      <div class="oj-sm-margin-4x-top">
        <code>class="oj-form-control-max-width-md"</code>
      </div>
      <oj-input-date
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
      <oj-input-date
        labelEdge="inside"
        labelHint="date"
        value={value}
        class="oj-form-control-width-sm"
        onvalueChanged={handleValueChanged}
      />

      <div class="oj-sm-margin-4x-top">
        <code>class="oj-form-control-width-md"</code>
      </div>
      <oj-input-date
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
      <oj-input-date
        labelEdge="inside"
        labelHint="date"
        value={value}
        class="demo-rem-max-width"
        onvalueChanged={handleValueChanged}
      />

      <div class="oj-sm-margin-4x-top">
        class that sets <code>width: 50%;</code>
      </div>
      <oj-input-date
        labelEdge="inside"
        labelHint="date"
        value={value}
        class="demo-percentage-width"
        onvalueChanged={handleValueChanged}
      />
    </div>
  );
}
