import { h } from "preact";
import { useRef, useState } from "preact/hooks";
import "ojs/ojbutton";
import "ojs/ojlabel";
import "ojs/ojlabelvalue";
import "ojs/ojoption";
import "ojs/ojradioset";
import {
  colorOptions,
  renderRadioOptions,
  type RadiosetValueChangedEvent,
} from "./radioset-shared";

export default function RadiosetValidationExample() {
  const [currentColor, setCurrentColor] = useState<string | null>("red");
  const radiosetRef = useRef<any>(null);

  return (
    <div>
      <oj-radioset
        ref={radiosetRef}
        id="radiosetValidationDemoId"
        labelHint="Colors"
        labelEdge="inside"
        required
        value={currentColor}
        onvalueChanged={(event: RadiosetValueChangedEvent) => {
          setCurrentColor((event.detail.value as string | null) ?? null);
        }}
      >
        {renderRadioOptions(colorOptions)}
      </oj-radioset>

      <div class="oj-sm-margin-3x-vertical">
        <oj-label-value>
          <oj-label slot="label">Current component value is</oj-label>
          <span slot="value">{currentColor ?? "null"}</span>
        </oj-label-value>
      </div>

      <div class="oj-sm-margin-2x-vertical">
        <oj-button
          onojAction={() => {
            setCurrentColor("foo");
          }}
        >
          Set color to foo
        </oj-button>
        <oj-button
          onojAction={() => {
            setCurrentColor(null);
          }}
        >
          Set color to null
        </oj-button>
        <oj-button
          onojAction={() => {
            radiosetRef.current?.validate?.();
          }}
        >
          Validate
        </oj-button>
      </div>
    </div>
  );
}
