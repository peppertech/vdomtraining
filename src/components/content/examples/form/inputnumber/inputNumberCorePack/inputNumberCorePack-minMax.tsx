import { h } from "preact";
import { useState } from "preact/hooks";
import "oj-c/input-number";
import { type InputNumberCorePackValueChangedEvent } from "./inputNumberCorePack-shared";

export default function InputNumberCorePackMinMaxExample() {
  const [currentValue1, setCurrentValue1] = useState(0);
  const [currentValue2, setCurrentValue2] = useState(0);
  const [currentValue3, setCurrentValue3] = useState(0);
  const [currentValue4, setCurrentValue4] = useState(0);

  const update =
    (setter: (value: number) => void) =>
    (event: InputNumberCorePackValueChangedEvent) => {
      setter(Number(event.detail.value ?? 0));
    };

  return (
    <div id="inputNumberCorePackMinMax">
      <p>
        This demonstrates how min and max work with step=0. Type a number outside of the 0-100 range to see an error.
      </p>
      <oj-c-input-number id="inputnumber-id1" min={0} max={100} step={0} value={currentValue1} labelHint="min=0, max=100, step=0" labelEdge="inside" maxWidth="md" onvalueChanged={update(setCurrentValue1)} />
      <div class="oj-sm-margin-4x-top oj-sm-margin-10x-bottom">
        <span>Current component value is:</span> <span>{currentValue1}</span>
      </div>

      <p>
        This demonstrates how min and max work with step=1. Use the up/down or +/- buttons to change the value.
      </p>
      <oj-c-input-number id="inputnumber-id2" min={0} max={100} step={1} value={currentValue2} labelHint="min=0, max=100, step=1" labelEdge="inside" maxWidth="md" onvalueChanged={update(setCurrentValue2)} />
      <div class="oj-sm-margin-4x-top">
        <oj-c-input-number id="inputnumber-id4" min={0} max={100} step={1} stepperVariant="quantitative" value={currentValue4} labelHint="min=0, max=100, step=1" labelEdge="inside" maxWidth="md" onvalueChanged={update(setCurrentValue4)} />
      </div>
      <div class="oj-sm-margin-10x-top">
        <p>This demonstrates that the up and down buttons step the value by the step size.</p>
        <oj-c-input-number id="inputnumber-id3" min={0} max={100} step={10} value={currentValue3} labelHint="min=0, max=100, step=10" labelEdge="inside" maxWidth="md" onvalueChanged={update(setCurrentValue3)} />
      </div>
    </div>
  );
}
