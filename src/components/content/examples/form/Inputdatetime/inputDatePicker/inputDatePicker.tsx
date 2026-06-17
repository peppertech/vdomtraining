import { ComponentProps } from "preact";
import { IntlDateTimeConverter } from "ojs/ojconverter-datetime";
import * as ResponsiveUtils from "ojs/ojresponsiveutils";
import Message = require("ojs/ojmessaging");
import { ojDatePicker } from "ojs/ojdatetimepicker";
import "ojs/ojknockout";
import "ojs/ojdatetimepicker";
import "ojs/ojlabel";
import "ojs/ojformlayout";
import { IntlConverterUtils } from "ojs/ojconverterutils-i18n";

type InputDateTimeProps = ComponentProps<"oj-input-date-time">;

const helpHintDefinition: InputDateTimeProps["helpHints"] = {
  definition: "help hints definition",
};
const helpHintSource: InputDateTimeProps["helpHints"] = {
  source: "https://www.oracle.com",
};
const lblHint: InputDateTimeProps["labelHint"] =
  "Input Date - using label hints ";

const InputDatePicker = () => {
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
  const value = IntlConverterUtils.dateToLocalIsoDateString(
    new Date(2013, 0, 1),
  );

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
        <oj-date-picker id="datepicker" value={value}></oj-date-picker>
        <br />
        <span class="oj-label">Current component value is: ${value}</span>
      </oj-form-layout>
    </div>
  );
};

export default InputDatePicker;
