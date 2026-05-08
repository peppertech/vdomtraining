import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useRef, useState } from 'preact/hooks';
import AsyncRegExpValidator = require('ojs/ojasyncvalidator-regexp');
import Context = require('ojs/ojcontext');
import type { ojValidationGroup } from 'ojs/ojvalidationgroup';
import 'oj-c/input-text';
import 'ojs/ojbutton';
import 'ojs/ojformlayout';
import 'ojs/ojoption';
import 'ojs/ojradioset';
import 'ojs/ojvalidationgroup';

type ContactPref = 'email' | 'phone';
type InputTextValue = ComponentProps<'oj-c-input-text'>['value'];
type InputTextMessagesCustom = ComponentProps<'oj-c-input-text'>['messagesCustom'];
type RadioSetValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-radioset'>['onvalueChanged']>
>[0];

const requiredEmailMessage = [
  { detail: 'Email Address is required.', severity: 'error' }
] as InputTextMessagesCustom;
const requiredPhoneMessage = [
  { detail: 'Phone Number is required.', severity: 'error' }
] as InputTextMessagesCustom;

export const ValidationGroupCrossFieldValidation = () => {
  const trackerRef = useRef<ojValidationGroup | null>(null);
  const [contactPref, setContactPref] = useState<ContactPref>('email');
  const [emailAddress, setEmailAddress] = useState<InputTextValue>(null);
  const [phoneNumber, setPhoneNumber] = useState<InputTextValue>(null);
  const [emailAddressMessages, setEmailAddressMessages] =
    useState<InputTextMessagesCustom>(undefined);
  const [phoneNumberMessages, setPhoneNumberMessages] =
    useState<InputTextMessagesCustom>(undefined);

  const regExpValidator = useMemo(
    () => [
      new AsyncRegExpValidator({
        pattern: '\\d{10}',
        hint: 'enter a ten digit phone number including area code with no spaces or special characters',
        messageSummary: "Value '{value}' Invalid",
        messageDetail: 'You must enter a 10 digit phone number starting with area code.'
      })
    ],
    []
  );

  const clearMessagesOnDependentsOfContactPref = () => {
    setEmailAddressMessages([]);
    setPhoneNumberMessages([]);
  };

  const checkValidationGroup = async () => {
    const tracker = trackerRef.current;
    if (tracker?.valid === 'valid') {
      return true;
    }

    tracker?.showMessages();
    await Context.getPageContext().getBusyContext().whenReady();
    tracker?.focusOn('@firstInvalidShown');
    return false;
  };

  const runAppLevelValidation = async () => {
    let valid = true;
    setEmailAddressMessages([]);
    setPhoneNumberMessages([]);

    if (contactPref === 'email' && !emailAddress) {
      setEmailAddressMessages(requiredEmailMessage);
      valid = false;
    }

    if (contactPref === 'phone' && !phoneNumber) {
      setPhoneNumberMessages(requiredPhoneMessage);
      valid = false;
    }

    if (!valid) {
      await Context.getPageContext().getBusyContext().whenReady();
      trackerRef.current?.focusOn('@firstInvalidShown');
      return false;
    }

    return true;
  };

  const handleContactPrefChanged = (event: RadioSetValueChangedEvent) => {
    const nextValue = event.detail.value as ContactPref;
    setContactPref(nextValue);
    clearMessagesOnDependentsOfContactPref();
  };

  const handleEmailAddressChanged = (event: CustomEvent<{ value: InputTextValue }>) => {
    setEmailAddress(event.detail.value);
  };

  const handlePhoneNumberChanged = (event: CustomEvent<{ value: InputTextValue }>) => {
    setPhoneNumber(event.detail.value);
  };

  const handleCreateNewMember = async () => {
    const trackerValid = await checkValidationGroup();
    if (!trackerValid) {
      return;
    }

    if (!(await runAppLevelValidation())) {
      return;
    }

    alert('you can submit');
  };

  return (
    <>
      <div id="componentRecipe">
        <article id="componentRecipeContent">
          <h2>Test Steps</h2>
          <ol>
            <li>In the Best Reached By field, &apos;Email&apos; is selected by default. Hit the Create button.</li>
            <li>Notice that the Email Address field has an error.</li>
            <li>Enter a value for the Email Address field and tab off the field.</li>
            <li>Hit Create. Notice that business validation passes and there are no new errors.</li>
            <li>Select the radio &apos;Phone&apos; for the Best Reached By field. Hit the Create button.</li>
            <li>
              Notice that Phone Number field has an error. Switch back to Email and notice that the
              Phone Number field is disabled and error cleared.
            </li>
          </ol>
        </article>
      </div>

      <div id="componentDemo">
        <div id="crossfield-example">
          <hr />
          <oj-validation-group ref={trackerRef} id="tracker">
            <oj-form-layout id="fl2" labelEdge="top">
              <oj-radioset
                id="radioSetId"
                value={contactPref}
                labelHint="Best Reached By"
                onvalueChanged={handleContactPrefChanged}
              >
                <oj-option id="opt1" value="email">
                  Email
                </oj-option>
                <oj-option id="opt2" value="phone">
                  Phone
                </oj-option>
              </oj-radioset>
              <oj-c-input-text
                id="emailId"
                labelHint="Email"
                placeholder="john_doe@example.com"
                value={emailAddress}
                messagesCustom={emailAddressMessages}
                disabled={contactPref !== 'email'}
                onvalueChanged={handleEmailAddressChanged}
              />

              <oj-c-input-text
                id="telNum"
                labelHint="Phone Number"
                placeholder="ten digit phone number"
                value={phoneNumber}
                messagesCustom={phoneNumberMessages}
                disabled={contactPref !== 'phone'}
                validators={regExpValidator}
                onvalueChanged={handlePhoneNumberChanged}
              />
            </oj-form-layout>
          </oj-validation-group>
          <hr />

          <div class="oj-flex">
            <div class="oj-flex-item">
              <oj-button id="create" onojAction={handleCreateNewMember}>
                Create
              </oj-button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ValidationGroupCrossFieldValidation;
