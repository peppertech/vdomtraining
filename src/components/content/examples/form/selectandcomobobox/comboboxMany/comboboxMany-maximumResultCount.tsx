import "ojs/ojformlayout";
import "ojs/ojinputnumber";
import "ojs/ojselectcombobox";
import 'preact';
import { type ComponentProps } from 'preact';
import { useCallback,useMemo,useState } from "preact/hooks";
import { createStatesDataProvider } from "./comboboxMany-shared";

type ValueEvent = Parameters<
  NonNullable<ComponentProps<"oj-combobox-many">["onvalueChanged"]>
>[0];
type CountEvent = Parameters<
  NonNullable<ComponentProps<"oj-input-number">["onvalueChanged"]>
>[0];
export default function ComboboxManyMaximumResultCountExample() {
  const dataProvider = useMemo(() => createStatesDataProvider(), []);
  const [value, setValue] = useState<string[]>(["AK"]);
  const [maximumResultCount, setMaximumResultCount] = useState(15);

  const handleValueChanged = useCallback((event: ValueEvent) => {
    setValue((event.detail.value as string[] | null | undefined) ?? []);
  }, []);

  const handleCountChanged = useCallback((event: CountEvent) => {
    setMaximumResultCount((event.detail.value as number | null | undefined) ?? 15);
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
