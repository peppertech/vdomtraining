import { h, type ComponentProps } from 'preact';
import { useState } from "preact/hooks";
import "oj-c/form-layout";
import "oj-c/input-number";
import {
  noGroupingNumberConverter,
  type InputNumberCorePackValueChangedEvent,
} from "./inputNumberCorePack-shared";

export default function InputNumberCorePackVirtualKeyboardExample() {
  const [currentValue1, setCurrentValue1] = useState<number | null>(1100);
  const [currentValue1a, setCurrentValue1a] = useState<number | null>(2100);
  const [currentValue2, setCurrentValue2] = useState<number | null>(3100);
  const [currentValue3, setCurrentValue3] = useState<number | null>(4100);

  const update =
    (setter: (value: number | null) => void) =>
    (event: InputNumberCorePackValueChangedEvent) => {
      setter(event.detail.value ?? null);
    };

  return (
    <div id="inputNumberCorePackVirtualKeyboard">
      <oj-c-form-layout id="fl1">
        <oj-c-input-number
          id="inputnumber1"
          value={currentValue1}
          labelHint={'virtual-keyboard="auto" (default), default converter'}
          onvalueChanged={update(setCurrentValue1)}
        />
        <oj-c-input-number
          id="inputnumber1a"
          value={currentValue1a}
          converter={noGroupingNumberConverter as ComponentProps<'oj-c-input-number'>['converter']}
          labelHint={'virtual-keyboard="auto", nogrouping converter'}
          onvalueChanged={update(setCurrentValue1a)}
        />
        <oj-c-input-number
          id="inputnumber2"
          value={currentValue2}
          virtualKeyboard="number"
          converter={noGroupingNumberConverter as ComponentProps<'oj-c-input-number'>['converter']}
          labelHint={'virtual-keyboard="number", nogrouping converter'}
          onvalueChanged={update(setCurrentValue2)}
        />
        <oj-c-input-number
          id="inputnumber3"
          value={currentValue3}
          virtualKeyboard="text"
          labelHint={'virtual-keyboard="text"'}
          onvalueChanged={update(setCurrentValue3)}
        />
      </oj-c-form-layout>
    </div>
  );
}
