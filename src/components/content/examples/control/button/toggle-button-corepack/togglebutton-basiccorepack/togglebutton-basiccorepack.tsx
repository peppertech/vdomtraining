import "oj-c/toggle-button";
import 'preact';
import type { ComponentProps } from "preact";
import { useState } from "preact/hooks";

type ToggleButtonValueChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-toggle-button">["onvalueChanged"]>
>[0];

export const TogglebuttonBasiccorepack = () => {
  const [isAdvanced, setIsAdvanced] = useState(false);

  const handleValueChanged = (event: ToggleButtonValueChangedEvent) => {
    setIsAdvanced(event.detail.value ?? false);
  };

  return (
    <div id="buttons-container">
      <h6>Toggle</h6>
      <oj-c-toggle-button
        id="toggle1"
        value={isAdvanced}
        onvalueChanged={handleValueChanged}
        label="Advanced mode"
      />
      <p />
      <p id="last" class="oj-typography-bold">
        Advanced State: <span id="results">{String(isAdvanced)}</span>
      </p>
    </div>
  );
};

export default TogglebuttonBasiccorepack;
