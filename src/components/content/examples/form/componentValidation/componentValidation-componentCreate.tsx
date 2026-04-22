import { h } from "preact";
import { useState } from "preact/hooks";
import "ojs/ojformlayout";
import "ojs/ojinputtext";
import {
  createUsernameValidators,
} from "./componentValidation-shared";

export default function ValidationUsecasesComponentCreateExample() {
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [userNameIsNotValid, setUserNameIsNotValid] = useState(true);

  return (
    <oj-form-layout id="validation-usecase">
      <oj-input-text
        id="username"
        autocomplete="off"
        required={true}
        validators={createUsernameValidators("[a-zA-Z0-9]{3,}", "at least 3 alphanumeric characters") as any}
        value={userName}
        onvalueChanged={(event: any) => {
          const nextValue = String(event.detail.value ?? "");
          setUserName(nextValue);
          setUserNameIsNotValid(nextValue.length < 3);
        }}
        placeholder="at least 3 alphanumeric characters"
        labelHint="Username"
      />
      <span
        title="Initial isValid Flag"
        role="img"
        class="oj-ux-ico-information-s oj-icon-color-danger"
        style={{ display: userNameIsNotValid ? "inline-block" : "none" }}
      ></span>
      <span>[Component Value: {userName}]</span>
      <hr />
      <oj-input-text
        id="fullname"
        autocomplete="off"
        value={fullName}
        onvalueChanged={(event: any) => {
          setFullName(String(event.detail.value ?? ""));
        }}
        labelHint="Full Name"
      />
      <span>[Component Value: {fullName}]</span>
    </oj-form-layout>
  );
}
