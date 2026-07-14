import "oj-c/rating-gauge";
import type { ComponentProps } from "preact";
import { useState } from "preact/hooks";

type RatingGaugeValueChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-rating-gauge">["onvalueChanged"]>
>[0];
type RatingGaugeChangedChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-rating-gauge">["onchangedChanged"]>
>[0];
type RatingGaugeTransientValueChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-rating-gauge">["ontransientValueChanged"]>
>[0];

export const RatingGaugeEventscorepack = () => {
  const [ratingValue, setRatingValue] = useState<number | null>(3);
  const [transientValue, setTransientValue] = useState<number | undefined>(undefined);
  const [valueChangedText, setValueChangedText] = useState("");
  const [changedValue, setChangedValue] = useState(false);

  const handleValueChanged = (event: RatingGaugeValueChangedEvent) => {
    setRatingValue(event.detail.value ?? null);
    setValueChangedText(JSON.stringify(event.detail));
  };

  const handleChangedChanged = (event: RatingGaugeChangedChangedEvent) => {
    setChangedValue(Boolean(event.detail.value));
  };

  const handleTransientValueChanged = (event: RatingGaugeTransientValueChangedEvent) => {
    setTransientValue(event.detail.value as number | undefined);
  };

  return (
    <div id="gauge-container">
      <div class="oj-sm-margin-4x-bottom">
        <span class="oj-typography-subheading-xs" id="transientVal">
          Transient Value
        </span>
      </div>
      <oj-c-rating-gauge
        value={ratingValue}
        aria-labelledby="transientVal"
        onvalueChanged={handleValueChanged}
        onchangedChanged={handleChangedChanged}
        ontransientValueChanged={handleTransientValueChanged}
        changed={changedValue}
        size="lg"
      />

      <div class="oj-sm-margin-4x-top">
        value: {ratingValue ?? ""}
        <br />
        transientValue: {transientValue ?? ""}
        <br />
        valueChanged: {valueChangedText}
        <br />
        changed: {String(changedValue)}
      </div>
    </div>
  );
};

export default RatingGaugeEventscorepack;
