import "ojs/ojformlayout";
import "ojs/ojinputnumber";
import "ojs/ojselectcombobox";
import 'preact';
import { useMemo,useState } from "preact/hooks";
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
          onvalueChanged={(event) =>
            setMaximumResultCount((event.detail.value as number | null | undefined) ?? 15)
          }
        ></oj-input-number>
        <oj-combobox-one
          value={value}
          labelHint="States"
          labelEdge="inside"
          options={dataProvider}
          maximumResultCount={maximumResultCount}
          class="oj-form-control-max-width-lg"
          onvalueChanged={(event) => setValue((event.detail.value as string | null | undefined) ?? "")}
        ></oj-combobox-one>
      </oj-form-layout>
    </div>
  );
}
