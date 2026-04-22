import { h } from "preact";
import { useCallback, useState } from "preact/hooks";
import "ojs/ojbutton";
import "ojs/ojformlayout";
import "ojs/ojlabelvalue";
import "ojs/ojvalidationgroup";
import "oj-c/input-text";
import { checkValidationGroup, type ValidationState } from "./validationGroup-shared";

const TRACKER_ID = "validationGroupRequiredTracker";

export default function ValidationGroupRequiredFieldsExample() {
  const [firstNameVal, setFirstNameVal] = useState("");
  const [lastNameVal, setLastNameVal] = useState("");
  const [groupValid, setGroupValid] =
    useState<ValidationState>("invalidHidden");
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = useCallback(() => {
    if (checkValidationGroup(TRACKER_ID)) {
      setStatusMessage("Everything is valid; the form can be submitted.");
      return;
    }
    setStatusMessage("Fix the highlighted required fields before submitting.");
  }, []);

  return (
    <div id="validation-usecase">
      <oj-validation-group
        id={TRACKER_ID}
        onvalidChanged={(event: any) => {
          setGroupValid((event.detail.value as ValidationState) ?? "");
        }}
      >
        <oj-form-layout class="oj-sm-margin-2x-bottom" colspanWrap="wrap">
          <oj-c-input-text
            id="validationGroupRequiredFirst"
            value={firstNameVal}
            required={true}
            autocomplete="off"
            labelHint="First Name"
            onvalueChanged={(event: any) => {
              setFirstNameVal(String(event.detail.value ?? ""));
            }}
          />
          <oj-c-input-text
            id="validationGroupRequiredLast"
            value={lastNameVal}
            required={true}
            autocomplete="off"
            labelHint="Last Name"
            onvalueChanged={(event: any) => {
              setLastNameVal(String(event.detail.value ?? ""));
            }}
          />
          <oj-label-value colspan={2}>
            <oj-button slot="value" onojAction={handleSubmit}>
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
