import { h } from "preact";
import "ojs/ojbutton";
import "ojs/ojoption";

const formatOptions = [
  { id: "bold", label: "Bold" },
  { id: "italic", label: "Italic" },
  { id: "underline", label: "Underline" },
];

export const ButtonsetoneBasic = () => {
  return (
    <div id="buttons-container">
      <oj-buttonset-one id="formatset" value="bold" aria-label="Choose only one format.">
        {formatOptions.map((option) => (
          <oj-option key={option.id} value={option.id}>
            <span>{option.label}</span>
          </oj-option>
        ))}
      </oj-buttonset-one>
    </div>
  );
};

export default ButtonsetoneBasic;
