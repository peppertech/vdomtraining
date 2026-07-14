import "css!./demo.css";
import "oj-c/meter-circle";
import type { CMeterCircleElement } from "oj-c/meter-circle";
import { IntlNumberConverter } from "ojs/ojconverter-number";
import type { ComponentProps } from "preact";

const numberConverter = new IntlNumberConverter({
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

const thresholdValues = [
  { max: 300000, color: "#D63B25" },
  { max: 700000, color: "#EB9632" },
  { max: 1000000, color: "#6FA939" }
];

const getDatatip: NonNullable<ComponentProps<"oj-c-meter-circle">["datatip"]> = (detail) =>
  numberConverter.format(detail.value);

const getCenterClass = (context: CMeterCircleElement.CenterTemplateContext) =>
  context.innerBounds.width === context.innerBounds.height
    ? "oj-sm-justify-content-center"
    : "oj-sm-justify-content-flex-end";

const renderCenterTemplate = (context: CMeterCircleElement.CenterTemplateContext) => (
  <div
    class={`${getCenterClass(
      context
    )} demo-full-height oj-flex oj-sm-flex-direction-column oj-sm-align-items-center`}
  >
    <div class="oj-typography-subheading-md oj-typography-bold">
      {numberConverter.format(context.value ?? 0)}
    </div>
    <div class="oj-typography-body-xs oj-text-color-secondary">Sales in USD</div>
  </div>
);

export const MeterCircleCenterContentcorepack = () => (
  <div id="gauge-container">
    <div class="oj-helper-text-align-center oj-sm-margin-4x-bottom">
      <h5 class="oj-typography-subheading-sm" id="salesQuota">
        Sales Quota (USD)
      </h5>
    </div>
    <div class="oj-flex oj-sm-justify-content-space-around">
      <div>
        <p class="oj-helper-text-align-center" id="circular">
          Circular
        </p>
        <oj-c-meter-circle
          value={200000}
          min={0}
          max={1000000}
          datatip={getDatatip}
          step={1}
          size="lg"
          aria-labelledby="circular salesQuota"
          thresholds={thresholdValues}
        >
          <template slot="centerTemplate" render={renderCenterTemplate} />
        </oj-c-meter-circle>
      </div>
      <div>
        <p class="oj-helper-text-align-center" id="semiCircular">
          Semi-Circular
        </p>
        <oj-c-meter-circle
          aria-labelledby="semiCircular salesQuota"
          min={0}
          max={1000000}
          value={200000}
          size="lg"
          datatip={getDatatip}
          startAngle={180}
          angleExtent={180}
          thresholds={thresholdValues}
        >
          <template slot="centerTemplate" render={renderCenterTemplate} />
        </oj-c-meter-circle>
      </div>
    </div>
  </div>
);

export default MeterCircleCenterContentcorepack;
