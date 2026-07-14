import "ojs/ojinputnumber";
import 'preact';
import { useCallback,useState } from "preact/hooks";
import { type InputNumberValueChangedEvent } from "./inputNumber-shared";

export default function InputNumberMinMaxExample() {
  const [currentValue1, setCurrentValue1] = useState(0);
  const [currentValue2, setCurrentValue2] = useState(0);
  const [currentValue3, setCurrentValue3] = useState(0);

  const valueHandler = useCallback(
    (setter: (value: number) => void) =>
      (event: InputNumberValueChangedEvent) => {
        setter(Number(event.detail.value ?? 0));
      },
    [],
  );

  return (
    <div id="inputNumberMinMax">
      <p>
        This demonstrates how min and max work with step=0. Type a number
        outside of the range to see an error. Notice that the value property
        does not get updated when there is an error.
      </p>
      <oj-input-number
        id="inputnumber-id1"
        min={0}
        max={100}
        step={0}
        value={currentValue1}
        labelHint="min=0, max=100, step=0"
        labelEdge="inside"
        onvalueChanged={valueHandler(setCurrentValue1)}
      />
      <div class="oj-sm-margin-4x-vertical">
        <span>Current component value is:</span> <span>{currentValue1}</span>
      </div>

      <p>
        This demonstrates how min and max work with step=1. Type a number
        outside of the range to see an error. Use the up/down arrows to change
        the value, and notice the buttons will disable when the max is reached.
      </p>
      <oj-input-number
        id="inputnumber-id2"
        min={0}
        max={100}
        step={1}
        value={currentValue2}
        labelHint="min=0, max=100, step=1"
        labelEdge="inside"
        onvalueChanged={valueHandler(setCurrentValue2)}
      />
      <div class="oj-sm-margin-4x-top">
        <p>
          This demonstrates that the up and down buttons are meant to step the
          value up and down by the step size.
        </p>
        <oj-input-number
          id="inputnumber-id3"
          min={0}
          max={100}
          step={10}
          value={currentValue3}
          labelHint="min=0, max=100, step=10"
          labelEdge="inside"
          onvalueChanged={valueHandler(setCurrentValue3)}
        />
      </div>
    </div>
  );
}
