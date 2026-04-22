import { h } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "ojs/ojselectcombobox";
import { createStatesDataProvider } from "./comboBoxOne-shared";

export default function ComboboxOneMinLengthExample() {
  const dataProvider = useMemo(() => createStatesDataProvider(), []);
  const [value, setValue] = useState("");

  const handleValueChanged = useCallback((event: any) => {
    setValue(event.detail.value ?? "");
  }, []);

  return (
    <div id="comboboxOneMinLength">
      <oj-combobox-one
        value={value}
        labelHint="Search starts after 3 characters"
        labelEdge="inside"
        options={dataProvider}
        minLength={3}
        class="oj-form-control-max-width-lg"
        onvalueChanged={handleValueChanged}
      ></oj-combobox-one>
    </div>
  );
}
