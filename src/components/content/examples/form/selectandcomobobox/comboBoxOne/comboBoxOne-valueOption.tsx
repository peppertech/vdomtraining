import { h } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "ojs/ojselectcombobox";
import { createStatesDataProvider } from "./comboBoxOne-shared";

export default function ComboboxOneValueOptionExample() {
  const dataProvider = useMemo(() => createStatesDataProvider(), []);
  const [value, setValue] = useState("CA");
  const [valueOption, setValueOption] = useState({
    value: "CA",
    label: "California",
  });

  const handleValueChanged = useCallback((event: any) => {
    setValue(event.detail.value ?? "");
  }, []);

  const handleValueOptionChanged = useCallback((event: any) => {
    setValueOption(event.detail.value ?? null);
  }, []);

  return (
    <div id="comboboxOneValueOption">
      <oj-combobox-one
        value={value}
        valueOption={valueOption}
        labelHint="Value option"
        labelEdge="inside"
        options={dataProvider}
        class="oj-form-control-max-width-lg"
        onvalueChanged={handleValueChanged}
        onvalueOptionChanged={handleValueOptionChanged}
      ></oj-combobox-one>
    </div>
  );
}
