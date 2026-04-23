import { h } from "preact";
import { useCallback, useState } from "preact/hooks";
import Message = require("ojs/ojmessaging");
import "ojs/ojformlayout";
import "ojs/ojlabel";
import "ojs/ojslider";
import type { SliderValueChangedEvent } from "./slider-shared";

export default function SliderValidationExample() {
  const [value, setValue] = useState(1);
  const [sliderMessages, setSliderMessages] = useState<Message[]>([]);

  const handleValueChanged = useCallback((event: SliderValueChangedEvent) => {
    const nextValue = event.detail.value as number;
    setValue(nextValue);

    if (nextValue > 5 && nextValue < 10) {
      setSliderMessages([
        {
          summary: "Number out of range",
          detail: "Number needs to be 1 to 5 or 10 to 20",
          severity: "error",
        },
      ]);
      return;
    }

    setSliderMessages([]);
  }, []);

  return (
    <div id="sliderValidationDemo">
      <oj-form-layout>
        <oj-slider
          id="sliderValidation"
          value={value}
          min={0}
          max={20}
          messagesCustom={sliderMessages}
          labelHint="slider component with validation"
          labelEdge="inside"
          help={{ instruction: "Numbers 6-9 are Invalid" }}
          onvalueChanged={handleValueChanged}
        />
        <oj-label>Value</oj-label>
        <span>{value}</span>
      </oj-form-layout>
    </div>
  );
}
