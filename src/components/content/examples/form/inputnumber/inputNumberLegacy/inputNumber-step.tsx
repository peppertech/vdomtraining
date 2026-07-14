import "ojs/ojbutton";
import { IntlNumberConverter } from "ojs/ojconverter-number";
import "ojs/ojformlayout";
import "ojs/ojinputnumber";
import "ojs/ojlabelvalue";
import 'preact';
import { useCallback,useState } from "preact/hooks";
import { type InputNumberValueChangedEvent } from "./inputNumber-shared";

const decimalConverter = new IntlNumberConverter({
  style: "decimal",
  minimumIntegerDigits: 2,
  minimumFractionDigits: 4,
  maximumFractionDigits: 6,
  useGrouping: false,
});

export default function InputNumberStepExample() {
  const [currentValue1, setCurrentValue1] = useState(14.5);
  const [currentValue2, setCurrentValue2] = useState<number | null>(null);
  const [fractionValue, setFractionValue] = useState(0.24);
  const [currentValue4, setCurrentValue4] = useState(5);
  const [currentValue5, setCurrentValue5] = useState(180);

  const valueHandler = useCallback(
    (setter: (value: number) => void) =>
      (event: InputNumberValueChangedEvent) => {
        setter(Number(event.detail.value ?? 0));
      },
    [],
  );

  return (
    <div id="inputNumberStep">
      <oj-form-layout>
        <p>
          Step up and you see 16.5. Since min is not set, the step match starts
          with the initial value: 14.5. Even if you type in a non-match, if you
          step up or down, the value adjusts to be a step match.
        </p>
        <oj-label-value>
          <oj-input-number
            slot="value"
            id="inputnumber-id1"
            step={2}
            value={currentValue1}
            labelHint="step=2, min/max not set, initial value=14.5"
            onvalueChanged={valueHandler(setCurrentValue1)}
          />
          <oj-button
            slot="value"
            id="buttonId1"
            class="oj-sm-margin-1x-horizontal"
            onojAction={() => {
              setCurrentValue2(11);
            }}
          >
            Set initial value to 11 and reset step base
          </oj-button>
        </oj-label-value>

        <p>
          This demonstrates how the step works when min/value are not set. It
          steps up from 0 according to the step match rules.
        </p>
        <oj-input-number
          id="inputnumber-id2a"
          step={2}
          value={currentValue2}
          labelHint="step=2, min/max/value not set"
          onvalueChanged={(event: InputNumberValueChangedEvent) => {
            setCurrentValue2((event.detail.value as number | null | null | undefined) ?? null);
          }}
        />

        <p>
          This demonstrates how the step works with fractions. A converter with
          enough fraction digits keeps the fractional step visible.
        </p>
        <oj-input-number
          id="inputnumber-id3"
          max={0.24}
          min={0.11}
          step={0.0065}
          value={fractionValue}
          converter={decimalConverter}
          labelHint="step=.0065, min=.11, max=.24"
          onvalueChanged={valueHandler(setFractionValue)}
        />

        <p>
          This demonstrates how an initial value that is not a step match can
          produce a surprising first step.
        </p>
        <oj-input-number
          id="inputnumber-id4"
          min={-20}
          max={1000}
          step={100}
          value={currentValue4}
          labelHint="step=100, min=-20, max=1000, initial value=5"
          onvalueChanged={valueHandler(setCurrentValue4)}
        />

        <p>
          This demonstrates the same min and step as above, but with a step
          match initial value and max.
        </p>
        <oj-input-number
          id="inputnumber-id5"
          min={-20}
          max={980}
          step={100}
          value={currentValue5}
          labelHint="step=100, min=-20, max=980, initial value=180"
          onvalueChanged={valueHandler(setCurrentValue5)}
        />
      </oj-form-layout>
    </div>
  );
}
