import { h } from "preact";
import "oj-c/form-layout";
import "oj-c/input-number";
import { messageSets } from "./inputNumberCorePack-shared";

export default function InputNumberCorePackStatesExample() {
  return (
    <div id="inputNumberCorePackStates">
      <h4>States inside oj-c-form-layout</h4>
      <oj-c-form-layout maxColumns={3} direction="row">
        <oj-c-input-number value={20} labelHint="step 0 enabled" min={0} max={100} step={0} />
        <oj-c-input-number value={20} labelHint="step 0 disabled" disabled min={0} max={100} step={0} />
        <oj-c-input-number value={20} labelHint="step 0 readonly" readonly min={0} max={100} step={0} />
        <oj-c-input-number id="st1ena" value={20} labelHint="step 1 enabled" min={0} max={100} step={1} />
        <oj-c-input-number value={20} labelHint="step 1 disabled" disabled min={0} max={100} step={1} />
        <oj-c-input-number value={20} labelHint="step 1 readonly" readonly min={0} max={100} step={1} />
        <oj-c-input-number labelHint="step 1 enabled no value" min={0} max={100} step={1} />
        <oj-c-input-number labelHint="step 1 disabled no value" disabled min={0} max={100} step={1} />
        <oj-c-input-number labelHint="step 1 readonly no value" readonly min={0} max={100} step={1} />
      </oj-c-form-layout>

      <h4>States outside of oj-c-form-layout</h4>
      <div class="oj-flex oj-sm-padding-2x-vertical">
        <div class="oj-sm-12 oj-md-6 oj-lg-6 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-number id="enabled1" value={20} labelHint="enabled" labelEdge="inside" />
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-6 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-number id="enablednovalue1" labelHint="enabled no value" labelEdge="inside" />
        </div>
      </div>
      <div class="oj-flex oj-sm-padding-2x-vertical">
        <div class="oj-sm-12 oj-md-6 oj-lg-6 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-number id="itdis2" value={20} labelHint="disabled" labelEdge="inside" disabled />
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-6 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-number id="disablednovalue1" labelHint="disabled no value" labelEdge="inside" disabled />
        </div>
      </div>
      <div class="oj-flex oj-sm-padding-2x-vertical">
        <div class="oj-sm-12 oj-md-6 oj-lg-6 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-number id="itro2" value={20} labelHint="readonly" labelEdge="inside" readonly />
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-6 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-number id="readonlynovalue1" labelHint="readonly no value" labelEdge="inside" readonly />
        </div>
      </div>

      <h4 class="oj-sm-margin-4x-top">Quantitative Steppers</h4>
      <oj-c-form-layout maxColumns={3} direction="row">
        <oj-c-input-number labelHint="step 1 enabled" stepperVariant="quantitative" value={20} min={0} max={100} step={1} />
        <oj-c-input-number labelHint="step 1 disabled" stepperVariant="quantitative" value={20} disabled min={0} max={100} step={1} />
        <oj-c-input-number labelHint="step 1 readonly" stepperVariant="quantitative" value={20} readonly min={0} max={100} step={1} />
        <oj-c-input-number labelHint="step 1 enabled no value" stepperVariant="quantitative" min={0} max={100} step={1} />
        <oj-c-input-number labelHint="step 1 disabled no value" stepperVariant="quantitative" disabled min={0} max={100} step={1} />
        <oj-c-input-number labelHint="step 1 readonly no value" stepperVariant="quantitative" readonly min={0} max={100} step={1} />
      </oj-c-form-layout>

      <h4 class="oj-sm-margin-4x-top">Required & Placeholder</h4>
      <oj-c-form-layout maxColumns={2} direction="row">
        <oj-c-input-number required labelHint="required" />
        <oj-c-input-number placeholder="placeholder text" labelHint="placeholder" />
      </oj-c-form-layout>

      <h4 class="oj-sm-margin-4x-top">Prefix and Suffix</h4>
      <oj-c-form-layout maxColumns={2} direction="row">
        <oj-c-input-number labelHint="input-prefix" inputPrefix="$" value={10} />
        <oj-c-input-number labelHint="input-suffix" inputSuffix="lbs" value={150} />
      </oj-c-form-layout>

      <h4 class="oj-sm-margin-4x-top">Help</h4>
      <oj-c-form-layout maxColumns={2} direction="row">
        <oj-c-input-number help={{ instruction: "help.instruction text" }} labelHint="help.instruction" />
        <oj-c-input-number helpHints={{ definition: "help-hints.definition text" }} labelHint="help-hints.definition" />
        <oj-c-input-number helpHints={{ source: "https://www.oracle.com" }} labelHint="help-hints.source" />
      </oj-c-form-layout>

      <h4 class="oj-sm-margin-4x-top">Messages</h4>
      <oj-c-form-layout maxColumns={2} direction="row">
        <oj-c-input-number messagesCustom={messageSets.error} value={20} labelHint="error" />
        <oj-c-input-number messagesCustom={messageSets.warning} value={20} labelHint="warning" />
        <oj-c-input-number messagesCustom={messageSets.info} value={20} labelHint="info" />
        <oj-c-input-number messagesCustom={messageSets.confirmation} value={20} labelHint="confirmation" />
      </oj-c-form-layout>
    </div>
  );
}
