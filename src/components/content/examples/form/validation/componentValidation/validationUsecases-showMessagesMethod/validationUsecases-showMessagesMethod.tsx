import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useRef, useState } from 'preact/hooks';
import AsyncRegExpValidator = require('ojs/ojasyncvalidator-regexp');
import type { CInputPasswordElement } from 'oj-c/input-password';
import type { CInputTextElement } from 'oj-c/input-text';
import 'oj-c/button';
import 'oj-c/input-password';
import 'oj-c/input-text';
import 'ojs/ojformlayout';
import 'ojs/ojlabelvalue';

type ValidState = 'valid' | 'pending' | 'invalidHidden' | 'invalidShown';
type InputTextValue = ComponentProps<'oj-c-input-text'>['value'];
type InputPasswordValue = ComponentProps<'oj-c-input-password'>['value'];
type InputTextValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-c-input-text'>['onvalueChanged']>
>[0];
type InputPasswordValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-c-input-password'>['onvalueChanged']>
>[0];
type InputTextValidChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-c-input-text'>['onvalidChanged']>
>[0];
type InputPasswordValidChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-c-input-password'>['onvalidChanged']>
>[0];

export const ValidationUsecasesShowMessagesMethod = () => {
  const userNameRef = useRef<CInputTextElement<string> | null>(null);
  const passwordRef = useRef<CInputPasswordElement | null>(null);
  const [userName, setUserName] = useState<InputTextValue>(null);
  const [userNameValid, setUserNameValid] = useState<ValidState>('valid');
  const [password, setPassword] = useState<InputPasswordValue>('');
  const [passwordValid, setPasswordValid] = useState<ValidState>('valid');

  const validators = useMemo(
    () => [
      new AsyncRegExpValidator({
        pattern: '[a-zA-Z0-9]{3,}',
        messageDetail: 'Enter at least 3 letters or numbers'
      })
    ],
    []
  );
  const validators2 = useMemo(
    () => [
      new AsyncRegExpValidator({
        pattern: '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,}',
        label: 'Password',
        messageSummary: "'{label}' too Weak",
        messageDetail: 'You must enter a password that meets our minimum security requirements.'
      })
    ],
    []
  );

  const handleUserNameChanged = (event: InputTextValueChangedEvent) => {
    setUserName(event.detail.value ?? null);
  };

  const handlePasswordChanged = (event: InputPasswordValueChangedEvent) => {
    setPassword(event.detail.value ?? '');
  };

  const handleUserNameValidChanged = (event: InputTextValidChangedEvent) => {
    setUserNameValid(event.detail.value as ValidState);
  };

  const handlePasswordValidChanged = (event: InputPasswordValidChangedEvent) => {
    setPasswordValid(event.detail.value as ValidState);
  };

  const handleShowMessages = () => {
    userNameRef.current?.showMessages();
    passwordRef.current?.showMessages();
  };

  return (
    <oj-form-layout id="validation-usecase">
      <oj-c-input-text
        ref={userNameRef}
        id="username"
        autocomplete="off"
        required
        validators={validators}
        value={userName}
        onvalueChanged={handleUserNameChanged}
        onvalidChanged={handleUserNameValidChanged}
        placeholder="at least 3 alphanumeric characters"
        labelHint="Username"
      />
      <span id="namevalid">[Component&apos;s valid property: {userNameValid}]</span>

      <oj-c-input-password
        ref={passwordRef}
        id="password"
        autocomplete="off"
        required
        validators={validators2}
        value={password}
        onvalueChanged={handlePasswordChanged}
        onvalidChanged={handlePasswordValidChanged}
        help={{ instruction: 'Enter at least 6 characters including a number, one uppercase and lowercase letter' }}
        labelHint="Password"
        maskIcon="visible"
      />
      <span id="passwordvalid">[Component&apos;s valid property: {passwordValid}]</span>

      <oj-label-value>
        <oj-c-button
          id="showMsgsBtn"
          slot="value"
          onojAction={handleShowMessages}
          label="Show Messages"
        />
      </oj-label-value>
    </oj-form-layout>
  );
};

export default ValidationUsecasesShowMessagesMethod;
