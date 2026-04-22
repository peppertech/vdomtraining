import { useCallback, useState } from "preact/hooks";
import "oj-c/radioset";
import "oj-c/rich-checkboxset";

import {
  avatarOptions,
  controlStateOptions,
  type RadiosetValueChangedEvent,
  type RichCheckboxsetValueChangedEvent,
} from "./richCheckBoxsetCorePack-shared";

export default function RichCheckBoxsetCorePackUserAssistanceExample() {
  const [currentInsideEmployee, setCurrentInsideEmployee] = useState<string[]>([
    "benalamore",
  ]);
  const [currentTopEmployee, setCurrentTopEmployee] = useState<string[]>([
    "benalamore",
  ]);
  const [currentStartEmployee, setCurrentStartEmployee] = useState<string[]>([
    "benalamore",
  ]);
  const [controlState, setControlState] = useState("enabled");

  const handleStateChanged = useCallback(
    (event: RadiosetValueChangedEvent) => {
      setControlState(String(event.detail.value));
    },
    [],
  );

  const updateInside = useCallback((event: RichCheckboxsetValueChangedEvent) => {
    setCurrentInsideEmployee(
      (event.detail.value as string[] | null | undefined) ?? [],
    );
  }, []);

  const updateTop = useCallback((event: RichCheckboxsetValueChangedEvent) => {
    setCurrentTopEmployee((event.detail.value as string[] | null | undefined) ?? []);
  }, []);

  const updateStart = useCallback((event: RichCheckboxsetValueChangedEvent) => {
    setCurrentStartEmployee(
      (event.detail.value as string[] | null | undefined) ?? [],
    );
  }, []);

  return (
    <div id="form-container">
      <div class="oj-panel oj-bg-info-30 oj-sm-margin-4x-bottom">
        <oj-c-radioset
          labelHint="State"
          direction="row"
          value={controlState}
          options={controlStateOptions}
          onvalueChanged={handleStateChanged}
        />
      </div>
      <div id="checkboxset-container">
        <div class="oj-sm-padding-10x-bottom">
          <oj-c-rich-checkboxset
            layout="sm"
            labelHint="Inside Label (default) With Assistive Text"
            help={{ instruction: "help instruction" }}
            helpHints={{
              definition: "Select an employee.",
              source: "https://www.oracle.com/",
            }}
            disabled={controlState === "disabled"}
            readonly={controlState === "readonly"}
            options={avatarOptions}
            value={currentInsideEmployee}
            onvalueChanged={updateInside}
          />
        </div>
        <div class="oj-sm-padding-10x-bottom">
          <oj-c-rich-checkboxset
            layout="sm"
            labelHint="Top Label With Assistive Text"
            helpHints={{
              definition: "Select an employee.",
              source: "https://www.oracle.com/",
            }}
            labelEdge="top"
            disabled={controlState === "disabled"}
            readonly={controlState === "readonly"}
            options={avatarOptions}
            value={currentTopEmployee}
            onvalueChanged={updateTop}
          />
        </div>
        <div class="oj-sm-padding-10x-bottom">
          <oj-c-rich-checkboxset
            layout="sm"
            labelHint="Start Label With Assistive Text"
            helpHints={{
              definition: "Select an employee.",
              source: "https://www.oracle.com/",
            }}
            labelEdge="start"
            disabled={controlState === "disabled"}
            readonly={controlState === "readonly"}
            options={avatarOptions}
            value={currentStartEmployee}
            onvalueChanged={updateStart}
          />
        </div>
      </div>
    </div>
  );
}
