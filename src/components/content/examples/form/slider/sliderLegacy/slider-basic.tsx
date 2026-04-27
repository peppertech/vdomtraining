import { h } from "preact";
import { useCallback, useState } from "preact/hooks";
import "ojs/ojformlayout";
import "ojs/ojlabel";
import "ojs/ojslider";
import type {
  SliderTransientValueChangedEvent,
  SliderValueChangedEvent,
} from "./slider-shared";

export default function SliderBasicExample() {
  const [value1, setValue1] = useState(90);
  const [transientValue1, setTransientValue1] = useState<number | null>(null);
  const [value2, setValue2] = useState(90);
  const [transientValue2, setTransientValue2] = useState<number | null>(null);

  const handleValue1Changed = useCallback(
    (event: SliderValueChangedEvent) => {
      setValue1(event.detail.value as number);
    },
    [],
  );

  const handleTransientValue1Changed = useCallback(
    (event: SliderTransientValueChangedEvent) => {
      setTransientValue1((event.detail.value as number | null) ?? null);
    },
    [],
  );

  const handleValue2Changed = useCallback(
    (event: SliderValueChangedEvent) => {
      setValue2(event.detail.value as number);
    },
    [],
  );

  const handleTransientValue2Changed = useCallback(
    (event: SliderTransientValueChangedEvent) => {
      setTransientValue2((event.detail.value as number | null) ?? null);
    },
    [],
  );

  return (
    <div id="sliderBasicDemo">
      <oj-form-layout>
        <oj-slider
          id="sliderBasic1"
          value={value1}
          transientValue={transientValue1 ?? undefined}
          min={0}
          max={200}
          labelHint="slider component"
          labelEdge="inside"
          onvalueChanged={handleValue1Changed}
          ontransientValueChanged={handleTransientValue1Changed}
        />
        <oj-label>Value</oj-label>
        <span>{value1}</span>
        <oj-label>Transient value</oj-label>
        <span>{transientValue1 ?? "-"}</span>
      </oj-form-layout>

      <hr />

      <oj-form-layout>
        <oj-slider
          id="sliderBasic2"
          value={value2}
          transientValue={transientValue2 ?? undefined}
          min={0}
          max={200}
          step={10}
          labelHint="slider component with step 10"
          labelEdge="inside"
          onvalueChanged={handleValue2Changed}
          ontransientValueChanged={handleTransientValue2Changed}
        />
        <oj-label>Value</oj-label>
        <span>{value2}</span>
        <oj-label>Transient value</oj-label>
        <span>{transientValue2 ?? "-"}</span>
      </oj-form-layout>
    </div>
  );
}
