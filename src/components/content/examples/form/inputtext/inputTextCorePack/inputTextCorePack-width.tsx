import { h, type ComponentProps } from "preact";
import { useCallback, useState } from "preact/hooks";
import "oj-c/form-layout";
import "oj-c/input-text";
import "oj-c/radioset";

import {
  labelEdgeOptions,
  type VisibleInputTextLabelEdge,
} from "./inputTextCorePack-shared";

type LabelEdgeEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-radioset">["onvalueChanged"]>
>[0];
export default function InputTextCorePackWidthExample() {
  const [labelEdge, setLabelEdge] = useState<VisibleInputTextLabelEdge>("inside");

  const handleLabelEdgeChanged = useCallback((event: LabelEdgeEvent) => {
    setLabelEdge((event.detail.value as VisibleInputTextLabelEdge | null | undefined) ?? "inside");
  }, []);

  return (
    <div id="form-container">
      <h6>Options To Control the Form Controls Below</h6>
      <div class="oj-panel oj-bg-info-30 oj-sm-margin-4x-bottom">
        <oj-c-form-layout id="formLayoutOptions" maxColumns={4} direction="row">
          <oj-c-radioset
            value={labelEdge}
            labelHint="Label Edge"
            aria-controls="formLayoutOptions"
            options={labelEdgeOptions}
            onvalueChanged={handleLabelEdgeChanged}
          ></oj-c-radioset>
        </oj-c-form-layout>
      </div>

      <h6>no width or max-width</h6>
      <oj-c-input-text
        labelEdge={labelEdge}
        labelHint="width and max-width attributes are not defined"
        help={{ instruction: "The width and max-width are 100% by default" }}
        userAssistanceDensity="efficient"
        value="text"
      ></oj-c-input-text>

      <h6>max-width attribute</h6>
      <div class="oj-flex oj-sm-padding-2x-vertical">
        <oj-c-input-text
          labelEdge={labelEdge}
          labelHint="Max width medium"
          maxWidth="md"
          value="text"
        ></oj-c-input-text>
      </div>
      <div class="oj-flex oj-sm-padding-2x-vertical">
        <oj-c-input-text
          labelEdge={labelEdge}
          labelHint="Max width small"
          maxWidth="sm"
          value="text"
        ></oj-c-input-text>
      </div>

      <h6>width attribute</h6>
      <div class="oj-flex oj-sm-padding-2x-vertical">
        <oj-c-input-text
          labelEdge={labelEdge}
          labelHint="Width medium"
          width="md"
          value="text"
        ></oj-c-input-text>
      </div>
      <div class="oj-flex oj-sm-padding-2x-vertical">
        <oj-c-input-text
          labelEdge={labelEdge}
          labelHint="Width small"
          width="sm"
          value="text"
        ></oj-c-input-text>
      </div>

      <h6>custom width and max-width</h6>
      <div class="oj-flex oj-sm-padding-2x-vertical">
        <oj-c-input-text
          labelEdge={labelEdge}
          labelHint="Width 50% MaxWidth 400px"
          width="50%"
          maxWidth="400px"
          value="text"
        ></oj-c-input-text>
      </div>

      <h6>Inside oj-c-form-layout, no width or max-width</h6>
      <oj-c-form-layout>
        <oj-c-input-text
          labelEdge={labelEdge}
          labelHint="width and max-width attributes are not defined"
          help={{
            instruction: "The width is driven by the oj-c-form-layout column width",
          }}
          value="text"
        ></oj-c-input-text>
      </oj-c-form-layout>
    </div>
  );
}
