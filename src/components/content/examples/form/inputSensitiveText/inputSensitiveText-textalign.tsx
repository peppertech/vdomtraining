import { h } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "oj-c/buttonset-single";
import "oj-c/form-layout";
import "oj-c/input-sensitive-text";
import {
  textAlignItems,
  type ButtonsetSingleValueChangedEvent,
  type InputSensitiveTextValueChangedEvent,
} from "./inputSensitiveText-shared";

export default function InputSensitiveTextTextAlignVdomExample() {
  const [sensitiveVal, setSensitiveVal] = useState("mydata");
  const [textAlign, setTextAlign] = useState("start");

  const textAlignValue = useMemo(
    () => (textAlign === "" ? undefined : textAlign),
    [textAlign],
  );

  const handleTextAlignChanged = useCallback(
    (event: ButtonsetSingleValueChangedEvent) => {
      setTextAlign(String(event.detail.value ?? ""));
    },
    [],
  );

  const handleValueChanged = useCallback(
    (event: InputSensitiveTextValueChangedEvent) => {
      setSensitiveVal(String(event.detail.value ?? ""));
    },
    [],
  );

  return (
    <div id="form-container">
      <div class="oj-sm-margin-4x-bottom oj-panel oj-bg-info-30">
        <h6>Set the text-align attribute</h6>
        <oj-c-buttonset-single
          id="textAlign"
          items={textAlignItems}
          value={textAlign}
          aria-label="Choose only one alignment."
          onvalueChanged={handleTextAlignChanged}
        />
      </div>

      <oj-c-form-layout id="myform">
        <oj-c-input-sensitive-text
          textAlign={textAlignValue as any}
          value={sensitiveVal}
          labelHint="Input Sensitive Text"
          onvalueChanged={handleValueChanged}
        />
      </oj-c-form-layout>
    </div>
  );
}

