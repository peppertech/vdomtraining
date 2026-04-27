import { h } from "preact";
import "ojs/ojformlayout";
import "ojs/ojinputnumber";
import "css!./inputNumber.css";

export default function InputNumberStylingExample() {
  return (
    <div id="inputNumberStyling">
      <oj-form-layout direction="row" maxColumns={2}>
        <oj-input-number
          value={12340}
          labelHint="default input number"
          min={0}
          max={100000}
          step={1}
        />
        <oj-input-number
          class="demo-text-field-info"
          value={12340}
          labelHint="customized input number"
          min={0}
          max={100000}
          step={1}
        />
      </oj-form-layout>
    </div>
  );
}
