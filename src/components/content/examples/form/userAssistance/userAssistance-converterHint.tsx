import { ComponentProps, h } from "preact";
import { useMemo } from "preact/hooks";
import ColorConverter = require("ojs/ojconverter-color");
import "oj-c/form-layout";
import "oj-c/input-text";
import "ojs/ojcolor";

type InputTextProps = ComponentProps<"oj-c-input-text">;

export default function UserAssistanceConverterHintExample() {
  const converter = useMemo(
    () => new ColorConverter({ format: "hex" }),
    [],
  );

  const hideConverterHintDisplayOptions: InputTextProps["displayOptions"] = {
    converterHint: "none",
  };

  return (
    <div id="form-container">
      <oj-c-form-layout>
        <oj-c-input-text
          id="inputtext"
          converter={converter}
          labelHint="input text with color converter"
        />
        <oj-c-input-text
          id="inputtext2"
          converter={converter}
          labelHint="with display-options.converter-hint=none"
          displayOptions={hideConverterHintDisplayOptions}
        />
        <oj-c-input-text
          id="inputtext3"
          converter={converter}
          labelHint="with converter hint and placeholder"
          placeholder="the placeholder text"
        />
      </oj-c-form-layout>
    </div>
  );
}
