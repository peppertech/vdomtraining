import { IntlDateTimeConverter } from "ojs/ojconverter-datetime";
import 'preact';
import { ComponentProps } from 'preact';

export type InputTimeProps = ComponentProps<"oj-input-time">;
export type InputTimeValueChangedEvent = Parameters<
  NonNullable<InputTimeProps["onvalueChanged"]>
>[0];

export type RadiosetProps = ComponentProps<"oj-radioset">;
export type RadiosetValueChangedEvent = Parameters<
  NonNullable<RadiosetProps["onvalueChanged"]>
>[0];

export const defaultTimeValue = "T18:00:00";
export const shortTimeValue = "T15:00";

export const messageSets: {
  error: NonNullable<InputTimeProps["messagesCustom"]>;
  warning: NonNullable<InputTimeProps["messagesCustom"]>;
  info: NonNullable<InputTimeProps["messagesCustom"]>;
  confirmation: NonNullable<InputTimeProps["messagesCustom"]>;
} = {
  error: [{ summary: "summary", detail: "detail", severity: "error" }],
  warning: [{ summary: "summary", detail: "detail", severity: "warning" }],
  info: [{ summary: "summary", detail: "detail", severity: "info" }],
  confirmation: [
    { summary: "summary", detail: "detail", severity: "confirmation" },
  ],
};

export const militaryTimeConverter = new IntlDateTimeConverter({
  minute: "2-digit",
  hour: "2-digit",
  hour12: false,
});

export const timeFullConverter = new IntlDateTimeConverter({
  formatType: "time",
  timeFormat: "medium",
});
