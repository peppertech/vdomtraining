import "ojs/ojselectcombobox";
import 'preact';
import { type ComponentProps } from 'preact';
import { useCallback,useMemo,useState } from "preact/hooks";
import { createBrowserDataProvider,renderOptionWithBadge } from "./comboBoxOne-shared";

type ValueEvent = Parameters<
  NonNullable<ComponentProps<"oj-combobox-one">["onvalueChanged"]>
>[0];
export default function ComboboxOneItemImgExample() {
  const dataProvider = useMemo(() => createBrowserDataProvider(), []);
  const [value, setValue] = useState("Chrome");

  const handleValueChanged = useCallback((event: ValueEvent) => {
    setValue((event.detail.value as string | null | undefined) ?? "");
  }, []);

  return (
    <div id="comboboxOneItemImg">
      <oj-combobox-one
        value={value}
        labelHint="Options with leading badges"
        labelEdge="inside"
        options={dataProvider}
        optionRenderer={renderOptionWithBadge as ComponentProps<'oj-combobox-one'>['optionRenderer']}
        class="oj-form-control-max-width-md"
        onvalueChanged={handleValueChanged}
      ></oj-combobox-one>
    </div>
  );
}
