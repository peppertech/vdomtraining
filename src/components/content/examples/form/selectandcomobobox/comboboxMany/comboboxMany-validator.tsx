import { h } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "ojs/ojselectcombobox";
import {
  createEmailDataProvider,
  multipleEmailValidator,
} from "./comboboxMany-shared";

export default function ComboboxManyValidatorExample() {
  const dataProvider = useMemo(() => createEmailDataProvider(), []);
  const [value, setValue] = useState<string[]>([]);

  const handleValueChanged = useCallback((event: any) => {
    setValue(event.detail.value ?? []);
  }, []);

  return (
    <div id="comboboxManyValidator">
      <oj-combobox-many
        value={value}
        labelHint="Email addresses"
        labelEdge="inside"
        options={dataProvider}
        validators={[multipleEmailValidator] as any}
        class="oj-form-control-max-width-xl"
        onvalueChanged={handleValueChanged}
      ></oj-combobox-many>

      <div class="oj-sm-margin-4x-top">
        <div>Current selected values</div>
        <span>{JSON.stringify(value)}</span>
      </div>
    </div>
  );
}
