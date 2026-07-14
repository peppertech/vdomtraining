import "ojs/ojselectcombobox";
import 'preact';
import { type ComponentProps } from 'preact';
import { useCallback,useMemo,useState } from "preact/hooks";
import { createEmployeeMappedDataProvider } from "./comboboxMany-shared";

type ValueEvent = Parameters<
  NonNullable<ComponentProps<"oj-combobox-many">["onvalueChanged"]>
>[0];
export default function ComboboxManyDataMappingExample() {
  const dataProvider = useMemo(() => createEmployeeMappedDataProvider(), []);
  const [value, setValue] = useState<string[]>(["11111"]);

  const handleValueChanged = useCallback((event: ValueEvent) => {
    setValue((event.detail.value as string[] | null | undefined) ?? []);
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
