import "ojs/ojbutton";
import "ojs/ojdefer";
import "ojs/ojpopup";
import { ojPopup } from "ojs/ojpopup";
import * as preact from 'preact';
import { useRef,useState } from "preact/hooks";

export const PopupDefer = () => {
  const popupRef = useRef<ojPopup>(null);
  const [closeButtonStatus, setCloseButtonStatus] = useState(
    "close button has not been rendered",
  );

  const openListener = () => {
    setCloseButtonStatus("close button was rendered");
    popupRef.current?.open("#btnGo");
  };

  const closeListener = () => {
    popupRef.current?.close();
  };

  return (
    <div id="popupWrapper">
      <oj-popup id="popup1" ref={popupRef} autoDismiss="none">
        {preact.h("oj-defer", null, [
          <p>Popup has been rendered.</p>,
          <oj-button onojAction={closeListener}>
            <span>Close</span>
          </oj-button>,
        ])}
      </oj-popup>

      <h4>{closeButtonStatus}</h4>
      <oj-button id="btnGo" onojAction={openListener}>
        Open Popup
      </oj-button>
    </div>
  );
};

export default PopupDefer;
