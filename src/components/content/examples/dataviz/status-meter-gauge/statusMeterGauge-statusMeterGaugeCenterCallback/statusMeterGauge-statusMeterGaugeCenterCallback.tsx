import 'css!./demo.css';
import { IntlNumberConverter } from 'ojs/ojconverter-number';
import 'ojs/ojgauge';
import { useMemo } from 'preact/hooks';
type GaugeCenterTemplateContext = {
    innerBounds: {
        width: number;
        height: number;
        x: number;
        y: number;
    };
};
const thresholdValues = [{ max: 300000 }, { max: 700000 }, {}];
const createCenterTemplateRenderer = (formattedValue: string) => ($current: GaugeCenterTemplateContext) => (<div class="oj-flex oj-sm-justify-content-center oj-sm-flex-direction-column oj-sm-align-items-center" style={{
        position: 'absolute',
        width: `${$current.innerBounds.width}px`,
        height: `${$current.innerBounds.height}px`,
        top: `${$current.innerBounds.y}px`,
        left: `${$current.innerBounds.x}px`,
        pointerEvents: 'none'
    }}>
      <div class="oj-typography-subheading-md oj-typography-bold">{formattedValue}</div>
      <div class="oj-typography-body-xs oj-text-color-secondary">Sales in USD</div>
    </div>);
export const StatusMeterGaugeStatusMeterGaugeCenterCallback = () => {
    const value = 200000;
    const numberConverter = useMemo(() => new IntlNumberConverter({
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    }), []);
    const formattedValue = numberConverter.format(value);
    const centerTemplateRenderer = useMemo(() => createCenterTemplateRenderer(formattedValue), [formattedValue]);
    return (<div id="gauge-container">
      <div class="oj-helper-text-align-center oj-sm-margin-4x-bottom">
        <span class="oj-typography-subheading-sm" id="salesQuota">
          Sales Quota
        </span>
      </div>
      <oj-status-meter-gauge class="demo-center-content-status-meter-sample" value={value} min={0} max={1000000} innerRadius={0.85} step={1} size="lg" aria-labelledby="salesQuota" orientation="circular" thresholds={thresholdValues}>
        <template slot="centerTemplate" render={centerTemplateRenderer}/>
      </oj-status-meter-gauge>
    </div>);
};
export default StatusMeterGaugeStatusMeterGaugeCenterCallback;
