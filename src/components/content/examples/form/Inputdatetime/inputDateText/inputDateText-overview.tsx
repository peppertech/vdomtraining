import { h } from "preact";
import "oj-c/form-layout";
import "oj-c/input-date-text";
import { messageSets } from "./inputDateText-shared";

export default function InputDateTextOverviewExample() {
  return (
    <div id="inputDateTextOverview">
      <h4 class="oj-sm-padding-2x-bottom">States inside oj-c-form-layout</h4>
      <oj-c-form-layout maxColumns={3} direction="row">
        <oj-c-input-date-text labelHint="Enabled no value" />
        <oj-c-input-date-text labelHint="Disabled no value" disabled />
        <oj-c-input-date-text containerReadonly={false} labelHint="Read only no value" readonly />
        <oj-c-input-date-text value="2014-02-01" labelHint="Enabled" />
        <oj-c-input-date-text
          value="2014-02-01"
          labelHint="Disabled"
          disabled
        />
        <oj-c-input-date-text
          containerReadonly={false}
          value="2014-02-01"
          labelHint="Read only"
          readonly
        />
      </oj-c-form-layout>

      <h4>States outside of oj-c-form-layout</h4>
      <div class="oj-flex oj-sm-padding-2x-vertical">
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-date-text
            value="2014-02-01"
            labelHint="enabled"
            labelEdge="inside"
          />
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-date-text
            value="2014-02-01"
            labelHint="disabled"
            labelEdge="inside"
            disabled
          />
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-date-text
            value="2014-02-01"
            labelHint="readonly"
            labelEdge="inside"
            readonly
          />
        </div>
      </div>
      <div class="oj-flex oj-sm-padding-2x-vertical">
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-date-text labelHint="enabled no value" labelEdge="inside" />
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-date-text
            labelHint="disabled no value"
            labelEdge="inside"
            disabled
          />
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-date-text
            labelHint="readonly no value"
            labelEdge="inside"
            readonly
          />
        </div>
      </div>

      <h4 class="oj-sm-margin-4x-top">Required</h4>
      <oj-c-form-layout
        maxColumns={3}
        direction="row"
        class="oj-sm-padding-2x-bottom"
      >
        <oj-c-input-date-text id="required-date" required labelHint="required" />
      </oj-c-form-layout>

      <h4 class="oj-sm-margin-4x-top">Help</h4>
      <oj-c-form-layout
        maxColumns={3}
        direction="row"
        class="oj-sm-padding-2x-bottom"
      >
        <oj-c-input-date-text
          labelHint="help.instruction"
          help={{ instruction: "help-hints.instruction text" }}
        />
        <oj-c-input-date-text
          labelHint="help.definition"
          helpHints={{ definition: "help-hints.definition text" }}
        />
        <oj-c-input-date-text
          labelHint="help.source"
          helpHints={{ source: "https://www.oracle.com" }}
        />
      </oj-c-form-layout>

      <h4 class="oj-sm-margin-4x-top oj-sm-padding-2x-bottom">Messages</h4>
      <oj-c-form-layout maxColumns={3} direction="row">
        <oj-c-input-date-text
          value="2014-02-01"
          labelHint="Error"
          messagesCustom={messageSets.error}
        />
        <oj-c-input-date-text
          value="2014-02-01"
          labelHint="Warning"
          messagesCustom={messageSets.warning}
        />
        <oj-c-input-date-text
          value="2014-02-01"
          labelHint="Information"
          messagesCustom={messageSets.info}
        />
        <oj-c-input-date-text
          value="2014-02-01"
          labelHint="Confirmation"
          messagesCustom={messageSets.confirmation}
        />
      </oj-c-form-layout>
    </div>
  );
}

