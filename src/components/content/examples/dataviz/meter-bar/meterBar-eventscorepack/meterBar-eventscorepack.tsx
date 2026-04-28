import type { ComponentProps } from "preact";
import { useState } from "preact/hooks";
import "oj-c/meter-bar";

type MeterBarValueChangedHandler = NonNullable<ComponentProps<"oj-c-meter-bar">["onvalueChanged"]>;
type MeterBarTransientValueChangedHandler = NonNullable<
  ComponentProps<"oj-c-meter-bar">["ontransientValueChanged"]
>;

export const MeterBarEventscorepack = () => {
  const [meterValue, setMeterValue] = useState<number | null>(30);
  const [transientValue, setTransientValue] = useState<number | undefined>(undefined);
  const [valueChangedText, setValueChangedText] = useState("");

  const handleValueChanged: MeterBarValueChangedHandler = (event) => {
    const detail = (event as CustomEvent<{ value: number | null; previousValue: number | null }>)
      .detail;
    setMeterValue(detail.value ?? null);
    setValueChangedText(JSON.stringify(detail));
  };

  const handleTransientValueChanged: MeterBarTransientValueChangedHandler = (event) => {
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

      <oj-c-meter-bar
        value={meterValue}
        size="lg"
        aria-label="Meter bar showing interaction tracking"
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

export default MeterBarEventscorepack;
