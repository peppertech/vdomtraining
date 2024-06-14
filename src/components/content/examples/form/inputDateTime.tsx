import { ComponentProps } from "preact";
import { useState, useCallback } from "preact/hooks";
import { IntlDateTimeConverter } from "ojs/ojconverter-datetime";
import * as ResponsiveUtils from "ojs/ojresponsiveutils";
import Message = require("ojs/ojmessaging");
import { ojDatePicker } from "ojs/ojdatetimepicker";
import "ojs/ojknockout";
import "ojs/ojdatetimepicker";
import "ojs/ojlabel";
import "ojs/ojformlayout";

type InputDateTimeProps = ComponentProps<"oj-input-date-time">;

const helpHintDefinition: InputDateTimeProps["helpHints"] = {
  definition: "cost of a single item",
};
const helpHintSource: InputDateTimeProps["helpHints"] = {
  source: "https://www.oracle.com",
};

const InputDateTime = () => {
  const error: Message[] = [
    { summary: "summary", detail: "detail", severity: "error" },
  ];
  const warning: Message[] = [
    { summary: "summary", detail: "detail", severity: "warning" },
  ];
  const info: Message[] = [
    { summary: "summary", detail: "detail", severity: "info" },
  ];
  const confirmation: Message[] = [
    { summary: "summary", detail: "detail", severity: "confirmation" },
  ];

  let timeFullConverter: IntlDateTimeConverter;
  let numberOfMonths: number;
  let datePickerMonths: ojDatePicker["datePicker"];
  let largeScreenMatch: any; //MediaQueryList;
  let datePickerWeek: ojDatePicker["datePicker"];
  let timePicker: object;
  let value: string = "2022-12-20T10:00:00Z";

  let mdQuery =
    ResponsiveUtils.getFrameworkQuery("md-up") || "(min-width: 768px)";
  if (mdQuery != null) {
    largeScreenMatch = window.matchMedia(mdQuery);
  }

  numberOfMonths = largeScreenMatch.matches ? 2 : 1;
  datePickerMonths = {
    numberOfMonths: numberOfMonths,
  };
  datePickerWeek = {
    weekDisplay: "number",
  };
  timePicker = {
    timeIncrement: "00:15:00:00",
  };
  timeFullConverter = new IntlDateTimeConverter({
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  //type InputTextProps = ComponentProps<"oj-input-text">;

  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
      <h6 class="oj-sm-margin-4x-top">States</h6>
      <oj-form-layout max-columns={3} labelEdge="inside" direction="row">
        <oj-input-date-time
          labelHint="Enabled no value"
          autocomplete="off"
        ></oj-input-date-time>
        <oj-input-date-time
          labelHint="Disabled no value"
          disabled
          autocomplete="off"
        ></oj-input-date-time>
        <oj-input-date-time labelHint="Read only no value" readonly>
          autocomplete="off"
        </oj-input-date-time>
        <oj-input-date-time
          value={value}
          labelHint="Enabled"
          autocomplete="off"
        ></oj-input-date-time>
        <oj-input-date-time
          value={value}
          labelHint="Disabled"
          disabled
          autocomplete="off"
        ></oj-input-date-time>
        <oj-input-date-time
          value={value}
          labelHint="Read only"
          readonly
          autocomplete="off"
        ></oj-input-date-time>
      </oj-form-layout>

      <h6 class="oj-sm-margin-4x-top">Required & Placeholder</h6>
      <oj-form-layout max-columns={3} direction="row">
        <oj-input-date-time
          required={true}
          labelHint="required"
        ></oj-input-date-time>
        <oj-input-date-time
          placeholder="placeholder text"
          labelHint="placeholder"
        ></oj-input-date-time>
      </oj-form-layout>
      <h6 class="oj-sm-margin-4x-top"> Date Picker Variations</h6>
      <oj-form-layout max-columns={3} labelEdge="inside" direction="row">
        <oj-input-date-time
          value={value}
          datePicker={datePickerMonths}
          labelHint="Multiple Months"
          autocomplete="off"
        ></oj-input-date-time>
        <oj-input-date-time
          value={value}
          datePicker={datePickerWeek}
          labelHint="Week Of Year"
          autocomplete="off"
        ></oj-input-date-time>
      </oj-form-layout>

      <h6 class="oj-sm-margin-4x-top">Time Picker Variations</h6>
      <oj-form-layout max-columns={3} labelEdge="inside" direction="row">
        <oj-input-date-time
          value={value}
          id="timeIncrement"
          timePicker={timePicker as any}
          labelHint="Time Increment of 15 minutes"
          autocomplete="off"
        ></oj-input-date-time>
        <oj-input-date-time
          value={value}
          converter={timeFullConverter}
          labelHint="Time with seconds"
          autocomplete="off"
        ></oj-input-date-time>

        <oj-input-date-time
          value={value}
          labelHint={helpHintDefinition.source}
          autocomplete="off"
        ></oj-input-date-time>
        <oj-input-date-time
          value={value}
          labelHint={helpHintDefinition.definition}
          autocomplete="off"
        ></oj-input-date-time>
        <oj-input-date-time
          value={value}
          labelHint={helpHintSource.source}
          autocomplete="off"
        ></oj-input-date-time>
      </oj-form-layout>
      <h6 class="oj-sm-margin-4x-top oj-sm-padding-2x-bottom">Messages</h6>
      <oj-form-layout max-columns={3} labelEdge="inside" direction="row">
        <oj-input-date-time
          value={value}
          labelHint="Error"
          messagesCustom={error}
          autocomplete="off"
        ></oj-input-date-time>
        <oj-input-date-time
          value={value}
          labelHint="Warning"
          messagesCustom={warning}
          autocomplete="off"
        ></oj-input-date-time>
        <oj-input-date-time
          value={value}
          labelHint="Information"
          messagesCustom={info}
          autocomplete="off"
        ></oj-input-date-time>
        <oj-input-date-time
          value={value}
          labelHint="Confirmation"
          messagesCustom={confirmation}
          autocomplete="off"
        ></oj-input-date-time>
      </oj-form-layout>
    </div>
  );
};

export default InputDateTime;
