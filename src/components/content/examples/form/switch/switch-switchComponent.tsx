import { h } from "preact";
import { useState } from "preact/hooks";
import "ojs/ojswitch";

export default function SwitchComponentExample() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div id="formId" class="oj-sm-padding-2x-horizontal">
      <div class="oj-sm-margin-2x-vertical">
        <oj-switch
          id="switch"
          value={isChecked}
          labelEdge="inside"
          labelHint="switch component"
          onvalueChanged={(event: any) => {
            setIsChecked(Boolean(event.detail.value));
          }}
        />
      </div>

      <span>switch is {isChecked ? "ON" : "OFF"}</span>
    </div>
  );
}
