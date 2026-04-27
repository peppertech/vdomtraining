import { h } from "preact";
import { IntlDateTimeConverter } from "ojs/ojconverter-datetime";
import "ojs/ojdatetimepicker";
import "ojs/ojformlayout";
import {
  messageSets,
  sampleDateTimeValue,
} from "./inputDateTime-shared";

const datePickerWeek = {
  weekDisplay: "number",
};

const timePicker = {
  timeIncrement: "00:15:00:00",
};

const timeFullConverter = new IntlDateTimeConverter({
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

export default function InputDateTimeStatesExample() {
  return (
    <div id="inputDateTimeStates">
      <h5 class="oj-sm-padding-2x-bottom">States</h5>
      <oj-form-layout maxColumns={3} direction="row">
        <oj-input-date-time labelHint="Enabled no value" />
        <oj-input-date-time labelHint="Disabled no value" disabled />
        <oj-input-date-time labelHint="Read only no value" readonly />
        <oj-input-date-time value={sampleDateTimeValue} labelHint="Enabled" />
        <oj-input-date-time
          value={sampleDateTimeValue}
          labelHint="Disabled"
          disabled
        />
        <oj-input-date-time
          value={sampleDateTimeValue}
          labelHint="Read only"
          readonly
        />
      </oj-form-layout>

      <h5 class="oj-sm-margin-4x-top">Required</h5>
      <oj-form-layout
        maxColumns={3}
        direction="row"
        class="oj-sm-padding-2x-bottom"
      >
        <oj-input-date-time required labelHint="required" />
      </oj-form-layout>

      <h5 class="oj-sm-margin-4x-top">Date Picker Variations</h5>
      <oj-form-layout
        maxColumns={3}
        direction="row"
        class="oj-sm-padding-2x-bottom"
      >
        <oj-input-date-time
          value={sampleDateTimeValue}
          datePicker={datePickerWeek as any}
          labelHint="Week Of Year"
        />
      </oj-form-layout>

      <h5 class="oj-sm-margin-4x-top">Time Picker Variations</h5>
      <oj-form-layout
        maxColumns={3}
        direction="row"
        class="oj-sm-padding-2x-bottom"
      >
        <oj-input-date-time
          value={sampleDateTimeValue}
          id="timeIncrement"
          timePicker={timePicker as any}
          labelHint="Time Increment of 15 minutes"
        />
        <oj-input-date-time
          value={sampleDateTimeValue}
          converter={timeFullConverter}
          labelHint="Time with seconds"
        />
      </oj-form-layout>

      <h5 class="oj-sm-margin-4x-top">Help</h5>
      <oj-form-layout
        maxColumns={3}
        direction="row"
        class="oj-sm-padding-2x-bottom"
      >
        <oj-input-date-time
          value={sampleDateTimeValue}
          labelHint="help.instruction"
          help={{ instruction: "help-hints.instruction text" }}
        />
        <oj-input-date-time
          value={sampleDateTimeValue}
          labelHint="help.definition"
          helpHints={{ definition: "help-hints.definition text" }}
        />
        <oj-input-date-time
          value={sampleDateTimeValue}
          labelHint="help.source"
          helpHints={{ source: "https://www.oracle.com" }}
        />
      </oj-form-layout>

      <h5 class="oj-sm-margin-4x-top oj-sm-padding-2x-bottom">Messages</h5>
      <oj-form-layout maxColumns={3} direction="row">
        <oj-input-date-time
          value={sampleDateTimeValue}
          labelHint="Error"
          messagesCustom={messageSets.error}
        />
        <oj-input-date-time
          value={sampleDateTimeValue}
          labelHint="Warning"
          messagesCustom={messageSets.warning}
        />
        <oj-input-date-time
          value={sampleDateTimeValue}
          labelHint="Information"
          messagesCustom={messageSets.info}
        />
        <oj-input-date-time
          value={sampleDateTimeValue}
          labelHint="Confirmation"
          messagesCustom={messageSets.confirmation}
        />
      </oj-form-layout>
    </div>
  );
}
