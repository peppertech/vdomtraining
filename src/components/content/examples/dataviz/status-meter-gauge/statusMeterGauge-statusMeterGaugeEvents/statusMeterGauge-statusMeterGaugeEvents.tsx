import 'css!./demo.css';
import 'ojs/ojgauge';
import type { ComponentProps } from 'preact';
import { useState } from 'preact/hooks';

type StatusMeterGaugeValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-status-meter-gauge'>['onvalueChanged']>
>[0];
type StatusMeterGaugeTransientValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-status-meter-gauge'>['ontransientValueChanged']>
>[0];

const plotAreaProps = { 'plot-area.rendered': 'on' };

export const StatusMeterGaugeStatusMeterGaugeEvents = () => {
  const [value, setValue] = useState<number>(20);
  const [transientValue, setTransientValue] = useState<number | null>(null);

  const handleValueChanged = (event: StatusMeterGaugeValueChangedEvent) => {
    setValue(event.detail.value ?? 0);
  };

  const handleTransientValueChanged = (event: StatusMeterGaugeTransientValueChangedEvent) => {
    setTransientValue(event.detail.value ?? null);
  };

  return (
    <div id="gauge-container">
      <div class="oj-sm-margin-4x-bottom">
        <span class="oj-typography-subheading-xs" id="transient">
          Transient Value
        </span>
      </div>
      <oj-status-meter-gauge
        class="demo-horizontal-status-meter-sample"
        min={0}
        max={100}
        value={value}
        transientValue={transientValue ?? undefined}
        size="lg"
        aria-labelledby="transient"
        onvalueChanged={handleValueChanged}
        ontransientValueChanged={handleTransientValueChanged}
        {...plotAreaProps}
      />
      <div>
        <span class="oj-typography-body-sm">Value: {value.toFixed(1)}</span>
        <br />
        <span class="oj-typography-body-sm">
          Transient value: {transientValue != null ? transientValue.toFixed(1) : ''}
        </span>
      </div>
    </div>
  );
};

export default StatusMeterGaugeStatusMeterGaugeEvents;
