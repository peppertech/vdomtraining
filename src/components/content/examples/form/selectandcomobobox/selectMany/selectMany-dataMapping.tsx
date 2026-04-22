import { h } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "ojs/ojselectcombobox";
import { createEmployeeMappedDataProvider } from "./selectMany-shared";

export default function SelectManyDataMappingExample() {
  const dataProvider = useMemo(() => createEmployeeMappedDataProvider(), []);
  const [value, setValue] = useState<string[]>(["11111", "10256"]);

  const handleValueChanged = useCallback((event: any) => {
    setValue(event.detail.value ?? []);
  }, []);

  return (
    <div id="selectManyDataMapping">
      <oj-select-many
        value={value}
        labelHint="Employees with mapped label/value"
        labelEdge="inside"
        options={dataProvider}
        class="oj-form-control-max-width-xl"
        onvalueChanged={handleValueChanged}
      ></oj-select-many>
    </div>
  );
}
