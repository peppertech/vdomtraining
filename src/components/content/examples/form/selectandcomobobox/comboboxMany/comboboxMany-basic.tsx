import { h } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "ojs/ojselectcombobox";
import { createBrowserDataProvider } from "./comboboxMany-shared";

export default function ComboboxManyBasicExample() {
  const dataProvider = useMemo(() => createBrowserDataProvider(), []);
  const [value, setValue] = useState<string[]>(["CH", "SA"]);

  const handleValueChanged = useCallback((event: any) => {
    setValue(event.detail.value ?? []);
  }, []);

  return (
    <div id="comboboxManyBasic">
      <oj-combobox-many
        value={value}
        labelHint="Combobox Many with ArrayDataProvider"
        labelEdge="inside"
        options={dataProvider}
        class="oj-form-control-max-width-md"
        onvalueChanged={handleValueChanged}
      ></oj-combobox-many>

      <div class="oj-sm-margin-4x-top">
        <div>Current selected values</div>
        <span id="selectedval">{JSON.stringify(value)}</span>
      </div>
    </div>
  );
}
