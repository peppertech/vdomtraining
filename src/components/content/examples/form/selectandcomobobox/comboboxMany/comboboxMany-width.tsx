import "ojs/ojformlayout";
import "ojs/ojselectcombobox";
import 'preact';
import { useMemo } from "preact/hooks";
import { createBrowserDataProvider } from "./comboboxMany-shared";

export default function ComboboxManyWidthExample() {
  const dataProvider = useMemo(() => createBrowserDataProvider(), []);

  return (
    <div id="comboboxManyWidth">
      <oj-form-layout maxColumns={2} direction="row" labelEdge="top">
        <oj-combobox-many
          value={["CH", "SA"]}
          labelHint="Fixed width"
          options={dataProvider}
          style="width: 18rem;"
        />
        <oj-combobox-many
          value={["CH", "SA"]}
          labelHint="Full width"
          options={dataProvider}
          style="width: 100%;"
        />
        <oj-combobox-many
          labelHint="Max width class"
          options={dataProvider}
          class="oj-form-control-max-width-md"
        />
        <oj-combobox-many
          labelHint="Wide max width class"
          options={dataProvider}
          class="oj-form-control-max-width-lg"
        />
      </oj-form-layout>
    </div>
  );
}
