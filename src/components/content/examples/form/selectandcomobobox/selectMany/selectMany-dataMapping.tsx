import "ojs/ojselectcombobox";
import 'preact';
import { type ComponentProps } from 'preact';
import { useCallback,useMemo,useState } from "preact/hooks";
import { createEmployeeMappedDataProvider } from "./selectMany-shared";

type ValueEvent = Parameters<
  NonNullable<ComponentProps<"oj-select-many">["onvalueChanged"]>
>[0];
export default function SelectManyDataMappingExample() {
  const dataProvider = useMemo(() => createEmployeeMappedDataProvider(), []);
  const [value, setValue] = useState<string[]>(["11111", "10256"]);

  const handleValueChanged = useCallback((event: ValueEvent) => {
    setValue((event.detail.value as string[] | null | undefined) ?? []);
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
