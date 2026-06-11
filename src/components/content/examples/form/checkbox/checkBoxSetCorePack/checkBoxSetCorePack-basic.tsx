import { useCallback, useMemo, useState } from "preact/hooks";
import "oj-c/button";
import "oj-c/checkboxset";

import {
  colorOptions,
  createColorDataProvider,
  type CheckboxsetValueChangedEvent,
} from "./checkBoxSetCorePack-shared";

export default function CheckBoxSetCorePackBasicExample() {
  const dataProvider = useMemo(() => createColorDataProvider(colorOptions), []);
  const [currentColor, setCurrentColor] = useState<string[]>(["red"]);

  const handleValueChanged = useCallback(
    (event: CheckboxsetValueChangedEvent) => {
      setCurrentColor((event.detail.value as string[] | null | undefined) ?? []);
    },
    [],
  );

  const setModelCurrentColorToBlue = useCallback(() => {
    setCurrentColor(["blue"]);
  }, []);

  return (
    <div id="form-container">
      <div class="oj-panel oj-bg-info-30 oj-sm-margin-4x-bottom">
        <oj-c-button
          label="Set model currentColor to blue"
          onojAction={setModelCurrentColorToBlue}
        />
      </div>

      <oj-c-checkboxset
        id="checkboxsetBasicDemoId"
        labelHint="Colors"
        labelEdge="inside"
        options={dataProvider}
        value={currentColor}
        onvalueChanged={handleValueChanged}
      />

      <div class="oj-sm-margin-3x-vertical">
        <strong>Current component value is</strong>
        <div class="oj-sm-margin-1x-top">
          {currentColor.length ? currentColor.join(", ") : "Nothing selected"}
        </div>
      </div>
    </div>
  );
}
