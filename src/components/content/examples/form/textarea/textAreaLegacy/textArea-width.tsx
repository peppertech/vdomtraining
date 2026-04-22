import "ojs/ojinputtext";
import "ojs/ojlabel";
import "ojs/ojformlayout";

import { sampleValue } from "./textArea-shared";

export default function TextAreaWidthExample() {
  return (
    <div>
      <oj-form-layout maxColumns={1} labelEdge="inside">
        <oj-text-area
          class="oj-sm-width-full"
          labelHint="Full width"
          value={sampleValue}
          rows={3}
        />
      </oj-form-layout>

      <div class="oj-flex oj-sm-margin-4x-top oj-sm-column-gap-4x oj-sm-flex-wrap-wrap">
        <div class="oj-flex-item" style="max-width: 18rem; width: 100%;">
          <oj-text-area
            class="oj-sm-width-full"
            labelHint="Max width container"
            value={sampleValue}
            rows={3}
          />
        </div>
        <div class="oj-flex-item oj-sm-12 oj-md-6">
          <oj-text-area
            class="oj-sm-width-full"
            labelHint="Responsive width"
            value={sampleValue}
            rows={3}
          />
        </div>
      </div>
    </div>
  );
}
