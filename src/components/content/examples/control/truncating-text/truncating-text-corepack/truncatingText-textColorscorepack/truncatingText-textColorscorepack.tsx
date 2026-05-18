import type { ComponentProps } from "preact";
import "css!./demo.css";
import { TruncatingText } from "oj-c/truncating-text";

type Variant = ComponentProps<typeof TruncatingText>["variant"];

const COLOR_OPTIONS: ReadonlyArray<{
  ariaDisabled?: boolean;
  label: string;
  variant?: Variant;
}> = [
  { label: "default" },
  { label: "primary", variant: "primary" },
  { label: "secondary", variant: "secondary" },
  { ariaDisabled: true, label: "disabled", variant: "disabled" },
  { label: "danger", variant: "danger" },
  { label: "warning", variant: "warning" },
  { label: "success", variant: "success" }
];

export const TruncatingTextTextColorscorepack = () => (
  <div>
    {COLOR_OPTIONS.map(({ ariaDisabled, label, variant }) => (
      <div key={label}>
        <TruncatingText aria-disabled={ariaDisabled} value={label} variant={variant} />
      </div>
    ))}
  </div>
);

export default TruncatingTextTextColorscorepack;
