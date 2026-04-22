import { h } from "preact";
import { useMemo, useState } from "preact/hooks";
import "oj-c/form-layout";
import "oj-c/input-text";
import "oj-c/radioset";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");

const behaviorDataProvider = new MutableArrayDataProvider(
  [
    { value: "0", label: 'Responsive, max-columns="3"' },
    { value: "3", label: 'Fixed, columns="3"' },
  ],
  { keyAttributes: "value" },
);

export default function FormLayoutCorePackColumnSpanExample() {
  const [currentBehavior, setCurrentBehavior] = useState("0");
  const currentColumns = useMemo(
    () => (currentBehavior === "3" ? 3 : 0),
    [currentBehavior],
  );

  return (
    <div class="oj-flex oj-sm-flex-direction-column oj-sm-gap-4x">
      <oj-c-radioset
        id="formLayoutBehavior"
        labelHint="Form Layout Behavior"
        labelEdge="inside"
        options={behaviorDataProvider}
        value={currentBehavior}
        onvalueChanged={(event) => {
          setCurrentBehavior(String(event.detail.value));
        }}
      />

      <oj-c-form-layout
        labelEdge="inside"
        maxColumns={3}
        columns={currentColumns}
        direction="row"
      >
        <oj-c-input-text labelHint="Field 1" />
        <oj-c-input-text labelHint="Field 2" />
        <oj-c-input-text labelHint="Field 3" />
        <oj-c-input-text
          labelHint="Field 4"
          value="columnSpan='3'"
          columnSpan={3}
        />
        <oj-c-input-text labelHint="Field 5" />
        <oj-c-input-text
          labelHint="Field 6"
          value="columnSpan='2'"
          columnSpan={2}
        />
        <oj-c-input-text labelHint="Field 7" />
        <oj-c-input-text labelHint="Field 8" />
        <oj-c-input-text labelHint="Field 9" />
        <oj-c-input-text
          labelHint="Field 10"
          value="columnSpan='3'"
          columnSpan={3}
        />
      </oj-c-form-layout>
    </div>
  );
}
