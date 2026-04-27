import { ComponentProps } from "preact";
import { IntlNumberConverter } from "ojs/ojconverter-number";

export type InputNumberProps = ComponentProps<"oj-input-number">;
export type InputNumberValueChangedEvent = Parameters<
  NonNullable<InputNumberProps["onvalueChanged"]>
>[0];
export type InputNumberRawValueChangedEvent = Parameters<
  NonNullable<InputNumberProps["onrawValueChanged"]>
>[0];
export type InputNumberTransientValueChangedEvent = Parameters<
  NonNullable<InputNumberProps["ontransientValueChanged"]>
>[0];

export type RadiosetProps = ComponentProps<"oj-radioset">;
export type RadiosetValueChangedEvent = Parameters<
  NonNullable<RadiosetProps["onvalueChanged"]>
>[0];

export const messageSets: {
  error: NonNullable<InputNumberProps["messagesCustom"]>;
  warning: NonNullable<InputNumberProps["messagesCustom"]>;
  info: NonNullable<InputNumberProps["messagesCustom"]>;
  confirmation: NonNullable<InputNumberProps["messagesCustom"]>;
} = {
  error: [{ summary: "summary", detail: "detail", severity: "error" }],
  warning: [{ summary: "summary", detail: "detail", severity: "warning" }],
  info: [{ summary: "summary", detail: "detail", severity: "info" }],
  confirmation: [
    { summary: "summary", detail: "detail", severity: "confirmation" },
  ],
};

export const noGroupingNumberConverter = new IntlNumberConverter({
  style: "decimal",
  minimumIntegerDigits: 2,
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
  useGrouping: false,
});
