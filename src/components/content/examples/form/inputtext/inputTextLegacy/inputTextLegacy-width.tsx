import { h } from "preact";
import "ojs/ojformlayout";
import "ojs/ojinputtext";

export default function InputTextLegacyWidthExample() {
  return (
    <div>
      <h6>max width classes</h6>
      <oj-form-layout>
        <oj-input-text
          labelHint="oj-form-control-max-width-sm"
          value="text"
          class="oj-form-control-max-width-sm"
        ></oj-input-text>
        <oj-input-text
          labelHint="oj-form-control-max-width-md"
          value="text"
          class="oj-form-control-max-width-md"
        ></oj-input-text>
      </oj-form-layout>

      <hr />
      <h6>width classes</h6>
      <oj-form-layout>
        <oj-input-text
          labelHint="oj-form-control-width-sm"
          value="text"
          class="oj-form-control-width-sm"
        ></oj-input-text>
        <oj-input-text
          labelHint="oj-form-control-width-md"
          value="text"
          class="oj-form-control-width-md"
        ></oj-input-text>
      </oj-form-layout>

      <hr />
      <h6>custom classes</h6>
      <oj-form-layout>
        <oj-input-text
          labelHint="class sets max-width: 25rem;"
          value="text"
          class="demo-rem-max-width"
        ></oj-input-text>
        <oj-input-text
          labelHint="class sets width: 50%"
          value="text"
          class="demo-percentage-width"
        ></oj-input-text>
      </oj-form-layout>
    </div>
  );
}
