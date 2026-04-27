import { h } from "preact";
import { useCallback, useState } from "preact/hooks";
import "oj-c/input-sensitive-text";
import { type InputSensitiveTextValueChangedEvent } from "./inputSensitiveText-shared";

export default function InputSensitiveTextBindingVdomExample() {
  const [value, setValue] = useState("555-55-5555");

  const handleValueChanged = useCallback(
    (event: InputSensitiveTextValueChangedEvent) => {
      setValue(String(event.detail.value ?? ""));
    },
    [],
  );

  return (
    <div id="inputSensitiveTextBindingVdom">
      <oj-c-input-sensitive-text
        id="sensitive-input"
        value={value}
        labelHint="Secret"
        onvalueChanged={handleValueChanged}
      />
      <div class="oj-sm-margin-4x-vertical">
        <span>Current component value is:</span> <span>{value}</span>
      </div>
    </div>
  );
}

