import "oj-c/form-layout";
import "oj-c/input-number";
import "oj-c/radioset";
import 'preact';
import { useCallback,useState } from "preact/hooks";
import {
  labelEdgeOptions,
  type RadiosetValueChangedEvent,
  type VisibleInputNumberLabelEdge,
} from "./inputNumberCorePack-shared";

export default function InputNumberCorePackWidthExample() {
  const [labelEdge, setLabelEdge] =
    useState<VisibleInputNumberLabelEdge>("inside");

  const handleLabelEdgeChanged = useCallback(
    (event: RadiosetValueChangedEvent) => {
      setLabelEdge(
        (event.detail.value ?? "inside") as VisibleInputNumberLabelEdge,
      );
    },
    [],
  );

  return (
    <div id="inputNumberCorePackWidth">
      <h6>Options To Control the Form Controls Below</h6>
      <div class="oj-panel oj-bg-info-30 oj-sm-margin-4x-bottom">
        <oj-c-form-layout id="formLayoutOptions" maxColumns={4} direction="row">
          <oj-c-radioset
            value={labelEdge}
            labelHint="Label Edge"
            aria-controls="formLayoutOptions"
            options={labelEdgeOptions}
            onvalueChanged={handleLabelEdgeChanged}
          />
        </oj-c-form-layout>
      </div>

      <h6>no width or max-width</h6>
      <oj-c-input-number
        id="id1"
        labelEdge={labelEdge}
        labelHint="width and max-width attributes are not defined"
        help={{ instruction: "The width and max-width are 100% by default" }}
        userAssistanceDensity="efficient"
        value={2025}
      />

      <h6>max-width attribute</h6>
      <div class="oj-flex oj-sm-padding-2x-vertical">
        <oj-c-input-number
          id="id2"
          labelEdge={labelEdge}
          labelHint="Max width medium"
          maxWidth="md"
          value={2025}
        />
      </div>
      <div class="oj-flex oj-sm-padding-2x-vertical">
        <oj-c-input-number
          id="id3"
          labelEdge={labelEdge}
          labelHint="Max width small"
          maxWidth="sm"
          value={2025}
        />
      </div>

      <h6>width attribute</h6>
      <div class="oj-flex oj-sm-padding-2x-vertical">
        <oj-c-input-number
          id="id4"
          labelEdge={labelEdge}
          labelHint="Width medium"
          width="md"
          value={2025}
        />
      </div>
      <div class="oj-flex oj-sm-padding-2x-vertical">
        <oj-c-input-number
          id="id5"
          labelEdge={labelEdge}
          labelHint="Width small"
          width="sm"
          value={2025}
        />
      </div>

      <h6>custom width and max-width</h6>
      <div class="oj-flex oj-sm-padding-2x-vertical">
        <oj-c-input-number
          id="id6"
          labelEdge={labelEdge}
          labelHint="Width 50% MaxWidth 400px"
          maxWidth="400px"
          width="50%"
          value={2025}
        />
      </div>

      <h6>Inside oj-c-form-layout, no width or max-width</h6>
      <oj-c-form-layout>
        <oj-c-input-number
          id="id7"
          labelEdge={labelEdge}
          labelHint="width and max-width attributes are not defined"
          help={{
            instruction:
              "The width is driven by the oj-c-form-layout column width",
          }}
          value={2025}
        />
      </oj-c-form-layout>
    </div>
  );
}
