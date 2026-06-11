import { h, type ComponentProps } from 'preact';
import { useMemo, useRef, useState } from 'preact/hooks';
import AsyncRegExpValidator = require('ojs/ojasyncvalidator-regexp');
import type { ojValidationGroup } from 'ojs/ojvalidationgroup';
import 'css!./demo.css';
import 'oj-c/input-text';
import 'ojs/ojbutton';
import 'ojs/ojformlayout';
import 'ojs/ojlabel';
import 'ojs/ojvalidationgroup';

type InputTextValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-c-input-text'>['onvalueChanged']>
>[0];
type ValidationGroupValidChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-validation-group'>['onvalidChanged']>
>[0];
type InputTextValue = ComponentProps<'oj-c-input-text'>['value'];
type InputTextMessagesCustom = ComponentProps<'oj-c-input-text'>['messagesCustom'];
type InputTextValidators = ComponentProps<'oj-c-input-text'>['validators'];
type ValidationGroupValid = ComponentProps<'oj-validation-group'>['valid'];

export const ValidationGroupOneRequiredValidation = () => {
  const trackerRef = useRef<ojValidationGroup | null>(null);
  const [firstField, setFirstField] = useState<InputTextValue>(null);
  const [secondField, setSecondField] = useState<InputTextValue>(null);
  const [thirdField, setThirdField] = useState<InputTextValue>(null);
  const [groupValid, setGroupValid] = useState<ValidationGroupValid>('invalidHidden');
  const [firstFieldMessagesCustom, setFirstFieldMessagesCustom] =
    useState<InputTextMessagesCustom>(undefined);

  const regExpValidator = useMemo<InputTextValidators>(
    () => [
      new AsyncRegExpValidator({
        pattern: '[a-zA-Z0-9]{3,}',
        hint: '3 or more letters or numbers',
        messageDetail: 'You must enter at least 3 letters or numbers'
      })
    ],
    []
  );

  const performCustomCrossFieldValidation = (
    nextFirstField: InputTextValue,
    nextSecondField: InputTextValue,
    nextThirdField: InputTextValue
  ) => {
    if (!nextFirstField && !nextSecondField && !nextThirdField) {
      throw new Error('You have to enter at least one field before you can submit.');
    }
  };

  const validateAllThree = (
    nextFirstField: InputTextValue,
    nextSecondField: InputTextValue,
    nextThirdField: InputTextValue
  ) => {
    try {
      setFirstFieldMessagesCustom([]);
      performCustomCrossFieldValidation(nextFirstField, nextSecondField, nextThirdField);
    } catch (error) {
      setFirstFieldMessagesCustom([
        { detail: (error as Error).message, severity: 'error' }
      ] as InputTextMessagesCustom);
    }
  };

  const checkValidationGroup = () => {
    const tracker = trackerRef.current;
    if (tracker?.valid === 'valid') {
      return true;
    }

    tracker?.showMessages();
    tracker?.focusOn('@firstInvalidShown');
    return false;
  };

  const handleGroupValidChanged = (event: ValidationGroupValidChangedEvent) => {
    setGroupValid((event.detail.value as ValidationGroupValid));
  };

  const handleFirstFieldChanged = (event: InputTextValueChangedEvent) => {
    const nextValue = event.detail.value;
    setFirstField(nextValue);
    validateAllThree(nextValue, secondField, thirdField);
  };

  const handleSecondFieldChanged = (event: InputTextValueChangedEvent) => {
    const nextValue = event.detail.value;
    setSecondField(nextValue);
    validateAllThree(firstField, nextValue, thirdField);
  };

  const handleThirdFieldChanged = (event: InputTextValueChangedEvent) => {
    const nextValue = event.detail.value;
    setThirdField(nextValue);
    validateAllThree(firstField, secondField, nextValue);
  };

  const handleSubmit = () => {
    validateAllThree(firstField, secondField, thirdField);
    if (checkValidationGroup()) {
      alert('everything is valid; submit the form');
    }
  };

  return (
    <div id="validation-usecase">
      <oj-label id="grouplabelid">You must fill in at least one of the first three fields</oj-label>
      <oj-validation-group
        ref={trackerRef}
        id="tracker"
        role="group"
        aria-labelledby="grouplabelid"
        onvalidChanged={handleGroupValidChanged}
      >
        <oj-form-layout
          id="fl1"
          class="demo-cell oj-sm-margin-2x-bottom oj-sm-padding-2x-top oj-text-color-secondary"
        >
          <oj-c-input-text
            id="firstfieldid"
            value={firstField}
            autocomplete="off"
            labelHint="First Field"
            messagesCustom={firstFieldMessagesCustom}
            onvalueChanged={handleFirstFieldChanged}
          />
          <oj-c-input-text
            id="secondfieldid"
            value={secondField}
            autocomplete="off"
            labelHint="Second Field"
            onvalueChanged={handleSecondFieldChanged}
          />
          <oj-c-input-text
            id="thirdfieldid"
            value={thirdField}
            autocomplete="off"
            labelHint="Third Field"
            onvalueChanged={handleThirdFieldChanged}
          />
        </oj-form-layout>
        <oj-form-layout id="fl2">
          <oj-c-input-text
            id="requiredfield"
            required={true}
            autocomplete="off"
            labelHint="Odd Field"
            placeholder="at least 3 alphanumeric characters"
            validators={regExpValidator}
          />
        </oj-form-layout>
      </oj-validation-group>
      <hr />
      <div class="oj-flex">
        <div class="oj-flex-item">&nbsp;</div>
        <div class="oj-flex-item">
          <oj-button id="submitBtn" onojAction={handleSubmit}>
            Submit
          </oj-button>
        </div>
      </div>
      <hr />
      <span>oj-validation-group valid property:</span>{' '}
      <span id="namevalid">{groupValid}</span>
      <h5>These are the fields&apos; observables.</h5>
      <div>
        firstField: <span id="firstfieldvalue">{firstField ?? ''}</span>
      </div>
      <div>
        secondField: <span id="secondfieldvalue">{secondField ?? ''}</span>
      </div>
      <div>
        thirdField: <span id="thirdfieldvalue">{thirdField ?? ''}</span>
      </div>
    </div>
  );
};

export default ValidationGroupOneRequiredValidation;
