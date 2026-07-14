import "oj-c/badge";
import 'preact';
import type { ComponentProps } from "preact";

const renderBadgeRow = (
  variant: ComponentProps<"oj-c-badge">["variant"] | undefined,
  labels: string[],
) => (
  <div>
    {labels.map((label) => (
      <oj-c-badge
        key={`${variant ?? "default"}-${label}`}
        variant={variant}
        label={label}
      ></oj-c-badge>
    ))}
  </div>
);

export const BadgeColorscorepack = () => {
  return (
    <div id="badge-colorscorepack-demo">
      <div class="oj-panel oj-bg-neutral-0 oj-sm-margin-6x-bottom">
        <div class="oj-sm-margin-2x-bottom">Default</div>
        <p>{renderBadgeRow(undefined, ["Complete", "Closed", "Average"])}</p>
        {renderBadgeRow("neutralSubtle", ["Complete", "Closed", "Average"])}
      </div>

      <div class="oj-panel oj-bg-neutral-0 oj-sm-margin-6x-bottom">
        <div class="oj-sm-margin-2x-bottom">Danger</div>
        <p>
          {renderBadgeRow("danger", [
            "Error",
            "Fail",
            "Disconnected",
            "Deleted",
          ])}
        </p>
        {renderBadgeRow("dangerSubtle", [
          "Error",
          "Fail",
          "Disconnected",
          "Deleted",
        ])}
      </div>

      <div class="oj-panel oj-bg-neutral-0 oj-sm-margin-6x-bottom">
        <div class="oj-sm-margin-2x-bottom">Success</div>
        <p>
          {renderBadgeRow("success", [
            "Success",
            "Pass",
            "Connected",
            "Complete",
          ])}
        </p>
        {renderBadgeRow("successSubtle", [
          "Success",
          "Pass",
          "Connected",
          "Complete",
        ])}
      </div>

      <div class="oj-panel oj-bg-neutral-0 oj-sm-margin-6x-bottom">
        <div class="oj-sm-margin-2x-bottom">Warning</div>
        <p>
          {renderBadgeRow("warning", [
            "Warning",
            "On hold",
            "Suspended",
            "Not started",
            "Incomplete",
            "Unpublished",
          ])}
        </p>
        {renderBadgeRow("warningSubtle", [
          "Warning",
          "On hold",
          "Suspended",
          "Not started",
          "Incomplete",
          "Unpublished",
        ])}
      </div>

      <div class="oj-panel oj-bg-neutral-0 oj-sm-margin-6x-bottom">
        <div class="oj-sm-margin-2x-bottom">Info</div>
        <p>
          {renderBadgeRow("info", [
            "Assigned",
            "In progress",
            "Open",
            "Modified",
            "Duplicate",
          ])}
        </p>
        {renderBadgeRow("infoSubtle", [
          "Assigned",
          "In progress",
          "Open",
          "Modified",
          "Duplicate",
        ])}
      </div>
    </div>
  );
};

export default BadgeColorscorepack;
