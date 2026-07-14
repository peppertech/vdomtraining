import "oj-c/form-layout";
import "oj-c/radioset";
import "oj-c/text-area";
import { useCallback,useState } from "preact/hooks";

import {
  labelEdgeOptions,
  longValue,
  type RadiosetValueChangedEvent,
  type TextAreaLabelEdge,
} from "./textAreaCorePack-shared";

export default function TextAreaCorePackWidthExample() {
  const [labelEdge, setLabelEdge] = useState<TextAreaLabelEdge>("inside");

  const handleLabelEdgeChanged = useCallback(
    (event: RadiosetValueChangedEvent) => {
      setLabelEdge(event.detail.value as TextAreaLabelEdge);
    },
    [],
  );

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
          />
        </oj-c-form-layout>
      </div>

      <h6>no width or max-width</h6>
      <oj-c-text-area
        labelEdge={labelEdge}
        labelHint="width and max-width attributes are not defined"
        help={{ instruction: "The width and max-width are 100% by default" }}
        userAssistanceDensity="efficient"
        value={longValue}
      />

      <h6>max-width attribute</h6>
      <div class="oj-flex oj-sm-padding-2x-vertical">
        <oj-c-text-area
          labelEdge={labelEdge}
          labelHint="Max width medium"
          maxWidth="md"
          value={longValue}
        />
      </div>
      <div class="oj-flex oj-sm-padding-2x-vertical">
        <oj-c-text-area
          labelEdge={labelEdge}
          labelHint="Max width small"
          maxWidth="sm"
          value={longValue}
        />
      </div>

      <h6>width attribute</h6>
      <div class="oj-flex oj-sm-padding-2x-vertical">
        <oj-c-text-area
          labelEdge={labelEdge}
          labelHint="Width medium"
          width="md"
          value={longValue}
        />
      </div>
      <div class="oj-flex oj-sm-padding-2x-vertical">
        <oj-c-text-area
          labelEdge={labelEdge}
          labelHint="Width small"
          width="sm"
          value={longValue}
        />
      </div>

      <h6>custom width and max-width</h6>
      <div class="oj-flex oj-sm-padding-2x-vertical">
        <oj-c-text-area
          labelEdge={labelEdge}
          labelHint="Width 50% MaxWidth 400px"
          width="50%"
          maxWidth="400px"
          value={longValue}
        />
      </div>

      <h6>Inside oj-c-form-layout, no width or max-width</h6>
      <oj-c-form-layout>
        <oj-c-text-area
          labelEdge={labelEdge}
          labelHint="width and max-width attributes are not defined"
          help={{ instruction: "The width is driven by the oj-c-form-layout column width" }}
          value={longValue}
        />
      </oj-c-form-layout>
    </div>
  );
}
