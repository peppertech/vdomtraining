import "ojs/ojformlayout";
import "ojs/ojselectcombobox";
import 'preact';
import { useMemo } from "preact/hooks";
import { createBrowserDataProvider } from "./selectMany-shared";

export default function SelectManyWidthExample() {
  const dataProvider = useMemo(() => createBrowserDataProvider(), []);

  return (
    <div id="selectManyWidth">
      <oj-form-layout maxColumns={2} direction="row" labelEdge="top">
        <oj-select-many
          value={["Chrome", "Safari"]}
          labelHint="Fixed width"
          options={dataProvider}
          style="width: 18rem;"
        />
        <oj-select-many
          value={["Chrome", "Safari"]}
          labelHint="Full width"
          options={dataProvider}
          style="width: 100%;"
        />
        <oj-select-many
          value={["Chrome", "Safari"]}
          labelHint="Framework max width"
          options={dataProvider}
          class="oj-form-control-max-width-md"
        />
        <oj-select-many
          value={["Chrome", "Safari"]}
          labelHint="Large max width"
          options={dataProvider}
          class="oj-form-control-max-width-lg"
        />
      </oj-form-layout>
    </div>
  );
}
