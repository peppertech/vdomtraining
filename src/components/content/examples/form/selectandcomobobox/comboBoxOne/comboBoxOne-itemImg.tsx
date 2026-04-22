import { h } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "ojs/ojselectcombobox";
import { createBrowserDataProvider, renderOptionWithBadge } from "./comboBoxOne-shared";

export default function ComboboxOneItemImgExample() {
  const dataProvider = useMemo(() => createBrowserDataProvider(), []);
  const [value, setValue] = useState("Chrome");

  const handleValueChanged = useCallback((event: any) => {
    setValue(event.detail.value ?? "");
  }, []);

  return (
    <div id="comboboxOneItemImg">
      <oj-combobox-one
        value={value}
        labelHint="Options with leading badges"
        labelEdge="inside"
        options={dataProvider}
        optionRenderer={renderOptionWithBadge as any}
        class="oj-form-control-max-width-md"
        onvalueChanged={handleValueChanged}
      ></oj-combobox-one>
    </div>
  );
}
