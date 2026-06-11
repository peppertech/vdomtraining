import { h } from "preact";
import { useState } from "preact/hooks";
import "ojs/ojbutton";
import "ojs/ojformlayout";
import "ojs/ojinputtext";
import {
  confirmationMessages,
  errorMessages,
  infoMessages,
  maxLengthConfig,
  warningMessages,
} from "./inputTextLegacy-shared";

export default function InputTextLegacyStatesExample() {
  const [value, setValue] = useState("");
  const [rawValue, setRawValue] = useState("");

  return (
    <div>
      <h4>States inside oj-form-layout</h4>
      <oj-form-layout maxColumns={2} direction="row">
        <oj-input-text value="value text" labelHint="enabled"></oj-input-text>
        <oj-input-text labelHint="enabled no value"></oj-input-text>
        <oj-input-text
          value="value text"
          labelHint="disabled"
          disabled
        ></oj-input-text>
        <oj-input-text labelHint="disabled no value" disabled></oj-input-text>
        <oj-input-text
          value="value text"
          labelHint="readonly"
          readonly
        ></oj-input-text>
        <oj-input-text labelHint="readonly no value" readonly></oj-input-text>
      </oj-form-layout>

      <h4>States outside of oj-form-layout</h4>
      <div class="oj-flex">
        <div class="oj-sm-12 oj-md-6 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-input-text
            value="value text"
            labelHint="enabled"
            labelEdge="inside"
          ></oj-input-text>
        </div>
        <div class="oj-sm-12 oj-md-6 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-input-text
            labelHint="enabled no value"
            labelEdge="inside"
          ></oj-input-text>
        </div>
      </div>
      <div class="oj-flex">
        <div class="oj-sm-12 oj-md-6 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-input-text
            value="value text"
            labelHint="disabled"
            labelEdge="inside"
            disabled
          ></oj-input-text>
        </div>
        <div class="oj-sm-12 oj-md-6 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-input-text
            labelHint="disabled no value"
            labelEdge="inside"
            disabled
          ></oj-input-text>
        </div>
      </div>
      <div class="oj-flex">
        <div class="oj-sm-12 oj-md-6 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-input-text
            value="value text"
            labelHint="readonly"
            labelEdge="inside"
            readonly
          ></oj-input-text>
        </div>
        <div class="oj-sm-12 oj-md-6 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-input-text
            labelHint="readonly no value"
            labelEdge="inside"
            readonly
          ></oj-input-text>
        </div>
      </div>

      <h4 class="oj-sm-margin-4x-top">
        Required, Clear Icon, Placeholder &amp; Max Length
      </h4>
      <oj-form-layout maxColumns={2} direction="row">
        <oj-input-text required labelHint="required"></oj-input-text>
        <oj-input-text
          clearIcon="always"
          labelHint="clear-icon"
          value="value text"
        ></oj-input-text>
        <oj-input-text
          placeholder="placeholder text"
          labelHint="placeholder"
        ></oj-input-text>
        <oj-input-text
          value={value}
          rawValue={rawValue}
          length={maxLengthConfig}
          labelHint="max length"
          onvalueChanged={(event) => {
            setValue((event.detail.value as string | null | undefined) ?? "");
          }}
          onrawValueChanged={(event) => {
            setRawValue((event.detail.value as string | null | undefined) ?? "");
          }}
        ></oj-input-text>
      </oj-form-layout>

      <h4 class="oj-sm-margin-4x-top">Start and End Slots</h4>
      <oj-form-layout maxColumns={2} direction="row">
        <oj-input-text labelHint="Icon in the start slot">
          <div
            slot="start"
            class="oj-text-field-start-end-icon oj-ux-ico-cc-card"
            role="img"
            title="credit card icon"
          ></div>
        </oj-input-text>
        <oj-input-text labelHint="Button icon in the end slot">
          <oj-button slot="end" display="icons" chroming="borderless" class="oj-button-sm">
            Button Icon
            <span slot="endIcon" class="oj-ux-ico-email" role="img" title="email"></span>
          </oj-button>
        </oj-input-text>
      </oj-form-layout>

      <h4 class="oj-sm-margin-4x-top">Help</h4>
      <oj-form-layout maxColumns={2} direction="row">
        <oj-input-text
          help={{ instruction: "help.instruction text" }}
          labelHint="help.instruction"
        ></oj-input-text>
        <oj-input-text
          helpHints={{ definition: "help-hints.definition text" }}
          labelHint="help-hints.definition"
        ></oj-input-text>
        <oj-input-text
          helpHints={{ source: "https://www.oracle.com" }}
          labelHint="help-hints.source"
        ></oj-input-text>
      </oj-form-layout>

      <h4 class="oj-sm-margin-4x-top">Messages</h4>
      <oj-form-layout maxColumns={2} direction="row">
        <oj-input-text
          messagesCustom={errorMessages}
          value="value text"
          labelHint="error"
        ></oj-input-text>
        <oj-input-text
          messagesCustom={warningMessages}
          value="value text"
          labelHint="warning"
        ></oj-input-text>
        <oj-input-text
          messagesCustom={infoMessages}
          value="value text"
          labelHint="info"
        ></oj-input-text>
        <oj-input-text
          messagesCustom={confirmationMessages}
          value="value text"
          labelHint="confirmation"
        ></oj-input-text>
      </oj-form-layout>
    </div>
  );
}
