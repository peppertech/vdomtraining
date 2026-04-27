import { h } from "preact";
import "ojs/ojformlayout";
import "ojs/ojinputtext";
import "css!./inputPassword.css";

export default function InputPasswordStylingExample() {
  return (
    <div id="inputPasswordStyling">
      <oj-form-layout direction="row" maxColumns={2}>
        <oj-input-password
          id="inputpwd"
          value="mypassword"
          labelHint="default input password"
        />
        <oj-input-password
          id="inputpwd2"
          class="demo-text-field-info"
          value="mypassword"
          labelHint="customized input password"
        />
      </oj-form-layout>
    </div>
  );
}
