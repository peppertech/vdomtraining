import { h } from "preact";
import { useState } from "preact/hooks";
import "ojs/ojcheckboxset";
import { iconOptions, mixedIconOptions, renderCheckboxOptions, type CheckboxsetValueChangedEvent } from "./checkBoxSet-shared";

export default function CheckBoxSetIconsExample() {
  const [currentBrowsers, setCurrentBrowsers] = useState<string[]>(["Chrome"]);
  const [currentIcons, setCurrentIcons] = useState<string[]>(["iconFont"]);

  return (
    <div>
      <oj-checkboxset
        labelHint="Example of using images on checkbox labels"
        labelEdge="inside"
        value={currentBrowsers}
        onvalueChanged={(event: CheckboxsetValueChangedEvent) => {
          setCurrentBrowsers((event.detail.value as string[]) ?? []);
        }}
      >
        {renderCheckboxOptions(iconOptions)}
      </oj-checkboxset>
      <br />
      <span>Current component value is:</span>{" "}
      <span>{currentBrowsers.join(", ")}</span>
      <br />
      <oj-checkboxset
        labelHint="Example of different types of images"
        labelEdge="inside"
        value={currentIcons}
        onvalueChanged={(event: CheckboxsetValueChangedEvent) => {
          setCurrentIcons((event.detail.value as string[]) ?? []);
        }}
      >
        {renderCheckboxOptions(mixedIconOptions)}
      </oj-checkboxset>
      <br />
      <span>Current component value is:</span> <span>{currentIcons.join(", ")}</span>
    </div>
  );
}
