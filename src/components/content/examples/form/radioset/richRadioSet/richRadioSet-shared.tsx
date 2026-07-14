import 'preact';
import { ComponentProps } from 'preact';

export type RichRadiosetProps = ComponentProps<"oj-c-rich-radioset">;
export type RichRadiosetValueChangedEvent = Parameters<
  NonNullable<RichRadiosetProps["onvalueChanged"]>
>[0];

export type RadiosetProps = ComponentProps<"oj-c-radioset">;
export type RadiosetValueChangedEvent = Parameters<
  NonNullable<RadiosetProps["onvalueChanged"]>
>[0];

export const industryOptions = [
  {
    value: "automotive",
    label: "Automotive",
    secondaryText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    thumbnailSrc: "../../../../styles/images/formControls/automotive.jpg",
  },
  {
    value: "communications",
    label: "Communications",
    secondaryText:
      "Proin mauris ipsum, efficitur at dui ut, auctor iaculis felis.",
    thumbnailSrc: "../../../../styles/images/formControls/communications.jpg",
  },
  {
    value: "construction",
    label: "Construction",
    secondaryText:
      "Vivamus semper eleifend vestibulum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    thumbnailSrc: "../../../../styles/images/formControls/construction.jpg",
  },
];

export const extendedIndustryOptions = [
  ...industryOptions,
  {
    value: "distribution",
    label: "Distribution",
    secondaryText:
      "Maecenas urna augue, tempus vitae fringilla in, cursus sit amet magna. Praesent blandit nibh metus, id varius velit varius eget.",
    thumbnailSrc: "../../../../styles/images/formControls/distribution.jpg",
  },
  {
    value: "education",
    label: "Education",
    secondaryText:
      "Cras cursus, mi quis tincidunt tincidunt, augue dolor consequat mauris, iaculis sollicitudin ante purus eu eros.",
    thumbnailSrc: "../../../../styles/images/formControls/education.jpg",
  },
  {
    value: "travel",
    label: "Travel",
    secondaryText: "Fusce at nunc vehicula, viverra arcu vel, eleifend odio.",
    thumbnailSrc: "../../../../styles/images/formControls/travel.jpg",
  },
];

export const employeeOptions = [
  {
    value: "black",
    label: "Chris Black",
    secondaryText: "Oracle Cloud Infrastructure GTM Channel Director EMEA",
    avatar: {
      src: "../../../../styles/images/hcm/placeholder-male-01.png",
    },
  },
  {
    value: "cooper",
    label: "Christine Cooper",
    secondaryText: "Senior Principal Escalation Manager",
    avatar: {
      src: "../../../../styles/images/hcm/placeholder-female-01.png",
    },
  },
  {
    value: "benalamore",
    label: "Chris Benalamore",
    secondaryText: "Area Business Operations Director EMEA & JAPAC",
    avatar: {
      src: "../../../../styles/images/hcm/placeholder-male-03.png",
    },
  },
  {
    value: "johnson",
    label: "Christopher Johnson",
    secondaryText: "Vice-President HCM Application Development",
    avatar: { initials: "CJ", background: "teal" as const },
  },
  {
    value: "christian",
    label: "Samire Christian",
    secondaryText: "Consulting Project Technical Manager",
    avatar: {
      src: "../../../../styles/images/hcm/placeholder-male-05.png",
    },
  },
  {
    value: "marchris",
    label: "Kurt Marchris",
    secondaryText: "Customer Service Analyst",
    avatar: { initials: "KM", background: "purple" as const },
  },
];

export const iconOptions = [
  { value: "share", label: "Option 1 Label", iconClass: "oj-ux-ico-share" },
  {
    value: "accessibility",
    label: "Option 2 Label",
    iconClass: "oj-ux-ico-accessibility",
  },
  { value: "account", label: "Option 3 Label", iconClass: "oj-ux-ico-account" },
  {
    value: "period",
    label: "Option 4 Label",
    iconClass: "oj-ux-ico-accounting-period",
  },
  {
    value: "action",
    label: "Option 5 Label",
    iconClass: "oj-ux-ico-action-alt",
  },
  {
    value: "alarm",
    label: "Option 6 Label",
    iconClass: "oj-ux-ico-alarm-clock",
  },
];

export const noMediaOptions = [
  {
    value: "option-1",
    label: "Option 1 Label",
    secondaryText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    value: "option-2",
    label: "Option 2 Label",
    secondaryText:
      "Nam ut nisl condimentum dui congue convallis eget quis magna. Cras lobortis, felis suscipit convallis iaculis, diam orci eleifend risus, sit amet imperdiet libero ipsum et felis.",
  },
  {
    value: "option-3",
    label:
      "Option 3 Label that is very long and might even need to wrap simply because it is so very long",
    secondaryText: "Suspendisse vehicula, ante quis posuere fermentum",
  },
  {
    value: "option-4",
    label: "Option 4 Label",
    secondaryText:
      "Fusce eleifend vehicula ex, in porta purus varius a. Nulla enim erat, consectetur nec velit malesuada, faucibus consequat risus.",
  },
  {
    value: "option-5",
    label:
      "Option 5 Label that is very long and might even need to wrap simply because it is so very long",
    secondaryText:
      "Nulla nunc nulla, porttitor a blandit at, sagittis vitae nulla. Aliquam posuere convallis lectus. Ut nec neque sodales, posuere mi in, scelerisque nisi.",
  },
  {
    value: "option-6",
    label: "Option 6 Label",
    secondaryText: "Integer facilisis rutrum turpis.",
  },
];

export const controlStateOptions = [
  { value: "enabled", label: "Enabled" },
  { value: "disabled", label: "Disabled" },
  { value: "readonly", label: "Readonly" },
];

export const richRadiosetMessages: NonNullable<
  RichRadiosetProps["messagesCustom"]
> = [];

export const messageSets = {
  error: [
    { severity: "error" as const, summary: "Error", detail: "detail" },
  ],
  warning: [
    { severity: "warning" as const, summary: "Warning", detail: "detail" },
  ],
  info: [{ severity: "info" as const, summary: "Information", detail: "detail" }],
  confirmation: [
    {
      severity: "confirmation" as const,
      summary: "Confirmation",
      detail: "detail",
    },
  ],
};
