import "ojs/ojformlayout";
import "ojs/ojslider";
import 'preact';

export default function SliderWidthExample() {
  return (
    <div id="sliderWidthDemo">
      <oj-form-layout>
        <oj-slider
          id="slider25Width"
          value={20}
          min={0}
          max={100}
          style={{ maxWidth: "25em" }}
          labelHint="25em width"
          labelEdge="inside"
        />
        <oj-slider
          id="slider50Width"
          value={20}
          min={0}
          max={100}
          style={{ maxWidth: "50%" }}
          labelHint="50% width"
          labelEdge="inside"
        />
      </oj-form-layout>
    </div>
  );
}
