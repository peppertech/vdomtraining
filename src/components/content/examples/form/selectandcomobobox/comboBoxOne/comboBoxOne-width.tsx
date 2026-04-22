import { h } from "preact";
import { useMemo } from "preact/hooks";
import "ojs/ojformlayout";
import "ojs/ojselectcombobox";
import { createBrowserDataProvider } from "./comboBoxOne-shared";

export default function ComboboxOneWidthExample() {
  const dataProvider = useMemo(() => createBrowserDataProvider(), []);

  return (
    <div id="comboboxOneWidth">
      <oj-form-layout maxColumns={2} direction="row" labelEdge="top">
        <oj-combobox-one
          value="Chrome"
          labelHint="Fixed width"
          options={dataProvider}
          style="width: 18rem;"
        />
        <oj-combobox-one
          value="Chrome"
          labelHint="Full width"
          options={dataProvider}
          style="width: 100%;"
        />
        <oj-combobox-one
          value="Chrome"
          labelHint="Framework max width"
          options={dataProvider}
          class="oj-form-control-max-width-md"
        />
        <oj-combobox-one
          value="Chrome"
          labelHint="Large max width"
          options={dataProvider}
          class="oj-form-control-max-width-lg"
        />
      </oj-form-layout>
    </div>
  );
}
