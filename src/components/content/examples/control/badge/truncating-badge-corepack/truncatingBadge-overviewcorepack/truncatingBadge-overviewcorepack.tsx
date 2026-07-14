import "css!./demo.css";
import 'oj-c/truncating-badge';
import 'preact';
import type { ComponentProps } from "preact";

type TruncatingBadgeProps = ComponentProps<"oj-c-truncating-badge">;
type BadgeVariant = NonNullable<TruncatingBadgeProps["variant"]>;

const defaultBadges = ["text", "3", "99+"] as const;
const strongVariants: ReadonlyArray<{ variant: BadgeVariant; label: string }> = [
  { variant: "neutral", label: "Neutral" },
  { variant: "danger", label: "Danger" },
  { variant: "warning", label: "Warning" },
  { variant: "success", label: "Success" },
  { variant: "info", label: "Info" }
];
const subtleVariants: ReadonlyArray<{ variant: BadgeVariant; label: string }> = [
  { variant: "neutralSubtle", label: "Neutral" },
  { variant: "dangerSubtle", label: "Danger" },
  { variant: "warningSubtle", label: "Warning" },
  { variant: "successSubtle", label: "Success" },
  { variant: "infoSubtle", label: "Info" }
];

const renderVariantBadges = (
  variants: ReadonlyArray<{ variant: BadgeVariant; label: string }>
) => variants.map(({ variant, label }) => <oj-c-truncating-badge key={variant} variant={variant} label={label} />);

const renderSizedBadges = (size?: TruncatingBadgeProps["size"]) =>
  defaultBadges.map((label) => <oj-c-truncating-badge key={`${size ?? "md"}-${label}`} size={size} label={label} />);

export const TruncatingBadgeOverviewcorepack = () => {
  return (
    <div id="demo-container">
      <h6>Truncation with tooltip</h6>
      <p>
        <oj-c-truncating-badge variant="neutral" label="Badge without truncation" />
      </p>
      <p class="oj-sm-width-1/5">
        <oj-c-truncating-badge
          variant="neutral"
          label="Badge with some really long text and truncation enabled, a tooltip with the full text will display on hover or when tabbed to the badge"
        />
      </p>
      <h6>Strong</h6>
      <p>{renderVariantBadges(strongVariants)}</p>

      <h6>Subtle</h6>
      <p>{renderVariantBadges(subtleVariants)}</p>

      <h6 class="oj-sm-margin-4x-top">Default Size</h6>
      {renderSizedBadges()}

      <h6 class="oj-sm-margin-4x-top">Small Size</h6>
      {renderSizedBadges("sm")}
    </div>
  );
};

export default TruncatingBadgeOverviewcorepack;
