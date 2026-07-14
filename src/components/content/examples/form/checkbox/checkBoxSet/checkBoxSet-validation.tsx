import "ojs/ojbutton";
import "ojs/ojcheckboxset";
import "ojs/ojlabel";
import "ojs/ojlabelvalue";
import 'preact';
import { useRef,useState } from "preact/hooks";
import {
  colorOptions,
  renderCheckboxOptions,
  type CheckboxsetValueChangedEvent,
} from "./checkBoxSet-shared";

type ValidatableElement = EventTarget & {
  validate?: () => Promise<unknown> | unknown;
};

export default function CheckBoxSetValidationExample() {
  const [currentColor, setCurrentColor] = useState<string[]>(["red"]);
  const checkboxsetRef = useRef<ValidatableElement | null>(null);

  return (
    <div>
      <oj-checkboxset
        ref={checkboxsetRef}
        id="checkboxSetId"
        labelHint="Colors"
        labelEdge="inside"
        value={currentColor}
        required
        onvalueChanged={(event: CheckboxsetValueChangedEvent) => {
          setCurrentColor((event.detail.value as string[]) ?? []);
        }}
      >
        {renderCheckboxOptions(colorOptions)}
      </oj-checkboxset>

      <div class="oj-sm-margin-3x-vertical">
        <oj-label-value>
          <oj-label slot="label">Current component value is</oj-label>
          <span slot="value">{currentColor.join(", ")}</span>
        </oj-label-value>
      </div>

      <div class="oj-sm-margin-2x-vertical">
        <oj-button
          onojAction={() => {
            setCurrentColor(["foo"]);
          }}
        >
          Set color to foo
        </oj-button>
        <oj-button
          onojAction={() => {
            setCurrentColor([]);
          }}
        >
          Set color to nothing
        </oj-button>
        <oj-button
          onojAction={() => {
            checkboxsetRef.current?.validate?.();
          }}
        >
          Validate
        </oj-button>
      </div>
    </div>
  );
}
