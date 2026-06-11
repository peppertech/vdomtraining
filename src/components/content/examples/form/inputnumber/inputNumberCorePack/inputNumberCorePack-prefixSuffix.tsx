import { h, type ComponentProps } from 'preact';
import { useMemo, useState } from "preact/hooks";
import "oj-c/form-layout";
import "oj-c/input-number";
import "oj-c/radioset";
import {
  labelEdgeOptions,
  stateOptions,
  textAlignOptions,
  valueOptions,
  type RadiosetValueChangedEvent,
  type VisibleInputNumberLabelEdge,
} from "./inputNumberCorePack-shared";

export default function InputNumberCorePackPrefixSuffixExample() {
  const [labelEdge, setLabelEdge] =
    useState<VisibleInputNumberLabelEdge>("inside");
  const [formState, setFormState] = useState("enabled");
  const [valueEnabled, setValueEnabled] = useState("yes");
  const [textAlignState, setTextAlignState] = useState("none");

  const disabledControls = formState === "disabled";
  const readonlyControls = formState === "readonly";
  const showValue = valueEnabled === "yes";
  const textAlignValue = useMemo(
    () => (textAlignState === "none" ? undefined : textAlignState),
    [textAlignState],
  );

  const handleValue =
    (setter: (value: string) => void) =>
    (event: RadiosetValueChangedEvent) => {
      setter(String(event.detail.value ?? ""));
    };

  return (
    <div id="inputNumberCorePackPrefixSuffix">
      <div class="oj-sm-margin-4x-bottom oj-panel oj-bg-info-30">
        <h6>Options To Control The Form Below</h6>
        <oj-c-form-layout direction="row" maxColumns={4}>
          <oj-c-radioset
            value={labelEdge}
            aria-controls="myform"
            labelHint="Label Edge"
            options={labelEdgeOptions}
            onvalueChanged={(event: RadiosetValueChangedEvent) => {
              setLabelEdge(
                (event.detail.value ?? "inside") as VisibleInputNumberLabelEdge,
              );
            }}
          />
          <oj-c-radioset
            id="severityCheckboxButtonSet"
            value={formState}
            aria-controls="myform"
            labelHint="State"
            options={stateOptions}
            onvalueChanged={handleValue(setFormState)}
          />
          <oj-c-radioset
            id="valueradio"
            value={valueEnabled}
            aria-controls="myform"
            labelHint="Value"
            options={valueOptions}
            onvalueChanged={handleValue(setValueEnabled)}
          />
          <oj-c-radioset
            id="textalignradio"
            value={textAlignState}
            aria-controls="myform"
            labelHint="Text Align"
            options={textAlignOptions}
            onvalueChanged={handleValue(setTextAlignState)}
          />
        </oj-c-form-layout>
      </div>

      <oj-c-form-layout
        id="myform"
        labelEdge={labelEdge}
        readonly={readonlyControls}
      >
        <h4>Prefix</h4>
        <oj-c-input-number
          id="prefix"
          value={showValue ? 10000 : null}
          labelHint="Price"
          disabled={disabledControls}
          textAlign={textAlignValue as ComponentProps<'oj-c-input-number'>['textAlign']}
          inputPrefix="$"
        />

        <h4>Suffix</h4>
        <oj-c-input-number
          labelHint="Weight"
          value={showValue ? 155 : null}
          disabled={disabledControls}
          textAlign={textAlignValue as ComponentProps<'oj-c-input-number'>['textAlign']}
          inputSuffix="lbs"
        />
      </oj-c-form-layout>
    </div>
  );
}
