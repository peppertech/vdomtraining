import 'preact';
import { ComponentProps } from 'preact';

export type RichCheckboxsetProps = ComponentProps<"oj-c-rich-checkboxset">;
export type RadiosetProps = ComponentProps<"oj-c-radioset">;
export type RichCheckboxsetValueChangedEvent = Parameters<
  NonNullable<RichCheckboxsetProps["onvalueChanged"]>
>[0];
export type RadiosetValueChangedEvent = Parameters<
  NonNullable<RadiosetProps["onvalueChanged"]>
>[0];

const imageBase = "../../../../styles/images";

export const industryOptions: NonNullable<RichCheckboxsetProps["options"]> = [
  {
    value: "automotive",
    label: "Automotive",
    secondaryText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    thumbnailSrc: `${imageBase}/formControls/automotive.jpg`,
  },
  {
    value: "communications",
    label: "Communications",
    secondaryText: "Proin mauris ipsum, efficitur at dui ut, auctor iaculis felis.",
    thumbnailSrc: `${imageBase}/formControls/communications.jpg`,
  },
  {
    value: "construction",
    label: "Construction",
    secondaryText:
      "Vivamus semper eleifend vestibulum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    thumbnailSrc: `${imageBase}/formControls/construction.jpg`,
  },
  {
    value: "distribution",
    label: "Distribution",
    secondaryText:
      "Maecenas urna augue, tempus vitae fringilla in, cursus sit amet magna. Praesent blandit nibh metus, id varius velit varius eget.",
    thumbnailSrc: `${imageBase}/formControls/distribution.jpg`,
  },
  {
    value: "education",
    label: "Education",
    secondaryText:
      "Cras cursus, mi quis tincidunt tincidunt, augue dolor consequat mauris, iaculis sollicitudin ante purus eu eros.",
    thumbnailSrc: `${imageBase}/formControls/education.jpg`,
  },
  {
    value: "travel",
    label: "Travel",
    secondaryText: "Fusce at nunc vehicula, viverra arcu vel, eleifend odio.",
    thumbnailSrc: `${imageBase}/formControls/travel.jpg`,
  },
];

export const avatarOptions: NonNullable<RichCheckboxsetProps["options"]> = [
  {
    value: "black",
    label: "Chris Black",
    secondaryText: "Oracle Cloud Infrastructure GTM Channel Director EMEA",
    avatar: { src: `${imageBase}/hcm/placeholder-male-01.png` },
  },
  {
    value: "cooper",
    label: "Christine Cooper",
    secondaryText: "Senior Principal Escalation Manager",
    avatar: { src: `${imageBase}/hcm/placeholder-female-01.png` },
  },
  {
    value: "benalamore",
    label: "Chris Benalamore",
    secondaryText: "Area Business Operations Director EMEA & JAPAC",
    avatar: { src: `${imageBase}/hcm/placeholder-male-03.png` },
  },
  {
    value: "johnson",
    label: "Christopher Johnson",
    secondaryText: "Vice-President HCM Application Development",
    avatar: { initials: "CJ", background: "teal" },
  },
  {
    value: "christian",
    label: "Samire Christian",
    secondaryText: "Consulting Project Technical Manager",
    avatar: { src: `${imageBase}/hcm/placeholder-male-05.png` },
  },
  {
    value: "marchris",
    label: "Kurt Marchris",
    secondaryText: "Customer Service Analyst",
    avatar: { initials: "KM", background: "purple" },
  },
];

export const iconOptions: NonNullable<RichCheckboxsetProps["options"]> = [
  { value: 1, label: "Option 1 Label", iconClass: "oj-ux-ico-share" },
  { value: 2, label: "Option 2 Label", iconClass: "oj-ux-ico-accessibility" },
  { value: 3, label: "Option 3 Label", iconClass: "oj-ux-ico-account" },
  {
    value: 4,
    label: "Option 4 Label",
    iconClass: "oj-ux-ico-accounting-period",
  },
  { value: 5, label: "Option 5 Label", iconClass: "oj-ux-ico-action-alt" },
  { value: 6, label: "Option 6 Label", iconClass: "oj-ux-ico-alarm-clock" },
];

export const noMediaOptions: NonNullable<RichCheckboxsetProps["options"]> = [
  {
    value: 1,
    label: "Option 1 Label",
    secondaryText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    value: 2,
    label: "Option 2 Label",
    secondaryText:
      "Nam ut nisl condimentum dui congue convallis eget quis magna. Cras lobortis, felis suscipit convallis iaculis, diam orci eleifend risus, sit amet imperdiet libero ipsum et felis.",
  },
  {
    value: 3,
    label:
      "Option 3 Label that is very long and might even need to wrap simply because it is so very long",
    secondaryText: "Suspendisse vehicula, ante quis posuere fermentum",
  },
  {
    value: 4,
    label: "Option 4 Label",
    secondaryText:
      "Fusce eleifend vehicula ex, in porta purus varius a. Nulla enim erat, consectetur nec velit malesuada, faucibus consequat risus.",
  },
  {
    value: 5,
    label:
      "Option 5 Label that is very long and might even need to wrap simply because it is so very long",
    secondaryText:
      "Nulla nunc nulla, porttitor a blandit at, sagittis vitae nulla. Aliquam posuere convallis lectus. Ut nec neque sodales, posuere mi in, scelerisque nisi.",
  },
  {
    value: 6,
    label: "Option 6 Label",
    secondaryText: "Integer facilisis rutrum turpis.",
  },
];

export const errorMessages: NonNullable<RichCheckboxsetProps["messagesCustom"]> =
  [{ severity: "error", summary: "Error message", detail: "This is an error" }];

export const warningMessages: NonNullable<
  RichCheckboxsetProps["messagesCustom"]
> = [
  {
    severity: "warning",
    summary: "Warning message",
    detail: "This is a warning",
  },
];

export const infoMessages: NonNullable<RichCheckboxsetProps["messagesCustom"]> =
  [{ severity: "info", summary: "Info message", detail: "This is info" }];

export const confirmationMessages: NonNullable<
  RichCheckboxsetProps["messagesCustom"]
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
