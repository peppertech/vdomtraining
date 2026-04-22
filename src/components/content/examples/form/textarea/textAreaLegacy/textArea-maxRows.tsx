import "ojs/ojinputtext";
import "ojs/ojlabel";
import "ojs/ojformlayout";

import {
  autoGrowSampleValue,
  fixedMaxRowsSampleValue,
  sampleValue,
} from "./textArea-shared";

export default function TextAreaMaxRowsExample() {
  return (
    <oj-form-layout maxColumns={1} labelEdge="inside">
      <oj-text-area
        labelHint="maxRows = 0"
        value={sampleValue}
        rows={3}
        maxRows={0}
      />
      <oj-text-area
        labelHint="maxRows = -1"
        value={autoGrowSampleValue}
        rows={3}
        maxRows={-1}
      />
      <oj-text-area
        labelHint="maxRows = 5"
        value={fixedMaxRowsSampleValue}
        rows={3}
        maxRows={5}
      />
    </oj-form-layout>
  );
}
