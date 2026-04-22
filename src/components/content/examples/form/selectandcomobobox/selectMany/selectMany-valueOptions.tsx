import { h } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "ojs/ojselectcombobox";
import { createStatesDataProvider } from "./selectMany-shared";

const initialValueOptions = [
  { value: "CA", label: "California" },
  { value: "MA", label: "Massachusetts" },
];

export default function SelectManyValueOptionsExample() {
  const dataProvider = useMemo(() => createStatesDataProvider(), []);
  const [value, setValue] = useState<string[]>(["CA", "MA"]);
  const [valueOptions, setValueOptions] = useState(initialValueOptions);

  const handleValueChanged = useCallback((event: any) => {
    setValue(event.detail.value ?? []);
  }, []);

  const handleValueOptionsChanged = useCallback((event: any) => {
    setValueOptions(event.detail.value ?? []);
  }, []);

  return (
    <div id="selectManyValueOptions">
      <oj-select-many
        value={value}
        valueOptions={valueOptions}
        labelHint="Value options"
        labelEdge="inside"
        options={dataProvider}
        class="oj-form-control-max-width-lg"
        onvalueChanged={handleValueChanged}
        onvalueOptionsChanged={handleValueOptionsChanged}
      ></oj-select-many>

      <div class="oj-sm-margin-4x-top">
        <div>Selected values</div>
        <span>{JSON.stringify(value)}</span>
      </div>
    </div>
  );
}
