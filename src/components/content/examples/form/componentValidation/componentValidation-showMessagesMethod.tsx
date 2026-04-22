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

export default function ValidationUsecasesShowMessagesExample() {
  const usernameRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);
  const [userNameValid, setUserNameValid] = useState("invalidHidden");
  const [passwordValid, setPasswordValid] = useState("invalidHidden");

  return (
    <oj-form-layout id="validation-usecase">
      <oj-c-input-text
        ref={usernameRef}
        autocomplete="off"
        required={true}
        valid={userNameValid as any}
        validators={[usernameValidator] as any}
        value={null as any}
        placeholder="at least 3 alphanumeric characters"
        labelHint="Username"
        onvalidChanged={(event: any) => {
          setUserNameValid(String(event.detail.value ?? ""));
        }}
      />
      <span>[Component&apos;s valid property: {userNameValid}]</span>

      <oj-c-input-password
        ref={passwordRef}
        autocomplete="off"
        required={true}
        valid={passwordValid as any}
        validators={[passwordValidator] as any}
        value=""
        help={{ instruction: "Enter at least 6 characters including a number, one uppercase and lowercase letter" } as any}
        labelHint="Password"
        maskIcon="visible"
        onvalidChanged={(event: any) => {
          setPasswordValid(String(event.detail.value ?? ""));
        }}
      />
      <span>[Component&apos;s valid property: {passwordValid}]</span>

      <oj-label-value>
        <oj-c-button
          slot="value"
          label="Show Messages"
          onojAction={() => {
            usernameRef.current?.showMessages?.();
            passwordRef.current?.showMessages?.();
          }}
        />
      </oj-label-value>
    </oj-form-layout>
  );
}
