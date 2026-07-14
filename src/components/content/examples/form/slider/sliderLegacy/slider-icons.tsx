import "ojs/ojformlayout";
import "ojs/ojlabel";
import "ojs/ojslider";
import 'preact';
import { useCallback,useState } from "preact/hooks";
import type { SliderValueChangedEvent } from "./slider-shared";

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

export default function SliderIconsExample() {
  const [horizontalValue, setHorizontalValue] = useState(1);
  const [verticalValue, setVerticalValue] = useState(1);

  const handleHorizontalChanged = useCallback(
    (event: SliderValueChangedEvent) => {
      setHorizontalValue(event.detail.value as number);
    },
    [],
  );

  const handleVerticalChanged = useCallback(
    (event: SliderValueChangedEvent) => {
      setVerticalValue(event.detail.value as number);
    },
    [],
  );

  return (
    <div id="sliderIconsDemo">
      <oj-form-layout>
        <oj-label for="sliderIconsHorizontal">horizontal slider with icons</oj-label>
        <div style={wrapperStyle}>
          <span class="oj-ux-ico-volume-mute" role="img" aria-label="Volume mute"></span>
          <oj-slider
            id="sliderIconsHorizontal"
            value={horizontalValue}
            min={0}
            max={3}
            class="oj-sm-margin-2x-horizontal"
            style={{ flex: 1 }}
            onvalueChanged={handleHorizontalChanged}
          />
          <span class="oj-ux-ico-volume-on" role="img" aria-label="Volume on"></span>
        </div>

        <oj-label>Value</oj-label>
        <span>{horizontalValue}</span>

        <oj-label for="sliderIconsVertical">vertical slider with icons</oj-label>
        <div style={verticalWrapperStyle}>
          <span class="oj-ux-ico-volume-on" role="img" aria-label="Volume on"></span>
          <oj-slider
            id="sliderIconsVertical"
            orientation="vertical"
            value={verticalValue}
            min={0}
            max={3}
            class="oj-sm-margin-2x-vertical"
            onvalueChanged={handleVerticalChanged}
          />
          <span class="oj-ux-ico-volume-mute" role="img" aria-label="Volume mute"></span>
        </div>

        <oj-label>Value</oj-label>
        <span>{verticalValue}</span>
      </oj-form-layout>
    </div>
  );
}
