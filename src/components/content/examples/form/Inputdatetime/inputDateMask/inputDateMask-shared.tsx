import { IntlConverterUtils } from "ojs/ojconverterutils-i18n";
import 'preact';
import { ComponentProps } from 'preact';

export type InputDateMaskProps = ComponentProps<"oj-c-input-date-mask">;
export type InputDateMaskValueChangedEvent = Parameters<
  NonNullable<InputDateMaskProps["onvalueChanged"]>
>[0];
export type InputDateMaskRawValueChangedEvent = Parameters<
  NonNullable<InputDateMaskProps["onrawValueChanged"]>
>[0];

export type RadiosetProps = ComponentProps<"oj-c-radioset">;
export type RadiosetValueChangedEvent = Parameters<
  NonNullable<RadiosetProps["onvalueChanged"]>
>[0];

export const labelEdgeOptions = [
  { value: "inside", label: "inside" },
  { value: "start", label: "start" },
  { value: "top", label: "top" },
];

export const messageSets: {
  error: NonNullable<InputDateMaskProps["messagesCustom"]>;
  warning: NonNullable<InputDateMaskProps["messagesCustom"]>;
  info: NonNullable<InputDateMaskProps["messagesCustom"]>;
  confirmation: NonNullable<InputDateMaskProps["messagesCustom"]>;
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
