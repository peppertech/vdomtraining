import { useState } from "preact/hooks";
import "ojs/ojinputtext";
import "ojs/ojlabel";
import "ojs/ojformlayout";

import {
  multilineSampleValue,
  type TextAreaValueChangedEvent,
} from "./textArea-shared";

export default function TextAreaBindingExample() {
  const [value, setValue] = useState(multilineSampleValue);

  return (
    <div>
      <oj-form-layout maxColumns={1} labelEdge="inside">
        <oj-text-area
          labelHint="Comments"
          value={value}
          rows={4}
          onvalueChanged={(event: TextAreaValueChangedEvent) =>
            setValue(event.detail.value)
          }
        />
      </oj-form-layout>

      <div class="oj-sm-margin-4x-top">
        <div class="oj-typography-body-sm oj-text-color-secondary">
          Current value
        </div>
        <pre
          class="oj-sm-margin-2x-top oj-sm-padding-3x oj-panel"
          style="white-space: pre-wrap; margin: 0;"
        >
          {value || "No text entered yet."}
        </pre>
      </div>
    </div>
  );
}
