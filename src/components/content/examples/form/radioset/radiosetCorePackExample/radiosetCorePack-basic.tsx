import "oj-c/button";
import "oj-c/radioset";
import "ojs/ojlabel";
import "ojs/ojlabelvalue";
import 'preact';
import { useCallback,useState } from "preact/hooks";
import { colorOptions,type RadiosetValueChangedEvent } from "./radiosetCorePack-shared";

export default function RadiosetCorePackBasicExample() {
  const [currentColor, setCurrentColor] = useState("red");

  const handleValueChanged = useCallback((event: RadiosetValueChangedEvent) => {
    setCurrentColor(String(event.detail.value ?? ""));
  }, []);

  return (
    <div id="form-container">
      <div class="oj-panel oj-bg-info-30 oj-sm-margin-4x-bottom">
        <oj-c-button
          label="Set model currentColor to blue"
          onojAction={() => {
            setCurrentColor("blue");
          }}
        />
      </div>

      <div id="radioset-container">
        <oj-c-radioset
          id="radiosetBasicDemoId"
          labelHint="Colors"
          labelEdge="inside"
          options={colorOptions}
          value={currentColor}
          onvalueChanged={handleValueChanged}
        />

        <div class="oj-sm-margin-3x-vertical">
          <oj-label-value>
            <oj-label slot="label">Current component value is</oj-label>
            <span slot="value">{currentColor}</span>
          </oj-label-value>
        </div>
      </div>
    </div>
  );
}
