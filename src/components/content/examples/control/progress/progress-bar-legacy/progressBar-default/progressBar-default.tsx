import { h, type ComponentProps } from 'preact';
import { useState } from 'preact/hooks';
import 'ojs/ojcheckboxset';
import 'ojs/ojformlayout';
import 'ojs/ojinputnumber';
import 'ojs/ojoption';
import 'ojs/ojprogress-bar';

type CheckboxsetValue = NonNullable<ComponentProps<'oj-checkboxset'>['value']>;
type CheckboxsetValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-checkboxset'>['onvalueChanged']>
>[0];
type InputNumberValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-input-number'>['onvalueChanged']>
>[0];

const INDETERMINATE_VALUE = 'indeterminate';

export const ProgressBarDefault = () => {
  const [progressValue, setProgressValue] = useState(20);
  const [indeterminate, setIndeterminate] = useState<CheckboxsetValue>([]);

  const handleIndeterminateChanged = (event: CheckboxsetValueChangedEvent) => {
    setIndeterminate((event.detail.value ?? []) as CheckboxsetValue);
  };

  const handleProgressValueChanged = (event: InputNumberValueChangedEvent) => {
    setProgressValue(event.detail.value ?? 0);
  };

  const isIndeterminate = indeterminate.includes(INDETERMINATE_VALUE);
  const value = isIndeterminate ? -1 : progressValue;

  return (
    <div id="progressBarWrapper">
      <oj-progress-bar id="progressBar" aria-label="basic progress bar" value={value} />
      <br />
      <oj-form-layout aria-controls="progressBar">
        <oj-checkboxset
          id="indeterminateCheckbox"
          value={indeterminate}
          onvalueChanged={handleIndeterminateChanged}
        >
          <oj-option id="indeterminate" value={INDETERMINATE_VALUE}>
            Indeterminate
          </oj-option>
        </oj-checkboxset>
        <oj-input-number
          id="spinner-input"
          step={10}
          value={progressValue}
          labelHint="Value"
          disabled={isIndeterminate}
          min={0}
          max={100}
          onvalueChanged={handleProgressValueChanged}
        />
      </oj-form-layout>
    </div>
  );
};

export default ProgressBarDefault;
