import { h } from "preact";
import type { ComponentProps } from "preact";
import { useMemo, useState } from "preact/hooks";
import "oj-c/progress-circle";
import "oj-c/input-number";
import "oj-c/checkboxset";
import "oj-c/form-layout";

type CheckboxsetValueChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-checkboxset">["onvalueChanged"]>
>[0];
type InputNumberValueChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-input-number">["onvalueChanged"]>
>[0];

const indeterminateOptions = [{ value: "indeterminate", label: "Indeterminate" }];

export const ProgressCircleBasiccorepack = () => {
  const [progressValue, setProgressValue] = useState(20);
  const [indeterminate, setIndeterminate] = useState<string[]>([]);

  const isIndeterminate = indeterminate.length > 0;
  const ariaLabel = useMemo(
    () => `basic progress circle ${isIndeterminate || progressValue < 100 ? "Loading" : "Loaded"}`,
    [isIndeterminate, progressValue]
  );

  const handleCheckboxsetChanged = (event: CheckboxsetValueChangedEvent) => {
    setIndeterminate(event.detail.value ?? []);
  };

  const handleProgressValueChanged = (event: InputNumberValueChangedEvent) => {
    setProgressValue(event.detail.value ?? 0);
  };

  return (
    <div id="progressCircleWrapper">
      <oj-c-progress-circle
        id="progressCircle"
        aria-label={ariaLabel}
        value={isIndeterminate ? -1 : progressValue}
      />
      <br />
      <oj-c-form-layout aria-controls="progressCircle">
        <oj-c-checkboxset
          id="indeterminateCheckbox"
          labelHint="Indeterminate Checkbox"
          options={indeterminateOptions}
          value={indeterminate}
          onvalueChanged={handleCheckboxsetChanged}
        />
        <oj-c-input-number
          id="spinner-input"
          step={10}
          value={progressValue}
          labelHint="Value"
          disabled={isIndeterminate}
          min={0}
          max={100}
          onvalueChanged={handleProgressValueChanged}
        />
      </oj-c-form-layout>
    </div>
  );
};

export default ProgressCircleBasiccorepack;
