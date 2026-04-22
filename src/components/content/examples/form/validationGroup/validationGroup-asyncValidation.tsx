import { h } from "preact";
import { useCallback, useMemo, useRef, useState } from "preact/hooks";
import "ojs/ojbutton";
import "ojs/ojformlayout";
import "ojs/ojlabelvalue";
import "ojs/ojvalidationgroup";
import "oj-c/input-number";
import { getValidationGroup, type ValidationState } from "./validationGroup-shared";

const TRACKER_ID = "validationGroupAsyncTracker";

export default function ValidationGroupAsyncValidationExample() {
  const [quantityLimitNumber, setQuantityLimitNumber] = useState<number | null>(
    null,
  );
  const [secondQuantityLimit, setSecondQuantityLimit] = useState<number | null>(
    null,
  );
  const [groupValid, setGroupValid] = useState<ValidationState>("valid");
  const [statusMessage, setStatusMessage] = useState("");
  const submitIfValid = useRef(false);

  const asyncValidator = useMemo(
    () => [
      {
        validate(value: number | null) {
          return new Promise<void>((resolve, reject) => {
            window.setTimeout(() => {
              if (value == null || (value >= 0 && value <= 10)) {
                resolve();
                return;
              }
              reject(
                new Error("Enter a number between 0 and 10 to satisfy the async validator."),
              );
            }, 1200);
          });
        },
      },
    ],
    [],
  );

  const checkValidationGroupAndSubmit = useCallback(() => {
    const tracker = getValidationGroup(TRACKER_ID) as any;
    if (!tracker) {
      return "";
    }

    if (tracker.valid === "valid") {
      setStatusMessage("Everything is valid; the form can be submitted.");
    } else if (String(tracker.valid).startsWith("invalid")) {
      if (tracker.valid === "invalidHidden") {
        tracker.showMessages();
      }
      tracker.focusOn("@firstInvalidShown");
      setStatusMessage("Fix the invalid values before submitting.");
    } else {
      setStatusMessage("Validation is pending. Submission will resume automatically.");
    }

    return tracker.valid as ValidationState;
  }, []);

  const handleSubmit = useCallback(() => {
    const validState = checkValidationGroupAndSubmit();
    if (validState === "pending") {
      submitIfValid.current = true;
    }
  }, [checkValidationGroupAndSubmit]);

  return (
    <div id="validation-usecase">
      <oj-validation-group
        id={TRACKER_ID}
        onvalidChanged={(event: any) => {
          const nextValid = (event.detail.value as ValidationState) ?? "";
          setGroupValid(nextValid);
          if (submitIfValid.current && nextValid !== "pending") {
            submitIfValid.current = false;
            checkValidationGroupAndSubmit();
          }
        }}
      >
        <oj-form-layout class="oj-sm-margin-2x-bottom" colspanWrap="wrap">
          <oj-c-input-number
            autocomplete="off"
            labelHint="Quantity Limit Input Number"
            validators={asyncValidator as any}
            value={quantityLimitNumber}
            onvalueChanged={(event: any) => {
              setQuantityLimitNumber(
                event.detail.value == null ? null : Number(event.detail.value),
              );
            }}
          />
          <oj-c-input-number
            autocomplete="off"
            labelHint="Second Quantity Limit"
            validators={asyncValidator as any}
            value={secondQuantityLimit}
            onvalueChanged={(event: any) => {
              setSecondQuantityLimit(
                event.detail.value == null ? null : Number(event.detail.value),
              );
            }}
          />
          <oj-label-value colspan={2}>
            <oj-button
              slot="value"
              onojAction={handleSubmit}
              disabled={groupValid === "pending"}
            >
              Submit
            </oj-button>
          </oj-label-value>
        </oj-form-layout>
      </oj-validation-group>

      <div class="oj-sm-margin-2x-top">
        <span>oj-validation-group valid property: </span>
        <span>{groupValid}</span>
      </div>
      {statusMessage ? (
        <div class="oj-sm-margin-2x-top oj-text-color-secondary">
          {statusMessage}
        </div>
      ) : null}
    </div>
  );
}
