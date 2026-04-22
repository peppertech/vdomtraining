import { useCallback, useMemo, useRef, useState } from "preact/hooks";
import "oj-c/button";
import "oj-c/checkboxset";

import {
  colorOptions,
  createColorDataProvider,
  type CheckboxsetRef,
  type CheckboxsetValueChangedEvent,
} from "./checkBoxSetCorePack-shared";

export default function CheckBoxSetCorePackValidationExample() {
  const dataProvider = useMemo(() => createColorDataProvider(colorOptions), []);
  const checkboxsetRef = useRef<CheckboxsetRef | null>(null);
  const [currentColor, setCurrentColor] = useState<string[]>(["red"]);

  const handleValueChanged = useCallback(
    (event: CheckboxsetValueChangedEvent) => {
      setCurrentColor(event.detail.value ?? []);
    },
    [],
  );

  const setCurrentColorToNothing = useCallback(() => {
    setCurrentColor([]);
  }, []);

  const validateRequired = useCallback(() => {
    checkboxsetRef.current?.validate();
  }, []);

  return (
    <div id="checkboxset-container">
      <oj-c-checkboxset
        ref={checkboxsetRef}
        id="checkboxSetId"
        labelHint="Colors"
        labelEdge="inside"
        value={currentColor}
        options={dataProvider}
        required={true}
        onvalueChanged={handleValueChanged}
      />

      <div class="oj-sm-margin-3x-vertical">
        <strong>Current component value is</strong>
        <div class="oj-sm-margin-1x-top">
          {currentColor.length ? currentColor.join(", ") : "Nothing selected"}
        </div>
      </div>

      <div class="oj-sm-margin-2x-vertical">
        <oj-c-button
          label="Set color to nothing"
          onojAction={setCurrentColorToNothing}
        />
        <oj-c-button label="Validate" onojAction={validateRequired} />
      </div>
    </div>
  );
}
