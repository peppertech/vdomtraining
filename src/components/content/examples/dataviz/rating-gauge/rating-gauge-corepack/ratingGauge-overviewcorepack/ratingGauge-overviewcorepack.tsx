import "css!./demo.css";
import "oj-c/rating-gauge";
import type { ComponentProps } from "preact";

type RatingGaugeSize = NonNullable<ComponentProps<"oj-c-rating-gauge">["size"]>;
type Thresholds = NonNullable<ComponentProps<"oj-c-rating-gauge">["thresholds"]>;
type DatatipFunction = NonNullable<ComponentProps<"oj-c-rating-gauge">["datatip"]>;

const thresholdValues: Thresholds = [
  { max: 1, color: "danger", accessibleLabel: "Poor" },
  { max: 2, color: "danger", accessibleLabel: "Needs Improvement" },
  { max: 3, color: "warning", accessibleLabel: "Satisfactory" },
  { max: 4, color: "success", accessibleLabel: "Exceeds Expectations" },
  { max: 5, color: "success", accessibleLabel: "Outstanding" }
];

const datatipFunc: DatatipFunction = (detail) => `${detail.value} star(s)`;

const RatingGaugeCell = ({
  cellClass,
  labelledBy,
  size,
  ...props
}: ComponentProps<"oj-c-rating-gauge"> & {
  cellClass: string;
  labelledBy: string;
  size: RatingGaugeSize;
}) => (
  <div class={cellClass}>
    <oj-c-rating-gauge size={size} aria-labelledby={labelledBy} {...props} />
  </div>
);

export const RatingGaugeOverviewcorepack = () => {
  return (
    <div id="gauge-container" class="oj-typography-body-lg rating-gauge-corepack-overview">
      <div class="demo-grid">
        <div class="oj-typography-heading-sm">Size</div>
        <span id="small" class="oj-typography-heading-sm oj-sm-margin-4x-bottom">
          Small*
        </span>
        <span id="medium" class="oj-typography-heading-sm oj-sm-margin-4x-bottom">
          Medium*
        </span>
        <span id="large" class="oj-typography-heading-sm oj-sm-margin-4x-bottom">
          Large
        </span>

        <span id="readonly" class="demo-gauge-narrow-cell">
          Read-only
        </span>
        <RatingGaugeCell cellClass="demo-gauge-narrow-cell" labelledBy="small readonly" size="sm" value={3} readonly />
        <RatingGaugeCell cellClass="demo-gauge-wide-cell" labelledBy="medium readonly" size="md" value={3} readonly />
        <RatingGaugeCell cellClass="demo-gauge-wide-cell" labelledBy="large readonly" size="lg" value={3} readonly />

        <span id="disabled" class="demo-gauge-narrow-cell">
          Disabled
        </span>
        <RatingGaugeCell cellClass="demo-gauge-narrow-cell" labelledBy="small disabled" size="sm" value={3} disabled />
        <RatingGaugeCell cellClass="demo-gauge-wide-cell" labelledBy="medium disabled" size="md" value={3} disabled />
        <RatingGaugeCell cellClass="demo-gauge-wide-cell" labelledBy="large disabled" size="lg" value={3} disabled />

        <span id="editable" class="demo-gauge-narrow-cell">
          Editable
        </span>
        <RatingGaugeCell cellClass="demo-gauge-narrow-cell" labelledBy="small editable" size="sm" value={3} />
        <RatingGaugeCell cellClass="demo-gauge-wide-cell" labelledBy="medium editable" size="md" value={3} />
        <RatingGaugeCell cellClass="demo-gauge-wide-cell" labelledBy="large editable" size="lg" value={3} />

        <span id="step" class="demo-gauge-narrow-cell">
          Step
        </span>
        <RatingGaugeCell cellClass="demo-gauge-narrow-cell" labelledBy="small step" size="sm" value={3.5} step={0.5} />
        <RatingGaugeCell cellClass="demo-gauge-wide-cell" labelledBy="medium step" size="md" value={3.5} step={0.5} />
        <RatingGaugeCell cellClass="demo-gauge-wide-cell" labelledBy="large step" size="lg" value={3.5} step={0.5} />

        <span id="maxValue" class="demo-gauge-narrow-cell">
          Max Value
        </span>
        <RatingGaugeCell cellClass="demo-gauge-narrow-cell" labelledBy="small maxValue" size="sm" value={3} max={7} />
        <RatingGaugeCell cellClass="demo-gauge-wide-cell" labelledBy="medium maxValue" size="md" value={3} max={7} />
        <RatingGaugeCell cellClass="demo-gauge-wide-cell" labelledBy="large maxValue" size="lg" value={3} max={7} />

        <span id="tooltips" class="demo-gauge-narrow-cell">
          Tooltip
        </span>
        <RatingGaugeCell
          cellClass="demo-gauge-wide-cell"
          labelledBy="small tooltips"
          size="sm"
          value={3}
          tooltip="readonly rating gauge"
          readonly
        />
        <RatingGaugeCell
          cellClass="demo-gauge-wide-cell"
          labelledBy="medium tooltips"
          size="md"
          value={3}
          tooltip="readonly rating gauge"
          readonly
        />
        <RatingGaugeCell
          cellClass="demo-gauge-wide-cell"
          labelledBy="large tooltips"
          size="lg"
          value={3}
          tooltip="readonly rating gauge"
          readonly
        />

        <span id="datatip" class="demo-gauge-narrow-cell">
          Datatip
        </span>
        <RatingGaugeCell
          cellClass="demo-gauge-narrow-cell"
          labelledBy="small datatip"
          size="sm"
          value={3}
          datatip={datatipFunc}
        />
        <RatingGaugeCell
          cellClass="demo-gauge-wide-cell"
          labelledBy="medium datatip"
          size="md"
          value={3}
          datatip={datatipFunc}
        />
        <RatingGaugeCell
          cellClass="demo-gauge-wide-cell"
          labelledBy="large datatip"
          size="lg"
          value={3}
          datatip={datatipFunc}
        />

        <span id="color" class="demo-gauge-narrow-cell">
          Color
        </span>
        <RatingGaugeCell cellClass="demo-gauge-narrow-cell" labelledBy="small color" size="sm" value={3.5} color="gold" />
        <RatingGaugeCell cellClass="demo-gauge-wide-cell" labelledBy="medium color" size="md" value={3.5} color="gold" />
        <RatingGaugeCell cellClass="demo-gauge-wide-cell" labelledBy="large color" size="lg" value={3.5} color="gold" />

        <span id="thresholds" class="demo-gauge-narrow-cell">
          Thresholds Datatip
        </span>
        <RatingGaugeCell
          cellClass="demo-gauge-narrow-cell"
          labelledBy="small thresholds"
          size="sm"
          value={3}
          thresholds={thresholdValues}
        />
        <RatingGaugeCell
          cellClass="demo-gauge-wide-cell"
          labelledBy="medium thresholds"
          size="md"
          value={3}
          thresholds={thresholdValues}
        />
        <RatingGaugeCell
          cellClass="demo-gauge-wide-cell"
          labelledBy="large thresholds"
          size="lg"
          value={3}
          thresholds={thresholdValues}
        />
        <div class="rating-gauge-overview-note oj-typography-body-md oj-typography-semi-bold oj-sm-margin-4x-top">
          * <i>sm</i> and <i>md</i> sizes are not recommended for interactive gauges as the touch
          target sizes are not large enough to meet the accessibility guidelines.
        </div>
      </div>
    </div>
  );
};

export default RatingGaugeOverviewcorepack;
