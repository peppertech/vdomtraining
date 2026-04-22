import { useCallback, useMemo, useState } from "preact/hooks";
import "oj-c/checkboxset";
import "oj-c/radioset";

import {
  colorOptionsWithAssistance,
  createColorDataProvider,
  controlStateOptions,
  type CheckboxsetValueChangedEvent,
  type RadiosetValueChangedEvent,
} from "./checkBoxSetCorePack-shared";

export default function CheckBoxSetCorePackUserAssistanceExample() {
  const dataProvider = useMemo(
    () => createColorDataProvider(colorOptionsWithAssistance),
    [],
  );
  const [currentColor, setCurrentColor] = useState<string[]>(["red"]);
  const [controlState, setControlState] = useState("enabled");

  const handleValueChanged = useCallback(
    (event: CheckboxsetValueChangedEvent) => {
      setCurrentColor(event.detail.value ?? []);
    },
    [],
  );

  const handleStateChanged = useCallback(
    (event: RadiosetValueChangedEvent) => {
      setControlState(String(event.detail.value));
    },
    [],
  );

  const isDisabled =
    controlState !== "enabled" && controlState !== "readonly";
  const isReadonly =
    controlState !== "enabled" && controlState !== "disabled";

  return (
    <div id="form-container">
      <div class="oj-panel oj-bg-info-30 oj-sm-margin-4x-bottom">
        <oj-c-radioset
          aria-controls="checkboxsetBasicDemoIdInside checkboxsetBasicDemoIdTop checkboxsetBasicDemoIdStart checkboxsetBasicDemoIdRow"
          labelHint="State"
          direction="row"
          value={controlState}
          options={controlStateOptions}
          onvalueChanged={handleStateChanged}
        />
      </div>

      <div id="checkboxset-container">
        <div>
          <h5>Inside Label (default)</h5>
          <oj-c-checkboxset
            id="checkboxsetBasicDemoIdInside"
            labelHint="With Assistive Text"
            help={{ instruction: "help instruction" }}
            helpHints={{
              definition: "Select your favorite color.",
              source: "https://en.wikipedia.org/wiki/Lists_of_colors",
            }}
            disabled={isDisabled}
            readonly={isReadonly}
            options={dataProvider}
            value={currentColor}
            onvalueChanged={handleValueChanged}
          />
        </div>

        <div>
          <h5>Top Label</h5>
          <oj-c-checkboxset
            id="checkboxsetBasicDemoIdTop"
            labelHint="With Assistive Text"
            labelEdge="top"
            helpHints={{
              definition: "Select your favorite color.",
              source: "https://en.wikipedia.org/wiki/Lists_of_colors",
            }}
            disabled={isDisabled}
            readonly={isReadonly}
            options={dataProvider}
            value={currentColor}
            onvalueChanged={handleValueChanged}
          />
        </div>

        <div>
          <h5>Start Label</h5>
          <oj-c-checkboxset
            id="checkboxsetBasicDemoIdStart"
            labelHint="With Assistive Text"
            labelEdge="start"
            helpHints={{
              definition: "Select your favorite color.",
              source: "https://en.wikipedia.org/wiki/Lists_of_colors",
              sourceText: "Explore",
            }}
            disabled={isDisabled}
            readonly={isReadonly}
            options={dataProvider}
            value={currentColor}
            onvalueChanged={handleValueChanged}
          />
        </div>

        <div>
          <h5>Row Direction</h5>
          <oj-c-checkboxset
            id="checkboxsetBasicDemoIdRow"
            direction="row"
            labelHint="With Assistive Text"
            labelEdge="top"
            helpHints={{
              definition: "Select your favorite color.",
              source: "https://en.wikipedia.org/wiki/Lists_of_colors",
              sourceText: "See more",
            }}
            disabled={isDisabled}
            readonly={isReadonly}
            options={dataProvider}
            value={currentColor}
            onvalueChanged={handleValueChanged}
          />
        </div>
      </div>
    </div>
  );
}
