import 'oj-c/input-text';
import 'ojs/ojformlayout';
import 'preact';
import { type ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import AsyncRegExpValidator = require('ojs/ojasyncvalidator-regexp');

type InputTextChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-c-input-text'>['onvalueChanged']>
>[0];
type InputTextValue = ComponentProps<'oj-c-input-text'>['value'];

export default function ValidatorsRegExpValidator() {
  const [patternValue, setPatternValue] = useState<InputTextValue>('');
  const [pattern2Value, setPattern2Value] = useState<InputTextValue>('');
  const [emailPatternValue, setEmailPatternValue] = useState<InputTextValue>('');

  const validators1 = useMemo(
    () => [
      new AsyncRegExpValidator({
        pattern: '\\w+\\s\\w+',
        hint: 'enter two words with a space between it.',
        messageDetail: 'you must enter a space between two words'
      })
    ],
    []
  );

  const validators = useMemo(
    () => [
      new AsyncRegExpValidator({
        pattern: '[a-zA-Z0-9]{3,}',
        hint: 'enter at least 3 letters or numbers.',
        messageDetail: 'Enter at least 3 letters or numbers'
      })
    ],
    []
  );

  const emailPatternValidator = useMemo(
    () => [
      new AsyncRegExpValidator({
        pattern:
          "[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*",
        hint: 'enter a valid email format',
        messageDetail: 'Not a valid email format'
      })
    ],
    []
  );

  const handlePatternValueChanged = (event: InputTextChangedEvent) => {
    setPatternValue((event.detail.value as InputTextValue | null | undefined) ?? '');
  };

  const handlePattern2ValueChanged = (event: InputTextChangedEvent) => {
    setPattern2Value((event.detail.value as InputTextValue | null | undefined) ?? '');
  };

  const handleEmailPatternChanged = (event: InputTextChangedEvent) => {
    setEmailPatternValue((event.detail.value as InputTextValue | null | undefined) ?? '');
  };

  return (
    <oj-form-layout id="validator-example">
      <oj-c-input-text
        id="pattern1"
        value={patternValue}
        onvalueChanged={handlePatternValueChanged}
        autocomplete="off"
        validators={validators1}
        labelHint="RegExp two words"
      />
      <oj-c-input-text
        id="pattern2"
        value={pattern2Value}
        onvalueChanged={handlePattern2ValueChanged}
        autocomplete="off"
        required
        validators={validators}
        labelHint="RegExp three numbers/letters"
      />
      <oj-c-input-text
        id="pattern3"
        value={emailPatternValue}
        onvalueChanged={handleEmailPatternChanged}
        autocomplete="off"
        validators={emailPatternValidator}
        labelHint="Pattern for email"
      />
    </oj-form-layout>
  );
}
