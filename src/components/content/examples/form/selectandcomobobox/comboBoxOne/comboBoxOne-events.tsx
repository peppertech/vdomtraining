import { h } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "ojs/ojselectcombobox";
import { createBrowserDataProvider, formatEventDetail } from "./comboBoxOne-shared";

export default function ComboboxOneEventsExample() {
  const dataProvider = useMemo(() => createBrowserDataProvider(), []);
  const [value, setValue] = useState("Chrome");
  const [valueLog, setValueLog] = useState("");
  const [valueOptionLog, setValueOptionLog] = useState("");

  const handleValueChanged = useCallback((event: any) => {
    setValue(event.detail.value ?? "");
    setValueLog(formatEventDetail(event.detail));
  }, []);

  const handleValueOptionChanged = useCallback((event: any) => {
    setValueOptionLog(formatEventDetail(event.detail));
  }, []);

  return (
    <div id="comboboxOneEvents">
      <oj-combobox-one
        value={value}
        labelHint="Combobox One events"
        labelEdge="inside"
        options={dataProvider}
        class="oj-form-control-max-width-md"
        onvalueChanged={handleValueChanged}
        onvalueOptionChanged={handleValueOptionChanged}
      ></oj-combobox-one>

      <pre class="oj-sm-margin-4x-top">{valueLog}</pre>
      <pre>{valueOptionLog}</pre>
    </div>
  );
}
