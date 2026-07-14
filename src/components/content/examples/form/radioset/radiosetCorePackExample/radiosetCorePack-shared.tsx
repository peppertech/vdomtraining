import type { CRadiosetElement,RadiosetDataItem } from "oj-c/radioset";
import 'preact';
import { ComponentProps } from 'preact';
import ArrayDataProvider = require("ojs/ojarraydataprovider");

export type CorePackRadioOption = RadiosetDataItem & {
  value: string;
};

export type RadiosetProps = ComponentProps<"oj-c-radioset">;
export type RadiosetRef = CRadiosetElement<string, CorePackRadioOption>;
export type RadiosetValueChangedEvent = Parameters<
  NonNullable<RadiosetProps["onvalueChanged"]>
>[0];

export const technologyOptions: CorePackRadioOption[] = [
  { value: "desktop", label: "Desktop" },
  { value: "laptop", label: "Laptop" },
  { value: "tablet", label: "Tablet" },
];

export const technologyOptionsWithHelp: CorePackRadioOption[] = [
  {
    value: "desktop",
    label: "Desktop",
    assistiveText: "Desktop",
    helpSourceLink: "https://en.wikipedia.org/wiki/Desktop",
    helpSourceText: "More info",
  },
  {
    value: "laptop",
    label: "Laptop",
    assistiveText: "Laptop",
    helpSourceLink: "https://en.wikipedia.org/wiki/Laptop",
    helpSourceText: "More...",
  },
  {
    value: "tablet",
    label: "Tablet",
    assistiveText: "Tablet",
    helpSourceLink: "https://en.wikipedia.org/wiki/Tablet",
  },
  { value: "phone", label: "Phone" },
];

export const wrappingOptions: CorePackRadioOption[] = [
  { value: "desktop", label: "Desktop" },
  { value: "laptop", label: "Laptop" },
  {
    value: "tablet",
    label: "Tablet - Apple - iPad with Wi-Fi - 32GB - Space Gray",
  },
  { value: "phone", label: "Phone" },
];

export const colorOptions: CorePackRadioOption[] = [
  { value: "blue", label: "Blue" },
  { value: "green", label: "Green" },
  { value: "red", label: "Red" },
  { value: "lime", label: "Lime" },
  { value: "aqua", label: "Aqua" },
];

export const colorOptionsWithAssistance: CorePackRadioOption[] = [
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

export const browserOptions: CorePackRadioOption[] = [
  { value: "IE", label: "Internet Explorer" },
  { value: "FF", label: "Firefox" },
  { value: "CH", label: "Chrome" },
  { value: "OP", label: "Opera" },
  { value: "SA", label: "Safari" },
];

export const browserShortListOptions: CorePackRadioOption[] = [
  { value: "FF", label: "Firefox" },
  { value: "CH", label: "Chrome" },
];

export const controlStateOptions: CorePackRadioOption[] = [
  { value: "enabled", label: "Enabled" },
  { value: "disabled", label: "Disabled" },
  { value: "readonly", label: "Readonly" },
];

export const radiosetMessages = {
  error: [{ severity: "error" as const, summary: "summary", detail: "detail" }],
  warning: [
    { severity: "warning" as const, summary: "summary", detail: "detail" },
  ],
  info: [{ severity: "info" as const, summary: "summary", detail: "detail" }],
  confirmation: [
    {
      severity: "confirmation" as const,
      summary: "summary",
      detail: "detail",
    },
  ],
};

export function createOptionsDataProvider(
  items: CorePackRadioOption[],
): ArrayDataProvider<string, CorePackRadioOption> {
  return new ArrayDataProvider<string, CorePackRadioOption>(items, {
    keyAttributes: "value",
  });
}
