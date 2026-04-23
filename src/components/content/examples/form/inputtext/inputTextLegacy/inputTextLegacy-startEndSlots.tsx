import { h } from "preact";
import { useMemo, useState } from "preact/hooks";
import "ojs/ojbutton";
import "ojs/ojformlayout";
import "ojs/ojinputtext";
import "ojs/ojoption";
import "ojs/ojradioset";

export default function InputTextLegacyStartEndSlotsExample() {
  const [labelEdge, setLabelEdge] = useState<"top" | "inside">("inside");
  const [formState, setFormState] = useState<"enabled" | "disabled" | "readonly">(
    "enabled",
  );
  const [valueEnabled, setValueEnabled] = useState<"yes" | "no">("yes");
  const [eventMessage, setEventMessage] = useState("");

  const disableControls = formState === "disabled";
  const readonlyControls = formState === "readonly";
  const showValue = valueEnabled === "yes";

  const startIconClass = useMemo(
    () =>
      `oj-text-field-start-end-icon oj-ux-ico-cc-card${
        readonlyControls ? " oj-sm-hide" : ""
      }`,
    [readonlyControls],
  );

  const buttonClass = useMemo(() => {
    const classes = [];
    if (labelEdge === "top") {
      classes.push("oj-button-sm");
    }
    if (readonlyControls) {
      classes.push("oj-sm-hide");
    }
    return classes.join(" ");
  }, [labelEdge, readonlyControls]);

  return (
    <div>
      <h3>Options To Control The Form Below</h3>

      <oj-form-layout direction="row" maxColumns={3}>
        <oj-radioset
          value={labelEdge}
          labelHint="Label Edge"
          onvalueChanged={(event: any) => {
            setLabelEdge(event.detail.value ?? "inside");
          }}
        >
          <oj-option value="top">top</oj-option>
          <oj-option value="inside">inside</oj-option>
        </oj-radioset>
        <oj-radioset
          value={formState}
          labelHint="State"
          onvalueChanged={(event: any) => {
            setFormState(event.detail.value ?? "enabled");
          }}
        >
          <oj-option value="enabled">Enabled</oj-option>
          <oj-option value="disabled">Disabled</oj-option>
          <oj-option value="readonly">Read only</oj-option>
        </oj-radioset>
        <oj-radioset
          value={valueEnabled}
          labelHint="Value"
          onvalueChanged={(event: any) => {
            setValueEnabled(event.detail.value ?? "yes");
          }}
        >
          <oj-option value="yes">Yes</oj-option>
          <oj-option value="no">No</oj-option>
        </oj-radioset>
      </oj-form-layout>

      <oj-form-layout labelEdge={labelEdge} readonly={readonlyControls}>
        <h4>Icon</h4>
        <oj-input-text
          value={showValue ? "378282246310005" : null}
          labelHint="Credit Card Number"
          disabled={disableControls}
          readonly={readonlyControls}
        >
          <div
            slot="start"
            class={startIconClass}
            role="img"
            title="credit card icon"
          ></div>
        </oj-input-text>

        <h4>Borderless Button</h4>
        <oj-input-text
          labelHint="Send Email"
          value={showValue ? "joe.smith@example.com" : null}
          disabled={disableControls}
          readonly={readonlyControls}
        >
          <oj-button
            slot="end"
            display="icons"
            chroming="borderless"
            class={buttonClass}
            disabled={disableControls}
            onojAction={() => {
              setEventMessage(
                "The email icon is not functional. This demo shows start and end slot usage.",
              );
            }}
          >
            Email
            <span slot="endIcon" class="oj-ux-ico-email"></span>
          </oj-button>
        </oj-input-text>
      </oj-form-layout>

      {eventMessage ? <div class="oj-sm-margin-3x-top">{eventMessage}</div> : null}
    </div>
  );
}
