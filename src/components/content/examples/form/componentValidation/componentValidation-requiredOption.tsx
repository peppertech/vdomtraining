import { h } from "preact";
import { useState } from "preact/hooks";
import "oj-c/button";
import "oj-c/input-text";
import { usernameValidator } from "./componentValidation-shared";

export default function ValidationUsecasesRequiredOptionExample() {
  const [userName, setUserName] = useState<string | undefined>(undefined);
  const [userNameValid, setUserNameValid] = useState("");
  const [userNameRequired, setUserNameRequired] = useState(false);

  return (
    <div id="required-option-usecase">
      <oj-c-input-text
        id="username"
        autocomplete="off"
        required={userNameRequired}
        validators={[usernameValidator] as any}
        labelHint="Username"
        labelEdge="inside"
        valid={userNameValid as any}
        value={userName}
        placeholder="at least 3 alphanumeric characters"
        onvalidChanged={(event: any) => {
          setUserNameValid(String(event.detail.value ?? ""));
        }}
        onvalueChanged={(event: any) => {
          setUserName(String(event.detail.value ?? ""));
        }}
      />
      <span>[Component&apos;s value: {String(userName)}]</span>
      <span>[Component&apos;s valid: {userNameValid}]</span>
      <div>
        <oj-c-button
          label="Toggle Required"
          onojAction={() => setUserNameRequired((current) => !current)}
        />
      </div>
    </div>
  );
}
