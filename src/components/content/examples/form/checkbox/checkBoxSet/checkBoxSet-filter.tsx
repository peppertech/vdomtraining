import "ojs/ojcheckboxset";
import "ojs/ojformlayout";
import 'preact';
import { useState } from "preact/hooks";
import { filterOptions,type CheckboxsetValueChangedEvent } from "./checkBoxSet-shared";

export default function CheckBoxSetFilterExample() {
  const [currentColor, setCurrentColor] = useState<string[]>(["red"]);

  return (
    <div>
      <oj-form-layout>
        <oj-checkboxset
          labelHint="Color Filter"
          value={currentColor}
          onvalueChanged={(event: CheckboxsetValueChangedEvent) => {
            setCurrentColor((event.detail.value as string[]) ?? []);
          }}
        >
          {filterOptions.map((option) => (
            <oj-option key={option.value} value={option.value}>
              {option.label} ({option.count})
            </oj-option>
          ))}
        </oj-checkboxset>
      </oj-form-layout>
    </div>
  );
}
