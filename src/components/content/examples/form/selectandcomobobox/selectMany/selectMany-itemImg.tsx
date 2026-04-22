import { h } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "ojs/ojselectcombobox";
import { createBrowserDataProvider, renderOptionWithBadge } from "./selectMany-shared";

export default function SelectManyItemImgExample() {
  const dataProvider = useMemo(() => createBrowserDataProvider(), []);
  const [value, setValue] = useState<string[]>(["Chrome", "Safari"]);

  const handleValueChanged = useCallback((event: any) => {
    setValue(event.detail.value ?? []);
  }, []);

  return (
    <div id="selectManyItemImg">
      <oj-select-many
        value={value}
        labelHint="Options with leading badges"
        labelEdge="inside"
        options={dataProvider}
        optionRenderer={renderOptionWithBadge as any}
        class="oj-form-control-max-width-md"
        onvalueChanged={handleValueChanged}
      ></oj-select-many>
    </div>
  );
}
