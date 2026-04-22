import "oj-c/form-layout";
import "oj-c/text-area";

import { longValue } from "./textAreaCorePack-shared";

export default function TextAreaCorePackResizeExample() {
  return (
    <oj-c-form-layout>
      <oj-c-text-area
        value={longValue}
        labelHint="This text area has the default resize-behavior of 'none'"
      />
      <oj-c-text-area
        value={longValue}
        resizeBehavior="both"
        labelHint="This text area has resize-behavior of 'both'"
      />
      <oj-c-text-area
        value={longValue}
        resizeBehavior="horizontal"
        labelHint="This text area has resize-behavior of 'horizontal'"
      />
      <oj-c-text-area
        value={longValue}
        resizeBehavior="vertical"
        labelHint="This text area has resize-behavior of 'vertical'"
      />
    </oj-c-form-layout>
  );
}
