import { h } from "preact";
import { useRef, useState } from "preact/hooks";
import "ojs/ojformlayout";
import "ojs/ojlabelvalue";
import "oj-c/button";
import "oj-c/input-password";
import "oj-c/input-text";
import {
  passwordValidator,
  usernameValidator,
} from "./componentValidation-shared";

export default function ValidationUsecasesValidateMethodExample() {
  const usernameRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);
  const [userName, setUserName] = useState("");
  const [userNameValid, setUserNameValid] = useState("");
  const [userNameMessagesCustom, setUserNameMessagesCustom] = useState<any[]>([]);
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState("");
  const [status, setStatus] = useState("");

  return (
    <oj-form-layout id="validation-usecase">
      <oj-c-input-text
        ref={usernameRef}
        autocomplete="off"
        required={true}
        onvalidChanged={(event: any) => {
          setUserNameValid(String(event.detail.value ?? ""));
        }}
        validators={[usernameValidator] as any}
        value={userName}
        messagesCustom={userNameMessagesCustom as any}
        placeholder="at least 3 alphanumeric characters"
        labelHint="Username"
        onvalueChanged={(event: any) => {
          setUserName(String(event.detail.value ?? ""));
        }}
      />
      <span>[Component&apos;s valid property: {userNameValid}]</span>

      <oj-c-input-password
        ref={passwordRef}
        autocomplete="off"
        required={true}
        onvalidChanged={(event: any) => {
          setPasswordValid(String(event.detail.value ?? ""));
        }}
        validators={[passwordValidator] as any}
        value={password}
        help={{ instruction: "Enter at least 6 characters including a number, one uppercase and lowercase letter" } as any}
        labelHint="Password"
        maskIcon="visible"
        onvalueChanged={(event: any) => {
          setPassword(String(event.detail.value ?? ""));
        }}
      />
      <span>[Component&apos;s valid property: {passwordValid}]</span>

      <oj-label-value>
        <oj-c-button
          slot="value"
          label="Validate and Submit"
          onojAction={async () => {
            const result1 = await usernameRef.current?.validate?.();
            const result2 = await passwordRef.current?.validate?.();
            if (result1 === "valid" && result2 === "valid") {
              setStatus("Everything is valid; submit the form.");
            } else {
              setStatus("Validation failed. Resolve the shown messages.");
            }
          }}
        />
        <oj-c-button
          slot="value"
          label="Add Custom Message"
          onojAction={() => {
            setUserNameMessagesCustom([
              {
                summary: "",
                detail: "Warning messages are not considered invalid.",
                severity: "warning",
              },
            ]);
          }}
        />
      </oj-label-value>
      {status ? <div>{status}</div> : null}
    </oj-form-layout>
  );
}
