import { h } from "preact";
import { useCallback, useState } from "preact/hooks";
import "oj-c/form-layout";
import "oj-c/input-sensitive-text";
import { type InputSensitiveTextValueChangedEvent } from "./inputSensitiveText-shared";

export default function InputSensitiveTextNoLabelVdomExample() {
  const [sensitiveVal, setSensitiveVal] = useState("mydata");

  const handleValueChanged = useCallback(
    (event: InputSensitiveTextValueChangedEvent) => {
      setSensitiveVal(String(event.detail.value ?? ""));
    },
    [],
  );

  return (
    <div id="inputSensitiveTextNoLabelVdom">
      <oj-c-form-layout direction="row" maxColumns={2}>
        <oj-c-input-sensitive-text
          value={sensitiveVal}
          labelHint="Input Sensitive Text No Visual Label"
          labelEdge="none"
          onvalueChanged={handleValueChanged}
        />
        <oj-c-input-sensitive-text
          labelHint="Input Sensitive Text No Visual Label With Placeholder"
          labelEdge="none"
          placeholder="Input Sensitive Text placeholder"
        />
      </oj-c-form-layout>
    </div>
  );
}

