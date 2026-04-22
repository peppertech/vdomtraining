import { h } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "ojs/ojselectcombobox";
import { createTimeZoneDataProvider } from "./comboboxMany-shared";

export default function ComboboxManyGroupingExample() {
  const dataProvider = useMemo(() => createTimeZoneDataProvider(), []);
  const [value, setValue] = useState<string[]>(["AK", "CA"]);

  const handleValueChanged = useCallback((event: any) => {
    setValue(event.detail.value ?? []);
  }, []);

  return (
    <div id="comboboxManyGrouping">
      <oj-combobox-many
        value={value}
        labelHint="Time zones grouped by region"
        labelEdge="inside"
        options={dataProvider}
        class="oj-form-control-max-width-lg"
        onvalueChanged={handleValueChanged}
      ></oj-combobox-many>

      <div class="oj-sm-margin-4x-top">
        <div>Current selected values</div>
        <span>{JSON.stringify(value)}</span>
      </div>
    </div>
  );
}
