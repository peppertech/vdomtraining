import "ojs/ojdialog";
import "ojs/ojpopup";
import "ojs/ojbutton";
import "preact";
import { useState, useRef } from "preact/hooks";
import { ojButton } from "ojs/ojbutton";
import { ojDialog } from "ojs/ojdialog";

export const Dialog = () => {
  const diag1 = useRef<ojDialog>(null);

  const open = (event: ojButton.ojAction) => {
    diag1.current?.open();
  };

  const close = () => {
    diag1.current?.close();
  };

  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
      <div class="oj-oj-typography-bold">
        <oj-button onojAction={open} label="Open Dialog"></oj-button>
        <span>
          <oj-dialog
            id="dialog1"
            dialog-title="Example Dialog"
            aria-describedby="desc"
            ref={diag1}
          >
            <div slot="body">
              <p id="desc">
                This is the dialog content. User can change dialog resize
                behavior, cancel behavior and drag behavior by setting
                properties. Default property value depends on the theme.
              </p>
            </div>
            <div slot="footer">
              <oj-button id="okButton" onojAction={close}>
                OK
              </oj-button>
            </div>
          </oj-dialog>
        </span>
      </div>
    </div>
  );
};

export const Popup = () => {
  const [logMsg, setLogMsg] = useState<string>("none");

  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
      <div class="oj-oj-typography-bold">
        See the /examples/index.tsx file for oj-tab-bar code used above.
      </div>
    </div>
  );
};
