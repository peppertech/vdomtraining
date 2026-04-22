import { h } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "ojs/ojselectcombobox";
import { createGroupedStatesDataProvider } from "./selectMany-shared";

export default function SelectManyGroupingExample() {
  const dataProvider = useMemo(() => createGroupedStatesDataProvider(), []);
  const [inlineValue, setInlineValue] = useState<string[]>(["AK", "CA"]);
  const [providerValue, setProviderValue] = useState<string[]>(["AK", "CA"]);

  return (
    <div id="selectManyGrouping">
      <h4>Inline groups</h4>
      <oj-select-many
        value={inlineValue}
        labelHint="Inline optgroups"
        labelEdge="inside"
        class="oj-form-control-max-width-lg"
        onvalueChanged={(event: any) => setInlineValue(event.detail.value ?? [])}
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
      </oj-select-many>

      <h4 class="oj-sm-margin-6x-top">ArrayTreeDataProvider</h4>
      <oj-select-many
        value={providerValue}
        labelHint="Hierarchical data provider"
        labelEdge="inside"
        options={dataProvider}
        class="oj-form-control-max-width-lg"
        onvalueChanged={(event: any) => setProviderValue(event.detail.value ?? [])}
      ></oj-select-many>
    </div>
  );
}
