import 'oj-c/input-text';
import 'ojs/ojbutton';
import 'ojs/ojformlayout';
import 'ojs/ojlabelvalue';
import 'ojs/ojvalidationgroup';
import type { ojValidationGroup } from 'ojs/ojvalidationgroup';
import 'preact';
import { type ComponentProps } from 'preact';
import { useRef,useState } from 'preact/hooks';

type ValidationGroupValidChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-validation-group'>['onvalidChanged']>
>[0];
type ValidationGroupValid = ComponentProps<'oj-validation-group'>['valid'];

export default function ValidationGroupRequiredFieldValidation() {
  const trackerRef = useRef<ojValidationGroup | null>(null);
  const [firstNameVal, setFirstNameVal] = useState<string | null>(null);
  const [lastNameVal, setLastNameVal] = useState<string | null>(null);
  const [groupValid, setGroupValid] = useState<ValidationGroupValid>('invalidHidden');

  const handleGroupValidChanged = (event: ValidationGroupValidChangedEvent) => {
    setGroupValid((event.detail.value as ValidationGroupValid));
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

  const handleSubmit = () => {
    if (checkValidationGroup()) {
      alert('everything is valid; submit the form');
    }
  };

  const handleFirstNameChanged = (event: CustomEvent<{ value: string | null }>) => {
    setFirstNameVal((event.detail.value as string | null));
  };

  const handleLastNameChanged = (event: CustomEvent<{ value: string | null }>) => {
    setLastNameVal((event.detail.value as string | null));
  };

  return (
    <div id="validation-usecase">
      <oj-validation-group
        ref={trackerRef}
        id="tracker"
        onvalidChanged={handleGroupValidChanged}
      >
        <oj-form-layout id="fl1" class="oj-sm-margin-2x-bottom" colspanWrap="wrap">
          <oj-c-input-text
            id="first"
            value={firstNameVal}
            required={true}
            autocomplete="off"
            labelHint="First Name"
            onvalueChanged={handleFirstNameChanged}
          />
          <oj-c-input-text
            id="last"
            value={lastNameVal}
            required={true}
            autocomplete="off"
            labelHint="Last Name"
            onvalueChanged={handleLastNameChanged}
          />
          <oj-label-value colspan={2}>
            <oj-button id="submit" slot="value" onojAction={handleSubmit}>
              Submit
            </oj-button>
          </oj-label-value>
        </oj-form-layout>
      </oj-validation-group>
      <span>oj-validation-group valid property:</span>{' '}
      <span id="namevalid">{groupValid}</span>
    </div>
  );
}
