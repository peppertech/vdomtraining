import "ojs/ojdatetimepicker";
import "ojs/ojformlayout";
import "ojs/ojradioset";
import 'preact';
import { useCallback,useMemo,useState } from "preact/hooks";
import {
  localDateTimeValue,
  type InputDateTimeValueChangedEvent,
  type RadiosetValueChangedEvent,
} from "./inputDateTime-shared";

export default function InputDateTimeTextAlignExample() {
  const [textAlign, setTextAlign] = useState("start");
  const [value, setValue] = useState(localDateTimeValue);

  const textAlignClass = useMemo(() => {
    if (textAlign === "right") {
      return "oj-form-control-text-align-right";
    }
    if (textAlign === "end") {
      return "oj-form-control-text-align-end";
    }
    if (textAlign === "start") {
      return "oj-form-control-text-align-start";
    }
    return "";
  }, [textAlign]);

  const handleTextAlignChanged = useCallback(
    (event: RadiosetValueChangedEvent) => {
      setTextAlign(String(event.detail.value ?? ""));
    },
    [],
  );

  const handleValueChanged = useCallback(
    (event: InputDateTimeValueChangedEvent) => {
      setValue(String(event.detail.value ?? ""));
    },
    [],
  );

  return (
    <div id="inputDateTimeTextAlign">
      <div class="oj-sm-margin-4x-bottom oj-panel oj-bg-info-30">
        <h6>Set oj-form-control-text-align-* class</h6>
        <oj-radioset
          id="textAlign"
          value={textAlign}
          labelHint="Text Alignment"
          onvalueChanged={handleTextAlignChanged}
        >
          <oj-option value="start">start</oj-option>
          <oj-option value="right">right</oj-option>
          <oj-option value="end">end</oj-option>
          <oj-option value="">(none)</oj-option>
        </oj-radioset>
      </div>

      <oj-form-layout id="myform">
        <oj-input-date-time
          id="inputdatetime"
          class={textAlignClass}
          value={value}
          labelHint="Input Date Time"
          onvalueChanged={handleValueChanged}
        />
      </oj-form-layout>
    </div>
  );
}
