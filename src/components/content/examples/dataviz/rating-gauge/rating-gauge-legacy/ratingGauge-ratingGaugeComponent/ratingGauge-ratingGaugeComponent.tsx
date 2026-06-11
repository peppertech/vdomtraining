import type { ComponentProps } from 'preact';
import { useState } from 'preact/hooks';
import 'css!./demo.css';
import 'ojs/ojgauge';

type RatingGaugeValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-rating-gauge'>['onvalueChanged']>
>[0];
type RatingGaugeThresholds = NonNullable<ComponentProps<'oj-rating-gauge'>['thresholds']>;
type RatingGaugeTooltip = NonNullable<ComponentProps<'oj-rating-gauge'>['tooltip']>;
type GaugeSize = 'sm' | 'md' | 'lg';
type GaugeValues = Record<GaugeSize, number>;

const thresholdValues: RatingGaugeThresholds = [
  { max: 1, shortDesc: 'Poor' },
  { max: 2, shortDesc: 'Needs Improvement' },
  { max: 3, shortDesc: 'Satisfactory' },
  { max: 4, shortDesc: 'Exceeds Expectations' },
  { max: 5, shortDesc: 'Outstanding' }
];

const tooltipConfig: RatingGaugeTooltip = {
  renderer: () => ({ insert: 'Click to rate' })
};

const handleGaugeValueChanged = (
  event: RatingGaugeValueChangedEvent,
  setValues: (updater: (current: GaugeValues) => GaugeValues) => void,
  size: GaugeSize
) => {
  const nextValue = event.detail.value ?? 0;
  setValues((current) => ({ ...current, [size]: nextValue }));
};

