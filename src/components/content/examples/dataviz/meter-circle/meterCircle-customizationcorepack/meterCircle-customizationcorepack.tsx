import "css!./demo.css";
import "oj-c/meter-circle";

export const MeterCircleCustomizationcorepack = () => (
  <div id="gauge-container" class="demo-grid">
    <div class="oj-typography-subheading-sm">Meter Circle</div>

    <div id="circular" class="oj-flex oj-sm-justify-content-center oj-typography-subheading-sm">
      Circular
    </div>

    <div id="semi-circular" class="oj-flex oj-sm-justify-content-center oj-typography-subheading-sm">
      Semi-Circular
    </div>

    <div class="demo-gauge-cell oj-flex oj-sm-align-items-center">
      <span class="demo-text oj-typography-subheading-xs" id="indicatorSizeCircular">
        Indicator Size
      </span>
    </div>

    <div class="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center">
      <oj-c-meter-circle
        size="md"
        min={0}
        max={100}
        value={20}
        aria-labelledby="circular indicatorSizeCircular"
        indicatorSize={0.5}
      />
    </div>

    <div class="demo-gauge-cell oj-flex oj-sm-justify-content-center">
      <oj-c-meter-circle
        size="md"
        min={0}
        max={100}
        value={20}
        startAngle={180}
        angleExtent={180}
        aria-labelledby="semi-circular indicatorSizeCircular"
        indicatorSize={0.5}
      />
    </div>

    <div class="demo-gauge-cell oj-flex oj-sm-align-items-center">
      <span class="demo-text oj-typography-subheading-xs" id="innerRadiusCircular">
        Inner radius
      </span>
    </div>

    <div class="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center">
      <oj-c-meter-circle
        size="md"
        min={0}
        max={100}
        value={40}
        aria-labelledby="circular innerRadiusCircular"
        innerRadius={0.75}
      />
    </div>

    <div class="demo-gauge-cell oj-flex oj-sm-justify-content-center">
      <oj-c-meter-circle
        size="md"
        min={0}
        max={100}
        value={40}
        startAngle={180}
        angleExtent={180}
        aria-labelledby="semi-circular innerRadiusCircular"
        innerRadius={0.75}
      />
    </div>

    <div class="demo-gauge-cell oj-flex oj-sm-align-items-center">
      <span class="demo-text oj-typography-subheading-xs" id="indicatorColorCircular">
        Indicator color
      </span>
    </div>

    <div class="demo-gauge-cell oj-flex oj-sm-justify-content-center oj-sm-align-items-center">
      <oj-c-meter-circle
        size="md"
        min={0}
        max={100}
        value={60}
        aria-labelledby="circular indicatorColorCircular"
        color="#D63B25"
      />
    </div>

    <div class="demo-gauge-cell oj-flex oj-sm-justify-content-center">
      <oj-c-meter-circle
        size="md"
        min={0}
        max={100}
        value={80}
        startAngle={180}
        angleExtent={180}
        aria-labelledby="semi-circular indicatorColorCircular"
        color="#D63B25"
      />
    </div>

    <div class="demo-gauge-cell oj-flex oj-sm-align-items-center">
      <span class="demo-text oj-typography-subheading-xs" id="customSize">
        Custom Size
      </span>
    </div>

    <div class="demo-gauge-cell oj-flex oj-sm-justify-content-center">
      <oj-c-meter-circle
        class="demo-full"
        size="fit"
        min={0}
        max={100}
        value={20}
        aria-labelledby="circular customSize"
        color="#D63B25"
      />
    </div>

    <div class="demo-gauge-cell oj-flex oj-sm-justify-content-center">
      <oj-c-meter-circle
        class="demo-full"
        size="fit"
        min={0}
        max={100}
        value={20}
        startAngle={180}
        angleExtent={180}
        aria-labelledby="semi-circular customSize"
        color="#D63B25"
      />
    </div>
  </div>
);

export default MeterCircleCustomizationcorepack;
