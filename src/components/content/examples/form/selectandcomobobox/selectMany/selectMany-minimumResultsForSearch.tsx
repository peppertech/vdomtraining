import { h } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "ojs/ojformlayout";
import "ojs/ojinputnumber";
import "ojs/ojselectcombobox";
import { createStatesDataProvider } from "./selectMany-shared";

export default function SelectManyMinimumResultsForSearchExample() {
  const dataProvider = useMemo(() => createStatesDataProvider(), []);
  const [value, setValue] = useState<string[]>(["AK", "CA"]);
  const [threshold, setThreshold] = useState(15);

  return (
    <div id="selectManyMinimumResultsForSearch">
      <oj-form-layout maxColumns={2} direction="row">
        <oj-input-number
          value={threshold}
          min={0}
          max={100}
          step={1}
          labelHint="Minimum results for search"
          onvalueChanged={(event: any) => setThreshold(event.detail.value ?? 15)}
        ></oj-input-number>
        <oj-select-many
          value={value}
          labelHint="States"
          labelEdge="inside"
          options={dataProvider}
          minimumResultsForSearch={threshold}
          class="oj-form-control-max-width-lg"
          onvalueChanged={(event: any) => setValue(event.detail.value ?? [])}
        ></oj-select-many>
      </oj-form-layout>
    </div>
  );
}
