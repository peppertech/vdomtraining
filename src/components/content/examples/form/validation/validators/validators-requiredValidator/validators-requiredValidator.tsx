import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useState } from 'preact/hooks';
import 'oj-c/input-number';
import 'oj-c/input-text';
import 'ojs/ojformlayout';

type InputTextValue = ComponentProps<'oj-c-input-text'>['value'];
type InputNumberValue = ComponentProps<'oj-c-input-number'>['value'];
type InputTextChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-c-input-text'>['onvalueChanged']>
>[0];
type InputNumberChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-c-input-number'>['onvalueChanged']>
>[0];

export const ValidatorsRequiredValidator = () => {
  const [requiredValue1, setRequiredValue1] = useState<InputTextValue>('something');
  const [requiredValue3, setRequiredValue3] = useState<InputNumberValue>(1);

  const handleRequiredTextChanged = (event: InputTextChangedEvent) => {
    setRequiredValue1(event.detail.value ?? '');
  };

  const handleRequiredNumberChanged = (event: InputNumberChangedEvent) => {
    setRequiredValue3(event.detail.value ?? null);
  };

  return (
    <oj-form-layout id="validator-example">
      <oj-c-input-text
        id="required1"
        value={requiredValue1}
        onvalueChanged={handleRequiredTextChanged}
        autocomplete="off"
        required
        labelHint="'required' attribute"
      />
      <oj-c-input-number
        id="required3"
        value={requiredValue3}
        onvalueChanged={handleRequiredNumberChanged}
        autocomplete="off"
        required
        placeholder="Enter a valid number"
        requiredMessageDetail="Custom: A value is required for the field."
        helpHints={{ definition: 'custom: enter at least one number' }}
        labelHint="'required' with custom translations"
      />
    </oj-form-layout>
  );
};

export default ValidatorsRequiredValidator;
