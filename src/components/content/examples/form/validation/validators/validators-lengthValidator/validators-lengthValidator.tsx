import 'oj-c/input-text';
import 'ojs/ojformlayout';
import 'preact';
import { type ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import AsyncLengthValidator = require('ojs/ojasyncvalidator-length');

type InputTextChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-c-input-text'>['onvalueChanged']>
>[0];
type InputTextValue = ComponentProps<'oj-c-input-text'>['value'];

export default function ValidatorsLengthValidator() {
  const [lengthValue1, setLengthValue1] = useState<InputTextValue>('');
  const [lengthValue2, setLengthValue2] = useState<InputTextValue>('');
  const [lengthValue3, setLengthValue3] = useState<InputTextValue>('');
  const [lengthValue4, setLengthValue4] = useState<InputTextValue>('');

  const validators = useMemo(() => [new AsyncLengthValidator({ min: 5, max: 10 })], []);
  const validators2 = useMemo(
    () => [new AsyncLengthValidator({ min: 5, max: 10, countBy: 'codeUnit' })],
    []
  );
  const validators3 = useMemo(
    () => [
      new AsyncLengthValidator({
        min: 5,
        max: 10,
        countBy: 'codeUnit',
        hint: {
          inRange: 'Custom hint: value must have at least {min} characters but not more than {max}'
        },
        messageSummary: {
          tooLong: 'Custom: Too many characters',
          tooShort: 'Custom: Too few characters'
        },
        messageDetail: {
          tooLong: 'Custom: Number of characters is too high. Enter at most {max} characters',
          tooShort: 'Custom: Number of characters is too low. Enter at least {min} characters.'
        }
      })
    ],
    []
  );
  const validators4 = useMemo(
    () => [new AsyncLengthValidator({ min: 5, max: 10, countBy: 'codePoint' })],
    []
  );

  const handleLength1Changed = (event: InputTextChangedEvent) => {
    setLengthValue1((event.detail.value as InputTextValue | null | undefined) ?? '');
  };

  const handleLength2Changed = (event: InputTextChangedEvent) => {
    setLengthValue2((event.detail.value as InputTextValue | null | undefined) ?? '');
  };

  const handleLength3Changed = (event: InputTextChangedEvent) => {
    setLengthValue3((event.detail.value as InputTextValue | null | undefined) ?? '');
  };

  const handleLength4Changed = (event: InputTextChangedEvent) => {
    setLengthValue4((event.detail.value as InputTextValue | null | undefined) ?? '');
  };

  return (
    <oj-form-layout id="validator-example">
      <oj-c-input-text
        id="length1"
        value={lengthValue1}
        onvalueChanged={handleLength1Changed}
        validators={validators}
        autocomplete="off"
        placeholder="between 5-10 characters"
        labelHint="Default options"
      />
      <oj-c-input-text
        id="length2"
        value={lengthValue2}
        onvalueChanged={handleLength2Changed}
        validators={validators2}
        autocomplete="off"
        placeholder="between 5-10 characters"
        labelHint="countBy: 'codeUnit'"
      />
      <oj-c-input-text
        id="length3"
        value={lengthValue3}
        onvalueChanged={handleLength3Changed}
        validators={validators3}
        autocomplete="off"
        placeholder="between 5-10 characters"
        labelHint="countBy: 'codeUnit' and custom hints/messages"
      />
      <oj-c-input-text
        id="length4"
        value={lengthValue4}
        onvalueChanged={handleLength4Changed}
        validators={validators4}
        autocomplete="off"
        placeholder="between 5-10 characters"
        labelHint="countBy: 'codePoint'"
      />
    </oj-form-layout>
  );
}
