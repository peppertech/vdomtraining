import "ojs/ojformlayout";
import "ojs/ojlabel";
import "ojs/ojslider";
import 'preact';
import { useCallback,useState } from "preact/hooks";
import {
  formatRangeValue,
  type RangeSliderValue,
  type RangeSliderValueChangedEvent,
} from "./rangeSlider-shared";

export default function RangeSliderVerticalExample() {
  const [value, setValue] = useState<RangeSliderValue>({
    start: 30,
    end: 100,
  });

  const handleValueChanged = useCallback(
    (event: RangeSliderValueChangedEvent) => {
      setValue(event.detail.value as RangeSliderValue);
    },
    [],
  );

  return (
    <div id="rangeSliderVerticalDemo">
      <oj-form-layout>
        <oj-range-slider
          id="rangeSliderVertical"
          orientation="vertical"
          value={value}
          min={0}
          max={200}
          labelHint="range slider component (vertical)"
          labelEdge="inside"
          onvalueChanged={handleValueChanged}
        />
        <oj-label>Start and end value</oj-label>
        <span>{formatRangeValue(value)}</span>
      </oj-form-layout>
    </div>
  );
}
