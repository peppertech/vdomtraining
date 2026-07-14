import "ojs/ojselectcombobox";
import 'preact';
import { type ComponentProps } from 'preact';
import { useCallback,useMemo,useState } from "preact/hooks";
import { createEmployeeMappedDataProvider } from "./comboBoxOne-shared";

type ValueEvent = Parameters<
  NonNullable<ComponentProps<"oj-combobox-one">["onvalueChanged"]>
>[0];
export default function ComboboxOneDataMappingExample() {
  const dataProvider = useMemo(() => createEmployeeMappedDataProvider(), []);
  const [value, setValue] = useState("11111");

  const handleValueChanged = useCallback((event: ValueEvent) => {
    setValue((event.detail.value as string | null | undefined) ?? "");
  }, []);

  return (
    <div id="comboboxOneDataMapping">
      <oj-combobox-one
        value={value}
        labelHint="Employees with mapped label/value"
        labelEdge="inside"
        options={dataProvider}
        class="oj-form-control-max-width-xl"
        onvalueChanged={handleValueChanged}
      ></oj-combobox-one>
    </div>
  );
}