export const RatingGaugeRatingGaugeComponent = () => {
  const [editableValues, setEditableValues] = useState<GaugeValues>({ sm: 3, md: 3, lg: 3 });
  const [stepValues, setStepValues] = useState<GaugeValues>({ sm: 3.5, md: 3.5, lg: 3.5 });
  const [maxValues, setMaxValues] = useState<GaugeValues>({ sm: 3, md: 3, lg: 3 });
  const [tooltipValues, setTooltipValues] = useState<GaugeValues>({ sm: 3, md: 3, lg: 3 });
  const [thresholdGaugeValues, setThresholdGaugeValues] = useState<GaugeValues>({
    sm: 3,
    md: 3,
    lg: 3
  });

  return (
    <div id="gauge-container" class="oj-typography-body-lg rating-gauge-legacy-overview">
      <div class="demo-grid">
        <div class="oj-typography-heading-sm">Size</div>
        <div id="small" class="oj-typography-heading-sm oj-sm-margin-4x-bottom">Small*</div>
        <div id="medium" class="oj-typography-heading-sm oj-sm-margin-4x-bottom">Medium*</div>
        <div id="large" class="oj-typography-heading-sm oj-sm-margin-4x-bottom">Large</div>

        <span class="demo-gauge-narrow-cell" id="readonly" aria-label="Read only gauge. Value 3">
          Read-only
        </span>
        <div class="demo-gauge-narrow-cell">
          <oj-rating-gauge value={3} aria-labelledby="small readonly" readonly size="sm" />
        </div>
        <div class="demo-gauge-wide-cell">
          <oj-rating-gauge value={3} aria-labelledby="medium readonly" size="md" readonly />
        </div>
        <div class="demo-gauge-wide-cell">
          <oj-rating-gauge value={3} aria-labelledby="large readonly" readonly size="lg" />
        </div>

        <span class="demo-gauge-narrow-cell" id="disabled">Disabled</span>
        <div class="demo-gauge-narrow-cell">
          <oj-rating-gauge value={3} aria-labelledby="small disabled" disabled size="sm" />
        </div>
        <div class="demo-gauge-wide-cell">
          <oj-rating-gauge value={3} aria-labelledby="medium disabled" size="md" disabled />
        </div>
        <div class="demo-gauge-wide-cell">
          <oj-rating-gauge value={3} aria-labelledby="large disabled" disabled size="lg" />
        </div>

        <span class="demo-gauge-narrow-cell" id="editable">Editable</span>
        <div class="demo-gauge-narrow-cell">
          <oj-rating-gauge
            value={editableValues.sm}
            aria-labelledby="small editable"
            size="sm"
            onvalueChanged={(event: RatingGaugeValueChangedEvent) =>
              handleGaugeValueChanged(event, setEditableValues, 'sm')
            }
          />
        </div>
        <div class="demo-gauge-wide-cell">
          <oj-rating-gauge
            value={editableValues.md}
            aria-labelledby="medium editable"
            size="md"
            onvalueChanged={(event: RatingGaugeValueChangedEvent) =>
              handleGaugeValueChanged(event, setEditableValues, 'md')
            }
          />
        </div>
        <div class="demo-gauge-wide-cell">
          <oj-rating-gauge
            value={editableValues.lg}
            aria-labelledby="large editable"
            size="lg"
            onvalueChanged={(event: RatingGaugeValueChangedEvent) =>
              handleGaugeValueChanged(event, setEditableValues, 'lg')
            }
          />
        </div>

        <span class="demo-gauge-narrow-cell" id="step">Step</span>
        <div class="demo-gauge-narrow-cell">
          <oj-rating-gauge
            value={stepValues.sm}
            step={0.5}
            aria-labelledby="small step"
            size="sm"
            onvalueChanged={(event: RatingGaugeValueChangedEvent) =>
              handleGaugeValueChanged(event, setStepValues, 'sm')
            }
          />
        </div>
        <div class="demo-gauge-wide-cell">
          <oj-rating-gauge
            value={stepValues.md}
            step={0.5}
            aria-labelledby="medium step"
            size="md"
            onvalueChanged={(event: RatingGaugeValueChangedEvent) =>
              handleGaugeValueChanged(event, setStepValues, 'md')
            }
          />
        </div>
        <div class="demo-gauge-wide-cell">
          <oj-rating-gauge
            value={stepValues.lg}
            step={0.5}
            aria-labelledby="large step"
            size="lg"
            onvalueChanged={(event: RatingGaugeValueChangedEvent) =>
              handleGaugeValueChanged(event, setStepValues, 'lg')
            }
          />
        </div>

        <span class="demo-gauge-narrow-cell" id="maxvalue">Max Value</span>
        <div class="demo-gauge-narrow-cell">
          <oj-rating-gauge
            value={maxValues.sm}
            aria-labelledby="small maxvalue"
            max={7}
            size="sm"
            onvalueChanged={(event: RatingGaugeValueChangedEvent) =>
              handleGaugeValueChanged(event, setMaxValues, 'sm')
            }
          />
        </div>
        <div class="demo-gauge-wide-cell">
          <oj-rating-gauge
            value={maxValues.md}
            aria-labelledby="medium maxvalue"
            max={7}
            size="md"
            onvalueChanged={(event: RatingGaugeValueChangedEvent) =>
              handleGaugeValueChanged(event, setMaxValues, 'md')
            }
          />
        </div>
        <div class="demo-gauge-wide-cell">
          <oj-rating-gauge
            value={maxValues.lg}
            aria-labelledby="large maxvalue"
            max={7}
            size="lg"
            onvalueChanged={(event: RatingGaugeValueChangedEvent) =>
              handleGaugeValueChanged(event, setMaxValues, 'lg')
            }
          />
        </div>

        <span class="demo-gauge-narrow-cell" id="tooltips" aria-label="Tooltip Demo. Click to rate">
          Tooltip
        </span>
        <div class="demo-gauge-wide-cell">
          <oj-rating-gauge
            size="sm"
            value={tooltipValues.sm}
            tooltip={tooltipConfig}
            aria-labelledby="small tooltips"
            onvalueChanged={(event: RatingGaugeValueChangedEvent) =>
              handleGaugeValueChanged(event, setTooltipValues, 'sm')
            }
          />
        </div>
        <div class="demo-gauge-wide-cell">
          <oj-rating-gauge
            size="md"
            value={tooltipValues.md}
            aria-labelledby="medium tooltips"
            tooltip={tooltipConfig}
            onvalueChanged={(event: RatingGaugeValueChangedEvent) =>
              handleGaugeValueChanged(event, setTooltipValues, 'md')
            }
          />
        </div>
        <div class="demo-gauge-wide-cell">
          <oj-rating-gauge
            size="lg"
            value={tooltipValues.lg}
            tooltip={tooltipConfig}
            aria-labelledby="large tooltips"
            onvalueChanged={(event: RatingGaugeValueChangedEvent) =>
              handleGaugeValueChanged(event, setTooltipValues, 'lg')
            }
          />
        </div>

        <span class="demo-gauge-narrow-cell" id="thresholds">Thresholds Tooltip</span>
        <div class="demo-gauge-narrow-cell">
          <oj-rating-gauge
            value={thresholdGaugeValues.sm}
            size="sm"
            thresholds={thresholdValues}
            aria-labelledby="small thresholds"
            onvalueChanged={(event: RatingGaugeValueChangedEvent) =>
              handleGaugeValueChanged(event, setThresholdGaugeValues, 'sm')
            }
          />
        </div>
        <div class="demo-gauge-wide-cell">
          <oj-rating-gauge
            size="md"
            value={thresholdGaugeValues.md}
            thresholds={thresholdValues}
            aria-labelledby="medium thresholds"
            onvalueChanged={(event: RatingGaugeValueChangedEvent) =>
              handleGaugeValueChanged(event, setThresholdGaugeValues, 'md')
            }
          />
        </div>
        <div class="demo-gauge-wide-cell">
          <oj-rating-gauge
            size="lg"
            value={thresholdGaugeValues.lg}
            thresholds={thresholdValues}
            aria-labelledby="large thresholds"
            onvalueChanged={(event: RatingGaugeValueChangedEvent) =>
              handleGaugeValueChanged(event, setThresholdGaugeValues, 'lg')
            }
          />
        </div>
        <div class="rating-gauge-overview-note oj-typography-body-md oj-typography-semi-bold oj-sm-margin-4x-top">
          * <i>sm</i> and <i>md</i> sizes are not recommended for interactive gauges as the touch
          target sizes are not large enough to meet the accessibility guidelines.
        </div>
      </div>
    </div>
  );
};

export default RatingGaugeRatingGaugeComponent;
