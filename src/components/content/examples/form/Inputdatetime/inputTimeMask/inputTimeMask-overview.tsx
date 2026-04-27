import { h } from "preact";
import "oj-c/form-layout";
import "oj-c/input-time-mask";
import { messageSets } from "./inputTimeMask-shared";

export default function InputTimeMaskOverviewVdomExample() {
  return (
    <div id="inputTimeMaskOverviewVdom">
      <h4 class="oj-sm-padding-2x-bottom">States inside oj-c-form-layout</h4>
      <oj-c-form-layout maxColumns={3} direction="row">
        <oj-c-input-time-mask labelHint="Enabled no time" />
        <oj-c-input-time-mask labelHint="Disabled no time" disabled />
        <oj-c-input-time-mask labelHint="Read only no time" readonly />
        <oj-c-input-time-mask value="T20:11" labelHint="Enabled Time" />
        <oj-c-input-time-mask
          value="T20:11"
          labelHint="Disabled Time"
          disabled
        />
        <oj-c-input-time-mask
          value="T20:11"
          labelHint="Read Only Time"
          readonly
        />
      </oj-c-form-layout>

      <h4>States outside of oj-c-form-layout</h4>
      <div class="oj-flex oj-sm-padding-3x-vertical">
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-time-mask
            value="T20:11"
            labelHint="Enabled Time"
            labelEdge="inside"
          />
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-time-mask
            value="T20:11"
            labelHint="Disabled Time"
            labelEdge="inside"
            disabled
          />
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-time-mask
            value="T20:11"
            labelHint="Read Only Time"
            labelEdge="inside"
            readonly
          />
        </div>
      </div>
      <div class="oj-flex">
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-time-mask labelHint="Enabled no time" labelEdge="inside" />
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-time-mask
            labelHint="Disabled no time"
            labelEdge="inside"
            disabled
          />
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-time-mask
            labelHint="Read only no time"
            labelEdge="inside"
            readonly
          />
        </div>
      </div>

      <h4 class="oj-sm-margin-4x-top">Granularity</h4>
      <oj-c-form-layout
        maxColumns={3}
        direction="row"
        class="oj-sm-padding-2x-bottom"
      >
        <oj-c-input-time-mask
          granularity="minute"
          value="T20:11"
          labelHint="Time in Minutes"
        />
        <oj-c-input-time-mask
          granularity="second"
          value="T20:11:30"
          labelHint="Time in Seconds"
        />
        <oj-c-input-time-mask
          granularity="millisecond"
          value="T20:11:30.000"
          labelHint="Time in Milliseconds"
        />
      </oj-c-form-layout>

      <h4 class="oj-sm-margin-4x-top">HourClock and LeadingZeroForHour</h4>
      <oj-c-form-layout
        maxColumns={3}
        direction="row"
        class="oj-sm-padding-2x-bottom"
      >
        <oj-c-input-time-mask
          hourClock="24"
          value="T20:11"
          labelHint="24-hour clock"
        />
        <oj-c-input-time-mask
          leadingZeroForHour="show"
          value="T20:11"
          labelHint="Leading Zero for Hour"
        />
      </oj-c-form-layout>

      <h4 class="oj-sm-margin-4x-top">Label Edge</h4>
      <div class="oj-flex">
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-4x-top oj-sm-padding-2x-horizontal">
          <oj-c-input-time-mask
            id="labelEdgeInside"
            labelHint="Label Edge Inside"
            labelEdge="inside"
          />
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-time-mask
            id="labelEdgeTop"
            labelHint="Label Edge Top"
            labelEdge="top"
          />
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-time-mask
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
        <oj-c-input-time-mask
          id="align-start"
          textAlign="start"
          labelHint="Start Align"
          value="T20:11"
        />
        <oj-c-input-time-mask
          id="align-end"
          textAlign="end"
          labelHint="End Align"
          value="T20:11"
        />
        <oj-c-input-time-mask
          id="align-right"
          textAlign="right"
          labelHint="Right Align"
          value="T20:11"
        />
      </oj-c-form-layout>

      <h4 class="oj-sm-margin-4x-top">Required</h4>
      <oj-c-form-layout
        maxColumns={3}
        direction="row"
        class="oj-sm-padding-2x-bottom"
      >
        <oj-c-input-time-mask id="required-time" required labelHint="Required" />
      </oj-c-form-layout>

      <h4 class="oj-sm-margin-4x-top">Help</h4>
      <oj-c-form-layout
        maxColumns={3}
        direction="row"
        class="oj-sm-padding-2x-bottom"
      >
        <oj-c-input-time-mask
          labelHint="help.instruction"
          help={{ instruction: "help-hints.instruction text" }}
        />
        <oj-c-input-time-mask
          labelHint="help.definition"
          helpHints={{ definition: "help-hints.definition text" }}
        />
        <oj-c-input-time-mask
          labelHint="help.source"
          helpHints={{ source: "https://www.oracle.com" }}
        />
      </oj-c-form-layout>

      <h4 class="oj-sm-margin-4x-top">Messages</h4>
      <oj-c-form-layout
        maxColumns={3}
        direction="row"
        class="oj-sm-padding-2x-bottom"
      >
        <oj-c-input-time-mask
          value="T20:11"
          labelHint="Error"
          messagesCustom={messageSets.error}
        />
        <oj-c-input-time-mask
          value="T20:11"
          labelHint="Warning"
          messagesCustom={messageSets.warning}
        />
        <oj-c-input-time-mask
          value="T20:11"
          labelHint="Information"
          messagesCustom={messageSets.info}
        />
        <oj-c-input-time-mask
          value="T20:11"
          labelHint="Confirmation"
          messagesCustom={messageSets.confirmation}
        />
      </oj-c-form-layout>
    </div>
  );
}

