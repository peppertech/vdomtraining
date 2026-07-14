import "ojs/ojformlayout";
import "ojs/ojinputtext";
import "ojs/ojradioset";
import 'preact';
import { useMemo,useState } from "preact/hooks";
import { type RadiosetValueChangedEvent } from "./inputPassword-shared";

export default function InputPasswordTextAlignExample() {
  const [textAlign, setTextAlign] = useState("start");

  const textAlignClass = useMemo(() => {
    if (textAlign === "right") {
      return "oj-form-control-text-align-right";
    }
    if (textAlign === "end") {
      return "oj-form-control-text-align-end";
    }
    if (textAlign === "start") {
      return "oj-form-control-text-align-start";
    }
    return "";
  }, [textAlign]);

  return (
    <div id="inputPasswordTextAlign">
      <div class="oj-sm-margin-4x-bottom oj-panel oj-bg-info-30">
        <h6>Set oj-form-control-text-align-* class</h6>
        <oj-radioset
          id="textAlign"
          value={textAlign}
          labelHint="Text Alignment"
          onvalueChanged={(event: RadiosetValueChangedEvent) => {
            setTextAlign(String(event.detail.value ?? ""));
          }}
        >
          <oj-option value="start">start</oj-option>
          <oj-option value="right">right</oj-option>
          <oj-option value="end">end</oj-option>
          <oj-option value="">(none)</oj-option>
        </oj-radioset>
      </div>

      <oj-form-layout id="myform">
        <oj-input-password
          id="inputpwd"
          class={textAlignClass}
          value="mypassword"
          labelHint="Input Password"
          maskIcon="visible"
        />
      </oj-form-layout>
    </div>
  );
}
