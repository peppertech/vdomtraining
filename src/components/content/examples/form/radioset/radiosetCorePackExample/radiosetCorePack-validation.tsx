import "oj-c/button";
import "oj-c/radioset";
import "ojs/ojlabel";
import "ojs/ojlabelvalue";
import 'preact';
import { useCallback,useRef,useState } from "preact/hooks";
import {
  colorOptions,
  type RadiosetRef,
  type RadiosetValueChangedEvent,
} from "./radiosetCorePack-shared";

export default function RadiosetCorePackValidationExample() {
  const radiosetRef = useRef<RadiosetRef | null>(null);
  const [currentColor, setCurrentColor] = useState<string | null>("red");

  const handleValueChanged = useCallback((event: RadiosetValueChangedEvent) => {
    setCurrentColor((event.detail.value as string | null) ?? null);
  }, []);

  const validateRequired = useCallback(() => {
    radiosetRef.current?.validate();
  }, []);

  return (
    <div id="form-container">
      <div class="oj-panel oj-bg-info-30 oj-sm-margin-4x-bottom">
        <oj-c-button
          label="Set color to null"
          onojAction={() => {
            setCurrentColor(null);
          }}
        />
        <oj-c-button label="Validate" onojAction={validateRequired} />
      </div>

      <div id="radioset-container">
        <oj-c-radioset
          ref={radiosetRef}
          id="radiosetSetValidationDemoId"
          labelHint="Colors"
          labelEdge="top"
          required
          options={colorOptions}
          value={currentColor}
          requiredMessageDetail="A valid value must be specified"
          onvalueChanged={handleValueChanged}
        />

        <div class="oj-sm-margin-3x-vertical">
          <oj-label-value>
            <oj-label slot="label">Current component value is</oj-label>
            <span slot="value">{currentColor ?? "null"}</span>
          </oj-label-value>
        </div>
      </div>
    </div>
  );
}
