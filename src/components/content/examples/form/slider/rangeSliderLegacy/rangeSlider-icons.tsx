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

const wrapperStyle = {
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
};

const verticalWrapperStyle = {
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
  gap: "0.75rem",
  minHeight: "13rem",
};

export default function RangeSliderIconsExample() {
  const [horizontalValue, setHorizontalValue] = useState<RangeSliderValue>({
    start: 1,
    end: 2,
  });
  const [verticalValue, setVerticalValue] = useState<RangeSliderValue>({
    start: 1,
    end: 2,
  });

  const handleHorizontalChanged = useCallback(
    (event: RangeSliderValueChangedEvent) => {
      setHorizontalValue(event.detail.value as RangeSliderValue);
    },
    [],
  );

  const handleVerticalChanged = useCallback(
    (event: RangeSliderValueChangedEvent) => {
      setVerticalValue(event.detail.value as RangeSliderValue);
    },
    [],
  );

  return (
    <div id="rangeSliderIconsDemo">
      <oj-form-layout>
        <oj-label for="rangeSliderIconsHorizontal">
          horizontal range slider with icons
        </oj-label>
        <div style={wrapperStyle}>
          <span class="oj-ux-ico-star" role="img" aria-label="Low rating" />
          <oj-range-slider
            id="rangeSliderIconsHorizontal"
            value={horizontalValue}
            min={0}
            max={3}
            class="oj-sm-margin-2x-horizontal"
            style={{ flex: 1 }}
            onvalueChanged={handleHorizontalChanged}
          />
          <span class="oj-ux-ico-star-full" role="img" aria-label="High rating" />
        </div>

        <oj-label>Start and end value</oj-label>
        <span>{formatRangeValue(horizontalValue)}</span>

        <hr />

        <oj-label for="rangeSliderIconsVertical">
          vertical range slider with icons
        </oj-label>
        <div style={verticalWrapperStyle}>
          <span class="oj-ux-ico-star-full" role="img" aria-label="High rating" />
          <oj-range-slider
            id="rangeSliderIconsVertical"
            orientation="vertical"
            value={verticalValue}
            min={0}
            max={3}
            class="oj-sm-margin-2x-vertical"
            onvalueChanged={handleVerticalChanged}
          />
          <span class="oj-ux-ico-star" role="img" aria-label="Low rating" />
        </div>

        <oj-label>Start and end value</oj-label>
        <span>{formatRangeValue(verticalValue)}</span>
      </oj-form-layout>
    </div>
  );
}
