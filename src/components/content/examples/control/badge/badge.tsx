import "oj-c/badge";
import 'preact';

const strongVariants = [
  { label: "Neutral", variant: "neutral" },
  { label: "Danger", variant: "danger" },
  { label: "Warning", variant: "warning" },
  { label: "Success", variant: "success" },
  { label: "Info", variant: "info" },
] as const;

const subtleVariants = [
  { label: "Neutral", variant: "neutralSubtle" },
  { label: "Danger", variant: "dangerSubtle" },
  { label: "Warning", variant: "warningSubtle" },
  { label: "Success", variant: "successSubtle" },
  { label: "Info", variant: "infoSubtle" },
] as const;

const defaultLabels = ["text", "3", "99+"];

const Badge = () => {
  return (
    <div id="demo-container" class="oj-web-applayout-max-width oj-web-applayout-content">
      <h6>Strong</h6>
      <p class="oj-sm-margin-0">
        {strongVariants.map((item) => (
          <oj-c-badge
            key={item.variant}
            variant={item.variant}
            label={item.label}
            style={{ marginInlineEnd: "10pt" }}
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
            style={{ marginInlineEnd: "10pt" }}
          ></oj-c-badge>
        ))}
      </p>

      <h6 class="oj-sm-margin-4x-top">Default Size</h6>
      {defaultLabels.map((label) => (
        <oj-c-badge
          key={`default-${label}`}
          label={label}
          style={{ marginInlineEnd: "10pt" }}
        ></oj-c-badge>
      ))}

      <h6 class="oj-sm-margin-4x-top">Small Size</h6>
      {defaultLabels.map((label) => (
        <oj-c-badge
          key={`small-${label}`}
          size="sm"
          label={label}
          style={{ marginInlineEnd: "10pt" }}
        ></oj-c-badge>
      ))}
    </div>
  );
};

export default Badge;
