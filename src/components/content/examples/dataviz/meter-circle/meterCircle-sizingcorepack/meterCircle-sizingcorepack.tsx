import "css!./demo.css";
import "oj-c/meter-circle";

export const MeterCircleSizingcorepack = () => (
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
      <span class="demo-text oj-typography-subheading-xs" id="circular">
        Circular
      </span>
    </div>

    <div class="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center">
      <oj-c-meter-circle aria-labelledby="circular small" min={0} max={100} value={60} size="sm" />
    </div>

    <div class="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center">
      <oj-c-meter-circle aria-labelledby="circular medium" min={0} max={100} value={60} size="md" />
    </div>

    <div class="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center">
      <oj-c-meter-circle aria-labelledby="circular large" min={0} max={100} value={60} size="lg" />
    </div>

    <div class="oj-flex oj-sm-align-items-center demo-gauge-cell">
      <span class="demo-text oj-typography-subheading-xs" id="semi-circular">
        Semi-Circular
      </span>
    </div>

    <div class="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center">
      <oj-c-meter-circle
        aria-labelledby="semi-circular small"
        min={0}
        max={100}
        value={60}
        size="sm"
        startAngle={180}
        angleExtent={180}
      />
    </div>

    <div class="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center">
      <oj-c-meter-circle
        aria-labelledby="semi-circular medium"
        min={0}
        max={100}
        value={60}
        size="md"
        startAngle={180}
        angleExtent={180}
      />
    </div>

    <div class="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center">
      <oj-c-meter-circle
        aria-labelledby="semi-circular large"
        min={0}
        max={100}
        value={60}
        size="lg"
        startAngle={180}
        angleExtent={180}
      />
    </div>
  </div>
);

export default MeterCircleSizingcorepack;
