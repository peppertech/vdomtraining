import { h } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "ojs/ojselectcombobox";
import {
  createGroupedEmployeeDataProvider,
  renderEmployeeCustomOption,
} from "./comboboxMany-shared";

export default function ComboboxManyCustomTemplateExample() {
  const dataProvider = useMemo(() => createGroupedEmployeeDataProvider(), []);
  const [value, setValue] = useState<string[]>(["11111", "10725"]);

  const handleValueChanged = useCallback((event: any) => {
    setValue(event.detail.value ?? []);
  }, []);

  return (
    <div id="comboboxManyCustomTemplate">
      <oj-combobox-many
        value={value}
        labelHint="Employees with custom renderer"
        labelEdge="inside"
        options={dataProvider}
        class="oj-form-control-max-width-xl"
        optionRenderer={renderEmployeeCustomOption as any}
        onvalueChanged={handleValueChanged}
      ></oj-combobox-many>

      <div class="oj-sm-margin-4x-top">
        <div>Current selected values</div>
        <span>{JSON.stringify(value)}</span>
      </div>
    </div>
  );
}
