import { ComponentProps } from "preact";
import { IntlConverterUtils } from "ojs/ojconverterutils-i18n";

export type InputDateTimeProps = ComponentProps<"oj-input-date-time">;
export type InputDateTimeValueChangedEvent = Parameters<
  NonNullable<InputDateTimeProps["onvalueChanged"]>
>[0];

export type RadiosetProps = ComponentProps<"oj-radioset">;
export type RadiosetValueChangedEvent = Parameters<
  NonNullable<RadiosetProps["onvalueChanged"]>
>[0];

export const sampleDateTimeValue = "2022-12-20T10:00:00Z";
export const localDateTimeValue =
  IntlConverterUtils.dateToLocalIso(new Date(2013, 0, 1)) ?? "";

export const messageSets: {
  error: NonNullable<InputDateTimeProps["messagesCustom"]>;
  warning: NonNullable<InputDateTimeProps["messagesCustom"]>;
  info: NonNullable<InputDateTimeProps["messagesCustom"]>;
  confirmation: NonNullable<InputDateTimeProps["messagesCustom"]>;
} = {
  error: [{ summary: "summary", detail: "detail", severity: "error" }],
  warning: [{ summary: "summary", detail: "detail", severity: "warning" }],
  info: [{ summary: "summary", detail: "detail", severity: "info" }],
  confirmation: [
    { summary: "summary", detail: "detail", severity: "confirmation" },
  ],
};
