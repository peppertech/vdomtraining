import { h } from "preact";
import { useCallback, useState } from "preact/hooks";
import "ojs/ojbutton";
import "ojs/ojcheckboxset";
import "ojs/ojformlayout";
import "ojs/ojoption";
import "ojs/ojvalidationgroup";
import "oj-c/input-text";
import { checkValidationGroup, type ValidationState } from "./validationGroup-shared";

const TRACKER_ID = "validationGroupFormFieldsTracker";

export default function ValidationGroupFormFieldsExample() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [email2, setEmail2] = useState("");
  const [favoriteColors, setFavoriteColors] = useState<string[]>([]);
  const [groupValid, setGroupValid] =
    useState<ValidationState>("invalidHidden");
  const [email2Messages, setEmail2Messages] = useState<any[]>([]);
  const [statusMessage, setStatusMessage] = useState("");

  const validateMatchingEmails = useCallback(
    (firstValue: string, secondValue: string) => {
      if (!secondValue) {
        setEmail2Messages([]);
        return true;
      }
      if (firstValue !== secondValue) {
        setEmail2Messages([
          {
            summary: "Error",
            detail: "Email fields do not match.",
            severity: "error",
          },
        ]);
        return false;
      }
      setEmail2Messages([]);
      return true;
    },
    [],
  );

  const handleSubmit = useCallback(() => {
    const emailsMatch = validateMatchingEmails(email, email2);
    const groupIsValid = checkValidationGroup(TRACKER_ID);
    if (emailsMatch && groupIsValid) {
      setStatusMessage("Everything is valid; the form can be submitted.");
      return;
    }
    setStatusMessage("Resolve the field errors before submitting.");
  }, [email, email2, validateMatchingEmails]);

  return (
    <div id="validation-usecase">
      <oj-validation-group
        id={TRACKER_ID}
        onvalidChanged={(event: any) => {
          setGroupValid((event.detail.value as ValidationState) ?? "");
        }}
      >
        <oj-form-layout>
          <oj-c-input-text
            required={true}
            autocomplete="off"
            labelHint="First Name"
            value={firstName}
            onvalueChanged={(event: any) => {
              setFirstName(String(event.detail.value ?? ""));
            }}
          />
          <oj-c-input-text
            required={true}
            autocomplete="off"
            labelHint="Last Name"
            value={lastName}
            onvalueChanged={(event: any) => {
              setLastName(String(event.detail.value ?? ""));
            }}
          />
          <oj-c-input-text
            autocomplete="off"
            labelHint="Email"
            value={email}
            onvalueChanged={(event: any) => {
              const nextValue = String(event.detail.value ?? "");
              setEmail(nextValue);
              setEmail2("");
              setEmail2Messages([]);
            }}
          />
          <oj-c-input-text
            autocomplete="off"
            labelHint="Confirm Email"
            value={email2}
            messagesCustom={email2Messages}
            onvalueChanged={(event: any) => {
              const nextValue = String(event.detail.value ?? "");
              setEmail2(nextValue);
              validateMatchingEmails(email, nextValue);
            }}
          />
          <oj-checkboxset
            labelHint="Favorite Colors"
            value={favoriteColors}
            onvalueChanged={(event: any) => {
              setFavoriteColors((event.detail.value as string[]) ?? []);
            }}
          >
            <oj-option value="blue">Blue</oj-option>
            <oj-option value="green">Green</oj-option>
            <oj-option value="pink">Pink</oj-option>
          </oj-checkboxset>
        </oj-form-layout>
      </oj-validation-group>

      <hr />
      <oj-button onojAction={handleSubmit}>Submit</oj-button>
      <hr />

      <div>
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
