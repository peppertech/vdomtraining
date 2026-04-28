// @ts-nocheck
import 'ojs/ojgauge';
import 'css!./demo.css';

const thresholdValues = [{ max: 33 }, { max: 67 }, {}];
const plotAreaProps = { 'plot-area.rendered': 'on' };
const thresholdTooltipProps = {
  'tooltip.renderer': (context: any) => ({
    insert: `Value: ${context.label}<br>Thresholds: Low 33, Medium 67, High 100`
  })
};

type GaugeProps = {
  wrapperClassName: string;
  labelledBy: string;
  value: number;
  gaugeClassName?: string;
  orientation?: 'vertical' | 'circular';
  innerRadius?: string;
  indicatorSize?: string;
  thresholdDisplay?: 'currentOnly' | 'all';
  thresholds?: Array<{ max?: number }>;
  tooltipProps?: Record<string, unknown>;
};

const StatusMeterGaugeCell = ({
  wrapperClassName,
  labelledBy,
  value,
  gaugeClassName,
  tooltipProps,
  ...gaugeProps
}: GaugeProps) => (
  <div class={wrapperClassName}>
    <oj-status-meter-gauge
      class={gaugeClassName}
      size="md"
      aria-labelledby={labelledBy}
      min={0}
      max={100}
      value={value}
      {...plotAreaProps}
      {...tooltipProps}
      {...gaugeProps}
    />
  </div>
);

export const StatusMeterGaugeStatusMeterGaugeCustomization = () => {
  return (
    <div id="gauge-container" class="demo-grid">
      <div class="oj-typography-subheading-sm">Gauge</div>

      <div
        id="horizontal"
        class="demo-horizontal-gauge oj-flex oj-sm-justify-content-center oj-typography-subheading-sm"
      >
        Horizontal
      </div>

      <div id="vertical" class="oj-flex oj-sm-justify-content-center oj-typography-subheading-sm">
        Vertical
      </div>

      <div id="circular" class="oj-flex oj-sm-justify-content-center oj-typography-subheading-sm">
        Circular
      </div>

      <div class="oj-flex oj-sm-align-items-center demo-gauge-cell">
        <span class="demo-text oj-typography-subheading-xs" id="currentThreshold">
          Current Threshold displayed in plot area
        </span>
      </div>

      <StatusMeterGaugeCell
        wrapperClassName="demo-gauge-cell demo-horizontal-gauge oj-flex oj-sm-justify-content-center oj-sm-align-items-center"
        labelledBy="horizontal currentThreshold"
        value={40}
        thresholds={thresholdValues}
        indicatorSize="0.5"
        thresholdDisplay="currentOnly"
        tooltipProps={thresholdTooltipProps}
      />
      <StatusMeterGaugeCell
        wrapperClassName="demo-gauge-cell oj-flex oj-sm-justify-content-center"
        labelledBy="vertical currentThreshold"
        value={40}
        thresholds={thresholdValues}
        indicatorSize="0.5"
        thresholdDisplay="currentOnly"
        orientation="vertical"
        tooltipProps={thresholdTooltipProps}
      />
      <StatusMeterGaugeCell
        wrapperClassName="demo-gauge-cell oj-flex oj-sm-justify-content-center"
        labelledBy="circular currentThreshold"
        value={40}
        thresholds={thresholdValues}
        indicatorSize="0.5"
        thresholdDisplay="currentOnly"
        orientation="circular"
        innerRadius="0.87"
        tooltipProps={thresholdTooltipProps}
      />

      <div class="oj-flex oj-sm-align-items-center demo-gauge-cell">
        <span class="demo-text oj-typography-subheading-xs" id="allThresholds">
          All Threshold displayed in plot area
        </span>
      </div>

      <StatusMeterGaugeCell
        wrapperClassName="demo-gauge-cell demo-horizontal-gauge oj-flex oj-sm-justify-content-center oj-sm-align-items-center"
        labelledBy="horizontal allThresholds"
        value={40}
        thresholds={thresholdValues}
        indicatorSize="0.5"
        thresholdDisplay="all"
        tooltipProps={thresholdTooltipProps}
      />
      <StatusMeterGaugeCell
        wrapperClassName="demo-gauge-cell oj-flex oj-sm-justify-content-center"
        labelledBy="vertical allThresholds"
        value={40}
        thresholds={thresholdValues}
        indicatorSize="0.5"
        thresholdDisplay="all"
        orientation="vertical"
        tooltipProps={thresholdTooltipProps}
      />
      <StatusMeterGaugeCell
        wrapperClassName="demo-gauge-cell oj-flex oj-sm-justify-content-center"
        labelledBy="circular allThresholds"
        value={40}
        thresholds={thresholdValues}
        indicatorSize="0.5"
        thresholdDisplay="all"
        orientation="circular"
        innerRadius="0.87"
        tooltipProps={thresholdTooltipProps}
      />

      <div class="demo-gauge-cell oj-flex oj-sm-align-items-center">
        <span class="demo-text oj-typography-subheading-xs" id="indicator">
          Indicator Size
        </span>
      </div>

      <StatusMeterGaugeCell
        wrapperClassName="demo-gauge-cell demo-horizontal-gauge oj-flex oj-sm-justify-content-center oj-sm-align-items-center"
        labelledBy="horizontal indicator"
        value={20}
        indicatorSize="5"
      />
      <StatusMeterGaugeCell
        wrapperClassName="demo-gauge-cell oj-flex oj-sm-justify-content-center"
        labelledBy="vertical indicator"
        value={20}
        indicatorSize="5"
        orientation="vertical"
      />
      <StatusMeterGaugeCell
        wrapperClassName="demo-gauge-cell oj-flex oj-sm-justify-content-center"
        labelledBy="circular indicator"
        value={20}
        indicatorSize="5"
        orientation="circular"
        innerRadius="0.87"
      />

      <div class="demo-gauge-cell oj-flex oj-sm-align-items-center">
        <span class="demo-text oj-typography-subheading-xs" id="size">
          Custom Size
        </span>
      </div>

      <div class="demo-gauge-cell demo-horizontal-gauge oj-flex oj-sm-justify-content-center oj-sm-align-items-center">
        <oj-status-meter-gauge
          class="demo-custom-size-horizontal"
          min={0}
          max={100}
          value={40}
          aria-labelledby="horizontal size"
          {...plotAreaProps}
        />
      </div>
      <div class="demo-gauge-cell demo-horizontal-gauge oj-flex oj-sm-justify-content-center oj-sm-align-items-center">
        <oj-status-meter-gauge
          class="demo-custom-size-vertical"
          orientation="vertical"
          min={0}
          max={100}
          value={40}
          aria-labelledby="vertical size"
          {...plotAreaProps}
        />
      </div>
      <div class="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center">
        <oj-status-meter-gauge
          class="demo-custom-size-circular"
          orientation="circular"
          min={0}
          max={100}
          value={60}
          aria-labelledby="circular size"
          {...plotAreaProps}
        />
      </div>
    </div>
  );
};

export default StatusMeterGaugeStatusMeterGaugeCustomization;
