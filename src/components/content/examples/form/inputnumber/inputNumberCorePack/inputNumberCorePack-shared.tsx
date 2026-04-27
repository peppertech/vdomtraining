import { ComponentProps } from "preact";
import { IntlNumberConverter } from "ojs/ojconverter-number";

export type InputNumberCorePackProps = ComponentProps<"oj-c-input-number">;
export type InputNumberCorePackValueChangedEvent = Parameters<
  NonNullable<InputNumberCorePackProps["onvalueChanged"]>
>[0];
export type InputNumberCorePackRawValueChangedEvent = Parameters<
  NonNullable<InputNumberCorePackProps["onrawValueChanged"]>
>[0];
export type InputNumberCorePackTransientValueChangedEvent = Parameters<
  NonNullable<InputNumberCorePackProps["ontransientValueChanged"]>
>[0];

export type RadiosetProps = ComponentProps<"oj-c-radioset">;
export type RadiosetValueChangedEvent = Parameters<
  NonNullable<RadiosetProps["onvalueChanged"]>
>[0];

export type InputNumberLabelEdge = NonNullable<
  InputNumberCorePackProps["labelEdge"]
>;
export type VisibleInputNumberLabelEdge = Exclude<InputNumberLabelEdge, "none">;

export const messageSets: {
  error: NonNullable<InputNumberCorePackProps["messagesCustom"]>;
  warning: NonNullable<InputNumberCorePackProps["messagesCustom"]>;
  info: NonNullable<InputNumberCorePackProps["messagesCustom"]>;
  confirmation: NonNullable<InputNumberCorePackProps["messagesCustom"]>;
} = {
  error: [{ summary: "summary", detail: "detail", severity: "error" }],
  warning: [{ summary: "summary", detail: "detail", severity: "warning" }],
  info: [{ summary: "summary", detail: "detail", severity: "info" }],
  confirmation: [
    { summary: "summary", detail: "detail", severity: "confirmation" },
  ],
};

export const labelEdgeOptions: Array<{
  value: VisibleInputNumberLabelEdge;
  label: string;
}> = [
  { value: "inside", label: "inside" },
  { value: "start", label: "start" },
  { value: "top", label: "top" },
];

export const stateOptions = [
  { value: "enabled", label: "Enabled" },
  { value: "disabled", label: "Disabled" },
  { value: "readonly", label: "Readonly" },
];

export const valueOptions = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

export const textAlignOptions = [
  { value: "start", label: "Start" },
  { value: "end", label: "End" },
  { value: "none", label: "None" },
];

export const noGroupingNumberConverter = new IntlNumberConverter({
  style: "decimal",
  minimumIntegerDigits: 2,
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
  useGrouping: false,
});
