import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useRef, useState } from 'preact/hooks';
import { ojButton } from 'ojs/ojbutton';
import { ojTrain } from 'ojs/ojtrain';
import { ojValidationGroup } from 'ojs/ojvalidationgroup';
import AsyncRegExpValidator = require('ojs/ojasyncvalidator-regexp');
import 'ojs/ojbutton';
import 'ojs/ojformlayout';
import 'ojs/ojinputtext';
import 'ojs/ojlabel';
import 'ojs/ojtrain';
import 'ojs/ojvalidationgroup';

type InputTextValueChangedEvent = Parameters<NonNullable<ComponentProps<'oj-input-text'>['onvalueChanged']>>[0];

const initialSteps: ojTrain.Step[] = [
  { label: 'Your Name', id: 'stp1' },
  { label: 'Contact Information', id: 'stp2' },
  { label: 'Confirm Details', id: 'stp3' }
];

const getStepLabel = (steps: readonly ojTrain.Step[], id: string): string =>
  steps.find((step) => step.id === id)?.label ?? '';

const getFormLabel = (selectedStepValue: string): string => {
  if (selectedStepValue === 'stp1') {
    return 'Please fill in your full name';
  }

  if (selectedStepValue === 'stp2') {
    return 'Please fill in your contact information';
  }

  return '';
};

export const TrainValidation = () => {
  const trackerRef = useRef<ojValidationGroup | null>(null);
  const [selectedStepValue, setSelectedStepValue] = useState<string>('stp1');
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [telephoneNumber, setTelephoneNumber] = useState<string | null>(null);
  const [stepArray, setStepArray] = useState<ojTrain.Step[]>(initialSteps);

  const regExpValidator = useMemo(
    () =>
      new AsyncRegExpValidator({
        pattern: "[a-zA-Z ,.'-]{1,}",
        hint: '1 or more letters',
        messageDetail: 'You must enter at least 1 letter'
      }),
    []
  );

  const emailRegExpValidator = useMemo(
    () =>
      new AsyncRegExpValidator({
        pattern: '.+@.+..+',
        hint: 'email format',
        messageDetail: 'Invalid email format'
      }),
    []
  );

  const selectedStepLabel = getStepLabel(stepArray, selectedStepValue);
  const selectedStepFormLabel = getFormLabel(selectedStepValue);
  const isFormReadonly = selectedStepValue === 'stp3';
  const showsNameForm = selectedStepValue === 'stp1' || selectedStepValue === 'stp3';
  const showsContactForm = selectedStepValue === 'stp2' || selectedStepValue === 'stp3';

  const handleInputValueChanged =
    (setter: (value: string | null) => void) => (event: InputTextValueChangedEvent): void => {
      setter(event.detail.value);
    };

  const updateStepMessageType = (stepId: string, messageType: ojTrain.Step['messageType']): void => {
    setStepArray((currentSteps) =>
      currentSteps.map((step) => (step.id === stepId ? { ...step, messageType } : step))
    );
  };

  const handleBeforeSelect = (event: ojTrain.ojBeforeSelect): void => {
    const tracker = trackerRef.current;
    if (!tracker) {
      return;
    }

    const nextStep = event.detail.toStep;
    const previousStep = event.detail.fromStep;

    if (tracker.valid === 'valid') {
      updateStepMessageType(previousStep.id, 'confirmation');
      setSelectedStepValue(nextStep.id);
      return;
    }

    event.preventDefault();
    updateStepMessageType(previousStep.id, 'error');

    window.setTimeout(() => {
      tracker.showMessages();
      tracker.focusOn('@firstInvalidShown');
    }, 0);
  };

  const handleConfirm = (_event: ojButton.ojAction): void => {
    updateStepMessageType('stp3', 'confirmation');
  };

  return (
    <div id="train-container" class="oj-sm-margin-2x">
      <oj-train
        id="train"
        class="oj-train-stretch"
        onojBeforeSelect={handleBeforeSelect}
        selectedStep={selectedStepValue}
        steps={stepArray}
      ></oj-train>
      <div class="oj-sm-margin-4x-vertical">
        <h3 class="oj-header-border">{selectedStepLabel}</h3>
      </div>

      <oj-label labelId="grouplabelid">
        <span>{selectedStepFormLabel}</span>
      </oj-label>
      <oj-validation-group id="tracker" ref={trackerRef} role="group" aria-labelledby="grouplabelid">
        {showsNameForm ? (
          <oj-form-layout id="fl1" readonly={isFormReadonly}>
            <oj-input-text
              required
              id="firstfieldid"
              value={name}
              autocomplete="off"
              labelHint="Name"
              validators={[regExpValidator]}
              onvalueChanged={handleInputValueChanged(setName)}
            ></oj-input-text>
          </oj-form-layout>
        ) : null}
        {showsContactForm ? (
          <oj-form-layout id="fl2" readonly={isFormReadonly}>
            <oj-input-text
              required
              id="secondfieldid"
              value={email}
              autocomplete="off"
              labelHint="Email"
              validators={[emailRegExpValidator]}
              onvalueChanged={handleInputValueChanged(setEmail)}
            ></oj-input-text>
            <oj-input-text
              required
              id="thirdfieldid"
              value={telephoneNumber}
              autocomplete="off"
              labelHint="Telephone Number"
              onvalueChanged={handleInputValueChanged(setTelephoneNumber)}
            ></oj-input-text>
          </oj-form-layout>
        ) : null}
      </oj-validation-group>
      {selectedStepValue === 'stp3' ? (
        <div class="oj-flex-bar oj-sm-margin-4x-vertical">
          <oj-button id="confirmBtn" class="oj-flex-bar-end" chroming="callToAction" onojAction={handleConfirm}>
            Confirm
          </oj-button>
        </div>
      ) : null}
    </div>
  );
};

export default TrainValidation;
