import { h, type ComponentProps } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "ojs/ojselectcombobox";
import { createGroupedStatesDataProvider } from "./comboBoxOne-shared";

type ValueChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-combobox-one">["onvalueChanged"]>
>[0];

export default function ComboboxOneGroupingExample() {
  const dataProvider = useMemo(() => createGroupedStatesDataProvider(), []);
  const [inlineValue, setInlineValue] = useState("CA");
  const [providerValue, setProviderValue] = useState("AK");

  const handleInlineChanged = useCallback((event: ValueChangedEvent) => {
    setInlineValue((event.detail.value as string | null | undefined) ?? "");
  }, []);

  const handleProviderChanged = useCallback((event: ValueChangedEvent) => {
    setProviderValue((event.detail.value as string | null | undefined) ?? "");
  }, []);

  return (
    <div id="comboboxOneGrouping">
      <h4>Inline groups</h4>
      <oj-combobox-one
        value={inlineValue}
        labelHint="Inline optgroups"
        labelEdge="inside"
        class="oj-form-control-max-width-lg"
        onvalueChanged={handleInlineChanged}
      >
        <oj-optgroup label="North America">
          <oj-option value="AK">Alaska</oj-option>
          <oj-option value="CA">California</oj-option>
          <oj-option value="MA">Massachusetts</oj-option>
        </oj-optgroup>
        <oj-optgroup label="Europe">
          <oj-option value="FR">France</oj-option>
          <oj-option value="DE">Germany</oj-option>
          <oj-option value="ES">Spain</oj-option>
        </oj-optgroup>
        <oj-optgroup label="APAC">
          <oj-option value="IN">India</oj-option>
          <oj-option value="PK">Pakistan</oj-option>
          <oj-option value="BAN">Bangaladesh</oj-option>
        </oj-optgroup>
      </oj-combobox-one>
      

      <h4 class="oj-sm-margin-6x-top">ArrayTreeDataProvider</h4>
      <oj-combobox-one
        value={providerValue}
        labelHint="Hierarchical data provider"
        labelEdge="inside"
        options={dataProvider}
        class="oj-form-control-max-width-lg"
        onvalueChanged={handleProviderChanged}
      ></oj-combobox-one>
    </div>
  );
}
