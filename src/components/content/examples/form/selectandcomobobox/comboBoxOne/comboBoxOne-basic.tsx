import { h, type ComponentProps } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "ojs/ojselectcombobox";
import { createBrowserDataProvider } from "./comboBoxOne-shared";

type InlineEvent = Parameters<
  NonNullable<ComponentProps<"oj-combobox-one">["onvalueChanged"]>
>[0];
type ProviderEvent = Parameters<
  NonNullable<ComponentProps<"oj-combobox-one">["onvalueChanged"]>
>[0];
export default function ComboboxOneBasicExample() {
  const dataProvider = useMemo(() => createBrowserDataProvider(), []);
  const [inlineValue, setInlineValue] = useState("Chrome");
  const [providerValue, setProviderValue] = useState("Firefox");

  const handleInlineChanged = useCallback((event: InlineEvent) => {
    setInlineValue((event.detail.value as string | null | undefined) ?? "");
  }, []);

  const handleProviderChanged = useCallback((event: ProviderEvent) => {
    setProviderValue((event.detail.value as string | null | undefined) ?? "");
  }, []);

  return (
    <div id="comboboxOneBasic">
      <h4>Inline options</h4>
      <oj-combobox-one
        value={inlineValue}
        labelHint="Inline options"
        labelEdge="inside"
        class="oj-form-control-max-width-md"
        onvalueChanged={handleInlineChanged}
      >
        <oj-option value="Internet Explorer">Internet Explorer</oj-option>
        <oj-option value="Firefox">Firefox</oj-option>
        <oj-option value="Chrome">Chrome</oj-option>
        <oj-option value="Opera">Opera</oj-option>
        <oj-option value="Safari">Safari</oj-option>
      </oj-combobox-one>

      <h4 class="oj-sm-margin-6x-top">Data provider</h4>
      <oj-combobox-one
        value={providerValue}
        labelHint="ArrayDataProvider"
        labelEdge="inside"
        options={dataProvider}
        class="oj-form-control-max-width-md"
        onvalueChanged={handleProviderChanged}
      ></oj-combobox-one>
    </div>
  );
}
