import { h } from "preact";
import "ojs/ojformlayout";
import "ojs/ojinputtext";
import "css!./inputPassword.css";

export default function InputPasswordWidthExample() {
  return (
    <div id="inputPasswordWidth">
      <h6>max width classes</h6>

      <oj-form-layout>
        <oj-input-password
          id="password1"
          labelHint="oj-form-control-max-width-sm"
          maskIcon="visible"
          value="text"
          class="oj-form-control-max-width-sm"
        />

        <oj-input-password
          id="password2"
          labelHint="oj-form-control-max-width-md"
          maskIcon="visible"
          value="text"
          class="oj-form-control-max-width-md"
        />
      </oj-form-layout>

      <hr />

      <h6>width classes</h6>

      <oj-form-layout>
        <oj-input-password
          labelHint="oj-form-control-width-sm"
          maskIcon="visible"
          value="passW0rd!"
          class="oj-form-control-width-sm"
        />

        <oj-input-password
          labelHint="oj-form-control-width-md"
          maskIcon="visible"
          value="passW0rd!"
          class="oj-form-control-width-md"
        />
      </oj-form-layout>

      <hr />

      <h6>custom classes</h6>

      <oj-form-layout>
        <oj-input-password
          labelHint="class sets max-width: 25rem;"
          maskIcon="visible"
          value="passW0rd!"
          class="demo-rem-max-width"
        />
        <oj-input-password
          labelHint="class sets width: 50%;"
          maskIcon="visible"
          value="passW0rd!"
          class="demo-percentage-width"
        />
      </oj-form-layout>
    </div>
  );
}
