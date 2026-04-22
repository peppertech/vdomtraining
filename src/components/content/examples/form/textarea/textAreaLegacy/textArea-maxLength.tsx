import { useState } from "preact/hooks";
import "ojs/ojinputtext";
import "ojs/ojlabel";
import "ojs/ojformlayout";

import {
  lengthConfig,
  type TextAreaValueChangedEvent,
} from "./textArea-shared";

export default function TextAreaMaxLengthExample() {
  const [value, setValue] = useState("");

  return (
    <div>
      <oj-form-layout maxColumns={1} labelEdge="inside">
        <oj-text-area
          id="text-area-max-length-demo"
          labelHint="Limited input"
          value={value}
          rows={4}
          length={lengthConfig}
          onvalueChanged={(event: TextAreaValueChangedEvent) =>
            setValue(event.detail.value)
          }
        />
      </oj-form-layout>

      <div class="oj-sm-margin-4x-top oj-typography-body-sm">
        Entered characters: {value.length}
      </div>
    </div>
  );
}
