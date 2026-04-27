import { h } from "preact";
import "ojs/ojslider";

export default function RangeSliderWidthExample() {
  return (
    <div id="rangeSliderWidthDemo">
      <div>
        <oj-range-slider
          id="rangeSlider25emWidth"
          value={{ start: 30, end: 100 }}
          min={0}
          max={200}
          style={{ maxWidth: "25em" }}
          labelHint="25em width"
          labelEdge="inside"
        />
      </div>
      <div>
        <oj-range-slider
          id="rangeSlider50PercentWidth"
          value={{ start: 30, end: 100 }}
          min={0}
          max={200}
          style={{ maxWidth: "50%" }}
          labelHint="50% width"
          labelEdge="inside"
        />
      </div>
    </div>
  );
}
