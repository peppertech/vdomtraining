import "oj-c/form-layout";
import "oj-c/input-sensitive-text";
import 'preact';
import { useCallback,useMemo,useState } from "preact/hooks";
import {
  type InputSensitiveTextRawValueChangedEvent,
  type InputSensitiveTextValueChangedEvent,
} from "./inputSensitiveText-shared";

export default function InputSensitiveTextClearIconVdomExample() {
  const [valueNoClearIcon, setValueNoClearIcon] = useState("");
  const [valueClearIconNever, setValueClearIconNever] = useState("");
  const [valueClearIconAlways, setValueClearIconAlways] = useState("");
  const [valueClearIconAlwaysRequired, setValueClearIconAlwaysRequired] =
    useState("");
  const [valueClearIconConditional, setValueClearIconConditional] =
    useState("");
  const [rawValueClearIconConditional, setRawValueClearIconConditional] =
    useState("");

  const handleStringSetter = useCallback(
    (setter: (value: string) => void) =>
      (event: InputSensitiveTextValueChangedEvent) => {
        setter(String(event.detail.value ?? ""));
      },
    [],
  );

  const handleRawValueChanged = useCallback(
    (event: InputSensitiveTextRawValueChangedEvent) => {
      setRawValueClearIconConditional(String(event.detail.value ?? ""));
    },
    [],
  );

  const conditionalRawValueText = useMemo(
    () => JSON.stringify(rawValueClearIconConditional),
    [rawValueClearIconConditional],
  );

  return (
    <div id="inputSensitiveTextClearIconVdom">
      <oj-c-form-layout>
        <oj-c-input-sensitive-text
          value={valueNoClearIcon}
          labelHint="no clear-icon attribute"
          onvalueChanged={handleStringSetter(setValueNoClearIcon)}
        />
        <oj-c-input-sensitive-text
          value={valueClearIconNever}
          clearIcon="never"
          labelHint="clear-icon='never'"
          onvalueChanged={handleStringSetter(setValueClearIconNever)}
        />
        <oj-c-input-sensitive-text
          value={valueClearIconAlways}
          clearIcon="always"
          labelHint="clear-icon='always'"
          onvalueChanged={handleStringSetter(setValueClearIconAlways)}
        />
        <oj-c-input-sensitive-text
          value={valueClearIconAlwaysRequired}
          clearIcon="always"
          required
          labelHint="clear-icon='always' with required"
          onvalueChanged={handleStringSetter(setValueClearIconAlwaysRequired)}
        />
        <oj-c-input-sensitive-text
          value={valueClearIconConditional}
          clearIcon="conditional"
          labelHint="clear-icon='conditional'"
          onvalueChanged={handleStringSetter(setValueClearIconConditional)}
          onrawValueChanged={handleRawValueChanged}
        />
      </oj-c-form-layout>

      <div class="oj-sm-margin-4x-vertical">
        <span>Current conditional value is:</span>{" "}
        <span>{valueClearIconConditional}</span>
      </div>

      <span>Current conditional rawValue is:</span>{" "}
      <span>{conditionalRawValueText}</span>
    </div>
  );
}

