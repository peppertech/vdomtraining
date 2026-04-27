import { h } from "preact";
import "oj-c/form-layout";
import "oj-c/input-date-mask";
import { messageSets } from "./inputDateMask-shared";

export default function InputDateMaskOverviewExample() {
  return (
    <div id="inputDateMaskOverview">
      <h4 class="oj-sm-padding-2x-bottom">States inside oj-c-form-layout</h4>
      <oj-c-form-layout maxColumns={3} direction="row">
        <oj-c-input-date-mask labelHint="Enabled no date" />
        <oj-c-input-date-mask labelHint="Disabled no date" disabled />
        <oj-c-input-date-mask labelHint="Read only no date" readonly />
        <oj-c-input-date-mask value="2023-11-09" labelHint="Enabled Date" />
        <oj-c-input-date-mask
          value="2023-11-09"
          labelHint="Disabled Date"
          disabled
        />
        <oj-c-input-date-mask
          value="2023-11-09"
          labelHint="Read Only Date"
          readonly
        />
      </oj-c-form-layout>

      <h4>States outside of oj-c-form-layout</h4>
      <div class="oj-flex oj-sm-padding-3x-vertical">
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-date-mask
            value="2023-11-09"
            labelHint="Enabled Date"
            labelEdge="inside"
          />
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-date-mask
            value="2023-11-09"
            labelHint="Disabled Date"
            labelEdge="inside"
            disabled
          />
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-date-mask
            value="2023-11-09"
            labelHint="Read Only Date"
            labelEdge="inside"
            readonly
          />
        </div>
      </div>
      <div class="oj-flex">
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-date-mask labelHint="Enabled no date" labelEdge="inside" />
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-date-mask
            labelHint="Disabled no date"
            labelEdge="inside"
            disabled
          />
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-date-mask
            labelHint="Read only no date"
            labelEdge="inside"
            readonly
          />
        </div>
      </div>

      <h4 class="oj-sm-margin-4x-top">Label Edge</h4>
      <div class="oj-flex">
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-4x-top oj-sm-padding-2x-horizontal">
          <oj-c-input-date-mask
            id="labelEdgeInside"
            labelHint="Label Edge Inside"
            labelEdge="inside"
          />
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-date-mask
            id="labelEdgeTop"
            labelHint="Label Edge Top"
            labelEdge="top"
          />
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-date-mask
            id="labelEdgeStart"
            labelHint="Label Edge Start"
            labelEdge="start"
          />
        </div>
      </div>

      <h4 class="oj-sm-margin-4x-top">Text Align</h4>
      <oj-c-form-layout maxColumns={3} direction="row" class="oj-sm-padding-2x-bottom">
        <oj-c-input-date-mask
          id="align-start"
          textAlign="start"
          labelHint="Start Align"
          value="2023-11-09"
        />
        <oj-c-input-date-mask
          id="align-end"
          textAlign="end"
          labelHint="End Align"
          value="2023-11-09"
        />
        <oj-c-input-date-mask
          id="align-right"
          textAlign="right"
          labelHint="Right Align"
          value="2023-11-09"
        />
      </oj-c-form-layout>

      <h4 class="oj-sm-margin-4x-top">Required</h4>
      <oj-c-form-layout maxColumns={3} direction="row" class="oj-sm-padding-2x-bottom">
        <oj-c-input-date-mask id="required-date" required labelHint="Required" />
      </oj-c-form-layout>

      <h4 class="oj-sm-margin-4x-top">Help</h4>
      <oj-c-form-layout maxColumns={3} direction="row" class="oj-sm-padding-2x-bottom">
        <oj-c-input-date-mask
          labelHint="help.instruction"
          help={{ instruction: "help-hints.instruction text" }}
        />
        <oj-c-input-date-mask
          labelHint="help.definition"
          helpHints={{ definition: "help-hints.definition text" }}
        />
        <oj-c-input-date-mask
          labelHint="help.source"
          helpHints={{ source: "https://www.oracle.com" }}
        />
      </oj-c-form-layout>

      <h4 class="oj-sm-margin-4x-top">Messages</h4>
      <oj-c-form-layout maxColumns={3} direction="row" class="oj-sm-padding-2x-bottom">
        <oj-c-input-date-mask
          value="2023-11-09"
          labelHint="Error"
          messagesCustom={messageSets.error}
        />
        <oj-c-input-date-mask
          value="2023-11-09"
          labelHint="Warning"
          messagesCustom={messageSets.warning}
        />
        <oj-c-input-date-mask
          value="2023-11-09"
          labelHint="Information"
          messagesCustom={messageSets.info}
        />
        <oj-c-input-date-mask
          value="2023-11-09"
          labelHint="Confirmation"
          messagesCustom={messageSets.confirmation}
        />
      </oj-c-form-layout>
    </div>
  );
}
