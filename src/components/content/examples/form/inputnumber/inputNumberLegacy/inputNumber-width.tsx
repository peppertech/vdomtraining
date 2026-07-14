import "css!./inputNumber.css";
import "ojs/ojformlayout";
import "ojs/ojinputnumber";
import 'preact';

export default function InputNumberWidthExample() {
  return (
    <div id="inputNumberWidth">
      <h6>max width classes</h6>

      <oj-form-layout>
        <oj-input-number
          id="inputcontrol"
          value={5}
          labelHint="oj-form-control-max-width-sm"
          class="oj-form-control-max-width-sm"
        />

        <oj-input-number
          id="inputcontrol1"
          value={5}
          labelHint="oj-form-control-max-width-md"
          class="oj-form-control-max-width-md"
        />
      </oj-form-layout>

      <hr />

      <h6>width classes</h6>

      <oj-form-layout>
        <oj-input-number
          id="inputcontrol2"
          value={5}
          labelHint="oj-form-control-width-sm"
          class="oj-form-control-width-sm"
        />

        <oj-input-number
          id="inputcontrol3"
          value={5}
          labelHint="oj-form-control-width-md"
          class="oj-form-control-width-md"
        />
      </oj-form-layout>

      <hr />
      <h6>custom classes</h6>
      <oj-form-layout>
        <oj-input-number
          id="inputcontrol4"
          value={5}
          labelHint="class with max-width: 25rem"
          class="demo-rem-max-width"
        />

        <oj-input-number
          id="inputcontrol5"
          value={5}
          labelHint="class with width: 50%"
          class="demo-percentage-width"
        />
      </oj-form-layout>
    </div>
  );
}
