import 'preact';
import { ComponentProps,type ComponentChildren } from 'preact';
import ArrayDataProvider = require("ojs/ojarraydataprovider");

export type RadiosetProps = ComponentProps<"oj-radioset">;
export type RadiosetValueChangedEvent = Parameters<
  NonNullable<RadiosetProps["onvalueChanged"]>
>[0];

export type RadioOption = {
  value: string;
  label?: string;
  ariaLabel?: string;
  startIcon?: ComponentChildren;
};

export const createRadiosetOptionsDataProvider = (items: RadioOption[]) =>
  new ArrayDataProvider(items, {
    keyAttributes: "value",
  });

export const technologyOptions: RadioOption[] = [
  { value: "desktop", label: "Desktop" },
  { value: "laptop", label: "Laptop" },
  { value: "tablet", label: "Tablet" },
];

export const wrappingOptions: RadioOption[] = [
  { value: "desktop", label: "Desktop" },
  { value: "laptop", label: "Laptop" },
  {
    value: "tablet",
    label: "Tablet - Apple - iPad with Wi-Fi - 32GB - Space Gray",
  },
  { value: "phone", label: "Phone" },
];

export const colorOptions: RadioOption[] = [
  { value: "blue", label: "Blue" },
  { value: "green", label: "Green" },
  { value: "red", label: "Red" },
  { value: "lime", label: "Lime" },
  { value: "aqua", label: "Aqua" },
];

export const browserOptions: RadioOption[] = [
  { value: "IE", label: "Internet Explorer" },
  { value: "FF", label: "Firefox" },
  { value: "CH", label: "Chrome" },
  { value: "OP", label: "Opera" },
  { value: "SA", label: "Safari" },
];

export const browserShortListOptions: RadioOption[] = [
  { value: "FF", label: "Firefox" },
  { value: "CH", label: "Chrome" },
];

export const shapeOptions: RadioOption[] = [
  { value: "blue", label: "Blue" },
  { value: "green", label: "Green" },
  { value: "red", label: "Red" },
  { value: "lime", label: "Lime" },
  { value: "aqua", label: "Aqua" },
];

export const iconOptions: RadioOption[] = [
  {
    value: "iconFont",
    label: "Icon Font",
    startIcon: <span class="oj-ux-ico-settings" aria-hidden="true"></span>,
  },
  {
    value: "cssimage",
    label: "CSS Image",
    startIcon: (
      <span
        aria-hidden="true"
        style="width: 1rem; height: 1rem; border-radius: 0.25rem; background: linear-gradient(135deg, #1d4ed8, #60a5fa); display: inline-block;"
      ></span>
    ),
  },
  {
    value: "imagetags",
    label: "Image Tag",
    startIcon: (
      <img
        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E%3Crect x='1' y='1' width='14' height='14' rx='3' fill='%23059669'/%3E%3Ccircle cx='6' cy='6' r='2' fill='white'/%3E%3Cpath d='M3 12l3.5-3.5 2.5 2.5 2-2L13 12H3z' fill='white'/%3E%3C/svg%3E"
        alt=""
        role="presentation"
        width="16"
        height="16"
      />
    ),
  },
  {
    value: "svg",
    label: "SVG",
    startIcon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        aria-hidden="true"
      >
        <circle cx="8" cy="8" r="8" fill="#7c3aed" />
      </svg>
    ),
  },
];

export const errorMessages: NonNullable<RadiosetProps["messagesCustom"]> = [
  { summary: "summary", detail: "detail", severity: "error" },
];

export const warningMessages: NonNullable<RadiosetProps["messagesCustom"]> = [
  { summary: "summary", detail: "detail", severity: "warning" },
];

export const infoMessages: NonNullable<RadiosetProps["messagesCustom"]> = [
  { summary: "summary", detail: "detail", severity: "info" },
];

export const confirmationMessages: NonNullable<
  RadiosetProps["messagesCustom"]
> = [{ summary: "summary", detail: "detail", severity: "confirmation" }];

export function renderRadioOptions(
  options: RadioOption[],
): ComponentChildren[] {
  return options.map((option) => (
    <oj-option
      key={option.value}
      value={option.value}
      aria-label={option.ariaLabel}
    >
      {option.startIcon ? <span slot="startIcon">{option.startIcon}</span> : null}
      {option.label}
    </oj-option>
  ));
}
