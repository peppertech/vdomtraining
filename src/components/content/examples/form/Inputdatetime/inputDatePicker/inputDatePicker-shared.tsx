import { IntlConverterUtils } from "ojs/ojconverterutils-i18n";
import 'preact';
import { ComponentProps } from 'preact';

export type InputDatePickerProps = ComponentProps<"oj-c-input-date-picker">;
export type InputDatePickerValueChangedEvent = Parameters<
  NonNullable<InputDatePickerProps["onvalueChanged"]>
>[0];
export type InputDatePickerRawValueChangedEvent = Parameters<
  NonNullable<InputDatePickerProps["onrawValueChanged"]>
>[0];
export type RadiosetProps = ComponentProps<"oj-c-radioset">;
export type RadiosetValueChangedEvent = Parameters<
  NonNullable<RadiosetProps["onvalueChanged"]>
>[0];

export type CalendarDateRequired = {
  year: number;
  month: number;
  day: number;
};

export const labelEdgeOptions = [
  { value: "inside", label: "inside" },
  { value: "start", label: "start" },
  { value: "top", label: "top" },
];

export const messageSets: {
  error: NonNullable<InputDatePickerProps["messagesCustom"]>;
  warning: NonNullable<InputDatePickerProps["messagesCustom"]>;
  info: NonNullable<InputDatePickerProps["messagesCustom"]>;
  confirmation: NonNullable<InputDatePickerProps["messagesCustom"]>;
} = {
  error: [{ summary: "summary", detail: "detail", severity: "error" }],
  warning: [{ summary: "summary", detail: "detail", severity: "warning" }],
  info: [{ summary: "summary", detail: "detail", severity: "info" }],
  confirmation: [
    { summary: "summary", detail: "detail", severity: "confirmation" },
  ],
};

export const todayIsoDate =
  IntlConverterUtils.dateToLocalIsoDateString(new Date()) ?? "";

export const toJSDate = (year: number, month: number, day: number) =>
  new Date(year, month - 1, day);

export const getWeekday = ({ day, month, year }: CalendarDateRequired) => {
  const jsDate = toJSDate(year, month, day);
  const df = new Intl.DateTimeFormat("en-US", { weekday: "short" });
  return df.format(jsDate);
};
