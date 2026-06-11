import { h, type ComponentProps } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "ojs/ojselectcombobox";
import { createBrowserDataProvider, formatEventDetail } from "./comboBoxOne-shared";

type ValueEvent = Parameters<
  NonNullable<ComponentProps<"oj-combobox-one">["onvalueChanged"]>
>[0];
type ValueOptionEvent = Parameters<
  NonNullable<ComponentProps<"oj-combobox-one">["onvalueOptionChanged"]>
>[0];
export default function ComboboxOneEventsExample() {
  const dataProvider = useMemo(() => createBrowserDataProvider(), []);
  const [value, setValue] = useState("Chrome");
  const [valueLog, setValueLog] = useState("");
  const [valueOptionLog, setValueOptionLog] = useState("");

  const handleValueChanged = useCallback((event: ValueEvent) => {
    setValue((event.detail.value as string | null | undefined) ?? "");
    setValueLog(formatEventDetail(event.detail));
  }, []);

  const handleValueOptionChanged = useCallback((event: ValueOptionEvent) => {
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
