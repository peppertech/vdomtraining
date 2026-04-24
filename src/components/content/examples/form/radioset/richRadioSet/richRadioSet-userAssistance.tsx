import { h } from "preact";
import { useCallback, useState } from "preact/hooks";
import "oj-c/radioset";
import "oj-c/rich-radioset";
import {
  controlStateOptions,
  employeeOptions,
  type RadiosetValueChangedEvent,
  type RichRadiosetValueChangedEvent,
} from "./richRadioSet-shared";

export default function RichRadioSetUserAssistanceExample() {
  const [controlState, setControlState] = useState("enabled");
  const [currentInsideEmployee, setCurrentInsideEmployee] =
    useState("benalamore");
  const [currentTopEmployee, setCurrentTopEmployee] = useState("benalamore");
  const [currentStartEmployee, setCurrentStartEmployee] =
    useState("benalamore");

  const handleStateChanged = useCallback(
    (event: RadiosetValueChangedEvent) => {
      setControlState(String(event.detail.value ?? "enabled"));
    },
    [],
  );

  const toValueHandler =
    (setValue: (value: string) => void) =>
    (event: RichRadiosetValueChangedEvent) => {
      setValue(String(event.detail.value ?? ""));
    };

  const isDisabled = controlState === "disabled";
  const isReadonly = controlState === "readonly";

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
      <div id="radioset-container">
        <div class="oj-sm-padding-10x-bottom">
          <oj-c-rich-radioset
            layout="sm"
            id="radiosetBasicDemoIdInside"
            labelHint="Inside Label (default) With Assistive Text"
            help={{ instruction: "help instruction" }}
            helpHints={{
              definition: "Select an employee.",
              source: "https://www.oracle.com/",
            }}
            disabled={isDisabled}
            readonly={isReadonly}
            options={employeeOptions}
            value={currentInsideEmployee}
            onvalueChanged={toValueHandler(setCurrentInsideEmployee)}
          />
        </div>
        <div class="oj-sm-padding-10x-bottom">
          <oj-c-rich-radioset
            layout="sm"
            id="radiosetBasicDemoIdTop"
            labelHint="Top Label With Assistive Text"
            helpHints={{
              definition: "Select an employee.",
              source: "https://www.oracle.com/",
            }}
            labelEdge="top"
            disabled={isDisabled}
            readonly={isReadonly}
            options={employeeOptions}
            value={currentTopEmployee}
            onvalueChanged={toValueHandler(setCurrentTopEmployee)}
          />
        </div>
        <div class="oj-sm-padding-10x-bottom">
          <oj-c-rich-radioset
            layout="sm"
            id="radiosetBasicDemoIdStart"
            labelHint="Start Label With Assistive Text"
            helpHints={{
              definition: "Select an employee.",
              source: "https://www.oracle.com/",
            }}
            labelEdge="start"
            disabled={isDisabled}
            readonly={isReadonly}
            options={employeeOptions}
            value={currentStartEmployee}
            onvalueChanged={toValueHandler(setCurrentStartEmployee)}
          />
        </div>
      </div>
    </div>
  );
}
