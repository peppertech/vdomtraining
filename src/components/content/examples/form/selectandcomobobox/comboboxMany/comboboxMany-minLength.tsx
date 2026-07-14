import "ojs/ojselectcombobox";
import 'preact';
import { type ComponentProps } from 'preact';
import { useCallback,useMemo,useState } from "preact/hooks";
import { createStatesDataProvider } from "./comboboxMany-shared";

type ValueEvent = Parameters<
  NonNullable<ComponentProps<"oj-combobox-many">["onvalueChanged"]>
>[0];
export default function ComboboxManyMinLengthExample() {
  const dataProvider = useMemo(() => createStatesDataProvider(), []);
  const [value, setValue] = useState<string[]>([]);

  const handleValueChanged = useCallback((event: ValueEvent) => {
    setValue((event.detail.value as string[] | null | undefined) ?? []);
  }, []);

  return (
    <div id="comboboxManyMinLength">
      <oj-combobox-many
        value={value}
        labelHint="Start searching after 3 characters"
        labelEdge="inside"
        options={dataProvider}
        minLength={3}
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
