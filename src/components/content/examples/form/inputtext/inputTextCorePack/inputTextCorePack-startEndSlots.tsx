import "oj-c/button";
import "oj-c/form-layout";
import "oj-c/input-text";
import "oj-c/radioset";
import 'preact';
import { type ComponentProps } from 'preact';
import { useMemo,useState } from "preact/hooks";
import {
  labelEdgeOptions,
  stateOptions,
  valueOptions,
  type DemoState,
  type DemoValueState,
  type VisibleInputTextLabelEdge,
} from "./inputTextCorePack-shared";

export default function InputTextCorePackStartEndSlotsExample() {
  const [labelEdge, setLabelEdge] = useState<VisibleInputTextLabelEdge>("inside");
  const [formState, setFormState] = useState<DemoState>("enabled");
  const [valueEnabled, setValueEnabled] = useState<DemoValueState>("yes");
  const [eventMessage, setEventMessage] = useState("");

  const disableControls = formState === "disabled";
  const readonlyControls = formState === "readonly";
  const showValue = valueEnabled === "yes";

  const inputValue = showValue ? "378282246310005" : null;
  const emailValue = showValue ? "joe.smith@example.com" : null;

  const endButtonSize = useMemo(
    () => (labelEdge === "top" ? "sm" : "sm"),
    [labelEdge],
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
            onvalueChanged={(event) => {
              setLabelEdge((event.detail.value ?? "inside") as VisibleInputTextLabelEdge);
            }}
          ></oj-c-radioset>
          <oj-c-radioset
            value={formState}
            aria-controls="myform"
            labelHint="State"
            options={stateOptions}
            onvalueChanged={(event) => {
              setFormState((event.detail.value as DemoState | null | undefined) ?? "enabled");
            }}
          ></oj-c-radioset>
          <oj-c-radioset
            value={valueEnabled}
            aria-controls="myform"
            labelHint="Value"
            options={valueOptions}
            onvalueChanged={(event) => {
              setValueEnabled((event.detail.value as DemoValueState | null | undefined) ?? "yes");
            }}
          ></oj-c-radioset>
        </oj-c-form-layout>
      </div>

      <oj-c-form-layout id="myform" labelEdge={labelEdge} readonly={readonlyControls}>
        <h4>Icon</h4>
        <oj-c-input-text
          id="start-icon"
          value={inputValue}
          labelHint="Credit Card Number"
          disabled={disableControls}
        >
          {!readonlyControls ? (
            <div
              slot="start"
              class="oj-ux-ico-cc-card"
              role="img"
              title="credit card icon"
            ></div>
          ) : null}
        </oj-c-input-text>

        <h4>Borderless Button</h4>
        <oj-c-input-text
          labelHint="Send Email"
          value={emailValue}
          disabled={disableControls}
        >
          {!readonlyControls ? (
            <oj-c-button
              slot="end"
              display="icons"
              label="Email"
              size={endButtonSize as ComponentProps<'oj-c-button'>['size']}
              chroming="ghost"
              disabled={disableControls}
              onojAction={() => {
                setEventMessage(
                  "The email icon is not functional. This demo shows start and end slot use.",
                );
              }}
            >
              <span slot="endIcon" class="oj-ux-ico-email"></span>
            </oj-c-button>
          ) : null}
        </oj-c-input-text>
      </oj-c-form-layout>

      {eventMessage ? <div class="oj-sm-margin-3x-top">{eventMessage}</div> : null}
    </div>
  );
}
