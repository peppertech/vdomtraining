import { h } from "preact";
import { useRef, useState } from "preact/hooks";
import "ojs/ojbutton";
import "ojs/ojinputtext";
import "ojs/ojlabel";
import {
  createUsernameValidators,
} from "./componentValidation-shared";

export default function ValidationUsecasesRefreshMethodExample() {
  const [userName, setUserName] = useState("");
  const [labelText, setLabelText] = useState("Username");
  const inputRef = useRef<any>(null);

  return (
    <div id="validation-usecase">
      <oj-label for="username" showRequired={true}>
        <span>{labelText}</span>
      </oj-label>
      <oj-input-text
        ref={inputRef}
        id="username"
        autocomplete="off"
        required={true}
        value={userName}
        validators={createUsernameValidators("[a-zA-Z]{3,}", "at least 3 characters") as any}
        translations={{
          required: {
            messageSummary: "Custom: {label} Required",
            messageDetail: "Custom: A value is required for the {label} field.",
          },
        } as any}
        onvalueChanged={(event: any) => {
          setUserName(String(event.detail.value ?? ""));
        }}
      ></oj-input-text>

      <span>[Component Value: {userName}]</span>

      <div>
        <oj-button
          onojAction={() => {
            setLabelText("USERNAME");
            window.setTimeout(() => inputRef.current?.refresh?.(), 0);
          }}
        >
          Change Label and Refresh
        </oj-button>
      </div>
    </div>
  );
}
