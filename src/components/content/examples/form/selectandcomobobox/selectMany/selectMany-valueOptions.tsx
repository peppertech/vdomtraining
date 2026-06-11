import { h, type ComponentProps } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "ojs/ojselectcombobox";
import { createStatesDataProvider } from "./selectMany-shared";

type ValueEvent = Parameters<
  NonNullable<ComponentProps<"oj-select-many">["onvalueChanged"]>
>[0];
type ValueOptionsEvent = Parameters<
  NonNullable<ComponentProps<"oj-select-many">["onvalueOptionsChanged"]>
>[0];
const initialValueOptions = [
  { value: "CA", label: "California" },
  { value: "MA", label: "Massachusetts" },
];

export default function SelectManyValueOptionsExample() {
  const dataProvider = useMemo(() => createStatesDataProvider(), []);
  const [value, setValue] = useState<string[]>(["CA", "MA"]);
  const [valueOptions, setValueOptions] = useState(initialValueOptions);

  const handleValueChanged = useCallback((event: ValueEvent) => {
    setValue((event.detail.value as string[] | null | undefined) ?? []);
  }, []);

  const handleValueOptionsChanged = useCallback((event: ValueOptionsEvent) => {
    setValueOptions(
      (event.detail.value as typeof initialValueOptions | null | undefined) ?? [],
    );
  }, []);

  return (
    <div id="selectManyValueOptions">
      <oj-select-many
        value={value}
        valueOptions={valueOptions}
        labelHint="Value options"
        labelEdge="inside"
        options={dataProvider}
        class="oj-form-control-max-width-lg"
        onvalueChanged={handleValueChanged}
        onvalueOptionsChanged={handleValueOptionsChanged}
      ></oj-select-many>

      <div class="oj-sm-margin-4x-top">
        <div>Selected values</div>
        <span>{JSON.stringify(value)}</span>
      </div>
    </div>
  );
}
