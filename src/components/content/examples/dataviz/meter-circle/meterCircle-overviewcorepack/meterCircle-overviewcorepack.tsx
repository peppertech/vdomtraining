import type { ComponentProps } from "preact";
import "css!./demo.css";
import "oj-c/meter-circle";

type MeterCircleDatatip = NonNullable<ComponentProps<"oj-c-meter-circle">["datatip"]>;
type MeterCircleReferenceLines = NonNullable<ComponentProps<"oj-c-meter-circle">["referenceLines"]>;
type MeterCircleThresholds = NonNullable<ComponentProps<"oj-c-meter-circle">["thresholds"]>;
type MeterCirclePlotArea = NonNullable<ComponentProps<"oj-c-meter-circle">["plotArea"]>;

const referenceLines: MeterCircleReferenceLines = [
  { value: 33, color: "danger" },
  { value: 67, color: "warning" },
  { value: 90, color: "success" }
];

const referenceLinesWithLabelsCircular: MeterCircleReferenceLines = [
  { value: 14, color: "danger", label: "Low" },
  { value: 56, color: "warning", label: "Medium" },
  { value: 90, color: "success", label: "High" }
];

const referenceLinesWithLabelsSemiCircular: MeterCircleReferenceLines = [
  { value: 25, color: "danger", label: "Low" },
  { value: 50, color: "warning", label: "Medium" },
  { value: 70, color: "success", label: "High" }
];

const thresholdValues: MeterCircleThresholds = [{ max: 33 }, { max: 67 }, { max: 100 }];
const plotAreaOff: MeterCirclePlotArea = { rendered: "off" };

const createDatatip = (kind?: "ref" | "th"): MeterCircleDatatip => (context) => {
  if (kind === "ref") {
    return `Value: ${context.value}; Reference Lines: Low 33, Medium 67, High 90`;
  }
  if (kind === "th") {
    return `Value: ${context.value}; Thresholds: Low 33, Medium 67, High 90`;
  }
  return `Value: ${context.value}`;
};

