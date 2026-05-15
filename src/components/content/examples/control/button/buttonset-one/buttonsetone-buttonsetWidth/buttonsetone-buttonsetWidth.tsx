import { h } from "preact";
import "css!./demo.css";
import "ojs/ojbutton";
import "ojs/ojoption";

const formatOptions = [
  { id: "bold", label: "Bold" },
  { id: "italic", label: "Italic" },
  { id: "underline", label: "Underline" },
];

export const ButtonsetoneButtonsetWidth = () => {
  return (
    <div id="buttons-container">
      <div class="oj-panel oj-bg-neutral-30 oj-sm-padding-0 demo-max-width-400 oj-sm-margin-4x-bottom">
        <div class="oj-sm-padding-2x">
          <p>
            This buttonset uses the <code>oj-buttonset-width-auto</code> class so each button fits
            its contents.
          </p>
        </div>
        <oj-buttonset-one
          id="formatsetWidthAuto"
          value="bold"
          aria-label="Choose only one format"
          chroming="borderless"
          class="oj-buttonset-width-auto"
        >
          {formatOptions.map((option) => (
            <oj-option key={`auto-${option.id}`} value={option.id}>
              <span>{option.label}</span>
            </oj-option>
          ))}
        </oj-buttonset-one>
      </div>

      <div class="oj-panel oj-bg-neutral-30 oj-sm-padding-0 demo-max-width-400">
        <div class="oj-sm-padding-2x">
          <p>
            This buttonset uses the <code>oj-buttonset-width-equal</code> class so the available
            width is distributed evenly.
          </p>
        </div>
        <oj-buttonset-one
          id="formatsetWidthEqual"
          value="bold"
          aria-label="Choose only one format"
          chroming="borderless"
          class="oj-buttonset-width-equal"
        >
          {formatOptions.map((option) => (
            <oj-option key={`equal-${option.id}`} value={option.id}>
              <span>{option.label}</span>
            </oj-option>
          ))}
        </oj-buttonset-one>
      </div>
    </div>
  );
};

export default ButtonsetoneButtonsetWidth;
