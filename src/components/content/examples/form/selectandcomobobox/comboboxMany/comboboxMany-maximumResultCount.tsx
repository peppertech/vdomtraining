import { h } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "ojs/ojformlayout";
import "ojs/ojinputnumber";
import "ojs/ojselectcombobox";
import { createStatesDataProvider } from "./comboboxMany-shared";

export default function ComboboxManyMaximumResultCountExample() {
  const dataProvider = useMemo(() => createStatesDataProvider(), []);
  const [value, setValue] = useState<string[]>(["AK"]);
  const [maximumResultCount, setMaximumResultCount] = useState(15);

  const handleValueChanged = useCallback((event: any) => {
    setValue(event.detail.value ?? []);
  }, []);

  const handleCountChanged = useCallback((event: any) => {
    setMaximumResultCount(event.detail.value ?? 15);
  }, []);

  return (
    <div id="comboboxManyMaximumResultCount">
      <oj-form-layout maxColumns={2} direction="row">
        <oj-input-number
          value={maximumResultCount}
          min={1}
          max={50}
          step={1}
          labelHint="Maximum result count"
          onvalueChanged={handleCountChanged}
        ></oj-input-number>

        <oj-combobox-many
          value={value}
          labelHint="States"
          labelEdge="inside"
          options={dataProvider}
          maximumResultCount={maximumResultCount}
          class="oj-form-control-max-width-lg"
          onvalueChanged={handleValueChanged}
        ></oj-combobox-many>
      </oj-form-layout>

      <div class="oj-sm-margin-4x-top">
        <div>Current selected values</div>
        <span>{JSON.stringify(value)}</span>
      </div>
    </div>
  );
}
