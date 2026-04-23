import { h } from "preact";
import { useState } from "preact/hooks";
import "oj-c/input-text";
import { maxLengthConfig } from "./inputTextCorePack-shared";

export default function InputTextCorePackMaxLengthExample() {
  const [value, setValue] = useState("");
  const [rawValue, setRawValue] = useState("");

  return (
    <div>
      <div class="oj-sm-margin-5x-bottom">
        <oj-c-input-text
          id="text-input"
          value={value}
          length={maxLengthConfig}
          labelHint="Input text with max length"
          labelEdge="inside"
          onvalueChanged={(event: any) => {
            setValue(event.detail.value ?? "");
          }}
          onrawValueChanged={(event: any) => {
            setRawValue(event.detail.value ?? "");
          }}
        ></oj-c-input-text>
      </div>

      <div class="oj-sm-margin-4x-vertical">
        <span>Current component value is: </span>
        <span>{value}</span>
      </div>
      <div>
        <span>Current component rawValue is: </span>
        <span>{rawValue}</span>
      </div>
    </div>
  );
}
