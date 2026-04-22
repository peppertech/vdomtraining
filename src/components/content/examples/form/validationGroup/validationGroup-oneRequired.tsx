import { h } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "ojs/ojbutton";
import "ojs/ojformlayout";
import "ojs/ojlabel";
import "ojs/ojvalidationgroup";
import "oj-c/input-text";
import AsyncRegExpValidator = require("ojs/ojasyncvalidator-regexp");
import { checkValidationGroup, type ValidationState } from "./validationGroup-shared";

const TRACKER_ID = "validationGroupOneRequiredTracker";

export default function ValidationGroupOneRequiredExample() {
  const [firstField, setFirstField] = useState("");
  const [secondField, setSecondField] = useState("");
  const [thirdField, setThirdField] = useState("");
  const [firstFieldMessages, setFirstFieldMessages] = useState<any[]>([]);
  const [groupValid, setGroupValid] =
    useState<ValidationState>("invalidHidden");
  const [statusMessage, setStatusMessage] = useState("");

  const regExpValidator = useMemo(
    () =>
      new AsyncRegExpValidator({
        pattern: "[a-zA-Z0-9]{3,}",
        hint: "3 or more letters or numbers",
        messageDetail: "You must enter at least 3 letters or numbers",
      }),
    [],
  );

  const validateAllThree = useCallback(
    (nextFirst: string, nextSecond: string, nextThird: string) => {
      if (!nextFirst && !nextSecond && !nextThird) {
        setFirstFieldMessages([
          {
            detail: "You have to enter at least one field before you can submit.",
            severity: "error",
          },
        ]);
        return false;
      }
      setFirstFieldMessages([]);
      return true;
    },
    [],
  );

  const handleSubmit = useCallback(() => {
    const oneFieldFilled = validateAllThree(firstField, secondField, thirdField);
    const groupIsValid = checkValidationGroup(TRACKER_ID);
    if (oneFieldFilled && groupIsValid) {
      setStatusMessage("Everything is valid; the form can be submitted.");
      return;
    }
    setStatusMessage("Enter at least one of the first three fields and fix any field-level errors.");
  }, [firstField, secondField, thirdField, validateAllThree]);

  return (
    <div id="validation-usecase">
      <oj-label id="validationGroupOneRequiredLabel">
        You must fill in at least one of the first three fields
      </oj-label>
      <oj-validation-group
        id={TRACKER_ID}
        role="group"
        aria-labelledby="validationGroupOneRequiredLabel"
        onvalidChanged={(event: any) => {
          setGroupValid((event.detail.value as ValidationState) ?? "");
        }}
      >
        <oj-form-layout class="demo-cell oj-sm-margin-2x-bottom oj-sm-padding-2x-top oj-text-color-secondary">
          <oj-c-input-text
            value={firstField}
            autocomplete="off"
            labelHint="First Field"
            messagesCustom={firstFieldMessages}
            onvalueChanged={(event: any) => {
              const nextValue = String(event.detail.value ?? "");
              setFirstField(nextValue);
              validateAllThree(nextValue, secondField, thirdField);
            }}
          />
          <oj-c-input-text
            value={secondField}
            autocomplete="off"
            labelHint="Second Field"
            onvalueChanged={(event: any) => {
              const nextValue = String(event.detail.value ?? "");
              setSecondField(nextValue);
              validateAllThree(firstField, nextValue, thirdField);
            }}
          />
          <oj-c-input-text
            value={thirdField}
            autocomplete="off"
            labelHint="Third Field"
            onvalueChanged={(event: any) => {
              const nextValue = String(event.detail.value ?? "");
              setThirdField(nextValue);
              validateAllThree(firstField, secondField, nextValue);
            }}
          />
        </oj-form-layout>
        <oj-form-layout>
          <oj-c-input-text
            required={true}
            autocomplete="off"
            labelHint="Odd Field"
            placeholder="at least 3 alphanumeric characters"
            validators={[regExpValidator] as any}
          />
        </oj-form-layout>
      </oj-validation-group>

      <hr />
      <oj-button onojAction={handleSubmit}>Submit</oj-button>
      <hr />

      <div>
        <span>oj-validation-group valid property: </span>
        <span>{groupValid}</span>
      </div>
      <div class="oj-sm-margin-2x-top">
        <h5>These are the fields&apos; observables.</h5>
        <div>firstField: {firstField}</div>
        <div>secondField: {secondField}</div>
        <div>thirdField: {thirdField}</div>
      </div>
      {statusMessage ? (
        <div class="oj-sm-margin-2x-top oj-text-color-secondary">
          {statusMessage}
        </div>
      ) : null}
    </div>
  );
}
