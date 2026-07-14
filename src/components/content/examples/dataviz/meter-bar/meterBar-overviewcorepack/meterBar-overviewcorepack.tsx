import "css!./demo.css";
import "oj-c/meter-bar";
import type { ComponentProps } from "preact";

type MeterBarDatatip = NonNullable<ComponentProps<"oj-c-meter-bar">["datatip"]>;
type MeterBarReferenceLines = NonNullable<ComponentProps<"oj-c-meter-bar">["referenceLines"]>;
type MeterBarThresholds = NonNullable<ComponentProps<"oj-c-meter-bar">["thresholds"]>;
type MeterBarPlotArea = NonNullable<ComponentProps<"oj-c-meter-bar">["plotArea"]>;

const referenceLines: MeterBarReferenceLines = [
  { value: 33, color: "danger", position: "start" },
  { value: 67 }
];

const referenceLinesWithLabels: MeterBarReferenceLines = [
  { value: 33, color: "danger", position: "start", label: "33" },
  { value: 67, label: "67" }
];

const thresholdValues: MeterBarThresholds = [{ max: 33 }, { max: 67 }, { max: 100 }];
const plotAreaOff: MeterBarPlotArea = { rendered: "off" };

const createDatatip = (kind?: "ref" | "th" | "baseline"): MeterBarDatatip => (context) => {
  if (kind === "ref") {
    return `Value: ${context.value}; Reference Lines: Low 33, Medium 67`;
  }
  if (kind === "th") {
    return `Value: ${context.value}; Thresholds: Low 33, Medium 67, High 100`;
  }
  if (kind === "baseline") {
    return `Value: ${context.value}; Min: -100, Max: 100, Baseline: 10`;
  }
  return `Value: ${context.value}`;
};

