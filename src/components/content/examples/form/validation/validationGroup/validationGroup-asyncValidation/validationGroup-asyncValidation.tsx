import 'oj-c/input-number';
import 'ojs/ojbutton';
import 'ojs/ojformlayout';
import 'ojs/ojlabelvalue';
import 'ojs/ojvalidationgroup';
import type { ojValidationGroup } from 'ojs/ojvalidationgroup';
import 'preact';
import { type ComponentProps } from 'preact';
import { useMemo,useRef,useState } from 'preact/hooks';
import DemoNumberRangeAsyncValidator from './DemoNumberRangeAsyncValidator';

type InputNumberValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-c-input-number'>['onvalueChanged']>
>[0];
type ValidationGroupValidChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-validation-group'>['onvalidChanged']>
>[0];
type InputNumberValue = ComponentProps<'oj-c-input-number'>['value'];
type ValidationGroupValid = ComponentProps<'oj-validation-group'>['valid'];

export const ValidationGroupAsyncValidation = () => {
  const trackerRef = useRef<ojValidationGroup | null>(null);
  const [quantityLimitNumber, setQuantityLimitNumber] = useState<InputNumberValue>(null);
  const [quantityLimitNumber2, setQuantityLimitNumber2] = useState<InputNumberValue>(null);
  const [groupValid, setGroupValid] = useState<ValidationGroupValid>('valid');
  const [submitIfValid, setSubmitIfValid] = useState(false);

  const asyncValidator = useMemo(() => new DemoNumberRangeAsyncValidator(4000), []);

  const checkValidationGroupAndSubmit = () => {
    const tracker = trackerRef.current;
    if (!tracker) {
      return 'invalidHidden' as ValidationGroupValid;
    }

    if (tracker.valid === 'valid') {
      alert('everything is valid; submit the form');
    } else if (tracker.valid.startsWith('invalid')) {
      if (tracker.valid === 'invalidHidden') {
        tracker.showMessages();
      }
      tracker.focusOn('@firstInvalidShown');
    }

    return tracker.valid;
  };

  const handleSubmit = () => {
    const validState = checkValidationGroupAndSubmit();
    if (validState === 'pending') {
      setSubmitIfValid(true);
    }
  };

  const handleValidChanged = (event: ValidationGroupValidChangedEvent) => {
    setGroupValid((event.detail.value as ValidationGroupValid));
    if (submitIfValid && event.detail.value !== 'pending') {
      checkValidationGroupAndSubmit();
      setSubmitIfValid(false);
    }
  };

  const handleFirstQuantityChanged = (event: InputNumberValueChangedEvent) => {
    setQuantityLimitNumber((event.detail.value as InputNumberValue | null | undefined) ?? null);
  };

  const handleSecondQuantityChanged = (event: InputNumberValueChangedEvent) => {
    setQuantityLimitNumber2((event.detail.value as InputNumberValue | null | undefined) ?? null);
  };

  return (
    <div id="validation-usecase">
      <oj-validation-group
        ref={trackerRef}
        id="tracker"
        onvalidChanged={handleValidChanged}
      >
        <oj-form-layout id="fl1" class="oj-sm-margin-2x-bottom" colspanWrap="wrap">
          <oj-c-input-number
            id="input-number"
            autocomplete="off"
            labelHint="Quantity Limit Input Number"
            validators={[asyncValidator]}
            value={quantityLimitNumber}
            onvalueChanged={handleFirstQuantityChanged}
          />
          <oj-c-input-number
            id="input-number2"
            autocomplete="off"
            labelHint="Second Quantity Limit"
            validators={[asyncValidator]}
            value={quantityLimitNumber2}
            onvalueChanged={handleSecondQuantityChanged}
          />
          <oj-label-value colspan={2}>
            <oj-button
              id="submit"
              slot="value"
              onojAction={handleSubmit}
              disabled={groupValid === 'pending'}
            >
              Submit
            </oj-button>
          </oj-label-value>
        </oj-form-layout>
      </oj-validation-group>
      <span>oj-validation-group valid property:</span>{' '}
      <span id="namevalid">{groupValid}</span>
    </div>
  );
};

export default ValidationGroupAsyncValidation;
