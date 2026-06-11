import { h } from "preact";
import { useState } from "preact/hooks";
import "ojs/ojformlayout";
import "ojs/ojinputtext";

export default function InputTextLegacyNoLabelExample() {
  const [textValue, setTextValue] = useState("text");

  return (
    <oj-form-layout direction="row" maxColumns={2}>
      <oj-input-text
        value={textValue}
        labelHint="Input Text No Visual Label"
        labelEdge="none"
        onvalueChanged={(event) => {
          setTextValue((event.detail.value as string | null | undefined) ?? "");
        }}
      ></oj-input-text>
      <oj-input-text
        labelHint="Input Text No Visual Label With Placeholder"
        labelEdge="none"
        placeholder="input text placeholder"
      ></oj-input-text>
    </oj-form-layout>
  );
}
