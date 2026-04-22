import { h } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "ojs/ojselectcombobox";
import { createStatesDataProvider } from "./comboboxMany-shared";

const initialValueOptions = [
  { value: "CA", label: "California" },
  { value: "MA", label: "Massachusetts" },
];

export default function ComboboxManyValueOptionsExample() {
  const dataProvider = useMemo(() => createStatesDataProvider(), []);
  const [valueOnlySelection, setValueOnlySelection] = useState<string[]>([
    "CA",
    "MA",
  ]);
  const [valueOptionsSelection, setValueOptionsSelection] = useState<string[]>([
    "CA",
    "MA",
  ]);
  const [valueOptions, setValueOptions] = useState(initialValueOptions);

  const handleValueOnlyChanged = useCallback((event: any) => {
    setValueOnlySelection(event.detail.value ?? []);
  }, []);

  const handleValueOptionsChanged = useCallback((event: any) => {
    setValueOptionsSelection(event.detail.value ?? []);
  }, []);

  const handleSelectedOptionsChanged = useCallback((event: any) => {
    setValueOptions(event.detail.value ?? []);
  }, []);

  return (
    <div id="comboboxManyValueOptions">
      <h4>Initial values only</h4>
      <oj-combobox-many
        value={valueOnlySelection}
        labelHint="Value only"
        labelEdge="inside"
        options={dataProvider}
        class="oj-form-control-max-width-lg"
        onvalueChanged={handleValueOnlyChanged}
      ></oj-combobox-many>

      <h4 class="oj-sm-margin-6x-top">Initial values with valueOptions</h4>
      <oj-combobox-many
        value={valueOptionsSelection}
        valueOptions={valueOptions}
        labelHint="Value + valueOptions"
        labelEdge="inside"
        options={dataProvider}
        class="oj-form-control-max-width-lg"
        onvalueChanged={handleValueOptionsChanged}
        onvalueOptionsChanged={handleSelectedOptionsChanged}
      ></oj-combobox-many>

      <div class="oj-sm-margin-4x-top">
        <div>Selected values</div>
        <span>{JSON.stringify(valueOptionsSelection)}</span>
      </div>
    </div>
  );
}
