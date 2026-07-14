import "css!./demo.css";
import "oj-c/meter-bar";
import type { ComponentProps } from "preact";

type MeterBarDatatip = NonNullable<ComponentProps<"oj-c-meter-bar">["datatip"]>;

const createDatatip = (kind?: "ref" | "th"): MeterBarDatatip => (context) => {
  if (kind === "ref") {
    return `Value: ${context.value}; Reference Lines: Low 33, Medium 67`;
  }
  if (kind === "th") {
    return `Value: ${context.value}; Thresholds: Low 33, Medium 67, High 100`;
  }
  return `Value: ${context.value}`;
};

export const MeterBarCustomizationcorepack = () => (
  <div id="gauge-container" class="demo-grid">
    <div class="oj-typography-subheading-sm">Meter Bar</div>

    <div id="horizontal" class="oj-flex oj-sm-justify-content-center oj-typography-subheading-sm">
      Horizontal
    </div>

    <div id="vertical" class="oj-flex oj-sm-justify-content-center oj-typography-subheading-sm">
      Vertical
    </div>

    <div class="demo-gauge-cell oj-flex oj-sm-align-items-center">
      <span class="demo-text oj-typography-subheading-xs" id="indicatorSize">
        Indicator Size
      </span>
    </div>

    <div class="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center">
      <oj-c-meter-bar
        size="md"
        min={0}
        max={100}
        value={20}
        aria-labelledby="horizontal indicatorSize"
        indicatorSize={0.5}
      />
    </div>

    <div class="demo-gauge-cell oj-flex oj-sm-justify-content-center">
      <oj-c-meter-bar
        size="md"
        orientation="vertical"
        min={0}
        max={100}
        value={20}
        aria-labelledby="vertical indicatorSize"
        indicatorSize={0.5}
      />
    </div>

    <div class="demo-gauge-cell oj-flex oj-sm-align-items-center">
      <span class="demo-text oj-typography-subheading-xs" id="indicatorColor">
        Indicator color
      </span>
    </div>

    <div class="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center">
      <oj-c-meter-bar
        size="md"
        min={0}
        max={100}
        value={40}
        aria-labelledby="horizontal indicatorColor"
        color="#D63B25"
      />
    </div>

    <div class="demo-gauge-cell oj-flex oj-sm-justify-content-center">
      <oj-c-meter-bar
        size="md"
        orientation="vertical"
        min={0}
        max={100}
        value={40}
        aria-labelledby="vertical indicatorColor"
        color="#D63B25"
      />
    </div>

    <div class="demo-gauge-cell oj-flex oj-sm-align-items-center">
      <span class="demo-text oj-typography-subheading-xs" id="size">
        Custom Size
      </span>
    </div>

    <div class="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center">
      <oj-c-meter-bar
        class="demo-fit-size-horizontal"
        min={0}
        max={100}
        value={60}
        aria-labelledby="horizontal size"
        size="fit"
        datatip={createDatatip()}
      />
    </div>

    <div class="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center">
      <oj-c-meter-bar
        class="demo-fit-size-vertical"
        orientation="vertical"
        min={0}
        max={100}
        value={60}
        aria-labelledby="vertical size"
        size="fit"
        plotArea={{ rendered: "on" }}
        datatip={createDatatip()}
      />
    </div>
  </div>
);

export default MeterBarCustomizationcorepack;
