import "oj-c/form-layout";
import "oj-c/input-text";
import "oj-c/radioset";
import 'preact';
import { useState } from "preact/hooks";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");

const labelEdgeDataProvider = new MutableArrayDataProvider(
  [
    { value: "inside", label: "Inside" },
    { value: "start", label: "Start" },
    { value: "top", label: "Top" },
  ],
  { keyAttributes: "value" },
);

export default function FormLayoutCorePackReadonlyVsMixedExample() {
  const [labelEdge, setLabelEdge] = useState<"inside" | "start" | "top">(
    "inside",
  );

  return (
    <div class="oj-flex oj-sm-flex-direction-column oj-sm-gap-4x">
      <div class="oj-panel oj-bg-info-30">
        <oj-c-form-layout maxColumns={4} direction="row">
          <oj-c-radioset
            value={labelEdge}
            labelHint="Label Edge"
            options={labelEdgeDataProvider}
            onvalueChanged={(event) => {
              setLabelEdge(event.detail.value as "inside" | "start" | "top");
            }}
          />
        </oj-c-form-layout>
      </div>

      <div>
        <h4>Mixed Readonly</h4>
        <oj-c-form-layout labelEdge={labelEdge} maxColumns={2}>
          <oj-c-input-text labelHint="First Name" value="John" />
          <oj-c-input-text
            labelHint="Last Name (readonly)"
            value="Doe"
            readonly={true}
          />
          <oj-c-input-text labelHint="Address" value="123 Anywhere Ln" columnSpan={2} />
          <oj-c-input-text labelHint="City" value="Anytown" />
          <oj-c-input-text
            labelHint="State (readonly)"
            value="CA"
            readonly={true}
          />
          <oj-c-input-text labelHint="Zip Code" value="12345-6789" />
        </oj-c-form-layout>
      </div>

      <div>
        <h4>Readonly Form Layout</h4>
        <oj-c-form-layout labelEdge={labelEdge} maxColumns={2} readonly={true}>
          <oj-c-input-text labelHint="First Name" value="John" />
          <oj-c-input-text
            labelHint="Last Name (readonly)"
            value="Doe"
            readonly={true}
          />
          <oj-c-input-text labelHint="Address" value="123 Anywhere Ln" columnSpan={2} />
          <oj-c-input-text labelHint="City" value="Anytown" />
          <oj-c-input-text
            labelHint="State (readonly)"
            value="CA"
            readonly={true}
          />
          <oj-c-input-text labelHint="Zip Code" value="12345-6789" />
        </oj-c-form-layout>
      </div>
    </div>
  );
}
