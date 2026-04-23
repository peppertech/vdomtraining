import { h } from "preact";
import { useState } from "preact/hooks";
import "ojs/ojinputtext";

export default function InputTextLegacyTextExample() {
  const [value, setValue] = useState("Green");

  return (
    <div>
      <oj-input-text
        id="text-input"
        value={value}
        labelHint="Color"
        labelEdge="inside"
        onvalueChanged={(event: any) => {
          setValue(event.detail.value ?? "");
        }}
      ></oj-input-text>
      <div class="oj-sm-margin-4x-vertical">
        <span>Current component value is: </span>
        <span>{value}</span>
      </div>
    </div>
  );
}
