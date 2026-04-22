import { h } from "preact";
import { useMemo, useState } from "preact/hooks";
import "ojs/ojbutton";
import "ojs/ojformlayout";
import "ojs/ojvalidationgroup";
import "oj-c/input-text";
import "oj-c/select-single";
import AsyncRegExpValidator = require("ojs/ojasyncvalidator-regexp");
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import { checkValidationGroup, type ValidationState } from "./validationGroup-shared";

type ContactInfo = {
  id: number;
  type: string | null;
  telNumber: string;
};

const TRACKER_ID = "validationGroupDynamicTracker";

export default function ValidationGroupDynamicFormExample() {
  const [nextId, setNextId] = useState(1);
  const [contactNumbers, setContactNumbers] = useState<ContactInfo[]>([
    { id: 0, type: "home", telNumber: "" },
  ]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [groupValid, setGroupValid] =
    useState<ValidationState>("invalidHidden");
  const [statusMessage, setStatusMessage] = useState("");

  const contactOptions = useMemo(
    () =>
      new MutableArrayDataProvider(
        [
          { value: "home", label: "Home" },
          { value: "cell", label: "Mobile" },
          { value: "work", label: "Work" },
          { value: "other", label: "Other" },
        ],
        { keyAttributes: "value" },
      ),
    [],
  );

  const regExpValidator = useMemo(
    () =>
      new AsyncRegExpValidator({
        pattern: "[a-zA-Z0-9]{3,}",
        hint: "3 or more letters or numbers",
        messageDetail: "You must enter at least 3 letters or numbers",
      }),
    [],
  );

  const phoneValidator = useMemo(
    () =>
      new AsyncRegExpValidator({
        pattern: "\\d{10}",
        hint: "Enter a ten digit phone number with no spaces or special characters",
        messageSummary: "Value '{value}' Invalid",
        messageDetail:
          "You must enter a 10 digit phone number starting with area code.",
      }),
    [],
  );

  return (
    <div id="dynamic-example">
      <oj-validation-group
        id={TRACKER_ID}
        onvalidChanged={(event: any) => {
          setGroupValid((event.detail.value as ValidationState) ?? "");
        }}
      >
        <h4 class="oj-header-border">Contact Numbers</h4>
        <div class="oj-sm-width-2/5">
          {contactNumbers.map((contact) => (
            <div key={contact.id}>
              <oj-c-select-single
                value={contact.type}
                required={true}
                data={contactOptions}
                itemText="label"
                labelEdge="inside"
                labelHint="Location"
                onvalueChanged={(event: any) => {
                  const nextValue = (event.detail.value as string | null) ?? null;
                  setContactNumbers((current) =>
                    current.map((item) =>
                      item.id === contact.id ? { ...item, type: nextValue } : item,
                    ),
                  );
                }}
              />
              <oj-c-input-text
                placeholder="enter 10 digit number"
                value={contact.telNumber}
                validators={[phoneValidator] as any}
                labelEdge="inside"
                labelHint="Phone Number"
                class="oj-sm-padding-5x-top oj-sm-padding-2x-bottom"
                onvalueChanged={(event: any) => {
                  const nextValue = String(event.detail.value ?? "");
                  setContactNumbers((current) =>
                    current.map((item) =>
                      item.id === contact.id
                        ? { ...item, telNumber: nextValue }
                        : item,
                    ),
                  );
                }}
              />
              <oj-button
                class="oj-sm-padding-12x-bottom oj-sm-padding-7x-top"
                onojAction={() => {
                  setContactNumbers((current) =>
                    current.filter((item) => item.id !== contact.id),
                  );
                }}
              >
                Remove
              </oj-button>
              <br />
            </div>
          ))}
        </div>

        <h4 class="oj-header-border">Contact Info</h4>
        <oj-form-layout>
          <oj-c-input-text
            autocomplete="off"
            required={true}
            placeholder="at least 3 alphanumeric characters"
            validators={[regExpValidator] as any}
            value={firstName}
            labelHint="First Name"
            onvalueChanged={(event: any) => {
              setFirstName(String(event.detail.value ?? ""));
            }}
          />
          <oj-c-input-text
            autocomplete="off"
            required={true}
            placeholder="at least 3 alphanumeric characters"
            validators={[regExpValidator] as any}
            value={lastName}
            labelHint="Last Name"
            onvalueChanged={(event: any) => {
              setLastName(String(event.detail.value ?? ""));
            }}
          />
        </oj-form-layout>
      </oj-validation-group>

      <hr />
      <oj-button
        onojAction={() => {
          setContactNumbers((current) => [
            { id: nextId, type: null, telNumber: "" },
            ...current,
          ]);
          setNextId((current) => current + 1);
        }}
      >
        Add Contact Number
      </oj-button>

      <oj-button
        onojAction={() => {
          if (checkValidationGroup(TRACKER_ID)) {
            setStatusMessage("Everything is valid; create can proceed.");
            return;
          }
          setStatusMessage("Fix the current field errors before creating.");
        }}
      >
        Create
      </oj-button>

      <div class="oj-sm-margin-2x-top">
        [oj-validation-group&apos;s valid property: {groupValid}]
      </div>
      {statusMessage ? (
        <div class="oj-sm-margin-2x-top oj-text-color-secondary">
          {statusMessage}
        </div>
      ) : null}
    </div>
  );
}
