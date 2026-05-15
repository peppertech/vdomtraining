import { h } from "preact";
import type { ComponentProps } from "preact";
import { useMemo, useState } from "preact/hooks";
import "oj-c/buttonset-multiple";
import "oj-c/button";

type ButtonsetValueChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-buttonset-multiple">["onvalueChanged"]>
>[0];

const formatOptions = [
  { value: "bold", label: "Bold" },
  { value: "italic", label: "Italic" },
  { value: "underline", label: "Underline" }
];

export const ButtonsetmultipleBasiccorepack = () => {
  const [formats, setFormats] = useState<string[]>(["bold", "underline"]);

  const classes = useMemo(() => formats.join(" "), [formats]);
  const bold = useMemo(() => formats.includes("bold"), [formats]);
  const formattedText = useMemo(
    () => (bold ? "This text is bold" : "This text is NOT bold"),
    [bold]
  );

  const handleFormatsChanged = (event: ButtonsetValueChangedEvent) => {
    setFormats((event.detail.value as string[]) ?? []);
  };

  const toggleAll = () => {
    setFormats((currentFormats) =>
      currentFormats.length === 3 ? [] : ["bold", "italic", "underline"]
    );
  };

  const toggleBold = () => {
    setFormats((currentFormats) =>
      currentFormats.includes("bold")
        ? currentFormats.filter((value) => value !== "bold")
        : [...currentFormats, "bold"]
    );
  };

  return (
    <div id="buttons-container">
      <div class="oj-sm-margin-4x-bottom">
        <oj-c-buttonset-multiple
          id="formatset"
          value={formats}
          onvalueChanged={handleFormatsChanged}
          items={formatOptions}
          aria-label="Choose one or more format options."
        />
      </div>

      <p>
        <a id="formattedText" href="#" class={classes}>
          {formattedText}
        </a>
      </p>

      <p>
        <oj-c-button onojAction={toggleBold} label="Toggle bold" />
      </p>
      <oj-c-button onojAction={toggleAll} label="Toggle all 3 (same value for all)" />
    </div>
  );
};

export default ButtonsetmultipleBasiccorepack;
