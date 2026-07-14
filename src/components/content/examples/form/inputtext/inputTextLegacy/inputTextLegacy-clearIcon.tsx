import "ojs/ojformlayout";
import "ojs/ojinputtext";
import 'preact';
import { useState } from "preact/hooks";

export default function InputTextLegacyClearIconExample() {
  const [valueNoClearIcon, setValueNoClearIcon] = useState("");
  const [valueClearIconNever, setValueClearIconNever] = useState("");
  const [valueClearIconAlways, setValueClearIconAlways] = useState("");
  const [valueClearIconAlwaysRequired, setValueClearIconAlwaysRequired] =
    useState("");
  const [valueClearIconConditional, setValueClearIconConditional] = useState("");
  const [rawValueClearIconConditional, setRawValueClearIconConditional] =
    useState("");

  return (
    <div>
      <oj-form-layout>
        <oj-input-text
          value={valueNoClearIcon}
          labelHint="no clear-icon attribute"
          onvalueChanged={(event) => {
            setValueNoClearIcon((event.detail.value as string | null | undefined) ?? "");
          }}
        ></oj-input-text>
        <oj-input-text
          value={valueClearIconNever}
          clearIcon="never"
          labelHint="clear-icon='never'"
          onvalueChanged={(event) => {
            setValueClearIconNever((event.detail.value as string | null | undefined) ?? "");
          }}
        ></oj-input-text>
        <oj-input-text
          value={valueClearIconAlways}
          clearIcon="always"
          labelHint="clear-icon='always'"
          onvalueChanged={(event) => {
            setValueClearIconAlways((event.detail.value as string | null | undefined) ?? "");
          }}
        ></oj-input-text>
        <oj-input-text
          value={valueClearIconAlwaysRequired}
          clearIcon="always"
          required
          labelHint="clear-icon='always' with required"
          onvalueChanged={(event) => {
            setValueClearIconAlwaysRequired((event.detail.value as string | null | undefined) ?? "");
          }}
        ></oj-input-text>
        <oj-input-text
          value={valueClearIconConditional}
          rawValue={rawValueClearIconConditional}
          clearIcon="conditional"
          labelHint="clear-icon='conditional'"
          onvalueChanged={(event) => {
            setValueClearIconConditional((event.detail.value as string | null | undefined) ?? "");
          }}
          onrawValueChanged={(event) => {
            setRawValueClearIconConditional((event.detail.value as string | null | undefined) ?? "");
          }}
        ></oj-input-text>
      </oj-form-layout>
      <div class="oj-sm-margin-4x-vertical">
        <span>Current conditional value is: </span>
        <span>{valueClearIconConditional}</span>
      </div>
      <div>
        <span>Current conditional rawValue is: </span>
        <span>{rawValueClearIconConditional}</span>
      </div>
    </div>
  );
}
