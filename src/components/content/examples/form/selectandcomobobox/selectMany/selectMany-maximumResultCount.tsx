import { h } from "preact";
import { useMemo, useState } from "preact/hooks";
import "ojs/ojformlayout";
import "ojs/ojinputnumber";
import "ojs/ojselectcombobox";
import { createStatesDataProvider } from "./selectMany-shared";

export default function SelectManyMaximumResultCountExample() {
  const dataProvider = useMemo(() => createStatesDataProvider(), []);
  const [value, setValue] = useState<string[]>(["AK"]);
  const [maximumResultCount, setMaximumResultCount] = useState(15);

  return (
    <div id="selectManyMaximumResultCount">
      <oj-form-layout maxColumns={2} direction="row">
        <oj-input-number
          value={maximumResultCount}
          min={1}
          max={60}
          step={1}
          labelHint="Maximum result count"
          onvalueChanged={(event) =>
            setMaximumResultCount((event.detail.value as number | null | undefined) ?? 15)
          }
        ></oj-input-number>
        <oj-select-many
          value={value}
          labelHint="States"
          labelEdge="inside"
          options={dataProvider}
          maximumResultCount={maximumResultCount}
          class="oj-form-control-max-width-lg"
          onvalueChanged={(event) => setValue((event.detail.value as string[] | null | undefined) ?? [])}
        ></oj-select-many>
      </oj-form-layout>
    </div>
  );
}
