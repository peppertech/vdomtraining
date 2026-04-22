import { h } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "ojs/ojselectcombobox";
import {
  createFormattedCurrencyDataProvider,
  usdCurrencyConverter,
} from "./comboBoxOne-shared";

export default function ComboboxOneConverterExample() {
  const dataProvider = useMemo(() => createFormattedCurrencyDataProvider(), []);
  const [value, setValue] = useState<number | null>(1);

  const handleValueChanged = useCallback((event: any) => {
    setValue(event.detail.value ?? null);
  }, []);

  return (
    <div id="comboboxOneConverter">
      <oj-combobox-one
        value={value}
        labelHint="Currency options"
        labelEdge="inside"
        options={dataProvider}
        converter={usdCurrencyConverter as any}
        class="oj-form-control-max-width-md"
        onvalueChanged={handleValueChanged}
      ></oj-combobox-one>
    </div>
  );
}
