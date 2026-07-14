import 'preact';
import { ComponentProps } from 'preact';
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");

export type InputTextCorePackProps = ComponentProps<"oj-c-input-text">;
export type RadiosetProps = ComponentProps<"oj-c-radioset">;

export type InputTextLabelEdge = NonNullable<InputTextCorePackProps["labelEdge"]>;
export type VisibleInputTextLabelEdge = Exclude<InputTextLabelEdge, "none">;

export type BrowserOption = {
  value: string;
  label: string;
};

export const browserOptions: BrowserOption[] = [
  { value: "IE", label: "Internet Explorer" },
  { value: "FF", label: "Firefox" },
  { value: "CH", label: "Chrome" },
  { value: "OP", label: "Opera" },
  { value: "SA", label: "Safari" },
];

export const createBrowserDataProvider = () =>
  new MutableArrayDataProvider<string, BrowserOption>(browserOptions, {
    keyAttributes: "value",
  });

export const errorMessages: NonNullable<InputTextCorePackProps["messagesCustom"]> =
  [{ summary: "summary", detail: "detail", severity: "error" }];
export const warningMessages: NonNullable<InputTextCorePackProps["messagesCustom"]> =
  [{ summary: "summary", detail: "detail", severity: "warning" }];
export const infoMessages: NonNullable<InputTextCorePackProps["messagesCustom"]> =
  [{ summary: "summary", detail: "detail", severity: "info" }];
export const confirmationMessages: NonNullable<
  InputTextCorePackProps["messagesCustom"]
> = [{ summary: "summary", detail: "detail", severity: "confirmation" }];

export const labelEdgeOptions: Array<{
  value: VisibleInputTextLabelEdge;
  label: string;
}> = [
  { value: "inside", label: "inside" },
  { value: "start", label: "start" },
  { value: "top", label: "top" },
];

export const virtualKeyboardOptions = [
  { value: "email", label: "email" },
  { value: "number", label: "number" },
  { value: "search", label: "search" },
  { value: "tel", label: "tel" },
  { value: "text", label: "text" },
  { value: "url", label: "url" },
];

export const maxLengthConfig: InputTextCorePackProps["length"] = {
  max: 3,
  countBy: "codeUnit",
};

export const overviewMaxLengthConfig: InputTextCorePackProps["length"] = {
  max: 5,
  countBy: "codeUnit",
};

export const buttonsetItems = [
  { value: "start", label: "Start" },
  { value: "right", label: "Right" },
  { value: "end", label: "End" },
  { value: "", label: "(none)" },
];

export type DemoState = "enabled" | "disabled" | "readonly";
export type DemoValueState = "yes" | "no";
export type DemoTextAlignState = "start" | "end" | "none";

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
