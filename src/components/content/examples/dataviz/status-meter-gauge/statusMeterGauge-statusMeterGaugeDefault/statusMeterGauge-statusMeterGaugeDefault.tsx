// @ts-nocheck
import 'ojs/ojgauge';
import 'css!./demo.css';

const referenceLines = [
  { value: 33, color: '#D63B25' },
  { value: 67, color: '#6FA939' }
];

const thresholdValues = [{ max: 33 }, { max: 67 }, {}];
const plotAreaProps = { 'plot-area.rendered': 'on' };
const thresholdTooltipProps = {
  'tooltip.renderer': (context: DatavizTooltipContext<DatavizChartDatum>) => ({
    insert: `Value: ${context.label}<br>Thresholds: Low 33, Medium 67, High 100`
  })
};
const referenceLinesTooltipProps = {
  'tooltip.renderer': (context: DatavizTooltipContext<DatavizChartDatum>) => ({
    insert: `Value: ${context.label}<br>Reference Lines: Low 33, Medium 67, High 100`
  })
};

type GaugeProps = {
  wrapperClassName: string;
  labelledBy: string;
  value: number;
  size?: 'md' | 'lg';
  gaugeClassName?: string;
  tooltipProps?: Record<string, unknown>;
  readonly?: boolean;
  step?: number;
  thresholds?: Array<{ max?: number }>;
  referenceLines?: Array<{ value: number; color: string }>;
  orientation?: 'vertical' | 'circular';
  innerRadius?: string;
  startAngle?: string;
  angleExtent?: string;
};

const StatusMeterGaugeCell = ({
  wrapperClassName,
  labelledBy,
  value,
  size = 'md',
  gaugeClassName,
  tooltipProps,
  ...gaugeProps
}: GaugeProps) => (
  <div class={wrapperClassName}>
    <oj-status-meter-gauge
      class={gaugeClassName}
      aria-labelledby={labelledBy}
      min={0}
      max={100}
      value={value}
      size={size}
      {...plotAreaProps}
      {...tooltipProps}
      {...gaugeProps}
    />
  </div>
);

