import { h } from "preact";
import { useMemo, useState } from "preact/hooks";
import "oj-c/form-layout";
import "oj-c/input-text";
import "oj-c/radioset";
import {
  labelEdgeOptions,
  stateOptions,
  textAlignOptions,
  valueOptions,
  type DemoState,
  type DemoTextAlignState,
  type DemoValueState,
  type VisibleInputTextLabelEdge,
} from "./inputTextCorePack-shared";

export default function InputTextCorePackPrefixSuffixExample() {
  const [labelEdge, setLabelEdge] = useState<VisibleInputTextLabelEdge>("inside");
  const [formState, setFormState] = useState<DemoState>("enabled");
  const [valueEnabled, setValueEnabled] = useState<DemoValueState>("yes");
  const [textAlignState, setTextAlignState] =
    useState<DemoTextAlignState>("none");

  const disableControls = formState === "disabled";
  const readonlyControls = formState === "readonly";
  const showValue = valueEnabled === "yes";
  const textAlignValue = useMemo(
    () => (textAlignState === "none" ? undefined : textAlignState),
    [textAlignState],
  );

  return (
    <div id="div1">
      <div class="oj-sm-margin-4x-bottom oj-panel oj-bg-info-30">
        <h6>Options To Control The Form Below</h6>
        <oj-c-form-layout direction="row" maxColumns={4}>
          <oj-c-radioset
            value={labelEdge}
            aria-controls="myform"
            labelHint="Label Edge"
            options={labelEdgeOptions}
            onvalueChanged={(event: any) => {
              setLabelEdge((event.detail.value ?? "inside") as VisibleInputTextLabelEdge);
            }}
          ></oj-c-radioset>
          <oj-c-radioset
            value={formState}
            aria-controls="myform"
            labelHint="State"
            options={stateOptions}
            onvalueChanged={(event: any) => {
              setFormState(event.detail.value ?? "enabled");
            }}
          ></oj-c-radioset>
          <oj-c-radioset
            value={valueEnabled}
            aria-controls="myform"
            labelHint="Value"
            options={valueOptions}
            onvalueChanged={(event: any) => {
              setValueEnabled(event.detail.value ?? "yes");
            }}
          ></oj-c-radioset>
          <oj-c-radioset
            value={textAlignState}
            aria-controls="myform"
            labelHint="Text Align"
            options={textAlignOptions}
            onvalueChanged={(event: any) => {
              setTextAlignState(event.detail.value ?? "none");
            }}
          ></oj-c-radioset>
        </oj-c-form-layout>
      </div>

      <oj-c-form-layout id="myform" labelEdge={labelEdge} readonly={readonlyControls}>
        <h4>Prefix</h4>
        <oj-c-input-text
          id="prefix"
          value={showValue ? "10,000.00" : null}
          labelHint="Price"
          disabled={disableControls}
          textAlign={textAlignValue as any}
          inputPrefix="$"
        ></oj-c-input-text>

        <h4>Suffix</h4>
        <oj-c-input-text
          value={showValue ? "155" : null}
          labelHint="Weight"
          disabled={disableControls}
          textAlign={textAlignValue as any}
          inputSuffix="lbs"
        ></oj-c-input-text>
      </oj-c-form-layout>
    </div>
  );
}
