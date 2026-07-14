import "ojs/ojselectcombobox";
import 'preact';
import { type ComponentProps } from 'preact';
import { useCallback,useMemo,useState } from "preact/hooks";

import {
  createFormattedCurrencyDataProvider,
  usdCurrencyConverter,
} from "./comboboxMany-shared";

type ValueEvent = Parameters<
  NonNullable<ComponentProps<"oj-combobox-many">["onvalueChanged"]>
>[0];
export default function ComboboxManyConverterExample() {
  const dataProvider = useMemo(() => createFormattedCurrencyDataProvider(), []);
  const [value, setValue] = useState<number[]>([1, 3]);

  const handleValueChanged = useCallback((event: ValueEvent) => {
    setValue((event.detail.value as number[] | null | undefined) ?? []);
  }, []);

  return (
    <div id="comboboxManyConverter">
      <oj-combobox-many
        value={value}
        labelHint="Currency options"
        labelEdge="inside"
        options={dataProvider}
        converter={usdCurrencyConverter as ComponentProps<'oj-combobox-many'>['converter']}
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
