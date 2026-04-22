import { h } from "preact";
import { useState } from "preact/hooks";
import "oj-c/checkbox";
import "oj-c/checkboxset";
import "oj-c/form-layout";
import "oj-c/input-date-mask";
import "oj-c/input-date-picker";
import "oj-c/input-date-text";
import "oj-c/input-month-mask";
import "oj-c/input-number";
import "oj-c/input-password";
import "oj-c/input-sensitive-text";
import "oj-c/input-text";
import "oj-c/input-time-mask";
import "oj-c/radioset";
import "oj-c/select-multiple";
import "oj-c/select-single";
import "oj-c/text-area";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");

const labelEdgeDataProvider = new MutableArrayDataProvider(
  [
    { value: "inside", label: "Inside" },
    { value: "start", label: "Start" },
    { value: "top", label: "Top" },
  ],
  { keyAttributes: "value" },
);

const browserDataProvider = new MutableArrayDataProvider(
  [
    { value: "CH", label: "Chrome" },
    { value: "SA", label: "Safari" },
    { value: "FF", label: "Firefox" },
  ],
  { keyAttributes: "value" },
);

const colorOptions = new MutableArrayDataProvider(
  [
    { value: "blueopt", label: "Blue" },
    { value: "greenopt", label: "Green" },
    { value: "redopt", label: "Red" },
  ],
  { keyAttributes: "value" },
);

export default function FormLayoutCorePackFormInputsMixedExample() {
  const [labelEdge, setLabelEdge] = useState<"inside" | "start" | "top">(
    "inside",
  );

  return (
    <div class="oj-flex oj-sm-flex-direction-column oj-sm-gap-4x">
      <div class="oj-panel oj-bg-info-30">
        <oj-c-form-layout maxColumns={3} direction="row">
          <oj-c-radioset
            labelHint="Label Edge"
            value={labelEdge}
            options={labelEdgeDataProvider}
            onvalueChanged={(event) => {
              setLabelEdge(event.detail.value as "inside" | "start" | "top");
            }}
          />
        </oj-c-form-layout>
      </div>

      <oj-c-form-layout maxColumns={3} direction="row" labelEdge={labelEdge}>
        <oj-c-input-text labelHint="Input Text" value="text" />
        <oj-c-input-text
          labelHint="Input Text (readonly)"
          value="text"
          readonly={true}
        />
        <oj-c-input-password labelHint="Password" value="secret123" />
        <oj-c-input-sensitive-text
          labelHint="Sensitive Text (readonly)"
          value="secret123"
          readonly={true}
        />
        <oj-c-input-number labelHint="Number" value={10} />
        <oj-c-input-date-text labelHint="Date Text (readonly)" value="2026-03-19" readonly={true} />
        <oj-c-input-date-mask labelHint="Date Mask" value="2026-03-19" />
        <oj-c-input-date-picker
          labelHint="Date Picker"
          value="2026-03-19"
          readonly={true}
        />
        <oj-c-input-month-mask
          labelHint="Month Mask"
          value={{ year: 2026, month: 3 } as { year: 2026; month: 3 }}
        />
        <oj-c-input-time-mask labelHint="Time Mask" value={"T15:00:00.000"} />
        <oj-c-select-single
          labelHint="Select Single"
          data={browserDataProvider}
          itemText="label"
          value="CH"
        />
        <oj-c-select-multiple
          labelHint="Select Multiple (readonly)"
          data={browserDataProvider}
          itemText="label"
          value={new Set(["CH", "SA"])}
          readonly={true}
        />
        <oj-c-text-area
          labelHint="Text Area"
          rows={4}
          value="Textarea values stay aligned with other enabled fields in mixed mode."
        />
        <oj-c-radioset
          labelHint="Radioset"
          options={colorOptions}
          value="blueopt"
        />
        <oj-c-checkboxset
          labelHint="Checkboxset (readonly)"
          options={colorOptions}
          value={["greenopt"]}
          readonly={true}
        />
        <oj-c-checkbox value={true}>Checkbox</oj-c-checkbox>
        <oj-c-checkbox value={false} readonly={true}>
          Checkbox (readonly)
        </oj-c-checkbox>
      </oj-c-form-layout>
    </div>
  );
}