export const StatusMeterGaugeStatusMeterGaugeDefault = () => {
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

      <div
        id="semi-circular"
        class="oj-flex oj-sm-justify-content-center oj-typography-subheading-sm"
      >
        Semi-Circular
      </div>

      <div class="demo-gauge-cell oj-flex oj-sm-align-items-center">
        <span
          class="demo-text oj-typography-subheading-xs"
          id="readonly"
          aria-label="Read only gauge. Value 20"
        >
          Readonly
        </span>
      </div>

      <StatusMeterGaugeCell
        wrapperClassName="demo-gauge-cell demo-horizontal-gauge oj-flex oj-sm-justify-content-center oj-sm-align-items-center"
        labelledBy="horizontal readonly"
        value={20}
        readonly
      />
      <StatusMeterGaugeCell
        wrapperClassName="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center"
        labelledBy="vertical readonly"
        value={20}
        orientation="vertical"
        readonly
      />
      <StatusMeterGaugeCell
        wrapperClassName="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center"
        labelledBy="circular readonly"
        value={20}
        orientation="circular"
        innerRadius="0.87"
        readonly
      />
      <StatusMeterGaugeCell
        wrapperClassName="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center"
        labelledBy="semi-circular readonly"
        value={20}
        orientation="circular"
        innerRadius="0.87"
        startAngle="180"
        angleExtent="180"
        readonly
      />

      <div class="demo-gauge-cell oj-flex oj-sm-align-items-center">
        <span class="demo-text oj-typography-subheading-xs" id="editable">
          Editable
        </span>
      </div>

      <StatusMeterGaugeCell
        wrapperClassName="demo-gauge-cell demo-horizontal-gauge oj-flex oj-sm-justify-content-center oj-sm-align-items-center"
        labelledBy="horizontal editable"
        value={20}
        tooltipProps={thresholdTooltipProps}
      />
      <StatusMeterGaugeCell
        wrapperClassName="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center"
        labelledBy="vertical editable"
        value={20}
        orientation="vertical"
      />
      <StatusMeterGaugeCell
        wrapperClassName="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center"
        labelledBy="circular editable"
        value={20}
        orientation="circular"
        innerRadius="0.87"
      />
      <StatusMeterGaugeCell
        wrapperClassName="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center"
        labelledBy="semi-circular editable"
        value={20}
        orientation="circular"
        innerRadius="0.87"
        startAngle="180"
        angleExtent="180"
      />

      <div class="demo-gauge-cell oj-flex oj-sm-align-items-center">
        <span class="demo-text oj-typography-subheading-xs" id="step">
          Step Increments
        </span>
      </div>

      <StatusMeterGaugeCell
        wrapperClassName="demo-gauge-cell demo-horizontal-gauge oj-flex oj-sm-justify-content-center oj-sm-align-items-center"
        labelledBy="horizontal step"
        value={40}
        step={10}
      />
      <StatusMeterGaugeCell
        wrapperClassName="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center"
        labelledBy="vertical step"
        value={40}
        step={10}
        orientation="vertical"
      />
      <StatusMeterGaugeCell
        wrapperClassName="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center"
        labelledBy="circular step"
        value={40}
        step={10}
        orientation="circular"
        innerRadius="0.87"
      />
      <StatusMeterGaugeCell
        wrapperClassName="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center"
        labelledBy="semi-circular step"
        value={40}
        step={10}
        orientation="circular"
        innerRadius="0.87"
        startAngle="180"
        angleExtent="180"
      />

      <div class="demo-gauge-cell oj-flex oj-sm-align-items-center">
        <span class="demo-text oj-typography-subheading-xs" id="referenceLines">
          Reference Lines
        </span>
      </div>

      <StatusMeterGaugeCell
        wrapperClassName="demo-gauge-cell demo-horizontal-gauge oj-flex oj-sm-justify-content-center oj-sm-align-items-center"
        labelledBy="horizontal referenceLines"
        value={40}
        referenceLines={referenceLines}
        tooltipProps={referenceLinesTooltipProps}
      />
      <StatusMeterGaugeCell
        wrapperClassName="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center"
        labelledBy="vertical referenceLines"
        value={40}
        referenceLines={referenceLines}
        orientation="vertical"
        tooltipProps={referenceLinesTooltipProps}
      />
      <StatusMeterGaugeCell
        wrapperClassName="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center"
        labelledBy="circular referenceLines"
        value={40}
        referenceLines={referenceLines}
        orientation="circular"
        innerRadius="0.87"
        tooltipProps={referenceLinesTooltipProps}
      />
      <StatusMeterGaugeCell
        wrapperClassName="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center"
        labelledBy="semi-circular referenceLines"
        value={40}
        referenceLines={referenceLines}
        orientation="circular"
        innerRadius="0.87"
        startAngle="180"
        angleExtent="180"
        tooltipProps={referenceLinesTooltipProps}
      />

      <div class="demo-gauge-cell oj-flex oj-sm-align-items-center">
        <span class="demo-text oj-typography-subheading-xs" id="indicatorThreshold">
          Threshold displayed on indicator bar
        </span>
      </div>

      <StatusMeterGaugeCell
        wrapperClassName="demo-gauge-cell demo-horizontal-gauge oj-flex oj-sm-justify-content-center oj-sm-align-items-center"
        labelledBy="horizontal indicatorThreshold"
        value={60}
        thresholds={thresholdValues}
        tooltipProps={thresholdTooltipProps}
      />
      <StatusMeterGaugeCell
        wrapperClassName="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center"
        labelledBy="vertical indicatorThreshold"
        value={60}
        thresholds={thresholdValues}
        orientation="vertical"
        tooltipProps={thresholdTooltipProps}
      />
      <StatusMeterGaugeCell
        wrapperClassName="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center"
        labelledBy="circular indicatorThreshold"
        value={60}
        thresholds={thresholdValues}
        orientation="circular"
        innerRadius="0.87"
        tooltipProps={thresholdTooltipProps}
      />
      <StatusMeterGaugeCell
        wrapperClassName="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center"
        labelledBy="semi-circular indicatorThreshold"
        value={60}
        thresholds={thresholdValues}
        orientation="circular"
        innerRadius="0.87"
        startAngle="180"
        angleExtent="180"
        tooltipProps={thresholdTooltipProps}
      />

      <div class="demo-gauge-cell oj-flex oj-sm-align-items-center">
        <span class="demo-text oj-typography-subheading-xs" id="metricLabel">
          Metric Label
        </span>
      </div>

      <StatusMeterGaugeCell
        wrapperClassName="demo-gauge-cell demo-horizontal-gauge oj-flex oj-sm-justify-content-center oj-sm-align-items-center"
        labelledBy="horizontal metricLabel"
        value={80}
        size="lg"
        tooltipProps={thresholdTooltipProps}
      />
      <StatusMeterGaugeCell
        wrapperClassName="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center"
        labelledBy="vertical metricLabel"
        value={80}
        size="lg"
        orientation="vertical"
        tooltipProps={thresholdTooltipProps}
      />
      <StatusMeterGaugeCell
        wrapperClassName="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center"
        labelledBy="circular metricLabel"
        value={80}
        orientation="circular"
        innerRadius="0.87"
        tooltipProps={thresholdTooltipProps}
      />
      <StatusMeterGaugeCell
        wrapperClassName="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center"
        labelledBy="semi-circular metricLabel"
        value={80}
        orientation="circular"
        innerRadius="0.87"
        startAngle="180"
        angleExtent="180"
        tooltipProps={thresholdTooltipProps}
      />
    </div>
  );
};

export default StatusMeterGaugeStatusMeterGaugeDefault;
