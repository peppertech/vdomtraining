import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import AsyncRegExpValidator = require('ojs/ojasyncvalidator-regexp');
import type Validator = require('ojs/ojvalidator');
import type { CInputPasswordElement } from 'oj-c/input-password';
import 'oj-c/input-password';
import 'ojs/ojformlayout';

type InputPasswordValue = ComponentProps<'oj-c-input-password'>['value'];
type InputPasswordChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-c-input-password'>['onvalueChanged']>
>[0];

export const ValidatorsCustomValidators = () => {
  const confirmPasswordRef = useRef<CInputPasswordElement | null>(null);
  const [password, setPassword] = useState<InputPasswordValue>('');
  const [passwordRepeat, setPasswordRepeat] = useState<InputPasswordValue>('');

  const validators = useMemo(
    () => [
      new AsyncRegExpValidator({
        pattern: '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,}',
        label: 'Password',
        hint: 'Enter at least 6 characters including a number, one uppercase and lowercase letter.',
        messageSummary: '{label} too Weak',
        messageDetail:
          'Enter at least 6 characters including a number, one uppercase and lowercase letter.'
      })
    ],
    []
  );

  const equalToPassword = useMemo<Validator<string>>(
    () => ({
      validate: (value: string) => {
        if (!value && !password) {
          return;
        }
        if (value !== password) {
          throw new Error('The passwords must match.');
        }
      }
    }),
    [password]
  );

  useEffect(() => {
    const confirmPassword = confirmPasswordRef.current;
    if (password && confirmPassword?.value) {
      void confirmPassword.validate();
    }
  }, [password]);

  const handlePasswordChanged = (event: InputPasswordChangedEvent) => {
    setPassword(event.detail.value ?? '');
  };

  const handleConfirmPasswordChanged = (event: InputPasswordChangedEvent) => {
    setPasswordRepeat(event.detail.value ?? '');
  };

  return (
    <oj-form-layout id="custom-validator-example">
      <oj-c-input-password
        id="password"
        required
        value={password}
        onvalueChanged={handlePasswordChanged}
        validators={validators}
        labelHint="Password"
        maskIcon="visible"
      />
      <oj-c-input-password
        ref={confirmPasswordRef}
        id="cpassword"
        value={passwordRepeat}
        onvalueChanged={handleConfirmPasswordChanged}
        validators={[equalToPassword]}
        labelHint="Confirm Password"
        maskIcon="visible"
      />
    </oj-form-layout>
  );
};

export default ValidatorsCustomValidators;
