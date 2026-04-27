import { ComponentProps } from "preact";

export type InputSensitiveTextProps = ComponentProps<"oj-c-input-sensitive-text">;
export type InputSensitiveTextValueChangedEvent = Parameters<
  NonNullable<InputSensitiveTextProps["onvalueChanged"]>
>[0];
export type InputSensitiveTextRawValueChangedEvent = Parameters<
  NonNullable<InputSensitiveTextProps["onrawValueChanged"]>
>[0];

export type RadiosetProps = ComponentProps<"oj-c-radioset">;
export type RadiosetValueChangedEvent = Parameters<
  NonNullable<RadiosetProps["onvalueChanged"]>
>[0];

export type ButtonsetSingleProps = ComponentProps<"oj-c-buttonset-single">;
export type ButtonsetSingleItem = NonNullable<
  ButtonsetSingleProps["items"]
>[number];
export type ButtonsetSingleValueChangedEvent = Parameters<
  NonNullable<ButtonsetSingleProps["onvalueChanged"]>
>[0];

export const labelEdgeOptions = [
  { value: "inside", label: "inside" },
  { value: "start", label: "start" },
  { value: "top", label: "top" },
];

export const textAlignItems: ButtonsetSingleItem[] = [
  { value: "start", label: "start" },
  { value: "right", label: "right" },
  { value: "end", label: "end" },
  { value: "", label: "(none)" },
];

export const messageSets: {
  error: NonNullable<InputSensitiveTextProps["messagesCustom"]>;
  warning: NonNullable<InputSensitiveTextProps["messagesCustom"]>;
  info: NonNullable<InputSensitiveTextProps["messagesCustom"]>;
  confirmation: NonNullable<InputSensitiveTextProps["messagesCustom"]>;
} = {
  error: [{ summary: "summary", detail: "detail", severity: "error" }],
  warning: [{ summary: "summary", detail: "detail", severity: "warning" }],
  info: [{ summary: "summary", detail: "detail", severity: "info" }],
  confirmation: [
    { summary: "summary", detail: "detail", severity: "confirmation" },
  ],
};

