import "css!./demo.css";
import 'oj-c/truncating-badge';
import 'preact';
import type { ComponentProps } from "preact";

type TruncatingBadgeProps = ComponentProps<"oj-c-truncating-badge">;
type BadgeVariant = NonNullable<TruncatingBadgeProps["variant"]>;

const badgeSections: ReadonlyArray<{
  heading: string;
  strongVariant?: BadgeVariant;
  subtleVariant: BadgeVariant;
  labels: readonly string[];
}> = [
  {
    heading: "Default",
    subtleVariant: "neutralSubtle",
    labels: ["Complete", "Closed", "Average"]
  },
  {
    heading: "Danger",
    strongVariant: "danger",
    subtleVariant: "dangerSubtle",
    labels: ["Error", "Fail", "Disconnected", "Deleted"]
  },
  {
    heading: "Success",
    strongVariant: "success",
    subtleVariant: "successSubtle",
    labels: ["Success", "Pass", "Connected", "Complete"]
  },
  {
    heading: "Warning",
    strongVariant: "warning",
    subtleVariant: "warningSubtle",
    labels: ["Warning", "On hold", "Suspended", "Not started", "Incomplete", "Unpublished"]
  },
  {
    heading: "Info",
    strongVariant: "info",
    subtleVariant: "infoSubtle",
    labels: ["Assigned", "In progress", "Open", "Modified", "Duplicate"]
  }
];

const renderBadgeGroup = (labels: readonly string[], variant?: BadgeVariant) =>
  labels.map((label) => <oj-c-truncating-badge key={`${variant ?? "neutral"}-${label}`} variant={variant} label={label} />);

export const TruncatingBadgeColorscorepack = () => {
  return (
    <div id="demo-container">
      {badgeSections.map(({ heading, strongVariant, subtleVariant, labels }) => (
        <div key={heading} class="oj-panel oj-bg-neutral-0 oj-sm-margin-6x-bottom">
          <div class="oj-sm-margin-2x-bottom">{heading}</div>
          <p>{renderBadgeGroup(labels, strongVariant)}</p>
          <div>{renderBadgeGroup(labels, subtleVariant)}</div>
        </div>
      ))}
    </div>
  );
};

export default TruncatingBadgeColorscorepack;
