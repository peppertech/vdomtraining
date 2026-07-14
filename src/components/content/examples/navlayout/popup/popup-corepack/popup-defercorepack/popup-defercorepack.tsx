import "oj-c/button";
import "oj-c/input-text";
import "oj-c/popup";
import "ojs/ojdefer";
import * as preact from 'preact';
import { useEffect,useState } from "preact/hooks";

export const PopupDefercorepack = () => {
  const [opened, setOpened] = useState(false);
  const [closeButtonStatus, setCloseButtonStatus] = useState("close button has not been rendered");

  useEffect(() => {
    if (opened) {
      setCloseButtonStatus("close button was rendered");
    }
  }, [opened]);

  return (
    <div id="popupWrapper">
      <oj-c-popup
        id="popup1"
        aria-labelledby="popuplabel"
        opened={opened}
        launcher="#btnGo"
        autoDismiss="none"
      >
        {preact.h("oj-defer", null, [
          <p id="popuplabel">Popup has been rendered.</p>,
          <oj-c-button onojAction={() => setOpened(false)} label="Close" />,
        ])}
      </oj-c-popup>

      <h4>{closeButtonStatus}</h4>
      <oj-c-button id="btnGo" onojAction={() => setOpened(true)} label="Open Popup" />
    </div>
  );
};

export default PopupDefercorepack;
