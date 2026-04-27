import { ComponentProps } from "preact";

export type InputPasswordProps = ComponentProps<"oj-input-password">;
export type InputPasswordValueChangedEvent = Parameters<
  NonNullable<InputPasswordProps["onvalueChanged"]>
>[0];
export type InputPasswordRawValueChangedEvent = Parameters<
  NonNullable<InputPasswordProps["onrawValueChanged"]>
>[0];

export type RadiosetProps = ComponentProps<"oj-radioset">;
export type RadiosetValueChangedEvent = Parameters<
  NonNullable<RadiosetProps["onvalueChanged"]>
>[0];

export const messageSets: {
  error: NonNullable<InputPasswordProps["messagesCustom"]>;
  warning: NonNullable<InputPasswordProps["messagesCustom"]>;
  info: NonNullable<InputPasswordProps["messagesCustom"]>;
  confirmation: NonNullable<InputPasswordProps["messagesCustom"]>;
} = {
  error: [{ summary: "summary", detail: "detail", severity: "error" }],
  warning: [{ summary: "summary", detail: "detail", severity: "warning" }],
  info: [{ summary: "summary", detail: "detail", severity: "info" }],
  confirmation: [
    { summary: "summary", detail: "detail", severity: "confirmation" },
  ],
};
