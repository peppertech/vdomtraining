import "ojs/ojselectcombobox";
import 'preact';
import { type ComponentProps } from 'preact';
import { useCallback,useMemo,useState } from "preact/hooks";
import { createStatesDataProvider } from "./comboBoxOne-shared";

type ValueEvent = Parameters<
  NonNullable<ComponentProps<"oj-combobox-one">["onvalueChanged"]>
>[0];
type ValueOptionEvent = Parameters<
  NonNullable<ComponentProps<"oj-combobox-one">["onvalueOptionChanged"]>
>[0];
export default function ComboboxOneValueOptionExample() {
  const dataProvider = useMemo(() => createStatesDataProvider(), []);
  const [value, setValue] = useState("CA");
  const [valueOption, setValueOption] = useState<{
    value: string;
    label: string;
  } | undefined>({
    value: "CA",
    label: "California",
  });

  const handleValueChanged = useCallback((event: ValueEvent) => {
    setValue((event.detail.value as string | null | undefined) ?? "");
  }, []);

  const handleValueOptionChanged = useCallback((event: ValueOptionEvent) => {
    setValueOption((event.detail.value as { value: string; label: string } | null | undefined) ?? undefined);
  }, []);

  return (
    <div id="comboboxOneValueOption">
      <oj-combobox-one
        value={value}
        valueOption={valueOption}
        labelHint="Value option"
        labelEdge="inside"
        options={dataProvider}
        class="oj-form-control-max-width-lg"
        onvalueChanged={handleValueChanged}
        onvalueOptionChanged={handleValueOptionChanged}
      ></oj-combobox-one>
    </div>
  );
}
