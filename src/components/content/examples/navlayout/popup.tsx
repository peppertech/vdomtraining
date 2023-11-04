import "ojs/ojpopup";
import "ojs/ojbutton";
import "preact";
import { useRef } from "preact/hooks";
import { ojPopup } from "ojs/ojpopup";
import { ojButton } from "ojs/ojbutton";

export const Popup = () => {
  const popRef = useRef<ojPopup>(null);
  const open = (event: ojButton.ojAction) => {
    popRef.current?.open("#btn1");
  };

  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
      <div class="oj-oj-typography-bold">
        <oj-button id="btn1" onojAction={open} label="Show popup"></oj-button>
        <oj-popup
          id="popupId1"
          ref={popRef}
          autoDismiss="focusLoss"
          modality="modeless"
          position={{
            at: {
              horizontal: "end",
              vertical: "top",
            },
            my: {
              horizontal: "start",
              vertical: "bottom",
            },
          }}
          tail="simple">
          <div class="oj-flex">
            <pre
              class="
                oj-flex-item
                demo-position
                oj-typography-body-sm
              ">
              Something short and sweet goes here!
            </pre>
          </div>
        </oj-popup>
      </div>
    </div>
  );
};