export const MeterCircleOverviewcorepack = () => (
  <>
    <div id="gauge-container" class="demo-grid">
      <div class="oj-typography-subheading-sm">Meter Circle</div>

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
        <span class="demo-text oj-typography-subheading-xs" id="readonly" aria-label="20 out of 100 readonly">
          Readonly
        </span>
      </div>

      <div class="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center">
        <oj-c-meter-circle
          aria-labelledby="circular readonly"
          min={0}
          max={100}
          innerRadius={0.87}
          value={20}
          size="md"
          readonly
        />
      </div>
      <div class="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center">
        <oj-c-meter-circle
          aria-labelledby="semi-circular readonly"
          min={0}
          max={100}
          value={20}
          innerRadius={0.87}
          size="md"
          startAngle={180}
          angleExtent={180}
          readonly
        />
      </div>

      <div class="demo-gauge-cell oj-flex oj-sm-align-items-center">
        <span class="demo-text oj-typography-subheading-xs" id="editable">
          Editable
        </span>
      </div>

      <div class="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center">
        <oj-c-meter-circle
          aria-labelledby="circular editable"
          min={0}
          max={100}
          innerRadius={0.87}
          value={20}
          size="md"
        />
      </div>
      <div class="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center">
        <oj-c-meter-circle
          aria-labelledby="semi-circular editable"
          min={0}
          max={100}
          innerRadius={0.87}
          value={20}
          startAngle={180}
          angleExtent={180}
          size="md"
        />
      </div>

      <div class="demo-gauge-cell oj-flex oj-sm-align-items-center">
        <span class="demo-text oj-typography-subheading-xs" id="step">
          Step Increments
        </span>
      </div>

      <div class="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center">
        <oj-c-meter-circle
          min={0}
          innerRadius={0.87}
          max={100}
          value={20}
          aria-labelledby="circular step"
          size="md"
          step={10}
        />
      </div>
      <div class="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center">
        <oj-c-meter-circle
          min={0}
          innerRadius={0.87}
          max={100}
          value={20}
          aria-labelledby="semi-circular step"
          size="md"
          startAngle={180}
          angleExtent={180}
          step={10}
        />
      </div>

      <div class="demo-gauge-cell oj-flex oj-sm-align-items-center">
        <span class="demo-text oj-typography-subheading-xs" id="referenceLines">
          Reference Lines
        </span>
      </div>

      <div class="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center">
        <oj-c-meter-circle
          datatip={createDatatip("ref")}
          aria-labelledby="circular referenceLines"
          min={0}
          innerRadius={0.87}
          max={100}
          value={20}
          referenceLines={referenceLines}
          size="md"
        />
      </div>
      <div class="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center">
        <oj-c-meter-circle
          datatip={createDatatip("ref")}
          aria-labelledby="semi-circular referenceLines"
          min={0}
          innerRadius={0.87}
          max={100}
          value={20}
          referenceLines={referenceLines}
          startAngle={180}
          angleExtent={180}
          size="md"
        />
      </div>

      <div class="demo-gauge-cell oj-flex oj-sm-align-items-center">
        <span class="demo-text oj-typography-subheading-xs" id="referenceLinesWithLabels">
          Reference Lines With Labels*
        </span>
      </div>

      <div class="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center">
        <oj-c-meter-circle
          datatip={createDatatip("ref")}
          aria-labelledby="circular referenceLinesWithLabels"
          min={0}
          innerRadius={0.87}
          max={100}
          value={60}
          referenceLines={referenceLinesWithLabelsCircular}
          size="md"
        />
      </div>
      <div class="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center">
        <oj-c-meter-circle
          datatip={createDatatip("ref")}
          aria-labelledby="semi-circular referenceLinesWithLabels"
          min={0}
          innerRadius={0.87}
          max={100}
          value={20}
          referenceLines={referenceLinesWithLabelsSemiCircular}
          startAngle={180}
          angleExtent={180}
          size="md"
        />
      </div>

      <div class="demo-gauge-cell oj-flex oj-sm-align-items-center">
        <span class="demo-text oj-typography-subheading-xs" id="indicatorThreshold">
          Threshold displayed on indicator bar
        </span>
      </div>

      <div class="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center">
        <oj-c-meter-circle
          aria-labelledby="circular indicatorThreshold"
          datatip={createDatatip("th")}
          min={0}
          max={100}
          value={20}
          size="md"
          innerRadius={0.87}
          thresholds={thresholdValues}
        />
      </div>
      <div class="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center">
        <oj-c-meter-circle
          aria-labelledby="semi-circular indicatorThreshold"
          datatip={createDatatip("th")}
          min={0}
          max={100}
          value={20}
          size="md"
          innerRadius={0.87}
          thresholds={thresholdValues}
          startAngle={180}
          angleExtent={180}
        />
      </div>

      <div class="demo-gauge-cell oj-flex oj-sm-align-items-center">
        <span class="demo-text oj-typography-subheading-xs" id="plotAreaThresholds">
          All Thresholds displayed in plot area
        </span>
      </div>

      <div class="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center">
        <oj-c-meter-circle
          aria-labelledby="circular plotAreaThresholds"
          datatip={createDatatip("th")}
          min={0}
          thresholdDisplay="all"
          max={100}
          value={20}
          size="md"
          thresholds={thresholdValues}
        />
      </div>

      <div class="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center">
        <oj-c-meter-circle
          startAngle={180}
          angleExtent={180}
          aria-labelledby="semi-circular plotAreaThresholds"
          datatip={createDatatip("th")}
          thresholdDisplay="all"
          min={0}
          max={100}
          value={80}
          size="md"
          thresholds={thresholdValues}
        />
      </div>

      <div class="demo-gauge-cell oj-flex oj-sm-align-items-center">
        <span class="demo-text oj-typography-subheading-xs" id="plotAreaColorThresholds">
          Current Threshold displayed in plot area
        </span>
      </div>

      <div class="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center">
        <oj-c-meter-circle
          aria-labelledby="circular plotAreaColorThresholds"
          datatip={createDatatip("th")}
          min={0}
          thresholdDisplay="plotArea"
          max={100}
          value={20}
          size="md"
          thresholds={thresholdValues}
        />
      </div>

      <div class="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center">
        <oj-c-meter-circle
          startAngle={180}
          angleExtent={180}
          aria-labelledby="semi-circular plotAreaColorThresholds"
          datatip={createDatatip("th")}
          thresholdDisplay="plotArea"
          min={0}
          max={100}
          value={20}
          size="md"
          thresholds={thresholdValues}
        />
      </div>

      <div class="demo-gauge-cell oj-flex oj-sm-align-items-center">
        <span class="demo-text oj-typography-subheading-xs" id="plotArea">
          Plot area turned off
        </span>
      </div>

      <div class="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center">
        <oj-c-meter-circle
          size="md"
          min={0}
          max={100}
          value={60}
          aria-labelledby="circular plotArea"
          plotArea={plotAreaOff}
        />
      </div>

      <div class="demo-gauge-cell oj-flex oj-sm-justify-content-center">
        <oj-c-meter-circle
          size="md"
          min={0}
          max={100}
          value={60}
          aria-labelledby="semi-circular plotArea"
          startAngle={180}
          angleExtent={180}
          plotArea={plotAreaOff}
        />
      </div>
    </div>
    <div class="oj-typography-body-md oj-typography-semi-bold oj-sm-margin-4x-top">
      *Reference line labels are not recommended in meter circles with size smaller than 200px.
    </div>
  </>
);

export default MeterCircleOverviewcorepack;
