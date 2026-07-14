import "oj-c/collapsible";
import "oj-c/radioset";
import 'preact';
import type { ComponentProps } from "preact";
import { useState } from "preact/hooks";

type IconPosition = "start" | "end";
type RadiosetValueChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-radioset">["onvalueChanged"]>
>[0];

const iconPositionOptions: Array<{ value: IconPosition; label: string }> = [
  { value: "start", label: "Start" },
  { value: "end", label: "End" }
];

export const CollapsibleIconPositioncorepack = () => {
  const [iconPosition, setIconPosition] = useState<IconPosition>("start");

  const handleValueChanged = (event: RadiosetValueChangedEvent) => {
    setIconPosition((event.detail.value as IconPosition | null) ?? "start");
  };

  return (
    <div id="collapsiblePage">
      <div id="formId">
        <oj-c-radioset
          id="radiosetSetValidationDemoId"
          labelHint="Icon Position"
          labelEdge="inside"
          options={iconPositionOptions}
          required
          value={iconPosition}
          onvalueChanged={handleValueChanged}
        />
        <oj-c-collapsible id="c1" iconPosition={iconPosition}>
          <h3 id="h" slot="header">
            Header 3
          </h3>
          <p id="c">I&apos;m a Collapsible.</p>
        </oj-c-collapsible>
      </div>
    </div>
  );
};

export default CollapsibleIconPositioncorepack;
