import { h } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "ojs/ojselectcombobox";
import { createBrowserDataProvider, formatEventDetail } from "./selectMany-shared";

export default function SelectManyEventsExample() {
  const dataProvider = useMemo(() => createBrowserDataProvider(), []);
  const [value, setValue] = useState<string[]>(["Chrome", "Safari"]);
  const [valueLog, setValueLog] = useState("");
  const [valueOptionsLog, setValueOptionsLog] = useState("");

  const handleValueChanged = useCallback((event: any) => {
    setValue(event.detail.value ?? []);
    setValueLog(formatEventDetail(event.detail));
  }, []);

  const handleValueOptionsChanged = useCallback((event: any) => {
    setValueOptionsLog(formatEventDetail(event.detail));
  }, []);

  return (
    <div id="selectManyEvents">
      <oj-select-many
        value={value}
        labelHint="Select Many events"
        labelEdge="inside"
        options={dataProvider}
        class="oj-form-control-max-width-md"
        onvalueChanged={handleValueChanged}
        onvalueOptionsChanged={handleValueOptionsChanged}
      ></oj-select-many>

      <pre class="oj-sm-margin-4x-top">{valueLog}</pre>
      <pre>{valueOptionsLog}</pre>
    </div>
  );
}
