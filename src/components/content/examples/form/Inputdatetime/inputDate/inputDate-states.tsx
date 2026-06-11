import { h, type ComponentProps } from 'preact';
import "ojs/ojdatetimepicker";
import "ojs/ojformlayout";
import { messageSets, sampleIsoDate } from "./inputDate-shared";

export default function InputDateStatesVdomExample() {
  return (
    <div id="inputDateStatesVdom">
      <h5 class="oj-sm-padding-2x-bottom">States</h5>
      <oj-form-layout maxColumns={3} direction="row">
        <oj-input-date labelHint="Enabled no value" />
        <oj-input-date labelHint="Disabled no value" disabled />
        <oj-input-date labelHint="Read only no value" readonly />
        <oj-input-date value={sampleIsoDate} labelHint="Enabled" />
        <oj-input-date value={sampleIsoDate} labelHint="Disabled" disabled />
        <oj-input-date value={sampleIsoDate} labelHint="Read only" readonly />
      </oj-form-layout>

      <h5 class="oj-sm-margin-4x-top">Required</h5>
      <oj-form-layout maxColumns={3} direction="row" class="oj-sm-padding-2x-bottom">
        <oj-input-date id="required-date-vdom" required labelHint="required" />
      </oj-form-layout>

      <h5 class="oj-sm-margin-4x-top">Date Picker Variations</h5>
      <oj-form-layout maxColumns={3} direction="row" class="oj-sm-padding-2x-bottom">
        <oj-input-date
          value={sampleIsoDate}
          datePicker={{ weekDisplay: "number" } as ComponentProps<'oj-input-date'>['datePicker']}
          labelHint="Week Of Year"
        />
      </oj-form-layout>

      <h5 class="oj-sm-margin-4x-top">Help [Help icon does not show up for an inside label]</h5>
      <oj-form-layout maxColumns={3} direction="row" class="oj-sm-padding-2x-bottom">
        <oj-input-date
          value={sampleIsoDate}
          labelHint="help.instruction"
          help={{ instruction: "help-hints.instruction text" }}
        />
        <oj-input-date
          value={sampleIsoDate}
          labelHint="help.definition"
          helpHints={{ definition: "help-hints.definition text" }}
        />
        <oj-input-date
          value={sampleIsoDate}
          labelHint="help.source"
          helpHints={{ source: "https://www.oracle.com" }}
        />
      </oj-form-layout>

      <h5 class="oj-sm-margin-4x-top oj-sm-padding-2x-bottom">Messages</h5>
      <oj-form-layout maxColumns={3} direction="row">
        <oj-input-date
          value={sampleIsoDate}
          labelHint="Error"
          messagesCustom={messageSets.error}
        />
        <oj-input-date
          value={sampleIsoDate}
          labelHint="Warning"
          messagesCustom={messageSets.warning}
        />
        <oj-input-date
          value={sampleIsoDate}
          labelHint="Information"
          messagesCustom={messageSets.info}
        />
        <oj-input-date
          value={sampleIsoDate}
          labelHint="Confirmation"
          messagesCustom={messageSets.confirmation}
        />
      </oj-form-layout>
    </div>
  );
}
