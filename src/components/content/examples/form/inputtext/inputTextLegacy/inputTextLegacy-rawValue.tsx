import "ojs/ojbutton";
import "ojs/ojinputtext";
import 'preact';
import { useState } from "preact/hooks";

export default function InputTextLegacyRawValueExample() {
  const [currentValue, setCurrentValue] = useState("Blue");
  const [currentRawValue, setCurrentRawValue] = useState("Blue");
  const [submitMessage, setSubmitMessage] = useState("");

  const isDisabled = currentRawValue.trim() === "";

  return (
    <div>
      <oj-input-text
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
      ></oj-input-text>
      <div class="oj-sm-margin-4x-vertical">
        <span>Current component value is: </span>
        <span>{currentValue}</span>
      </div>
      <div class="oj-sm-margin-2x-bottom">
        <span>Current component rawValue is: </span>
        <span>{currentRawValue}</span>
      </div>
      <oj-button
        disabled={isDisabled}
        onojAction={() => {
          setSubmitMessage(
            "We enable the Submit button when rawValue is not empty.",
          );
        }}
      >
        Submit
      </oj-button>
      {submitMessage ? <div class="oj-sm-margin-2x-top">{submitMessage}</div> : null}
    </div>
  );
}
