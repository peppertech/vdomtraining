import "ojs/ojselectcombobox";
import 'preact';
import { type ComponentProps } from 'preact';
import { useCallback,useMemo,useState } from "preact/hooks";
import { createBrowserDataProvider,renderOptionWithBadge } from "./selectMany-shared";

type ValueEvent = Parameters<
  NonNullable<ComponentProps<"oj-select-many">["onvalueChanged"]>
>[0];
export default function SelectManyItemImgExample() {
  const dataProvider = useMemo(() => createBrowserDataProvider(), []);
  const [value, setValue] = useState<string[]>(["Chrome", "Safari"]);

  const handleValueChanged = useCallback((event: ValueEvent) => {
    setValue((event.detail.value as string[] | null | undefined) ?? []);
  }, []);

  return (
    <div id="selectManyItemImg">
      <oj-select-many
        value={value}
        labelHint="Options with leading badges"
        labelEdge="inside"
        options={dataProvider}
        optionRenderer={renderOptionWithBadge as ComponentProps<'oj-select-many'>['optionRenderer']}
        class="oj-form-control-max-width-md"
        onvalueChanged={handleValueChanged}
      ></oj-select-many>
    </div>
  );
}
