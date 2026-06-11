import { h, type ComponentProps } from 'preact';
import { useCallback, useMemo, useState } from "preact/hooks";
import "ojs/ojselectcombobox";

import {
  createBrowserLabelDataProvider,
  renderBrowserImageOption,
} from "./comboboxMany-shared";

type ValueEvent = Parameters<
  NonNullable<ComponentProps<"oj-combobox-many">["onvalueChanged"]>
>[0];
export default function ComboboxManyItemImgExample() {
  const dataProvider = useMemo(() => createBrowserLabelDataProvider(), []);
  const [value, setValue] = useState<string[]>(["Chrome", "Safari"]);

  const handleValueChanged = useCallback((event: ValueEvent) => {
    setValue((event.detail.value as string[] | null | undefined) ?? []);
  }, []);

  return (
    <div id="comboboxManyItemImg">
      <oj-combobox-many
        value={value}
        labelHint="Items with leading badges"
        labelEdge="inside"
        options={dataProvider}
        class="oj-form-control-max-width-md"
        optionRenderer={renderBrowserImageOption as ComponentProps<'oj-combobox-many'>['optionRenderer']}
        onvalueChanged={handleValueChanged}
      ></oj-combobox-many>

      <div class="oj-sm-margin-4x-top">
        <div>Current selected values</div>
        <span>{JSON.stringify(value)}</span>
      </div>
    </div>
  );
}
