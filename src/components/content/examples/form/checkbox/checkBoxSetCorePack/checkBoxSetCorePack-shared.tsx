import { ComponentProps } from "preact";
import type { CCheckboxsetElement, CheckboxsetDataItem } from "oj-c/checkboxset";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");

export type CheckboxsetProps = ComponentProps<"oj-c-checkboxset">;
export type RadiosetProps = ComponentProps<"oj-c-radioset">;
export type CheckboxsetValueChangedEvent = Parameters<
  NonNullable<CheckboxsetProps["onvalueChanged"]>
>[0];
export type RadiosetValueChangedEvent = Parameters<
  NonNullable<RadiosetProps["onvalueChanged"]>
>[0];
export type CheckboxsetOption = CheckboxsetDataItem & {
  value: string;
  label: string;
  assistiveText?: string;
  helpSourceLink?: string;
  helpSourceText?: string;
};
export type CheckboxsetRef = CCheckboxsetElement<string, CheckboxsetOption>;

export const browserOptions: CheckboxsetOption[] = [
  { value: "safari", label: "Safari" },
  { value: "edge", label: "Edge" },
  {
    value: "chrome",
    label: "Chrome",
    assistiveText: "More Info",
    helpSourceLink: "https://www.oracle.com",
    helpSourceText: "Help link",
  },
  { value: "firefox", label: "Firefox" },
];

export const wrappingOptions: CheckboxsetOption[] = [
  { value: "salmon", label: "Grilled Salmon" },
  { value: "scallops", label: "Scallops" },
  { value: "salad", label: "Kale Salad" },
  {
    value: "chicken",
    label:
      "Chicken and pasta tossed in a flavor packed creamy sun-dried tomato and pesto sauce",
  },
  { value: "quinoa", label: "Quinoa Stir-Fry" },
  { value: "beef", label: "Beef Tenderloin" },
];

export const colorOptions: CheckboxsetOption[] = [
  { value: "blue", label: "Blue" },
  { value: "green", label: "Green" },
  { value: "red", label: "Red" },
  { value: "lime", label: "Lime" },
  { value: "aqua", label: "Aqua" },
];

export const colorOptionsWithAssistance: CheckboxsetOption[] = [
  {
    value: "blue",
    label: "Blue",
    assistiveText: "Color Blue",
    helpSourceLink: "https://en.wikipedia.org/wiki/Blue",
    helpSourceText: "More info",
  },
  {
    value: "green",
    label: "Green",
    assistiveText: "Color Green",
    helpSourceLink: "https://en.wikipedia.org/wiki/Green",
    helpSourceText: "More info",
  },
  {
    value: "red",
    label: "Red",
    assistiveText: "Color Red",
    helpSourceLink: "https://en.wikipedia.org/wiki/Red",
    helpSourceText: "More info",
  },
  {
    value: "lime",
    label: "Lime",
    helpSourceLink: "https://en.wikipedia.org/wiki/Lime_(color)",
    helpSourceText: "More info",
  },
  {
    value: "aqua",
    label: "Aqua",
    helpSourceLink: "https://en.wikipedia.org/wiki/Aqua_(color)",
    helpSourceText: "More info",
  },
];

export const browserDataProvider = new MutableArrayDataProvider<string, CheckboxsetOption>(
  browserOptions,
  { keyAttributes: "value" },
);

export const wrappingDataProvider = new MutableArrayDataProvider<
  string,
  CheckboxsetOption
>(wrappingOptions, { keyAttributes: "value" });

export const createColorDataProvider = (items: CheckboxsetOption[] = colorOptions) =>
  new MutableArrayDataProvider<string, CheckboxsetOption>(items, {
    keyAttributes: "value",
  });

export const browserDataProviderOptions: CheckboxsetOption[] = [
  { value: "IE", label: "Internet Explorer" },
  { value: "FF", label: "Firefox" },
  { value: "CH", label: "Chrome" },
  { value: "OP", label: "Opera" },
  { value: "SA", label: "Safari" },
];

export const browserShortListOptions: CheckboxsetOption[] = [
  { value: "FF", label: "Firefox" },
  { value: "CH", label: "Chrome" },
];

export const errorMessages: NonNullable<CheckboxsetProps["messagesCustom"]> = [
  { severity: "error", summary: "Error message", detail: "This is an error" },
];

export const warningMessages: NonNullable<CheckboxsetProps["messagesCustom"]> = [
  {
    severity: "warning",
    summary: "Warning message",
    detail: "This is a warning",
  },
];

export const infoMessages: NonNullable<CheckboxsetProps["messagesCustom"]> = [
  { severity: "info", summary: "Info message", detail: "This is info" },
];

export const confirmationMessages: NonNullable<
  CheckboxsetProps["messagesCustom"]
> = [
  {
    severity: "confirmation",
    summary: "Confirmation message",
    detail: "This is confirmation",
  },
];

export const controlStateOptions = [
  { value: "enabled", label: "Enabled" },
  { value: "disabled", label: "Disabled" },
  { value: "readonly", label: "Readonly" },
];
