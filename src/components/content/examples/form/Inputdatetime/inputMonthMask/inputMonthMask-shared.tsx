import { ComponentProps } from "preact";

export type InputMonthMaskProps = ComponentProps<"oj-c-input-month-mask">;
export type InputMonthMaskValue = NonNullable<InputMonthMaskProps["value"]>;
export type InputMonthMaskValueChangedEvent = Parameters<
  NonNullable<InputMonthMaskProps["onvalueChanged"]>
>[0];
export type InputMonthMaskRawValueChangedEvent = Parameters<
  NonNullable<InputMonthMaskProps["onrawValueChanged"]>
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
  error: NonNullable<InputMonthMaskProps["messagesCustom"]>;
  warning: NonNullable<InputMonthMaskProps["messagesCustom"]>;
  info: NonNullable<InputMonthMaskProps["messagesCustom"]>;
  confirmation: NonNullable<InputMonthMaskProps["messagesCustom"]>;
} = {
  error: [{ summary: "summary", detail: "detail", severity: "error" }],
  warning: [{ summary: "summary", detail: "detail", severity: "warning" }],
  info: [{ summary: "summary", detail: "detail", severity: "info" }],
  confirmation: [
    { summary: "summary", detail: "detail", severity: "confirmation" },
  ],
};

export const todayMonthValue: InputMonthMaskValue = {
  year: new Date().getFullYear(),
  month: (new Date().getMonth() + 1) as InputMonthMaskValue["month"],
};
