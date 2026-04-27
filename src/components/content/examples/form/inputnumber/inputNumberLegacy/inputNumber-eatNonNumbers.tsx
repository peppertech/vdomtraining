import { h } from "preact";
import { useCallback, useState } from "preact/hooks";
import "ojs/ojinputnumber";
import { type InputNumberValueChangedEvent } from "./inputNumber-shared";

export default function InputNumberEatNonNumbersExample() {
  const [currentValue, setCurrentValue] = useState(30);

  const eatNonNumbers = useCallback((event: KeyboardEvent) => {
    const charCode = event.which ? event.which : event.keyCode;
    const char = String.fromCharCode(charCode);
    const replacedValue = char.replace(/[^0-9.]/g, "");
    if (char !== replacedValue) {
      event.preventDefault();
    }
  }, []);

  return (
    <div id="inputNumberEatNonNumbers">
      <oj-input-number
        id="inputnumber-id"
        value={currentValue}
        onKeyPress={eatNonNumbers}
        labelHint="Eat Non-numbers"
        labelEdge="inside"
        onvalueChanged={(event: InputNumberValueChangedEvent) => {
          setCurrentValue(Number(event.detail.value ?? 0));
        }}
      />
      <div class="oj-sm-margin-4x-vertical">
        <span>Current component value is:</span> <span>{currentValue}</span>
      </div>
    </div>
  );
}
