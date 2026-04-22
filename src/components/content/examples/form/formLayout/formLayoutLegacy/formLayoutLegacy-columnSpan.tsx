import { h } from "preact";
import { useMemo, useState } from "preact/hooks";
import "ojs/ojformlayout";
import "ojs/ojinputtext";
import "ojs/ojlabelvalue";
import "ojs/ojradioset";
import { createDataProvider } from "./formLayoutLegacy-shared";

const behaviorOptions = [
  { value: "0", label: 'Responsive, max-columns="3"' },
  { value: "3", label: 'Fixed, columns="3"' },
];

export default function FormLayoutLegacyColumnSpanExample() {
  const behaviorProvider = useMemo(
    () => createDataProvider(behaviorOptions),
    [],
  );
  const [currentBehavior, setCurrentBehavior] = useState("0");

  return (
    <div id="form-container" class="oj-flex oj-sm-flex-direction-column oj-sm-gap-4x">
      <oj-radioset
        labelHint="Form Layout Behavior"
        labelEdge="inside"
        value={currentBehavior}
        options={behaviorProvider}
        onvalueChanged={(event) => {
          setCurrentBehavior(String(event.detail.value));
        }}
      />

      <p>
        Demo width in the current screen range. Column spanning is applied by{" "}
        <code>oj-label-value</code> inside <code>oj-form-layout</code>.
      </p>

      <oj-form-layout
        labelEdge="inside"
        colspanWrap="wrap"
        maxColumns={3}
        columns={parseInt(currentBehavior, 10)}
        direction="row"
      >
        <oj-input-text labelHint="Field 1" />
        <oj-input-text labelHint="Field 2" />
        <oj-input-text labelHint="Field 3" />
        <oj-label-value colspan={3}>
          <oj-input-text slot="value" labelHint="Field 4" value="<oj-label-value colspan='3'>" />
        </oj-label-value>
        <oj-input-text labelHint="Field 5" />
        <oj-label-value colspan={3}>
          <oj-input-text slot="value" labelHint="Field 6" value="<oj-label-value colspan='3'>" />
        </oj-label-value>
        <oj-input-text labelHint="Field 7" />
        <oj-input-text labelHint="Field 8" />
        <oj-label-value colspan={3}>
          <oj-input-text slot="value" labelHint="Field 9" value="<oj-label-value colspan='3'>" />
        </oj-label-value>
        <oj-label-value colspan={2}>
          <oj-input-text slot="value" labelHint="Field 10" value="<oj-label-value colspan='2'>" />
        </oj-label-value>
        <oj-input-text labelHint="Field 11" />
      </oj-form-layout>
    </div>
  );
}
