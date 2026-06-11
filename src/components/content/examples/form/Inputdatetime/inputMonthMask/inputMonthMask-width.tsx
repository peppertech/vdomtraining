import { h, type ComponentProps } from 'preact';
import { useCallback, useState } from "preact/hooks";
import "oj-c/form-layout";
import "oj-c/input-month-mask";
import "oj-c/radioset";
import {
  labelEdgeOptions,
  todayMonthValue,
  type RadiosetValueChangedEvent,
} from "./inputMonthMask-shared";

export default function InputMonthMaskWidthExample() {
  const [labelEdge, setLabelEdge] = useState("inside");

  const handleLabelEdgeChanged = useCallback(
    (event: RadiosetValueChangedEvent) => {
      setLabelEdge(String(event.detail.value ?? "inside"));
    },
    [],
  );

  return (
    <div id="inputMonthMaskWidthDemo">
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
      <oj-c-input-month-mask
        id="id1"
        labelEdge={labelEdge as ComponentProps<'oj-c-input-month-mask'>['labelEdge']}
        labelHint="width and max-width attributes are not defined"
        help={{ instruction: "The width and max-width are 100% by default" }}
        userAssistanceDensity="efficient"
        value={todayMonthValue}
      />

      <h6>max-width attribute</h6>
      <div class="oj-flex oj-sm-padding-2x-vertical">
        <oj-c-input-month-mask
          id="id2"
          labelEdge={labelEdge as ComponentProps<'oj-c-input-month-mask'>['labelEdge']}
          labelHint="Max width medium"
          maxWidth="md"
          value={todayMonthValue}
        />
      </div>
      <div class="oj-flex oj-sm-padding-2x-vertical">
        <oj-c-input-month-mask
          id="id3"
          labelEdge={labelEdge as ComponentProps<'oj-c-input-month-mask'>['labelEdge']}
          labelHint="Max width small"
          maxWidth="sm"
          value={todayMonthValue}
        />
      </div>

      <h6>width attribute</h6>
      <div class="oj-flex oj-sm-padding-2x-vertical">
        <oj-c-input-month-mask
          id="id4"
          labelEdge={labelEdge as ComponentProps<'oj-c-input-month-mask'>['labelEdge']}
          labelHint="Width medium"
          width="md"
          value={todayMonthValue}
        />
      </div>
      <div class="oj-flex oj-sm-padding-2x-vertical">
        <oj-c-input-month-mask
          id="id5"
          labelEdge={labelEdge as ComponentProps<'oj-c-input-month-mask'>['labelEdge']}
          labelHint="Width small"
          width="sm"
          value={todayMonthValue}
        />
      </div>

      <h6>custom width and max-width</h6>
      <div class="oj-flex oj-sm-padding-2x-vertical">
        <oj-c-input-month-mask
          id="id6"
          labelEdge={labelEdge as ComponentProps<'oj-c-input-month-mask'>['labelEdge']}
          labelHint="Width 50% MaxWidth 400px"
          maxWidth="400px"
          width="50%"
          value={todayMonthValue}
        />
      </div>

      <h6>Inside oj-c-form-layout, no width or max-width</h6>
      <oj-c-form-layout>
        <oj-c-input-month-mask
          id="id7"
          labelEdge={labelEdge as ComponentProps<'oj-c-input-month-mask'>['labelEdge']}
          labelHint="width and max-width attributes are not defined"
          help={{
            instruction:
              "The width is driven by the oj-c-form-layout column width",
          }}
          value={todayMonthValue}
        />
      </oj-c-form-layout>
    </div>
  );
}
