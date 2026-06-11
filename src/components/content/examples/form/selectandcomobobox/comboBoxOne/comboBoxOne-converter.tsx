import { h, type ComponentProps } from 'preact';
import { useCallback, useMemo, useState } from "preact/hooks";
import "ojs/ojselectcombobox";

import {
  createFormattedCurrencyDataProvider,
  usdCurrencyConverter,
} from "./comboBoxOne-shared";

type ValueEvent = Parameters<
  NonNullable<ComponentProps<"oj-combobox-one">["onvalueChanged"]>
>[0];
export default function ComboboxOneConverterExample() {
  const dataProvider = useMemo(() => createFormattedCurrencyDataProvider(), []);
  const [value, setValue] = useState<number | null>(1);

  const handleValueChanged = useCallback((event: ValueEvent) => {
    setValue((event.detail.value as number | null | null | undefined) ?? null);
  }, []);

  return (
    <div id="comboboxOneConverter">
      <oj-combobox-one
        value={value}
        labelHint="Currency options"
        labelEdge="inside"
        options={dataProvider}
        converter={usdCurrencyConverter as ComponentProps<'oj-combobox-one'>['converter']}
        class="oj-form-control-max-width-md"
        onvalueChanged={handleValueChanged}
      ></oj-combobox-one>
    </div>
  );
}
