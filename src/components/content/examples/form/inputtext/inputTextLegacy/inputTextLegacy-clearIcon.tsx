import { h } from "preact";
import { useState } from "preact/hooks";
import "ojs/ojformlayout";
import "ojs/ojinputtext";

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
          onvalueChanged={(event: any) => {
            setValueNoClearIcon(event.detail.value ?? "");
          }}
        ></oj-input-text>
        <oj-input-text
          value={valueClearIconNever}
          clearIcon="never"
          labelHint="clear-icon='never'"
          onvalueChanged={(event: any) => {
            setValueClearIconNever(event.detail.value ?? "");
          }}
        ></oj-input-text>
        <oj-input-text
          value={valueClearIconAlways}
          clearIcon="always"
          labelHint="clear-icon='always'"
          onvalueChanged={(event: any) => {
            setValueClearIconAlways(event.detail.value ?? "");
          }}
        ></oj-input-text>
        <oj-input-text
          value={valueClearIconAlwaysRequired}
          clearIcon="always"
          required
          labelHint="clear-icon='always' with required"
          onvalueChanged={(event: any) => {
            setValueClearIconAlwaysRequired(event.detail.value ?? "");
          }}
        ></oj-input-text>
        <oj-input-text
          value={valueClearIconConditional}
          rawValue={rawValueClearIconConditional}
          clearIcon="conditional"
          labelHint="clear-icon='conditional'"
          onvalueChanged={(event: any) => {
            setValueClearIconConditional(event.detail.value ?? "");
          }}
          onrawValueChanged={(event: any) => {
            setRawValueClearIconConditional(event.detail.value ?? "");
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
