import { h } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "ojs/ojselectcombobox";
import {
  createBrowserLabelDataProvider,
  formatEventDetail,
} from "./comboboxMany-shared";

export default function ComboboxManyEventsExample() {
  const dataProvider = useMemo(() => createBrowserLabelDataProvider(), []);
  const [inlineValue, setInlineValue] = useState<string[]>(["Chrome", "Safari"]);
  const [dpValue, setDpValue] = useState<string[]>(["Chrome", "Safari"]);
  const [inlineValueLog, setInlineValueLog] = useState("");
  const [inlineValueOptionsLog, setInlineValueOptionsLog] = useState("");
  const [dpValueLog, setDpValueLog] = useState("");
  const [dpValueOptionsLog, setDpValueOptionsLog] = useState("");

  const handleInlineValueChanged = useCallback((event: any) => {
    setInlineValue(event.detail.value ?? []);
    setInlineValueLog(formatEventDetail(event.detail));
  }, []);

  const handleInlineValueOptionsChanged = useCallback((event: any) => {
    setInlineValueOptionsLog(formatEventDetail(event.detail));
  }, []);

  const handleDpValueChanged = useCallback((event: any) => {
    setDpValue(event.detail.value ?? []);
    setDpValueLog(formatEventDetail(event.detail));
  }, []);

  const handleDpValueOptionsChanged = useCallback((event: any) => {
    setDpValueOptionsLog(formatEventDetail(event.detail));
  }, []);

  return (
    <div id="comboboxManyEvents">
      <h4>Inline options</h4>
      <oj-combobox-many
        value={inlineValue}
        labelHint="Combobox Many"
        labelEdge="inside"
        class="oj-form-control-max-width-md"
        onvalueChanged={handleInlineValueChanged}
        onvalueOptionsChanged={handleInlineValueOptionsChanged}
      >
        <oj-option value="Internet Explorer">Internet Explorer</oj-option>
        <oj-option value="Firefox">Firefox</oj-option>
        <oj-option value="Chrome">Chrome</oj-option>
        <oj-option value="Opera">Opera</oj-option>
        <oj-option value="Safari">Safari</oj-option>
      </oj-combobox-many>

      <pre class="oj-sm-margin-4x-top">{inlineValueLog}</pre>
      <pre>{inlineValueOptionsLog}</pre>

      <h4 class="oj-sm-margin-6x-top">Data provider options</h4>
      <oj-combobox-many
        value={dpValue}
        labelHint="Combobox Many with DataProvider"
        labelEdge="inside"
        options={dataProvider}
        class="oj-form-control-max-width-md"
        onvalueChanged={handleDpValueChanged}
        onvalueOptionsChanged={handleDpValueOptionsChanged}
      ></oj-combobox-many>

      <pre class="oj-sm-margin-4x-top">{dpValueLog}</pre>
      <pre>{dpValueOptionsLog}</pre>
    </div>
  );
}
