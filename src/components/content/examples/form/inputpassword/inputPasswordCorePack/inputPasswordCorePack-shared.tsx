import 'preact';
import { ComponentProps } from 'preact';

export type InputPasswordCorePackProps = ComponentProps<"oj-c-input-password">;
export type InputPasswordCorePackValueChangedEvent = Parameters<
  NonNullable<InputPasswordCorePackProps["onvalueChanged"]>
>[0];
export type InputPasswordCorePackRawValueChangedEvent = Parameters<
  NonNullable<InputPasswordCorePackProps["onrawValueChanged"]>
>[0];

export type RadiosetProps = ComponentProps<"oj-c-radioset">;
export type RadiosetValueChangedEvent = Parameters<
  NonNullable<RadiosetProps["onvalueChanged"]>
>[0];

export type InputPasswordLabelEdge = NonNullable<
  InputPasswordCorePackProps["labelEdge"]
>;
export type VisibleInputPasswordLabelEdge = Exclude<
  InputPasswordLabelEdge,
  "none"
>;

export const messageSets: {
  error: NonNullable<InputPasswordCorePackProps["messagesCustom"]>;
  warning: NonNullable<InputPasswordCorePackProps["messagesCustom"]>;
  info: NonNullable<InputPasswordCorePackProps["messagesCustom"]>;
  confirmation: NonNullable<InputPasswordCorePackProps["messagesCustom"]>;
} = {
  error: [{ summary: "summary", detail: "detail", severity: "error" }],
  warning: [{ summary: "summary", detail: "detail", severity: "warning" }],
  info: [{ summary: "summary", detail: "detail", severity: "info" }],
  confirmation: [
    { summary: "summary", detail: "detail", severity: "confirmation" },
  ],
};

export const labelEdgeOptions: Array<{
  value: VisibleInputPasswordLabelEdge;
  label: string;
}> = [
  { value: "inside", label: "inside" },
  { value: "start", label: "start" },
  { value: "top", label: "top" },
];
