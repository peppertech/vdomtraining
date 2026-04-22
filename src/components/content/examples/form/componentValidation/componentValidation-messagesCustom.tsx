import { h } from "preact";
import { useState } from "preact/hooks";
import "ojs/ojformlayout";
import "ojs/ojoption";
import "ojs/ojradioset";
import "ojs/ojselectcombobox";

export default function ValidationUsecasesMessagesCustomExample() {
  const [osVal, setOsVal] = useState<"Mac" | "Windows">("Mac");
  const [selectVal, setSelectVal] = useState<string[]>(["SA"]);
  const [valid, setValid] = useState("valid");
  const [selectMessagesCustom, setSelectMessagesCustom] = useState<any[]>([]);

  const crossCheck = (osValue: string, browsers: string[], clear: boolean) => {
    if (osValue === "Mac" && browsers.includes("IE")) {
      setSelectMessagesCustom([
        { detail: "You cannot have Internet Explorer on a Mac.", severity: "error" },
      ]);
      setValid("invalidShown");
    } else if (osValue === "Windows" && browsers.includes("SA")) {
      setSelectMessagesCustom([
        { detail: "You cannot have Safari on Windows.", severity: "error" },
      ]);
      setValid("invalidShown");
    } else {
      if (clear) {
        setSelectMessagesCustom([]);
      }
      setValid("valid");
    }
  };

  return (
    <div id="validation-usecase">
      <oj-form-layout>
        <oj-radioset
          value={osVal}
          labelHint="Operating System"
          onvalueChanged={(event: any) => {
            const nextValue = event.detail.value as "Mac" | "Windows";
            setOsVal(nextValue);
            crossCheck(nextValue, selectVal, true);
          }}
        >
          <oj-option value="Mac">Mac</oj-option>
          <oj-option value="Windows">Windows</oj-option>
        </oj-radioset>
        <oj-select-many
          onvalueChanged={(event: any) => {
            const nextValues = (event.detail.value as string[]) ?? [];
            setSelectVal(nextValues);
            crossCheck(osVal, nextValues, false);
          }}
          labelHint="Browsers"
          valid={valid as any}
          value={selectVal as any}
          messagesCustom={selectMessagesCustom as any}
          class="oj-form-control-max-width-md"
        >
          <oj-option value="IE">Internet Explorer</oj-option>
          <oj-option value="FF">Firefox</oj-option>
          <oj-option value="CH">Chrome</oj-option>
          <oj-option value="OP">Opera</oj-option>
          <oj-option value="SA">Safari</oj-option>
        </oj-select-many>
      </oj-form-layout>
      <div>select-many&apos;s value property: {JSON.stringify(selectVal)}</div>
      <div>select-many&apos;s valid property: {valid}</div>
    </div>
  );
}
