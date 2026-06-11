import { h } from "preact";
import { useMemo, useState } from "preact/hooks";
import "ojs/ojformlayout";
import "ojs/ojinputtext";
import "ojs/ojoption";
import "ojs/ojradioset";

export default function InputTextLegacyTextAlignExample() {
  const [textAlign, setTextAlign] = useState("start");

  const textAlignClass = useMemo(() => {
    if (textAlign === "right") {
      return "oj-form-control-text-align-right";
    }
    if (textAlign === "end") {
      return "oj-form-control-text-align-end";
    }
    if (textAlign === "start") {
      return "oj-form-control-text-align-start";
    }
    return "";
  }, [textAlign]);

  return (
    <div>
      <div class="oj-sm-margin-4x-bottom oj-panel oj-bg-info-30">
        <h6>Set oj-form-control-text-align-* class</h6>
        <oj-radioset
          value={textAlign}
          labelHint="Text Alignment"
          onvalueChanged={(event) => {
            setTextAlign((event.detail.value as string | null | undefined) ?? "");
          }}
        >
          <oj-option value="start">start</oj-option>
          <oj-option value="right">right</oj-option>
          <oj-option value="end">end</oj-option>
          <oj-option value="">(none)</oj-option>
        </oj-radioset>
      </div>

      <oj-form-layout>
        <oj-input-text
          class={textAlignClass}
          value="text"
          labelHint="Input Text"
        ></oj-input-text>
        <oj-input-text
          class={textAlignClass}
          value="12340"
          labelHint="Numeric Text"
        ></oj-input-text>
        <oj-input-text
          class={textAlignClass}
          value="joe.smith@example.com"
          labelHint="Email Text"
        ></oj-input-text>
      </oj-form-layout>
    </div>
  );
}
