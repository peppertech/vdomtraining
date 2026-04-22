import { h } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "ojs/ojselectcombobox";
import {
  createGroupedEmployeeDataProvider,
  renderEmployeeOption,
} from "./comboBoxOne-shared";

export default function ComboboxOneCustomTemplateExample() {
  const dataProvider = useMemo(() => createGroupedEmployeeDataProvider(), []);
  const [value, setValue] = useState("11111");

  const handleValueChanged = useCallback((event: any) => {
    setValue(event.detail.value ?? "");
  }, []);

  return (
    <div id="comboboxOneCustomTemplate">
      <oj-combobox-one
        value={value}
        labelHint="Employees with custom renderer"
        labelEdge="inside"
        options={dataProvider}
        optionRenderer={renderEmployeeOption as any}
        class="oj-form-control-max-width-xl"
        onvalueChanged={handleValueChanged}
      ></oj-combobox-one>
    </div>
  );
}
