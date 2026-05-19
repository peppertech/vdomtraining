import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useState } from 'preact/hooks';
import 'ojs/ojprogress-circle';
import 'ojs/ojinputnumber';
import 'ojs/ojcheckboxset';
import 'ojs/ojformlayout';
import 'ojs/ojoption';

type CheckboxsetValue = NonNullable<ComponentProps<'oj-checkboxset'>['value']>;
type CheckboxChangedEvent = Parameters<NonNullable<ComponentProps<'oj-checkboxset'>['onvalueChanged']>>[0];
type NumberChangedEvent = Parameters<NonNullable<ComponentProps<'oj-input-number'>['onvalueChanged']>>[0];

export const ProgressCircleDefault = () => {
  const [progressValue, setProgressValue] = useState(20);
  const [indeterminate, setIndeterminate] = useState<CheckboxsetValue>([]);

  const handleIndeterminateValueChanged = (event: CheckboxChangedEvent) => {
    setIndeterminate((event.detail.value ?? []) as CheckboxsetValue);
  };

  const handleProgressValueValueChanged = (event: NumberChangedEvent) => {
    setProgressValue(event.detail.value ?? 0);
  };

  const isIndeterminate = indeterminate.length > 0;

  return (
    <div id="progressCircleWrapper">
      <oj-progress-circle id="progressCircle" aria-label="default progress circle" value={isIndeterminate ? -1 : progressValue} />
      <br />
      <oj-form-layout aria-controls="progressCircle">
        <oj-checkboxset id="indeterminateCheckbox" onvalueChanged={handleIndeterminateValueChanged} value={indeterminate}>
          <oj-option id="indeterminate" value="indeterminate">
            Indeterminate
          </oj-option>
        </oj-checkboxset>
        <oj-input-number
          id="spinner-input"
          step={10}
          onvalueChanged={handleProgressValueValueChanged}
          value={progressValue}
          labelHint="Value"
          disabled={isIndeterminate}
          min={0}
          max={100}
        />
      </oj-form-layout>
    </div>
  );
};

export default ProgressCircleDefault;
