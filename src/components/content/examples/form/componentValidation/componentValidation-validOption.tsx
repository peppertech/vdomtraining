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

export default function ValidationUsecasesValidOptionExample() {
  const usernameRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);
  const [userName, setUserName] = useState("");
  const [userNameValid, setUserNameValid] = useState("");
  const [userNameMessagesCustom, setUserNameMessagesCustom] = useState<any[]>([]);
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState("");

  return (
    <oj-form-layout id="validation-usecase">
      <oj-c-input-text
        ref={usernameRef}
        id="username"
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
        id="password"
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
          label="Submit"
          onojAction={() => {
            const usernameValid = usernameRef.current?.valid;
            const passwordValid = passwordRef.current?.valid;
            if (usernameValid === "valid" && passwordValid === "valid") {
              setUserNameMessagesCustom([]);
            } else {
              usernameRef.current?.showMessages?.();
              passwordRef.current?.showMessages?.();
            }
          }}
        />
        <oj-c-button
          slot="value"
          label="Add Custom Message"
          onojAction={() => {
            setUserNameMessagesCustom([
              {
                detail: "Warning messages are not considered invalid.",
                severity: "warning",
              },
            ]);
          }}
        />
      </oj-label-value>
    </oj-form-layout>
  );
}
