import "oj-c/form-layout";
import "oj-c/labelled-link";
import 'preact';
import { useCallback,useState } from "preact/hooks";

export default function LabelledLinkCustomActionExample() {
  const [lastAction, setLastAction] = useState("No custom action triggered yet.");

  const handleLinkAction = useCallback(() => {
    setLastAction("Custom action triggered for the labelled link.");
  }, []);

  return (
    <div id="container">
      <oj-c-form-layout maxColumns={2} direction="row">
        <oj-c-labelled-link
          labelHint="Labelled link"
          href="https://www.oracle.com"
          target="_blank"
          text="Click here to open the link"
          containerReadonly={false}
        ></oj-c-labelled-link>
        <oj-c-labelled-link
          labelHint="Labelled link (Custom behavior)"
          text="Click here to perform custom action"
          onojAction={handleLinkAction}
          containerReadonly={false}
        ></oj-c-labelled-link>
      </oj-c-form-layout>
      <div class="oj-sm-margin-4x-top oj-typography-body-sm">{lastAction}</div>
    </div>
  );
}
