import "oj-c/form-layout";
import "oj-c/input-password";
import 'preact';
import { messageSets } from "./inputPasswordCorePack-shared";

export default function InputPasswordCorePackStatesExample() {
  return (
    <div id="inputPasswordCorePackStates">
      <h4>States inside oj-c-form-layout</h4>
      <oj-c-form-layout maxColumns={2} direction="row">
        <oj-c-input-password value="abcdpswd" labelHint="enabled" />
        <oj-c-input-password labelHint="enabled no value" />
        <oj-c-input-password
          id="ipdis"
          value="abcdpswd"
          labelHint="disabled"
          disabled
        />
        <oj-c-input-password labelHint="disabled no value" disabled />
        <oj-c-input-password
          id="ipro"
          value="abcdpswd"
          labelHint="readonly"
          readonly
        />
        <oj-c-input-password labelHint="readonly no value" readonly />
      </oj-c-form-layout>

      <h4>States outside of oj-c-form-layout</h4>
      <div class="oj-flex oj-sm-padding-2x-vertical">
        <div class="oj-sm-12 oj-md-6 oj-lg-6 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-password
            id="enabled1"
            value="abcdpswd"
            labelHint="enabled"
            labelEdge="inside"
          />
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-6 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-password
            id="enablednovalue1"
            labelHint="enabled no value"
            labelEdge="inside"
          />
        </div>
      </div>
      <div class="oj-flex oj-sm-padding-2x-vertical">
        <div class="oj-sm-12 oj-md-6 oj-lg-6 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-password
            id="ipdis2"
            value="abcdpswd"
            labelHint="disabled"
            labelEdge="inside"
            disabled
          />
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-6 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-password
            id="disablednovalue1"
            labelHint="disabled no value"
            labelEdge="inside"
            disabled
          />
        </div>
      </div>
      <div class="oj-flex oj-sm-padding-2x-vertical">
        <div class="oj-sm-12 oj-md-6 oj-lg-6 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-password
            id="ipro2"
            value="abcdpswd"
            labelHint="readonly"
            labelEdge="inside"
            readonly
          />
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-6 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-password
            id="readonlynovalue1"
            labelHint="readonly no value"
            labelEdge="inside"
            readonly
          />
        </div>
      </div>

      <h4 class="oj-sm-margin-4x-top">Label Edge</h4>
      <div class="oj-flex">
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-4x-top oj-sm-padding-2x-horizontal">
          <oj-c-input-password
            id="labelEdgeInside"
            labelHint="Label Edge Inside"
            labelEdge="inside"
          />
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-password
            id="labelEdgeTop"
            labelHint="Label Edge Top"
            labelEdge="top"
          />
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-password
            id="labelEdgeStart"
            labelHint="Label Edge Start"
            labelEdge="start"
          />
        </div>
      </div>

      <h4 class="oj-sm-margin-4x-top">Text Align</h4>
      <oj-c-form-layout
        maxColumns={3}
        direction="row"
        class="oj-sm-padding-2x-bottom"
      >
        <oj-c-input-password
          id="align-start"
          textAlign="start"
          labelHint="Start Align"
          value="abcdpswd"
        />
        <oj-c-input-password
          id="align-end"
          textAlign="end"
          labelHint="End Align"
          value="abcdpswd"
        />
        <oj-c-input-password
          id="align-right"
          textAlign="right"
          labelHint="Right Align"
          value="abcdpswd"
        />
      </oj-c-form-layout>

      <h4 class="oj-sm-margin-4x-top">Mask Icon</h4>
      <oj-c-form-layout maxColumns={3} direction="row">
        <oj-c-input-password
          value="passW0rd!"
          labelHint="Mask icon hidden - enabled"
          maskIcon="hidden"
        />
        <oj-c-input-password
          value="passW0rd!"
          labelHint="Mask icon hidden - disabled"
          maskIcon="hidden"
          disabled
        />
        <oj-c-input-password
          value="passW0rd!"
          labelHint="Mask icon hidden - readonly"
          maskIcon="hidden"
          readonly
        />
      </oj-c-form-layout>

      <h4 class="oj-sm-margin-4x-top">Required, Clear Icon & Placeholder</h4>
      <oj-c-form-layout maxColumns={3} direction="row">
        <oj-c-input-password required labelHint="required" />
        <oj-c-input-password
          clearIcon="always"
          labelHint="clear-icon"
          value="value text"
        />
        <oj-c-input-password
          placeholder="placeholder text"
          labelHint="placeholder"
        />
      </oj-c-form-layout>

      <h4 class="oj-sm-margin-4x-top">Help</h4>
      <oj-c-form-layout maxColumns={3} direction="row">
        <oj-c-input-password
          help={{ instruction: "help.instruction text" }}
          labelHint="help.instruction"
        />
        <oj-c-input-password
          helpHints={{ definition: "help-hints.definition text" }}
          labelHint="help-hints.definition"
        />
        <oj-c-input-password
          helpHints={{ source: "https://www.oracle.com" }}
          labelHint="help-hints.source"
        />
      </oj-c-form-layout>

      <h4 class="oj-sm-margin-4x-top">Messages</h4>
      <oj-c-form-layout maxColumns={3} direction="row">
        <oj-c-input-password
          messagesCustom={messageSets.error}
          value="abcdpswd"
          labelHint="error"
        />
        <oj-c-input-password
          messagesCustom={messageSets.warning}
          value="abcdpswd"
          labelHint="warning"
        />
        <oj-c-input-password
          messagesCustom={messageSets.info}
          value="abcdpswd"
          labelHint="info"
        />
        <oj-c-input-password
          messagesCustom={messageSets.confirmation}
          value="abcdpswd"
          labelHint="confirmation"
        />
      </oj-c-form-layout>
    </div>
  );
}
