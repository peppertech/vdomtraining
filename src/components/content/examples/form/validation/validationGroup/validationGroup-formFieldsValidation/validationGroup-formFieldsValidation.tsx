import 'oj-c/input-text';
import 'ojs/ojbutton';
import 'ojs/ojcheckboxset';
import 'ojs/ojformlayout';
import 'ojs/ojoption';
import 'ojs/ojvalidationgroup';
import type { ojValidationGroup } from 'ojs/ojvalidationgroup';
import 'preact';
import { type ComponentProps } from 'preact';
import { useRef,useState } from 'preact/hooks';

type InputTextValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-c-input-text'>['onvalueChanged']>
>[0];
type ValidationGroupValidChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-validation-group'>['onvalidChanged']>
>[0];
type InputTextValue = ComponentProps<'oj-c-input-text'>['value'];
type InputTextMessagesCustom = ComponentProps<'oj-c-input-text'>['messagesCustom'];
type ValidationGroupValid = ComponentProps<'oj-validation-group'>['valid'];

const emailMismatchMessages = [
  {
    summary: 'Error',
    detail: 'Email fields do not match.',
    severity: 'error'
  }
] as InputTextMessagesCustom;

export const ValidationGroupFormFieldsValidation = () => {
  const trackerRef = useRef<ojValidationGroup | null>(null);
  const [lastName, setLastName] = useState<InputTextValue>(null);
  const [email, setEmail] = useState<InputTextValue>(null);
  const [email2, setEmail2] = useState<InputTextValue>(null);
  const [groupValid, setGroupValid] = useState<ValidationGroupValid>('invalidHidden');
  const [email2MessagesCustom, setEmail2MessagesCustom] =
    useState<InputTextMessagesCustom>(undefined);

  const compareFieldsAddMessagesCustom = (
    firstEmail: InputTextValue,
    secondEmail: InputTextValue
  ) => {
    const normalizedFirstEmail = firstEmail ?? '';
    const normalizedSecondEmail = secondEmail ?? '';

    if (normalizedFirstEmail !== normalizedSecondEmail) {
      setEmail2MessagesCustom(emailMismatchMessages);
      return;
    }

    setEmail2MessagesCustom([]);
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

  const handleLastNameChanged = (event: InputTextValueChangedEvent) => {
    setLastName((event.detail.value as InputTextValue));
  };

  const handleFirstEmailValueChanged = (event: InputTextValueChangedEvent) => {
    setEmail((event.detail.value as InputTextValue));
    setEmail2(null);
    setEmail2MessagesCustom([]);
  };

  const handleEmailMatchValueChanged = (event: InputTextValueChangedEvent) => {
    const secondEmail = event.detail.value;
    setEmail2(secondEmail);
    if (secondEmail === '' || secondEmail == null) {
      setEmail2MessagesCustom([]);
      return;
    }

    compareFieldsAddMessagesCustom(email, secondEmail);
  };

  const handleSubmit = () => {
    compareFieldsAddMessagesCustom(email, email2);
    if (checkValidationGroup()) {
      alert('everything is valid; submit the form');
    }
  };

  return (
    <div id="validation-usecase">
      <oj-validation-group
        ref={trackerRef}
        id="tracker"
        onvalidChanged={handleGroupValidChanged}
      >
        <oj-form-layout id="fl1">
          <oj-c-input-text
            id="firstname"
            required={true}
            autocomplete="off"
            labelHint="First Name"
          />
          <oj-c-input-text
            id="lastname"
            required={true}
            value={lastName}
            autocomplete="off"
            labelHint="Last Name"
            onvalueChanged={handleLastNameChanged}
          />
          <oj-c-input-text
            id="email"
            autocomplete="off"
            labelHint="Email"
            value={email}
            onvalueChanged={handleFirstEmailValueChanged}
          />
          <oj-c-input-text
            id="email2"
            autocomplete="off"
            labelHint="Confirm Email"
            value={email2}
            messagesCustom={email2MessagesCustom}
            onvalueChanged={handleEmailMatchValueChanged}
          />
          <oj-checkboxset id="colors" labelHint="Favorite Colors">
            <oj-option id="blueopt" value="blue">
              Blue
            </oj-option>
            <oj-option id="greenopt" value="green">
              Green
            </oj-option>
            <oj-option id="pinkopt" value="pink">
              Pink
            </oj-option>
          </oj-checkboxset>
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
    </div>
  );
};

export default ValidationGroupFormFieldsValidation;
