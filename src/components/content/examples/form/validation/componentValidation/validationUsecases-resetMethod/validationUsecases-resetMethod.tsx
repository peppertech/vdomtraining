import { h, type ComponentProps } from 'preact';
import { useMemo, useRef, useState } from 'preact/hooks';
import AsyncNumberRangeValidator = require('ojs/ojasyncvalidator-numberrange');
import type { CInputNumberElement } from 'oj-c/input-number';
import 'oj-c/button';
import 'oj-c/input-number';
import 'ojs/ojformlayout';
import 'ojs/ojlabelvalue';

type InputNumberValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-c-input-number'>['onvalueChanged']>
>[0];
type InputNumberValidChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-c-input-number'>['onvalidChanged']>
>[0];
type InputNumberValue = ComponentProps<'oj-c-input-number'>['value'];
type InputNumberValid = 'valid' | 'pending' | 'invalidHidden' | 'invalidShown';
type InputNumberMessagesCustom = ComponentProps<'oj-c-input-number'>['messagesCustom'];
type InputNumberMessage = NonNullable<InputNumberMessagesCustom>[number];

export const ValidationUsecasesResetMethod = () => {
  const ageRef = useRef<CInputNumberElement | null>(null);
  const weightRef = useRef<CInputNumberElement | null>(null);
  const [age, setAge] = useState<InputNumberValue>(null);
  const [ageMessagesCustom, setAgeMessagesCustom] = useState<InputNumberMessagesCustom>([]);
  const [ageValid, setAgeValid] = useState<InputNumberValid>('valid');
  const [weight, setWeight] = useState<InputNumberValue>(null);
  const [weightMessagesCustom, setWeightMessagesCustom] = useState<InputNumberMessagesCustom>([]);
  const [weightValid, setWeightValid] = useState<InputNumberValid>('valid');

  const validators = useMemo(
    () => [
      new AsyncNumberRangeValidator({
        hint: { min: 'Enter a value greater than {min}' },
        messageDetail: {
          rangeUnderflow: 'You must be at least {min} years or older'
        },
        min: 18
      })
    ],
    []
  );
  const validators2 = useMemo(
    () => [
      new AsyncNumberRangeValidator({
        messageDetail: {
          rangeUnderflow: 'You must be at least {min} lbs to qualify'
        },
        min: 150
      })
    ],
    []
  );

  const handleAgeChanged = (event: InputNumberValueChangedEvent) => {
    setAge((event.detail.value as InputNumberValue | null | undefined) ?? null);
  };

  const handleAgeValidChanged = (event: InputNumberValidChangedEvent) => {
    setAgeValid(event.detail.value as InputNumberValid);
  };

  const handleWeightChanged = (event: InputNumberValueChangedEvent) => {
    setWeight((event.detail.value as InputNumberValue | null | undefined) ?? null);
  };

  const handleWeightValidChanged = (event: InputNumberValidChangedEvent) => {
    setWeightValid(event.detail.value as InputNumberValid);
  };

  const handleAddCustomMessage = () => {
    const ageMsg: InputNumberMessage = {
      detail:
        'Not entering your correct age can be grounds for disqualification! Warning messages are not considered invalid.',
      summary: '',
      severity: 'warning'
    };
    const weightMsg: InputNumberMessage = {
      detail:
        'Not entering your correct weight might place you in the wrong competition group! Warning messages are not considered invalid.',
      summary: '',
      severity: 'warning'
    };
    setAgeMessagesCustom([ageMsg]);
    setWeightMessagesCustom([weightMsg]);
  };

  const handleReset = () => {
    ageRef.current?.reset();
    weightRef.current?.reset();
    setAgeMessagesCustom([]);
    setWeightMessagesCustom([]);
  };

  return (
    <oj-form-layout id="validation-usecase">
      <oj-c-input-number
        ref={ageRef}
        id="age"
        autocomplete="off"
        required
        validators={validators}
        value={age}
        messagesCustom={ageMessagesCustom}
        onvalueChanged={handleAgeChanged}
        onvalidChanged={handleAgeValidChanged}
        labelHint="Age"
      />
      <span id="ageVal">[Component&apos;s value: {String(age)}]</span>
      <span id="ageValid">[Component&apos;s valid: {ageValid}]</span>

      <oj-c-input-number
        ref={weightRef}
        id="weight"
        validators={validators2}
        value={weight}
        messagesCustom={weightMessagesCustom}
        onvalueChanged={handleWeightChanged}
        onvalidChanged={handleWeightValidChanged}
        labelHint="Weight"
      />
      <span id="weightVal">[Component&apos;s value: {String(weight)}]</span>
      <span id="weightValid">[Component&apos;s valid: {weightValid}]</span>

      <oj-label-value>
        <oj-c-button id="resetBtn" slot="value" label="Reset" onojAction={handleReset} />
        <oj-c-button
          id="addCustomMsgBtn"
          slot="value"
          onojAction={handleAddCustomMessage}
          label="Add Custom Message"
        />
      </oj-label-value>
    </oj-form-layout>
  );
};

export default ValidationUsecasesResetMethod;
