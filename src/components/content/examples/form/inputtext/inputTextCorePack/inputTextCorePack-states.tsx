import "oj-c/button";
import "oj-c/form-layout";
import "oj-c/input-text";
import 'preact';
import { useState } from "preact/hooks";
import {
  confirmationMessages,
  errorMessages,
  infoMessages,
  overviewMaxLengthConfig,
  warningMessages,
} from "./inputTextCorePack-shared";

export default function InputTextCorePackStatesExample() {
  const [value, setValue] = useState("");
  const [rawValue, setRawValue] = useState("");

  return (
    <div>
      <h4>States inside oj-c-form-layout</h4>
      <oj-c-form-layout maxColumns={2} direction="row">
        <oj-c-input-text value="value text" labelHint="enabled"></oj-c-input-text>
        <oj-c-input-text labelHint="enabled no value"></oj-c-input-text>
        <oj-c-input-text
          value="value text"
          labelHint="disabled"
          disabled
        ></oj-c-input-text>
        <oj-c-input-text labelHint="disabled no value" disabled></oj-c-input-text>
        <oj-c-input-text
          value="value text"
          labelHint="readonly"
          readonly
        ></oj-c-input-text>
        <oj-c-input-text labelHint="readonly no value" readonly></oj-c-input-text>
      </oj-c-form-layout>

      <h4>States outside of oj-c-form-layout</h4>
      <div class="oj-flex oj-sm-padding-2x-vertical">
        <div class="oj-sm-12 oj-md-6 oj-lg-6 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-text
            value="value text"
            labelHint="enabled"
            labelEdge="inside"
          ></oj-c-input-text>
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-6 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-text
            labelHint="enabled no value"
            labelEdge="inside"
          ></oj-c-input-text>
        </div>
      </div>
      <div class="oj-flex oj-sm-padding-2x-vertical">
        <div class="oj-sm-12 oj-md-6 oj-lg-6 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-text
            value="value text"
            labelHint="disabled"
            labelEdge="inside"
            disabled
          ></oj-c-input-text>
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-6 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-text
            labelHint="disabled no value"
            labelEdge="inside"
            disabled
          ></oj-c-input-text>
        </div>
      </div>
      <div class="oj-flex oj-sm-padding-2x-vertical">
        <div class="oj-sm-12 oj-md-6 oj-lg-6 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-text
            value="value text"
            labelHint="readonly"
            labelEdge="inside"
            readonly
          ></oj-c-input-text>
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-6 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-text
            labelHint="readonly no value"
            labelEdge="inside"
            readonly
          ></oj-c-input-text>
        </div>
      </div>

      <h4 class="oj-sm-margin-4x-top">
        Required, Clear Icon, Placeholder &amp; Max Length
      </h4>
      <oj-c-form-layout maxColumns={2} direction="row">
        <oj-c-input-text required labelHint="required"></oj-c-input-text>
        <oj-c-input-text
          clearIcon="always"
          labelHint="clear-icon"
          value="value text"
        ></oj-c-input-text>
        <oj-c-input-text
          placeholder="placeholder text"
          labelHint="placeholder"
        ></oj-c-input-text>
        <oj-c-input-text
          value={value}
          length={overviewMaxLengthConfig}
          labelHint="max length"
          onvalueChanged={(event) => {
            setValue((event.detail.value as string | null | undefined) ?? "");
          }}
          onrawValueChanged={(event) => {
            setRawValue((event.detail.value as string | null | undefined) ?? "");
          }}
        ></oj-c-input-text>
      </oj-c-form-layout>

      <h4 class="oj-sm-margin-4x-top">Start and End Slots</h4>
      <oj-c-form-layout maxColumns={2} direction="row">
        <oj-c-input-text labelHint="Icon in the start slot">
          <div
            slot="start"
            class="oj-text-field-start-end-icon oj-ux-ico-cc-card"
            role="img"
            title="credit card icon"
          ></div>
        </oj-c-input-text>
        <oj-c-input-text labelHint="Button Icon in the end slot">
          <oj-c-button
            slot="end"
            display="icons"
            chroming="ghost"
            size="sm"
            label="Button Icon"
          >
            <span slot="endIcon" class="oj-ux-ico-email" role="img" title="email"></span>
          </oj-c-button>
        </oj-c-input-text>
      </oj-c-form-layout>

      <h4 class="oj-sm-margin-4x-top">Prefix and Suffix</h4>
      <oj-c-form-layout maxColumns={2} direction="row">
        <oj-c-input-text labelHint="input-prefix" inputPrefix="$" value="10.00"></oj-c-input-text>
        <oj-c-input-text labelHint="input-suffix" inputSuffix="lbs" value="150"></oj-c-input-text>
      </oj-c-form-layout>

      <h4 class="oj-sm-margin-4x-top">Help</h4>
      <oj-c-form-layout maxColumns={2} direction="row">
        <oj-c-input-text
          help={{ instruction: "help.instruction text" }}
          labelHint="help.instruction"
        ></oj-c-input-text>
        <oj-c-input-text
          helpHints={{ definition: "help-hints.definition text" }}
          labelHint="help-hints.definition"
        ></oj-c-input-text>
        <oj-c-input-text
          helpHints={{ source: "https://www.oracle.com" }}
          labelHint="help-hints.source"
        ></oj-c-input-text>
      </oj-c-form-layout>

      <h4 class="oj-sm-margin-4x-top">Messages</h4>
      <oj-c-form-layout maxColumns={2} direction="row">
        <oj-c-input-text
          messagesCustom={errorMessages}
          value="value text"
          labelHint="error"
        ></oj-c-input-text>
        <oj-c-input-text
          messagesCustom={warningMessages}
          value="value text"
          labelHint="warning"
        ></oj-c-input-text>
        <oj-c-input-text
          messagesCustom={infoMessages}
          value="value text"
          labelHint="info"
        ></oj-c-input-text>
        <oj-c-input-text
          messagesCustom={confirmationMessages}
          value="value text"
          labelHint="confirmation"
        ></oj-c-input-text>
      </oj-c-form-layout>
    </div>
  );
}
