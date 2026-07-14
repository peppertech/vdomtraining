import 'ojs/ojgauge';
import type { ComponentProps } from 'preact';
import { useState } from 'preact/hooks';

type RatingGaugeValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-rating-gauge'>['onvalueChanged']>
>[0];
type RatingGaugeTransientValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-rating-gauge'>['ontransientValueChanged']>
>[0];

export const RatingGaugeRatingGaugeEvents = () => {
  const [ratingValue, setRatingValue] = useState<number | null>(3);
  const [transientValue, setTransientValue] = useState<number | null>(null);
  const [valueChangedText, setValueChangedText] = useState('');

  const handleValueChanged = (event: RatingGaugeValueChangedEvent) => {
    setRatingValue(event.detail.value);
    setValueChangedText(JSON.stringify(event.detail));
  };

  const handleTransientValueChanged = (event: RatingGaugeTransientValueChangedEvent) => {
    setTransientValue(event.detail.value ?? null);
  };

  return (
    <div id="gauge-container">
      <div class="oj-sm-margin-4x-bottom">
        <span class="oj-typography-subheading-xs" id="transientVal">Transient Value</span>
      </div>
      <oj-rating-gauge
        value={ratingValue}
        onvalueChanged={handleValueChanged}
        ontransientValueChanged={handleTransientValueChanged}
        aria-labelledby="transientVal"
        size="lg"
      />

      <div class="oj-sm-margin-4x-top">
        value: {String(ratingValue)}
        <br />
        transientValue: {String(transientValue)}
        <br />
        valueChanged: {valueChangedText}
      </div>
    </div>
  );
};

export default RatingGaugeRatingGaugeEvents;
