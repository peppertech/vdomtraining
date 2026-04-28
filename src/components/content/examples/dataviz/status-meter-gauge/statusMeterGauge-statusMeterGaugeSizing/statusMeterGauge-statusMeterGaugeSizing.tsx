// @ts-nocheck
import 'ojs/ojgauge';
import 'css!./demo.css';

const plotAreaProps = { 'plot-area.rendered': 'on' };

type GaugeSize = 'sm' | 'md' | 'lg';

type GaugeProps = {
  labelledBy: string;
  size: GaugeSize;
  wrapperClassName: string;
  gaugeClassName?: string;
  orientation?: 'vertical' | 'circular';
  startAngle?: string;
  angleExtent?: string;
};

const StatusMeterGaugeCell = ({
  labelledBy,
  size,
  wrapperClassName,
  gaugeClassName,
  ...gaugeProps
}: GaugeProps) => (
  <div class={wrapperClassName}>
    <oj-status-meter-gauge
      class={gaugeClassName}
      aria-labelledby={labelledBy}
      min={0}
      max={100}
      value={60}
      size={size}
      {...plotAreaProps}
      {...gaugeProps}
    />
  </div>
);

export const StatusMeterGaugeStatusMeterGaugeSizing = () => {
  return (
    <div id="gauge-container">
      <div class="oj-flex oj-typography-subheading-sm">Size</div>
      <div id="small" class="oj-flex oj-sm-justify-content-center oj-typography-subheading-sm">
        Small
      </div>
      <div id="medium" class="oj-flex oj-sm-justify-content-center oj-typography-subheading-sm">
        Medium
      </div>
      <div id="large" class="oj-flex oj-sm-justify-content-center oj-typography-subheading-sm">
        Large
      </div>

      <div class="oj-flex oj-sm-align-items-center demo-gauge-cell">
        <span class="demo-text oj-typography-subheading-xs" id="horizontal">
          Horizontal
        </span>
      </div>
      <StatusMeterGaugeCell
        labelledBy="small horizontal"
        size="sm"
        wrapperClassName="demo-gauge-cell oj-flex oj-sm-align-items-center oj-sm-justify-content-center"
        gaugeClassName="demo-gauge-narrow-cell"
      />
      <StatusMeterGaugeCell
        labelledBy="medium horizontal"
        size="md"
        wrapperClassName="demo-gauge-cell oj-flex oj-sm-align-items-center oj-sm-justify-content-center"
        gaugeClassName="demo-gauge-narrow-cell"
      />
      <StatusMeterGaugeCell
        labelledBy="large horizontal"
        size="lg"
        wrapperClassName="demo-gauge-cell oj-flex oj-sm-align-items-center oj-sm-justify-content-center"
        gaugeClassName="demo-gauge-narrow-cell"
      />

      <div class="oj-flex oj-sm-align-items-center demo-gauge-cell">
        <span class="demo-text oj-typography-subheading-xs" id="vertical">
          Vertical
        </span>
      </div>
      <StatusMeterGaugeCell
        labelledBy="small vertical"
        size="sm"
        orientation="vertical"
        wrapperClassName="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center"
      />
      <StatusMeterGaugeCell
        labelledBy="medium vertical"
        size="md"
        orientation="vertical"
        wrapperClassName="demo-gauge-cell oj-flex oj-sm-justify-content-center"
      />
      <StatusMeterGaugeCell
        labelledBy="large vertical"
        size="lg"
        orientation="vertical"
        wrapperClassName="demo-gauge-cell oj-flex oj-sm-justify-content-center"
      />

      <div class="oj-flex oj-sm-align-items-center demo-gauge-cell">
        <span class="demo-text oj-typography-subheading-xs" id="circular">
          Circular
        </span>
      </div>
      <StatusMeterGaugeCell
        labelledBy="small circular"
        size="sm"
        orientation="circular"
        wrapperClassName="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center"
      />
      <StatusMeterGaugeCell
        labelledBy="medium circular"
        size="md"
        orientation="circular"
        wrapperClassName="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center"
      />
      <StatusMeterGaugeCell
        labelledBy="large circular"
        size="lg"
        orientation="circular"
        wrapperClassName="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center"
      />

      <div class="oj-flex oj-sm-align-items-center demo-gauge-cell">
        <span class="demo-text oj-typography-subheading-xs" id="semi-circular">
          Semi-Circular
        </span>
      </div>
      <StatusMeterGaugeCell
        labelledBy="small semi-circular"
        size="sm"
        orientation="circular"
        startAngle="180"
        angleExtent="180"
        wrapperClassName="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center"
      />
      <StatusMeterGaugeCell
        labelledBy="medium semi-circular"
        size="md"
        orientation="circular"
        startAngle="180"
        angleExtent="180"
        wrapperClassName="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center"
      />
      <StatusMeterGaugeCell
        labelledBy="large semi-circular"
        size="lg"
        orientation="circular"
        startAngle="180"
        angleExtent="180"
        wrapperClassName="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center"
      />
    </div>
  );
};

export default StatusMeterGaugeStatusMeterGaugeSizing;
