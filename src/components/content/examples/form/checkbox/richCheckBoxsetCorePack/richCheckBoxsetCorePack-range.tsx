import "oj-c/form-layout";
import "oj-c/rich-checkboxset";
import { useCallback,useState } from "preact/hooks";

import {
  avatarOptions,
  type RichCheckboxsetValueChangedEvent,
} from "./richCheckBoxsetCorePack-shared";

export default function RichCheckBoxsetCorePackRangeExample() {
  const [value, setValue] = useState<string[]>([]);
  const [requiredValue, setRequiredValue] = useState<string[]>([]);

  const handleValueChanged = useCallback(
    (event: RichCheckboxsetValueChangedEvent) => {
      setValue((event.detail.value as string[] | null | undefined) ?? []);
    },
    [],
  );

  const handleRequiredValueChanged = useCallback(
    (event: RichCheckboxsetValueChangedEvent) => {
      setRequiredValue((event.detail.value as string[] | null | undefined) ?? []);
    },
    [],
  );

  return (
    <div id="form-container">
      <oj-c-form-layout direction="row" fullWidth>
        <oj-c-rich-checkboxset
          layout="sm"
          value={value}
          options={avatarOptions}
          labelHint="Range Selection, (min-selected=2 and max-selected=3)"
          labelEdge="top"
          help={{ instruction: "Select 2 to 3 employees." }}
          minSelected={2}
          maxSelected={3}
          onvalueChanged={handleValueChanged}
        />

        <div class="oj-sm-margin-1x-vertical">
          <span>Current component value is: </span>
          <span>{value.join(", ") || "Nothing selected"}</span>
        </div>

        <div class="oj-sm-margin-6x-bottom"></div>

        <oj-c-rich-checkboxset
          layout="sm"
          value={requiredValue}
          options={avatarOptions}
          labelHint="Required With Range Selection, (min-selected=2 and max-selected=3)"
          labelEdge="top"
          help={{ instruction: "Select 2 to 3 employees." }}
          minSelected={2}
          maxSelected={3}
          required={true}
          onvalueChanged={handleRequiredValueChanged}
        />

        <div class="oj-sm-margin-1x-vertical">
          <span>Current required component value is: </span>
          <span>{requiredValue.join(", ") || "Nothing selected"}</span>
        </div>
      </oj-c-form-layout>
    </div>
  );
}
