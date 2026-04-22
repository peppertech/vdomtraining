import { h } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "ojs/ojselectcombobox";
import {
  createUnformattedCurrencyDataProvider,
  usdCurrencyConverter,
} from "./comboBoxOne-shared";

export default function ComboboxOneConverterWithDataMappingExample() {
  const dataProvider = useMemo(() => createUnformattedCurrencyDataProvider(), []);
  const [value, setValue] = useState<number | null>(null);

  const handleValueChanged = useCallback((event: any) => {
    setValue(event.detail.value ?? null);
  }, []);

  return (
    <div id="comboboxOneConverterWithDataMapping">
      <oj-combobox-one
        value={value}
        labelHint="Unformatted currency data"
        labelEdge="inside"
        options={dataProvider}
        converter={usdCurrencyConverter as any}
        class="oj-form-control-max-width-lg"
        onvalueChanged={handleValueChanged}
      ></oj-combobox-one>
    </div>
  );
}