export const MeterBarOverviewcorepack = () => (
  <div id="gauge-container" class="demo-grid">
    <div class="oj-typography-subheading-sm">Meter Bar</div>

    <div id="horizontal" class="oj-flex oj-sm-justify-content-center oj-typography-subheading-sm">
      Horizontal
    </div>

    <div id="vertical" class="oj-flex oj-sm-justify-content-center oj-typography-subheading-sm">
      Vertical
    </div>

    <div class="demo-gauge-cell oj-flex oj-sm-align-items-center">
      <span class="demo-text oj-typography-subheading-xs" id="readonly" aria-label="20 out of 100 readonly">
        Readonly
      </span>
    </div>

    <div class="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center">
      <oj-c-meter-bar
        aria-labelledby="horizontal readonly"
        min={0}
        max={100}
        value={20}
        size="md"
        readonly
      />
    </div>

    <div class="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center">
      <oj-c-meter-bar
        aria-labelledby="vertical readonly"
        orientation="vertical"
        min={0}
        max={100}
        value={20}
        size="md"
        readonly
      />
    </div>

    <div class="demo-gauge-cell oj-flex oj-sm-align-items-center">
      <span class="demo-text oj-typography-subheading-xs" id="editable">
        Editable
      </span>
    </div>

    <div class="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center">
      <oj-c-meter-bar
        datatip={createDatatip()}
        aria-labelledby="horizontal editable"
        min={0}
        max={100}
        value={20}
        size="md"
      />
    </div>

    <div class="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center">
      <oj-c-meter-bar
        orientation="vertical"
        aria-labelledby="vertical editable"
        min={0}
        max={100}
        value={40}
        size="md"
      />
    </div>

    <div class="demo-gauge-cell oj-flex oj-sm-align-items-center">
      <span class="demo-text oj-typography-subheading-xs" id="step">
        Step Increments
      </span>
    </div>

    <div class="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center">
      <oj-c-meter-bar
        min={0}
        max={100}
        value={40}
        aria-labelledby="horizontal step"
        size="md"
        step={10}
      />
    </div>

    <div class="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center">
      <oj-c-meter-bar
        orientation="vertical"
        min={0}
        max={100}
        value={60}
        aria-labelledby="vertical step"
        size="md"
        step={10}
      />
    </div>

    <div class="demo-gauge-cell oj-flex oj-sm-align-items-center">
      <span class="demo-text oj-typography-subheading-xs" id="referenceLines">
        Reference Lines
      </span>
    </div>

    <div class="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center">
      <oj-c-meter-bar
        datatip={createDatatip("ref")}
        aria-labelledby="horizontal referenceLines"
        min={0}
        max={100}
        value={40}
        referenceLines={referenceLines}
        size="md"
      />
    </div>

    <div class="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center">
      <oj-c-meter-bar
        orientation="vertical"
        datatip={createDatatip("ref")}
        aria-labelledby="vertical referenceLines"
        min={0}
        max={100}
        value={80}
        referenceLines={referenceLines}
        size="md"
      />
    </div>

    <div class="demo-gauge-cell oj-flex oj-sm-align-items-center">
      <span class="demo-text oj-typography-subheading-xs" id="baseline">
        Baseline
      </span>
    </div>

    <div class="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center">
      <oj-c-meter-bar
        datatip={createDatatip("baseline")}
        aria-labelledby="horizontal baseline"
        baseline={10}
        min={-100}
        max={100}
        value={50}
        size="md"
      />
    </div>

    <div class="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center">
      <oj-c-meter-bar
        orientation="vertical"
        datatip={createDatatip("baseline")}
        aria-labelledby="vertical baseline"
        min={-100}
        max={100}
        baseline={10}
        value={50}
        size="md"
      />
    </div>

    <div class="demo-gauge-cell oj-flex oj-sm-align-items-center">
      <span class="demo-text oj-typography-subheading-xs" id="referenceLinesWithLabels">
        Reference Lines with Labels
      </span>
    </div>

    <div class="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center">
      <oj-c-meter-bar
        datatip={createDatatip("ref")}
        aria-labelledby="horizontal referenceLinesWithLabels"
        min={0}
        max={100}
        value={40}
        referenceLines={referenceLinesWithLabels}
        size="md"
      />
    </div>

    <div class="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center">
      <oj-c-meter-bar
        orientation="vertical"
        datatip={createDatatip("ref")}
        aria-labelledby="vertical referenceLinesWithLabels"
        min={0}
        max={100}
        value={80}
        referenceLines={referenceLinesWithLabels}
        size="md"
      />
    </div>

    <div class="demo-gauge-cell oj-flex oj-sm-align-items-center">
      <span class="demo-text oj-typography-subheading-xs" id="indicatorThreshold">
        Threshold displayed on indicator bar
      </span>
    </div>

    <div class="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center">
      <oj-c-meter-bar
        aria-labelledby="horizontal indicatorThreshold"
        datatip={createDatatip("th")}
        min={0}
        max={100}
        value={60}
        size="md"
        thresholds={thresholdValues}
      />
    </div>

    <div class="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center">
      <oj-c-meter-bar
        orientation="vertical"
        aria-labelledby="vertical indicatorThreshold"
        datatip={createDatatip("th")}
        min={0}
        max={100}
        value={60}
        size="md"
        thresholds={thresholdValues}
      />
    </div>

    <div class="demo-gauge-cell oj-flex oj-sm-align-items-center">
      <span class="demo-text oj-typography-subheading-xs" id="plotAreaThresholds">
        All Thresholds displayed in plot area
      </span>
    </div>

    <div class="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center">
      <oj-c-meter-bar
        aria-labelledby="horizontal plotAreaThresholds"
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
      <oj-c-meter-bar
        orientation="vertical"
        aria-labelledby="vertical plotAreaThresholds"
        datatip={createDatatip("th")}
        thresholdDisplay="all"
        min={0}
        max={100}
        value={20}
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
      <oj-c-meter-bar
        aria-labelledby="horizontal plotAreaColorThresholds"
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
      <oj-c-meter-bar
        orientation="vertical"
        aria-labelledby="vertical plotAreaColorThresholds"
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
      <oj-c-meter-bar
        size="md"
        min={0}
        max={100}
        value={20}
        aria-labelledby="horizontal plotArea"
        plotArea={plotAreaOff}
      />
    </div>

    <div class="demo-gauge-cell oj-flex oj-sm-justify-content-center">
      <oj-c-meter-bar
        size="md"
        orientation="vertical"
        min={0}
        max={100}
        value={40}
        aria-labelledby="vertical plotArea"
        plotArea={plotAreaOff}
      />
    </div>
  </div>
);

export default MeterBarOverviewcorepack;
