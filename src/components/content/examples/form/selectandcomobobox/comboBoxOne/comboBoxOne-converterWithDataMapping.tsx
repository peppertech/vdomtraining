import "ojs/ojselectcombobox";
import 'preact';
import { type ComponentProps } from 'preact';
import { useCallback,useMemo,useState } from "preact/hooks";

import {
  createUnformattedCurrencyDataProvider,
  usdCurrencyConverter,
} from "./comboBoxOne-shared";

type ValueEvent = Parameters<
  NonNullable<ComponentProps<"oj-combobox-one">["onvalueChanged"]>
>[0];
export default function ComboboxOneConverterWithDataMappingExample() {
  const dataProvider = useMemo(() => createUnformattedCurrencyDataProvider(), []);
  const [value, setValue] = useState<number | null>(null);

  const handleValueChanged = useCallback((event: ValueEvent) => {
    setValue((event.detail.value as number | null | null | undefined) ?? null);
  }, []);

  return (
    <div id="comboboxOneConverterWithDataMapping">
      <oj-combobox-one
        value={value}
        labelHint="Unformatted currency data"
        labelEdge="inside"
        options={dataProvider}
        converter={usdCurrencyConverter as ComponentProps<'oj-combobox-one'>['converter']}
        class="oj-form-control-max-width-lg"
        onvalueChanged={handleValueChanged}
      ></oj-combobox-one>
    </div>
  );
}
