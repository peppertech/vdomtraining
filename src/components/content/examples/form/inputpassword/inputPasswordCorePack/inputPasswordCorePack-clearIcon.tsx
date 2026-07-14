import "oj-c/form-layout";
import "oj-c/input-password";
import 'preact';
import { useState } from "preact/hooks";
import {
  type InputPasswordCorePackRawValueChangedEvent,
  type InputPasswordCorePackValueChangedEvent,
} from "./inputPasswordCorePack-shared";

export default function InputPasswordCorePackClearIconExample() {
  const [valueNoClearIcon, setValueNoClearIcon] = useState("");
  const [valueClearIconNever, setValueClearIconNever] = useState("");
  const [valueClearIconAlways, setValueClearIconAlways] = useState("");
  const [valueClearIconAlwaysRequired, setValueClearIconAlwaysRequired] =
    useState("");
  const [valueClearIconConditional, setValueClearIconConditional] =
    useState("");
  const [rawValueClearIconConditional, setRawValueClearIconConditional] =
    useState("");

  return (
    <div id="inputPasswordCorePackClearIcon">
      <oj-c-form-layout>
        <oj-c-input-password
          id="no-clear-icon"
          value={valueNoClearIcon}
          labelHint="no clear-icon attribute"
          onvalueChanged={(event: InputPasswordCorePackValueChangedEvent) => {
            setValueNoClearIcon(String(event.detail.value ?? ""));
          }}
        />
        <oj-c-input-password
          id="clear-icon-never"
          value={valueClearIconNever}
          clearIcon="never"
          labelHint="clear-icon='never'"
          onvalueChanged={(event: InputPasswordCorePackValueChangedEvent) => {
            setValueClearIconNever(String(event.detail.value ?? ""));
          }}
        />
        <oj-c-input-password
          id="clear-icon-always"
          value={valueClearIconAlways}
          clearIcon="always"
          labelHint="clear-icon='always'"
          onvalueChanged={(event: InputPasswordCorePackValueChangedEvent) => {
            setValueClearIconAlways(String(event.detail.value ?? ""));
          }}
        />
        <oj-c-input-password
          id="clear-icon-always-required"
          value={valueClearIconAlwaysRequired}
          clearIcon="always"
          required
          labelHint="clear-icon='always' with required"
          onvalueChanged={(event: InputPasswordCorePackValueChangedEvent) => {
            setValueClearIconAlwaysRequired(String(event.detail.value ?? ""));
          }}
        />
        <oj-c-input-password
          id="clear-icon-conditional"
          value={valueClearIconConditional}
          clearIcon="conditional"
          labelHint="clear-icon='conditional'"
          onvalueChanged={(event: InputPasswordCorePackValueChangedEvent) => {
            setValueClearIconConditional(String(event.detail.value ?? ""));
          }}
          onrawValueChanged={(
            event: InputPasswordCorePackRawValueChangedEvent,
          ) => {
            setRawValueClearIconConditional(String(event.detail.value ?? ""));
          }}
        />
      </oj-c-form-layout>

      <div class="oj-sm-margin-4x-vertical">
        <span>Current conditional value is:</span>{" "}
        <span>{valueClearIconConditional}</span>
      </div>

      <span>Current conditional rawValue is:</span>{" "}
      <span>{rawValueClearIconConditional}</span>
    </div>
  );
}
