import "ojs/ojformlayout";
import "ojs/ojlabel";
import "ojs/ojslider";
import 'preact';
import { useCallback,useState } from "preact/hooks";
import {
  formatRangeValue,
  type RangeSliderTransientValueChangedEvent,
  type RangeSliderValue,
  type RangeSliderValueChangedEvent,
} from "./rangeSlider-shared";

export default function RangeSliderBasicExample() {
  const [value1, setValue1] = useState<RangeSliderValue>({
    start: 30,
    end: 100,
  });
  const [transientValue1, setTransientValue1] =
    useState<RangeSliderValue | null>(null);
  const [value2, setValue2] = useState<RangeSliderValue>({
    start: 30,
    end: 100,
  });
  const [transientValue2, setTransientValue2] =
    useState<RangeSliderValue | null>(null);

  const handleValue1Changed = useCallback(
    (event: RangeSliderValueChangedEvent) => {
      setValue1(event.detail.value as RangeSliderValue);
    },
    [],
  );

  const handleTransientValue1Changed = useCallback(
    (event: RangeSliderTransientValueChangedEvent) => {
      setTransientValue1((event.detail.value as RangeSliderValue | null) ?? null);
    },
    [],
  );

  const handleValue2Changed = useCallback(
    (event: RangeSliderValueChangedEvent) => {
      setValue2(event.detail.value as RangeSliderValue);
    },
    [],
  );

  const handleTransientValue2Changed = useCallback(
    (event: RangeSliderTransientValueChangedEvent) => {
      setTransientValue2((event.detail.value as RangeSliderValue | null) ?? null);
    },
    [],
  );

  return (
    <div id="rangeSliderBasicDemo">
      <oj-form-layout>
        <oj-range-slider
          id="rangeSliderBasic1"
          value={value1}
          transientValue={transientValue1 ?? undefined}
          min={0}
          max={200}
          labelHint="range slider component"
          labelEdge="inside"
          onvalueChanged={handleValue1Changed}
          ontransientValueChanged={handleTransientValue1Changed}
        />
        <oj-label>Start and end value</oj-label>
        <span>{formatRangeValue(value1)}</span>
        <oj-label>Start and end transient value</oj-label>
        <span>{formatRangeValue(transientValue1)}</span>
      </oj-form-layout>

      <hr />

      <oj-form-layout>
        <oj-range-slider
          id="rangeSliderBasicStep10"
          value={value2}
          transientValue={transientValue2 ?? undefined}
          min={0}
          max={200}
          step={10}
          labelHint="range slider component with step 10"
          labelEdge="inside"
          onvalueChanged={handleValue2Changed}
          ontransientValueChanged={handleTransientValue2Changed}
        />
        <oj-label>Start and end value</oj-label>
        <span>{formatRangeValue(value2)}</span>
        <oj-label>Start and end transient value</oj-label>
        <span>{formatRangeValue(transientValue2)}</span>
      </oj-form-layout>
    </div>
  );
}
