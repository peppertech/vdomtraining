import { h } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "ojs/ojselectcombobox";
import {
  createFormattedCurrencyDataProvider,
  usdCurrencyConverter,
} from "./comboboxMany-shared";

export default function ComboboxManyConverterExample() {
  const dataProvider = useMemo(() => createFormattedCurrencyDataProvider(), []);
  const [value, setValue] = useState<number[]>([1, 3]);

  const handleValueChanged = useCallback((event: any) => {
    setValue(event.detail.value ?? []);
  }, []);

  return (
    <div id="comboboxManyConverter">
      <oj-combobox-many
        value={value}
        labelHint="Currency options"
        labelEdge="inside"
        options={dataProvider}
        converter={usdCurrencyConverter as any}
        class="oj-form-control-max-width-md"
        onvalueChanged={handleValueChanged}
      ></oj-combobox-many>

      <div class="oj-sm-margin-4x-top">
        <div>Current selected values</div>
        <span>{JSON.stringify(value)}</span>
      </div>
    </div>
  );
}
