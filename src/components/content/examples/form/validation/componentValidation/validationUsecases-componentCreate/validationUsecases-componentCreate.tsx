import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import AsyncRegExpValidator = require('ojs/ojasyncvalidator-regexp');
import 'ojs/ojformlayout';
import 'ojs/ojinputtext';

type InputTextValue = ComponentProps<'oj-input-text'>['value'];
type InputTextValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-input-text'>['onvalueChanged']>
>[0];

export const ValidationUsecasesComponentCreate = () => {
  const [userName, setUserName] = useState<InputTextValue>('');
  const [fullName, setFullName] = useState<InputTextValue>('');
  const [showUserNameInitialError, setShowUserNameInitialError] = useState(true);

  const validators = useMemo(
    () => [
      new AsyncRegExpValidator({
        pattern: '[a-zA-Z0-9]{3,}',
        hint: 'at least 3 alphanumeric characters',
        messageDetail: 'You must enter at least 3 letters or numbers'
      })
    ],
    []
  );

  const handleUserNameChanged = (event: InputTextValueChangedEvent) => {
    setUserName(event.detail.value ?? '');
    setShowUserNameInitialError(false);
  };

  const handleFullNameChanged = (event: InputTextValueChangedEvent) => {
    setFullName(event.detail.value ?? '');
  };

  return (
    <oj-form-layout id="validation-usecase">
      <oj-input-text
        id="username"
        autocomplete="off"
        required
        validators={validators}
        value={userName}
        onvalueChanged={handleUserNameChanged}
        placeholder="at least 3 alphanumeric characters"
        labelHint="Username"
      />
      <span
        id="status1"
        title="Initial isValid Flag"
        role="img"
        class={`oj-ux-ico-information-s oj-icon-color-danger${showUserNameInitialError ? '' : ' oj-helper-hidden'}`}
      />
      <span id="nameval">[Component Value: {userName}]</span>
      <hr />
      <oj-input-text
        id="fullname"
        autocomplete="off"
        value={fullName}
        onvalueChanged={handleFullNameChanged}
        labelHint="Full Name"
      />
      <span
        id="status2"
        title="Initial isValid Flag"
        role="img"
        class="oj-ux-ico-information-s oj-icon-color-danger oj-helper-hidden"
      />
      <span id="fullnameval">[Component Value: {fullName}]</span>
    </oj-form-layout>
  );
};

export default ValidationUsecasesComponentCreate;
