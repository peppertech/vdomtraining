import 'preact';
import { ComponentProps } from 'preact';

export type InputTimeMaskProps = ComponentProps<"oj-c-input-time-mask">;
export type InputTimeMaskValueChangedEvent = Parameters<
  NonNullable<InputTimeMaskProps["onvalueChanged"]>
>[0];
export type InputTimeMaskRawValueChangedEvent = Parameters<
  NonNullable<InputTimeMaskProps["onrawValueChanged"]>
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
  error: NonNullable<InputTimeMaskProps["messagesCustom"]>;
  warning: NonNullable<InputTimeMaskProps["messagesCustom"]>;
  info: NonNullable<InputTimeMaskProps["messagesCustom"]>;
  confirmation: NonNullable<InputTimeMaskProps["messagesCustom"]>;
} = {
  error: [{ summary: "summary", detail: "detail", severity: "error" }],
  warning: [{ summary: "summary", detail: "detail", severity: "warning" }],
  info: [{ summary: "summary", detail: "detail", severity: "info" }],
  confirmation: [
    { summary: "summary", detail: "detail", severity: "confirmation" },
  ],
};

