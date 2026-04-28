import "css!./demo.css";
import "oj-c/meter-bar";

export const MeterBarSizingcorepack = () => (
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
    <div class="demo-gauge-cell oj-flex oj-sm-align-items-center oj-sm-justify-content-center">
      <oj-c-meter-bar
        class="demo-gauge-narrow-cell"
        aria-labelledby="horizontal small"
        min={0}
        max={100}
        value={60}
        size="sm"
      />
    </div>
    <div class="demo-gauge-cell oj-flex oj-sm-align-items-center oj-sm-justify-content-center">
      <oj-c-meter-bar
        class="demo-gauge-narrow-cell"
        aria-labelledby="horizontal medium"
        min={0}
        max={100}
        value={60}
        size="md"
      />
    </div>

    <div class="demo-gauge-cell oj-flex oj-sm-align-items-center oj-sm-justify-content-center">
      <oj-c-meter-bar
        class="demo-gauge-narrow-cell"
        aria-labelledby="horizontal large"
        min={0}
        max={100}
        value={60}
        size="lg"
      />
    </div>

    <div class="oj-flex oj-sm-align-items-center demo-gauge-cell">
      <span class="demo-text oj-typography-subheading-xs" id="vertical">
        Vertical
      </span>
    </div>

    <div class="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center">
      <oj-c-meter-bar
        aria-labelledby="vertical small"
        min={0}
        max={100}
        value={60}
        size="sm"
        orientation="vertical"
      />
    </div>

    <div class="demo-gauge-cell oj-flex oj-sm-justify-content-center">
      <oj-c-meter-bar
        aria-labelledby="vertical medium"
        min={0}
        max={100}
        value={60}
        size="md"
        orientation="vertical"
      />
    </div>

    <div class="demo-gauge-cell oj-flex oj-sm-justify-content-center">
      <oj-c-meter-bar
        aria-labelledby="vertical large"
        min={0}
        max={100}
        value={60}
        size="lg"
        orientation="vertical"
      />
    </div>
  </div>
);

export default MeterBarSizingcorepack;
