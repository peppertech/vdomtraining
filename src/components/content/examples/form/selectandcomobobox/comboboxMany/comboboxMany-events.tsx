import "ojs/ojselectcombobox";
import 'preact';
import { type ComponentProps } from 'preact';
import { useCallback,useMemo,useState } from "preact/hooks";

import {
  createBrowserLabelDataProvider,
  formatEventDetail,
} from "./comboboxMany-shared";

type InlineValueEvent = Parameters<
  NonNullable<ComponentProps<"oj-combobox-many">["onvalueChanged"]>
>[0];
type InlineValueOptionsEvent = Parameters<
  NonNullable<ComponentProps<"oj-combobox-many">["onvalueOptionsChanged"]>
>[0];
type DpValueEvent = Parameters<
  NonNullable<ComponentProps<"oj-combobox-many">["onvalueChanged"]>
>[0];
type DpValueOptionsEvent = Parameters<
  NonNullable<ComponentProps<"oj-combobox-many">["onvalueOptionsChanged"]>
>[0];
export default function ComboboxManyEventsExample() {
  const dataProvider = useMemo(() => createBrowserLabelDataProvider(), []);
  const [inlineValue, setInlineValue] = useState<string[]>(["Chrome", "Safari"]);
  const [dpValue, setDpValue] = useState<string[]>(["Chrome", "Safari"]);
  const [inlineValueLog, setInlineValueLog] = useState("");
  const [inlineValueOptionsLog, setInlineValueOptionsLog] = useState("");
  const [dpValueLog, setDpValueLog] = useState("");
  const [dpValueOptionsLog, setDpValueOptionsLog] = useState("");

  const handleInlineValueChanged = useCallback((event: InlineValueEvent) => {
    setInlineValue((event.detail.value as string[] | null | undefined) ?? []);
    setInlineValueLog(formatEventDetail(event.detail));
  }, []);

  const handleInlineValueOptionsChanged = useCallback((event: InlineValueOptionsEvent) => {
    setInlineValueOptionsLog(formatEventDetail(event.detail));
  }, []);

  const handleDpValueChanged = useCallback((event: DpValueEvent) => {
    setDpValue((event.detail.value as string[] | null | undefined) ?? []);
    setDpValueLog(formatEventDetail(event.detail));
  }, []);

  const handleDpValueOptionsChanged = useCallback((event: DpValueOptionsEvent) => {
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
