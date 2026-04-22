import { h } from "preact";
import { useMemo, useState } from "preact/hooks";
import "ojs/ojformlayout";
import "ojs/ojinputnumber";
import "ojs/ojselectcombobox";
import { createStatesDataProvider } from "./comboBoxOne-shared";

export default function ComboboxOneMaximumResultCountExample() {
  const dataProvider = useMemo(() => createStatesDataProvider(), []);
  const [value, setValue] = useState("AK");
  const [maximumResultCount, setMaximumResultCount] = useState(15);

  return (
    <div id="comboboxOneMaximumResultCount">
      <oj-form-layout maxColumns={2} direction="row">
        <oj-input-number
          value={maximumResultCount}
          min={1}
          max={60}
          step={1}
          labelHint="Maximum result count"
          onvalueChanged={(event: any) =>
            setMaximumResultCount(event.detail.value ?? 15)
          }
        ></oj-input-number>
        <oj-combobox-one
          value={value}
          labelHint="States"
          labelEdge="inside"
          options={dataProvider}
          maximumResultCount={maximumResultCount}
          class="oj-form-control-max-width-lg"
          onvalueChanged={(event: any) => setValue(event.detail.value ?? "")}
        ></oj-combobox-one>
      </oj-form-layout>
    </div>
  );
}
