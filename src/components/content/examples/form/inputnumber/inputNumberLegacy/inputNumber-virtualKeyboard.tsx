import { h } from "preact";
import "ojs/ojformlayout";
import "ojs/ojinputnumber";
import { noGroupingNumberConverter } from "./inputNumber-shared";

export default function InputNumberVirtualKeyboardExample() {
  return (
    <div id="inputNumberVirtualKeyboard">
      <oj-form-layout id="fl1">
        <oj-input-number
          id="inputnumber1"
          value={20}
          labelHint={'virtual-keyboard="auto" (default), default converter'}
          labelEdge="inside"
        />

        <oj-input-number
          id="inputnumber1a"
          value={20}
          converter={noGroupingNumberConverter}
          labelHint={'virtual-keyboard="auto", nogrouping converter'}
          labelEdge="inside"
        />

        <oj-input-number
          id="inputnumber2"
          value={20}
          virtualKeyboard="number"
          converter={noGroupingNumberConverter}
          labelHint={'virtual-keyboard="number", nogrouping converter'}
          labelEdge="inside"
        />

        <oj-input-number
          id="inputnumber3"
          value={20}
          virtualKeyboard="text"
          labelHint={'virtual-keyboard="text", default converter'}
          labelEdge="inside"
        />
      </oj-form-layout>
    </div>
  );
}
