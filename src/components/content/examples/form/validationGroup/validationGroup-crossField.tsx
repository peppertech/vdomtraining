import { h } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "ojs/ojbutton";
import "ojs/ojformlayout";
import "ojs/ojoption";
import "ojs/ojradioset";
import "ojs/ojvalidationgroup";
import "oj-c/input-text";
import AsyncRegExpValidator = require("ojs/ojasyncvalidator-regexp");
import { checkValidationGroup } from "./validationGroup-shared";

const TRACKER_ID = "validationGroupCrossFieldTracker";

export default function ValidationGroupCrossFieldExample() {
  const [contactPref, setContactPref] = useState<"email" | "phone">("email");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailMessages, setEmailMessages] = useState<any[]>([]);
  const [phoneMessages, setPhoneMessages] = useState<any[]>([]);
  const [statusMessage, setStatusMessage] = useState("");

  const regExpValidator = useMemo(
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

  const runAppLevelValidation = useCallback(() => {
    let valid = true;
    setEmailMessages([]);
    setPhoneMessages([]);

    if (contactPref === "email" && !emailAddress) {
      setEmailMessages([
        {
          detail: "Email Address is required when Best Reached By is Email.",
          severity: "error",
        },
      ]);
      valid = false;
    }

    if (contactPref === "phone" && !phoneNumber) {
      setPhoneMessages([
        {
          detail: "Phone Number is required when Best Reached By is Phone.",
          severity: "error",
        },
      ]);
      valid = false;
    }

    return valid;
  }, [contactPref, emailAddress, phoneNumber]);

  const handleCreate = useCallback(() => {
    const groupIsValid = checkValidationGroup(TRACKER_ID);
    if (!groupIsValid) {
      setStatusMessage("Resolve the visible field errors before creating.");
      return;
    }

    if (!runAppLevelValidation()) {
      setStatusMessage("Resolve the cross-field business validation error.");
      const tracker = document.getElementById(TRACKER_ID) as any;
      tracker?.focusOn("@firstInvalidShown");
      return;
    }

    setStatusMessage("Everything is valid; create can proceed.");
  }, [runAppLevelValidation]);

  return (
    <div id="crossfield-example">
      <hr />
      <oj-validation-group id={TRACKER_ID}>
        <oj-form-layout labelEdge="top">
          <oj-radioset
            value={contactPref}
            labelHint="Best Reached By"
            onvalueChanged={(event: any) => {
              const nextValue = String(event.detail.value ?? "email") as
                | "email"
                | "phone";
              setContactPref(nextValue);
              setEmailMessages([]);
              setPhoneMessages([]);
            }}
          >
            <oj-option value="email">Email</oj-option>
            <oj-option value="phone">Phone</oj-option>
          </oj-radioset>

          <oj-c-input-text
            labelHint="Email"
            placeholder="john_doe@example.com"
            value={emailAddress}
            messagesCustom={emailMessages}
            disabled={contactPref !== "email"}
            onvalueChanged={(event: any) => {
              setEmailAddress(String(event.detail.value ?? ""));
              setEmailMessages([]);
            }}
          />

          <oj-c-input-text
            labelHint="Phone Number"
            placeholder="ten digit phone number"
            value={phoneNumber}
            messagesCustom={phoneMessages}
            disabled={contactPref !== "phone"}
            validators={[regExpValidator] as any}
            onvalueChanged={(event: any) => {
              setPhoneNumber(String(event.detail.value ?? ""));
              setPhoneMessages([]);
            }}
          />
        </oj-form-layout>
      </oj-validation-group>
      <hr />

      <div class="oj-flex">
        <div class="oj-flex-item">
          <oj-button onojAction={handleCreate}>Create</oj-button>
        </div>
      </div>

      {statusMessage ? (
        <div class="oj-sm-margin-2x-top oj-text-color-secondary">
          {statusMessage}
        </div>
      ) : null}
    </div>
  );
}
