import { h } from 'preact';
import { useMemo, useRef } from 'preact/hooks';
import AsyncLengthValidator = require('ojs/ojasyncvalidator-length');
import type { CInputTextElement } from 'oj-c/input-text';
import 'oj-c/input-text';
import 'ojs/ojformlayout';

export const ValidatorsValidateOnInput = () => {
  const inputRef = useRef<CInputTextElement<string> | null>(null);
  const validators = useMemo(() => [new AsyncLengthValidator({ max: 10 })], []);

  const handleRawValueChanged = () => {
    setTimeout(() => {
      void inputRef.current?.validate();
    }, 0);
  };

  return (
    <oj-form-layout id="validator-example">
      <oj-c-input-text
        ref={inputRef}
        id="text-input"
        validators={validators}
        labelHint="rawValueChanged validation"
        onrawValueChanged={handleRawValueChanged}
        help={{ instruction: 'Enter a value (maximum of 10 characters)' }}
        displayOptions={{ validatorHint: 'none' }}
      />
    </oj-form-layout>
  );
};

export default ValidatorsValidateOnInput;
