import { h } from "preact";
import type { ComponentProps } from "preact";
import "oj-c/badge";

type BadgeVariant = ComponentProps<"oj-c-badge">["variant"];

const strongVariants: Array<{ label: string; variant: BadgeVariant }> = [
  { label: "Neutral", variant: "neutral" },
  { label: "Danger", variant: "danger" },
  { label: "Warning", variant: "warning" },
  { label: "Success", variant: "success" },
  { label: "Info", variant: "info" },
];

const subtleVariants: Array<{ label: string; variant: BadgeVariant }> = [
  { label: "Neutral", variant: "neutralSubtle" },
  { label: "Danger", variant: "dangerSubtle" },
  { label: "Warning", variant: "warningSubtle" },
  { label: "Success", variant: "successSubtle" },
  { label: "Info", variant: "infoSubtle" },
];

const defaultLabels = ["text", "3", "99+"];

export const BadgeOverviewcorepack = () => {
  return (
    <div id="badge-overviewcorepack-demo">
      <h6>Strong</h6>
      <p class="oj-sm-margin-0">
        {strongVariants.map((item) => (
          <oj-c-badge
            key={item.variant}
            variant={item.variant}
            label={item.label}
          ></oj-c-badge>
        ))}
      </p>

      <h6>Subtle</h6>
      <p class="oj-sm-margin-0">
        {subtleVariants.map((item) => (
          <oj-c-badge
            key={item.variant}
            variant={item.variant}
            label={item.label}
          ></oj-c-badge>
        ))}
      </p>

      <h6 class="oj-sm-margin-4x-top">Default Size</h6>
      {defaultLabels.map((label) => (
        <oj-c-badge key={`default-${label}`} label={label}></oj-c-badge>
      ))}

      <h6 class="oj-sm-margin-4x-top">Small Size</h6>
      {defaultLabels.map((label) => (
        <oj-c-badge key={`small-${label}`} size="sm" label={label}></oj-c-badge>
      ))}
    </div>
  );
};

export default BadgeOverviewcorepack;
