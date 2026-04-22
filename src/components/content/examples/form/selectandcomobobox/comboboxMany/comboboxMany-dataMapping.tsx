import { h } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "ojs/ojselectcombobox";
import { createEmployeeMappedDataProvider } from "./comboboxMany-shared";

export default function ComboboxManyDataMappingExample() {
  const dataProvider = useMemo(() => createEmployeeMappedDataProvider(), []);
  const [value, setValue] = useState<string[]>(["11111"]);

  const handleValueChanged = useCallback((event: any) => {
    setValue(event.detail.value ?? []);
  }, []);

  return (
    <div id="comboboxManyDataMapping">
      <oj-combobox-many
        value={value}
        labelHint="Employees using data mapping"
        labelEdge="inside"
        options={dataProvider}
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
