import { h } from "preact";
import { useState } from "preact/hooks";
import "oj-c/input-text";

export default function InputTextCorePackTextExample() {
  const [value, setValue] = useState("Green");

  return (
    <div>
      <oj-c-input-text
        id="text-input"
        value={value}
        labelHint="Color"
        labelEdge="inside"
        onvalueChanged={(event: any) => {
          setValue(event.detail.value ?? "");
        }}
      ></oj-c-input-text>
      <div class="oj-sm-margin-4x-vertical">
        <span>Current component value is: </span>
        <span>{value}</span>
      </div>
    </div>
  );
}
