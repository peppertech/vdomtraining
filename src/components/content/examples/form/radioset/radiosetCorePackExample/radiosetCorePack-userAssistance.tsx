import { h } from "preact";
import { useCallback, useState } from "preact/hooks";
import "oj-c/radioset";
import {
  colorOptionsWithAssistance,
  controlStateOptions,
  type RadiosetValueChangedEvent,
} from "./radiosetCorePack-shared";

export default function RadiosetCorePackUserAssistanceExample() {
  const [currentColor, setCurrentColor] = useState("red");
  const [controlState, setControlState] = useState("enabled");

  const handleValueChanged = useCallback((event: RadiosetValueChangedEvent) => {
    setCurrentColor(String(event.detail.value ?? ""));
  }, []);

  const handleStateChanged = useCallback((event: RadiosetValueChangedEvent) => {
    setControlState(String(event.detail.value ?? "enabled"));
  }, []);

  const isDisabled =
    controlState !== "enabled" && controlState !== "readonly";
  const isReadonly =
    controlState !== "enabled" && controlState !== "disabled";

  return (
    <div id="form-container">
      <div class="oj-panel oj-bg-info-30 oj-sm-margin-4x-bottom">
        <oj-c-radioset
          aria-controls="radiosetBasicDemoIdInside radiosetBasicDemoIdTop radiosetBasicDemoIdStart radiosetBasicDemoIdRow"
          labelHint="State"
          direction="row"
          id="radiosetControlId"
          value={controlState}
          options={controlStateOptions}
          onvalueChanged={handleStateChanged}
        />
      </div>

      <div id="radioset-container">
        <div>
          <h5>Inside Label (default)</h5>
          <oj-c-radioset
            id="radiosetBasicDemoIdInside"
            labelHint="With Assistive Text"
            help={{ instruction: "help instruction" }}
            helpHints={{
              definition: "Select your favorite color.",
              source: "https://en.wikipedia.org/wiki/Lists_of_colors",
            }}
            disabled={isDisabled}
            readonly={isReadonly}
            options={colorOptionsWithAssistance}
            value={currentColor}
            onvalueChanged={handleValueChanged}
          />
        </div>

        <div>
          <h5>Top Label</h5>
          <oj-c-radioset
            id="radiosetBasicDemoIdTop"
            labelHint="With Assistive Text"
            helpHints={{
              definition: "Select your favorite color.",
              source: "https://en.wikipedia.org/wiki/Lists_of_colors",
            }}
            labelEdge="top"
            disabled={isDisabled}
            readonly={isReadonly}
            options={colorOptionsWithAssistance}
            value={currentColor}
            onvalueChanged={handleValueChanged}
          />
        </div>

        <div>
          <h5>Start Label</h5>
          <oj-c-radioset
            id="radiosetBasicDemoIdStart"
            labelHint="With Assistive Text"
            labelEdge="start"
            helpHints={{
              definition: "Select your favorite color.",
              source: "https://en.wikipedia.org/wiki/Lists_of_colors",
              sourceText: "Explore",
            }}
            disabled={isDisabled}
            readonly={isReadonly}
            options={colorOptionsWithAssistance}
            value={currentColor}
            onvalueChanged={handleValueChanged}
          />
        </div>

        <div>
          <h5>Row Direction</h5>
          <oj-c-radioset
            id="radiosetBasicDemoIdRow"
            direction="row"
            labelHint="With Assistive Text"
            helpHints={{
              definition: "Select your favorite color.",
              source: "https://en.wikipedia.org/wiki/Lists_of_colors",
              sourceText: "See more",
            }}
            disabled={isDisabled}
            readonly={isReadonly}
            labelEdge="top"
            options={colorOptionsWithAssistance}
            value={currentColor}
            onvalueChanged={handleValueChanged}
          />
        </div>
      </div>
    </div>
  );
}
