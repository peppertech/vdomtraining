import { h, type ComponentProps } from 'preact';
import { useCallback, useMemo, useState } from "preact/hooks";
import "ojs/ojselectcombobox";

import {
  createGroupedEmployeeDataProvider,
  renderEmployeeOption,
} from "./comboBoxOne-shared";

type ValueEvent = Parameters<
  NonNullable<ComponentProps<"oj-combobox-one">["onvalueChanged"]>
>[0];
export default function ComboboxOneCustomTemplateExample() {
  const dataProvider = useMemo(() => createGroupedEmployeeDataProvider(), []);
  const [value, setValue] = useState("11111");

  const handleValueChanged = useCallback((event: ValueEvent) => {
    setValue((event.detail.value as string | null | undefined) ?? "");
  }, []);

  return (
    <div id="comboboxOneCustomTemplate">
      <oj-combobox-one
        value={value}
        labelHint="Employees with custom renderer"
        labelEdge="inside"
        options={dataProvider}
        optionRenderer={renderEmployeeOption as ComponentProps<'oj-combobox-one'>['optionRenderer']}
        class="oj-form-control-max-width-xl"
        onvalueChanged={handleValueChanged}
      ></oj-combobox-one>
    </div>
  );
}
