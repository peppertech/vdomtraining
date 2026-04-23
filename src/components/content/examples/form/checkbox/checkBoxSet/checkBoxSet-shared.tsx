import { ComponentProps, type ComponentChildren } from "preact";
import ArrayDataProvider = require("ojs/ojarraydataprovider");

export type CheckboxsetProps = ComponentProps<"oj-checkboxset">;
export type CheckboxsetValueChangedEvent = Parameters<
  NonNullable<CheckboxsetProps["onvalueChanged"]>
>[0];

export type CheckboxOption = {
  value: string;
  label?: string;
  ariaLabel?: string;
  startIcon?: ComponentChildren;
};

export const createCheckboxOptionsDataProvider = (
  items: CheckboxOption[],
) =>
  new ArrayDataProvider(items, {
    keyAttributes: "value",
  });

export const technologyOptions: CheckboxOption[] = [
  { value: "desktop", label: "Desktop" },
  { value: "laptop", label: "Laptop" },
  { value: "tablet", label: "Tablet" },
];

export const wrappingOptions: CheckboxOption[] = [
  { value: "desktop", label: "Desktop" },
  { value: "laptop", label: "Laptop" },
  {
    value: "tablet",
    label: "Tablet - Apple - iPad with Wi-Fi - 32GB - Space Gray",
  },
  { value: "phone", label: "Phone" },
];

export const colorOptions: CheckboxOption[] = [
  { value: "blue", label: "Blue" },
  { value: "green", label: "Green" },
  { value: "red", label: "Red" },
  { value: "lime", label: "Lime" },
  { value: "aqua", label: "Aqua" },
];

export const drinkOptions: CheckboxOption[] = [
  { value: "coffee", label: "Coffee" },
  { value: "tea", label: "Tea" },
  { value: "juice", label: "Juice" },
  { value: "coke", label: "Coke" },
];

export const browserOptions: CheckboxOption[] = [
  { value: "IE", label: "Internet Explorer" },
  { value: "FF", label: "Firefox" },
  { value: "CH", label: "Chrome" },
  { value: "OP", label: "Opera" },
  { value: "SA", label: "Safari" },
];

export const browserShortListOptions: CheckboxOption[] = [
  { value: "FF", label: "Firefox" },
  { value: "CH", label: "Chrome" },
];

export const filterOptions = [
  { value: "blue", label: "Blue", count: 100 },
  { value: "green", label: "Green", count: 50 },
  { value: "red", label: "Red", count: 53 },
  { value: "lime", label: "Lime", count: 0 },
  { value: "aqua", label: "Aqua", count: 5 },
  { value: "pink", label: "Pink", count: 150 },
];

export const shapeOptions: CheckboxOption[] = [
  { value: "square", label: "Square" },
  { value: "circle", label: "Circle" },
  { value: "oval", label: "Oval" },
  { value: "triangle", label: "Triangle" },
];

const browserIconStyle =
  "width: 1rem; height: 1rem; border-radius: 999px; display: inline-block;";

export const iconOptions: CheckboxOption[] = [
  {
    value: "Internet Explorer",
    label: "Internet Explorer",
    startIcon: (
      <span
        aria-hidden="true"
        style={`${browserIconStyle} background: #2563eb;`}
      ></span>
    ),
  },
  {
    value: "Firefox",
    label: "Firefox",
    startIcon: (
      <span
        aria-hidden="true"
        style={`${browserIconStyle} background: #f97316;`}
      ></span>
    ),
  },
  {
    value: "Chrome",
    label: "Chrome",
    startIcon: (
      <span
        aria-hidden="true"
        style={`${browserIconStyle} background: #16a34a;`}
      ></span>
    ),
  },
  {
    value: "Opera",
    label: "Opera",
    startIcon: (
      <span
        aria-hidden="true"
        style={`${browserIconStyle} background: #dc2626;`}
      ></span>
    ),
  },
  {
    value: "Safari",
    label: "Safari",
    startIcon: (
      <span
        aria-hidden="true"
        style={`${browserIconStyle} background: #0ea5e9;`}
      ></span>
    ),
  },
];

export const mixedIconOptions: CheckboxOption[] = [
  {
    value: "iconFont",
    label: "Icon Font",
    startIcon: <span class="oj-ux-ico-settings"></span>,
  },
  {
    value: "css",
    label: "CSS Image",
    startIcon: (
      <span
        aria-hidden="true"
        style="width: 1rem; height: 1rem; border-radius: 0.2rem; background: linear-gradient(135deg, #1d4ed8, #60a5fa); display: inline-block;"
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

export const errorMessages: NonNullable<CheckboxsetProps["messagesCustom"]> = [
  { summary: "summary", detail: "detail", severity: "error" },
];

export const warningMessages: NonNullable<
  CheckboxsetProps["messagesCustom"]
> = [{ summary: "summary", detail: "detail", severity: "warning" }];

export const infoMessages: NonNullable<CheckboxsetProps["messagesCustom"]> = [
  { summary: "summary", detail: "detail", severity: "info" },
];

export const confirmationMessages: NonNullable<
  CheckboxsetProps["messagesCustom"]
> = [{ summary: "summary", detail: "detail", severity: "confirmation" }];

export function renderCheckboxOptions(
  options: CheckboxOption[],
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
