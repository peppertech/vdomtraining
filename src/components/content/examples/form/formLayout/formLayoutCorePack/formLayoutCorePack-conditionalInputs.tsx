import { h } from "preact";
import { useState } from "preact/hooks";
import "oj-c/button";
import "oj-c/collapsible";
import "oj-c/form-layout";
import "oj-c/input-text";
import "oj-c/radioset";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");

const directionDataProvider = new MutableArrayDataProvider(
  [
    { value: "row", label: "Row" },
    { value: "column", label: "Column" },
  ],
  { keyAttributes: "value" },
);

const columnsDataProvider = new MutableArrayDataProvider(
  [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
  ],
  { keyAttributes: "value" },
);

const labelEdgeDataProvider = new MutableArrayDataProvider(
  [
    { value: "top", label: "Top" },
    { value: "start", label: "Start" },
    { value: "inside", label: "Inside" },
  ],
  { keyAttributes: "value" },
);

export default function FormLayoutCorePackConditionalInputsExample() {
  const [showEmail, setShowEmail] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [direction, setDirection] = useState<"row" | "column">("row");
  const [columns, setColumns] = useState("3");
  const [labelEdge, setLabelEdge] = useState<"top" | "start" | "inside">(
    "top",
  );
  const layoutColumns = columns === "1" ? 1 : columns === "2" ? 2 : columns === "4" ? 4 : 3;

  return (
    <div class="oj-flex oj-sm-flex-direction-column oj-sm-gap-4x">
      <oj-c-collapsible expanded={true}>
        <h6 slot="header">Form Layout Options</h6>
        <div class="oj-panel oj-bg-info-30">
          <oj-c-form-layout maxColumns={3} direction="row">
            <oj-c-radioset
              labelHint="Direction"
              value={direction}
              options={directionDataProvider}
              onvalueChanged={(event) => {
                setDirection(event.detail.value as "row" | "column");
              }}
            />
            <oj-c-radioset
              labelHint="Columns"
              value={columns}
              options={columnsDataProvider}
              onvalueChanged={(event) => {
                setColumns(String(event.detail.value));
              }}
            />
            <oj-c-radioset
              labelHint="Label Edge"
              value={labelEdge}
              options={labelEdgeDataProvider}
              onvalueChanged={(event) => {
                setLabelEdge(event.detail.value as "top" | "start" | "inside");
              }}
            />
          </oj-c-form-layout>
        </div>
      </oj-c-collapsible>

      <oj-c-form-layout
        maxColumns={layoutColumns}
        direction={direction}
        labelEdge={labelEdge}
      >
        <oj-c-input-text
          labelHint="Name"
          value={name}
          onvalueChanged={(event) => {
            setName(String(event.detail.value ?? ""));
          }}
        />
        {showEmail ? (
          <oj-c-input-text
            labelHint="Email"
            value={email}
            onvalueChanged={(event) => {
              setEmail(String(event.detail.value ?? ""));
            }}
          />
        ) : null}
        <oj-c-input-text
          labelHint="Phone"
          value={phone}
          onvalueChanged={(event) => {
            setPhone(String(event.detail.value ?? ""));
          }}
        />
      </oj-c-form-layout>

      <div>
        <oj-c-button
          label={showEmail ? "Hide Email Field" : "Show Email Field"}
          onojAction={() => {
            setShowEmail((value) => !value);
          }}
        />
      </div>
    </div>
  );
}
