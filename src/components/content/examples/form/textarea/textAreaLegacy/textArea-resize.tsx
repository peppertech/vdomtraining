import "ojs/ojformlayout";
import "ojs/ojinputtext";
import "ojs/ojlabel";

import { sampleValue } from "./textArea-shared";

export default function TextAreaResizeExample() {
  return (
    <oj-form-layout maxColumns={2} labelEdge="inside" direction="row">
      <oj-text-area
        labelHint="Default resize behavior"
        value={sampleValue}
        rows={4}
      />
      <oj-text-area
        labelHint="resizeBehavior='both'"
        value={sampleValue}
        rows={4}
        resizeBehavior="both"
      />
      <oj-text-area
        labelHint="resizeBehavior='horizontal'"
        value={sampleValue}
        rows={4}
        resizeBehavior="horizontal"
      />
      <oj-text-area
        labelHint="resizeBehavior='vertical'"
        value={sampleValue}
        rows={4}
        resizeBehavior="vertical"
      />
    </oj-form-layout>
  );
}
