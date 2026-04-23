import { ComponentProps, h } from "preact";
import { useCallback, useState } from "preact/hooks";
import "oj-c/form-layout";
import "oj-c/input-number";

type InputNumberProps = ComponentProps<"oj-c-input-number">;
type InputNumberValueChangedEvent = Parameters<
  NonNullable<InputNumberProps["onvalueChanged"]>
>[0];

export default function UserAssistanceValidatorHintsExample() {
  const [decimal, setDecimal] = useState<InputNumberProps["value"]>(null);
  const [decimal2, setDecimal2] = useState<InputNumberProps["value"]>(null);

  const handleDecimalChanged = useCallback(
    (event: InputNumberValueChangedEvent) => {
      setDecimal(event.detail.value as InputNumberProps["value"]);
    },
    [],
  );

  const handleDecimal2Changed = useCallback(
    (event: InputNumberValueChangedEvent) => {
      setDecimal2(event.detail.value as InputNumberProps["value"]);
    },
    [],
  );

  return (
    <div id="form-container">
      <oj-c-form-layout>
        <h5 class="oj-header-border">Validator Hints</h5>
        <oj-c-input-number
          id="currency1"
          required={true}
          min={10000.0}
          max={50000.45}
          value={decimal}
          helpHints={{ definition: "custom help-hints definition text" }}
          labelHint="min, max attributes"
          onvalueChanged={handleDecimalChanged}
        />
        <oj-c-input-number
          id="currency2"
          required={true}
          min={10000.0}
          max={50000.45}
          value={decimal2}
          help={{ instruction: "help.instruction text takes precedence over hints" }}
          labelHint="min, max, and help.instruction set"
          onvalueChanged={handleDecimal2Changed}
        />
      </oj-c-form-layout>
    </div>
  );
}
