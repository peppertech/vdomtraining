import "oj-c/button";
import "oj-c/input-text";
import 'preact';
import { useState } from "preact/hooks";

export default function InputTextCorePackRawValueExample() {
  const [currentValue, setCurrentValue] = useState("Blue");
  const [currentRawValue, setCurrentRawValue] = useState("Blue");
  const [submitMessage, setSubmitMessage] = useState("");

  return (
    <div>
      <oj-c-input-text
        id="text-input"
        value={currentValue}
        labelHint="raw value example"
        labelEdge="inside"
        onvalueChanged={(event) => {
          setCurrentValue((event.detail.value as string | null | undefined) ?? "");
        }}
        onrawValueChanged={(event) => {
          setCurrentRawValue((event.detail.value as string | null | undefined) ?? "");
        }}
      ></oj-c-input-text>
      <div class="oj-sm-margin-4x-vertical">
        <span>Current component value is: </span>
        <span>{currentValue}</span>
      </div>
      <div class="oj-sm-margin-2x-bottom">
        <span>Current component rawValue is: </span>
        <span>{currentRawValue}</span>
      </div>
      <oj-c-button
        label="Submit"
        disabled={currentRawValue.trim() === ""}
        onojAction={() => {
          setSubmitMessage(
            "We enable the Submit button when rawValue is not empty.",
          );
        }}
      ></oj-c-button>
      {submitMessage ? <div class="oj-sm-margin-2x-top">{submitMessage}</div> : null}
    </div>
  );
}
