import { IntlConverterUtils } from "ojs/ojconverterutils-i18n";
import 'preact';
import { ComponentProps } from 'preact';

export type InputDateProps = ComponentProps<"oj-input-date">;
export type InputDateValueChangedEvent = Parameters<
  NonNullable<InputDateProps["onvalueChanged"]>
>[0];

export const todayIsoDate =
  IntlConverterUtils.dateToLocalIsoDateString(new Date()) ?? "";

export const sampleIsoDate =
  IntlConverterUtils.dateToLocalIsoDateString(new Date(2014, 1, 1)) ?? "";

export const messageSets: {
  error: NonNullable<InputDateProps["messagesCustom"]>;
  warning: NonNullable<InputDateProps["messagesCustom"]>;
  info: NonNullable<InputDateProps["messagesCustom"]>;
  confirmation: NonNullable<InputDateProps["messagesCustom"]>;
} = {
  error: [{ summary: "summary", detail: "detail", severity: "error" }],
  warning: [{ summary: "summary", detail: "detail", severity: "warning" }],
  info: [{ summary: "summary", detail: "detail", severity: "info" }],
  confirmation: [
    { summary: "summary", detail: "detail", severity: "confirmation" },
  ],
};

