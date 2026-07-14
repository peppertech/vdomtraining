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
import Message = require("ojs/ojmessaging");

const helpInstruction = {
  instruction: "Input is valid when range is within 5",
};

const validateRange = (value: RangeSliderValue): Message[] => {
  if (value.end - value.start > 5) {
    return [
      {
        summary: "Number out of range",
        detail: "Input is valid when range is within 5",
        severity: "error",
      },
    ];
  }

  return [];
};

export default function RangeSliderValidationExample() {
  const [value, setValue] = useState<RangeSliderValue>({ start: 5, end: 10 });
  const [messages, setMessages] = useState<Message[]>([]);

  const handleValueChanged = useCallback(
    (event: RangeSliderValueChangedEvent) => {
      const nextValue = event.detail.value as RangeSliderValue;
      setValue(nextValue);
      setMessages(validateRange(nextValue));
    },
    [],
  );

  return (
    <div id="rangeSliderValidationDemo">
      <oj-form-layout>
        <oj-range-slider
          id="rangeSliderValidation"
          value={value}
          min={0}
          max={20}
          messagesCustom={messages}
          help={helpInstruction}
          labelHint="Range slider with validation"
          labelEdge="inside"
          onvalueChanged={handleValueChanged}
        />
        <oj-label>Start and end value</oj-label>
        <span>{formatRangeValue(value)}</span>
      </oj-form-layout>
    </div>
  );
}
