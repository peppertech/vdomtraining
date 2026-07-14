import "ojs/ojformlayout";
import "ojs/ojlabel";
import "ojs/ojslider";
import 'preact';
import { useCallback,useState } from "preact/hooks";
import type { SliderValueChangedEvent } from "./slider-shared";

export default function SliderVerticalExample() {
  const [value, setValue] = useState(100);

  const handleValueChanged = useCallback((event: SliderValueChangedEvent) => {
    setValue(event.detail.value as number);
  }, []);

  return (
    <div id="sliderVerticalDemo">
      <oj-form-layout>
        <oj-slider
          id="sliderVertical"
          value={value}
          min={0}
          max={200}
          orientation="vertical"
          labelHint="slider component (vertical)"
          labelEdge="inside"
          onvalueChanged={handleValueChanged}
        />
        <oj-label>Value</oj-label>
        <span>{value}</span>
      </oj-form-layout>
    </div>
  );
}
