import "oj-c/input-sensitive-text";
import 'preact';
import { useCallback,useMemo,useState } from "preact/hooks";
import {
  type InputSensitiveTextRawValueChangedEvent,
  type InputSensitiveTextValueChangedEvent,
} from "./inputSensitiveText-shared";

export default function InputSensitiveTextMaxLengthVdomExample() {
  const [value, setValue] = useState("");
  const [rawValue, setRawValue] = useState("");

  const rawValueText = useMemo(() => JSON.stringify(rawValue), [rawValue]);

  const handleValueChanged = useCallback(
    (event: InputSensitiveTextValueChangedEvent) => {
      setValue(String(event.detail.value ?? ""));
    },
    [],
  );

  const handleRawValueChanged = useCallback(
    (event: InputSensitiveTextRawValueChangedEvent) => {
      setRawValue(String(event.detail.value ?? ""));
    },
    [],
  );

  return (
    <div id="inputSensitiveTextMaxLengthVdom">
      <div class="oj-sm-margin-5x-bottom">
        <oj-c-input-sensitive-text
          value={value}
          length={{ max: 3, countBy: "codeUnit" }}
          labelHint="Input Sensitive Text with max length"
          onvalueChanged={handleValueChanged}
          onrawValueChanged={handleRawValueChanged}
        />
      </div>

      <div class="oj-sm-margin-4x-vertical">
        <span>Current component value is:</span> <span>{value}</span>
      </div>

      <span>Current component rawValue is:</span> <span>{rawValueText}</span>
    </div>
  );
}

