import { ComponentProps } from "preact";
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
  definition: "help hints definition",
  source: "https://www.oracle.com",
};
const helpHintSource: InputDateTimeProps["helpHints"] = {
  source: "https://www.oracle.com",
};
const lblHint: InputDateTimeProps["labelHint"] =
  "Input Date - using label hints ";

const InputDate = () => {
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
  let datePickerWeek: ojDatePicker["datePicker"];
  let timePicker: object;
  let value: string = "2022-12-20T10:00:00Z";

  const mdQuery =
    ResponsiveUtils.getFrameworkQuery("md-up") || "(min-width: 768px)";
  const largeScreenMatch = matchMedia(mdQuery);

  numberOfMonths = largeScreenMatch.matches ? 2 : 1;
  datePickerMonths = {
    numberOfMonths,
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

  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
      <h5 class="oj-sm-margin-4x-top oj-sm-padding-2x-bottom">States</h5>
      <oj-form-layout maxColumns={3} direction="row">
        <oj-input-date labelHint="Enabled no value"></oj-input-date>
        <oj-input-date labelHint="Disabled no value" disabled></oj-input-date>
        <oj-input-date labelHint="Read only no value" readonly></oj-input-date>
        <oj-input-date value={value} labelHint="Enabled"></oj-input-date>
        <oj-input-date value={value} labelHint="Disabled" disabled></oj-input-date>
        <oj-input-date value={value} labelHint="Read only" readonly></oj-input-date>
      </oj-form-layout>

      <h5 class="oj-sm-margin-4x-top oj-sm-padding-2x-bottom">Required</h5>
      <oj-form-layout maxColumns={3} direction="row">
        <oj-input-date required={true} labelHint="required"></oj-input-date>
      </oj-form-layout>

      <h5 class="oj-sm-margin-4x-top oj-sm-padding-2x-bottom">
        Date Picker Variations
      </h5>
      <oj-form-layout maxColumns={3} labelEdge="inside" direction="row">
        <oj-input-date
          value={value}
          datePicker={datePickerWeek}
          labelHint="Week Of Year"
        ></oj-input-date>
      </oj-form-layout>

      <h5 class="oj-sm-margin-4x-top oj-sm-padding-2x-bottom">Help</h5>
      <oj-form-layout
        max-columns={3}
        labelEdge="inside"
        direction="row"
        class="oj-sm-padding-2x-bottom"
      >
        <oj-input-date
          value={value}
          labelHint={lblHint}
          helpHints={helpHintDefinition}
        ></oj-input-date>

        <oj-input-date
          value={value}
          labelHint={lblHint}
          helpHints={helpHintSource}
        ></oj-input-date>
      </oj-form-layout>

      <h5 class="oj-sm-margin-4x-top oj-sm-padding-2x-bottom">Messages</h5>
      <oj-form-layout maxColumns={3} labelEdge="inside" direction="row">
        <oj-input-date
          value={value}
          labelHint="Error"
          messagesCustom={error}
        ></oj-input-date>
        <oj-input-date
          value={value}
          labelHint="Warning"
          messagesCustom={warning}
        ></oj-input-date>
        <oj-input-date
          value={value}
          label-hint="Information"
          messagesCustom={info}
        ></oj-input-date>
        <oj-input-date
          value={value}
          labelHint="Confirmation"
          messagesCustom={confirmation}
        ></oj-input-date>
      </oj-form-layout>
    </div>
  );
};

export default InputDate;
