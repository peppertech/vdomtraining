import { h, type ComponentProps } from 'preact';
import { useCallback, useMemo, useState } from "preact/hooks";
import "ojs/ojselectcombobox";

import {
  createUnformattedCurrencyDataProvider,
  usdCurrencyConverter,
} from "./comboboxMany-shared";

type ValueEvent = Parameters<
  NonNullable<ComponentProps<"oj-combobox-many">["onvalueChanged"]>
>[0];
export default function ComboboxManyConverterWithDataMappingExample() {
  const dataProvider = useMemo(() => createUnformattedCurrencyDataProvider(), []);
  const [value, setValue] = useState<number[]>([]);

  const handleValueChanged = useCallback((event: ValueEvent) => {
    setValue((event.detail.value as number[] | null | undefined) ?? []);
  }, []);

  return (
    <div id="comboboxManyConverterWithDataMapping">
      <oj-combobox-many
        value={value}
        labelHint="Unformatted currency data with mapping"
        labelEdge="inside"
        options={dataProvider}
        converter={usdCurrencyConverter as ComponentProps<'oj-combobox-many'>['converter']}
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
