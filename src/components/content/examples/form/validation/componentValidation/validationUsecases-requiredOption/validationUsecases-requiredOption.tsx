import { h, type ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import AsyncRegExpValidator = require('ojs/ojasyncvalidator-regexp');
import 'oj-c/button';
import 'oj-c/input-text';

type InputTextValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-c-input-text'>['onvalueChanged']>
>[0];
type InputTextValidChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-c-input-text'>['onvalidChanged']>
>[0];
type InputTextValue = ComponentProps<'oj-c-input-text'>['value'];
type InputTextValid = 'valid' | 'pending' | 'invalidHidden' | 'invalidShown';

export const ValidationUsecasesRequiredOption = () => {
  const [userName, setUserName] = useState<InputTextValue>(undefined);
  const [userNameValid, setUserNameValid] = useState<InputTextValid>('valid');
  const [userNameRequired, setUserNameRequired] = useState(false);
  const validators = useMemo(
    () => [
      new AsyncRegExpValidator({
        pattern: '[a-zA-Z0-9]{3,}',
        messageDetail: 'Enter at least 3 letters or numbers'
      })
    ],
    []
  );

  const handleUserNameChanged = (event: InputTextValueChangedEvent) => {
    setUserName((event.detail.value as InputTextValue | null | undefined) ?? undefined);
  };

  const handleUserNameValidChanged = (event: InputTextValidChangedEvent) => {
    setUserNameValid(event.detail.value as InputTextValid);
  };

  const handleToggleRequired = () => {
    setUserNameRequired((current) => !current);
  };

  return (
    <div id="required-option-usecase">
      <oj-c-input-text
        id="username"
        autocomplete="off"
        required={userNameRequired}
        validators={validators}
        labelHint="Username"
        labelEdge="inside"
        value={userName}
        onvalueChanged={handleUserNameChanged}
        onvalidChanged={handleUserNameValidChanged}
        placeholder="at least 3 alphanumeric characters"
      />
      <span id="val">[Component&apos;s value: {String(userName)}]</span>
      <span id="valid">[Component&apos;s valid: {userNameValid}]</span>
      <div>
        <oj-c-button
          id="toggleReqBtn"
          title="Toggles 'required' option on Username"
          onojAction={handleToggleRequired}
          label="Toggle Required"
        />
      </div>
    </div>
  );
};

export default ValidationUsecasesRequiredOption;
