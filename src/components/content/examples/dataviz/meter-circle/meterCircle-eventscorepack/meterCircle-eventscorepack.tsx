import "oj-c/meter-circle";
import type { ComponentProps } from "preact";
import { useState } from "preact/hooks";

type MeterCircleValueChangedHandler = NonNullable<
  ComponentProps<"oj-c-meter-circle">["onvalueChanged"]
>;
type MeterCircleTransientValueChangedHandler = NonNullable<
  ComponentProps<"oj-c-meter-circle">["ontransientValueChanged"]
>;

export const MeterCircleEventscorepack = () => {
  const [meterValue, setMeterValue] = useState<number | null>(3);
  const [transientValue, setTransientValue] = useState<number | undefined>(undefined);
  const [valueChangedText, setValueChangedText] = useState("");

  const handleValueChanged: MeterCircleValueChangedHandler = (event) => {
    const detail = (event as CustomEvent<{ value: number | null; previousValue: number | null }>)
      .detail;
    setMeterValue(detail.value ?? null);
    setValueChangedText(JSON.stringify(detail));
  };

  const handleTransientValueChanged: MeterCircleTransientValueChangedHandler = (event) => {
    const detail = (event as CustomEvent<{ value: number | undefined }>).detail;
    setTransientValue(detail.value);
  };

  return (
    <div id="meter-container">
      <div class="oj-sm-margin-4x-bottom">
        <span class="oj-typography-subheading-xs" id="transientValue">
          Transient Value
        </span>
      </div>
      <oj-c-meter-circle
        value={meterValue}
        size="lg"
        aria-label="Meter circle showing interaction tracking"
        onvalueChanged={handleValueChanged}
        ontransientValueChanged={handleTransientValueChanged}
      />

      <div class="oj-sm-margin-4x-top">
        value: {meterValue ?? ""}
        <br />
        transientValue: {transientValue ?? ""}
        <br />
        valueChanged: {valueChangedText}
      </div>
    </div>
  );
};

export default MeterCircleEventscorepack;
