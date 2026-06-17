import { h } from 'preact';
import { useRef } from 'preact/hooks';
import 'ojs/ojbutton';
import 'ojs/ojpopup';
import { ojPopup } from 'ojs/ojpopup';

export const PopupPopupcorepack = () => {
  const popupRef = useRef<ojPopup | null>(null);

  const openListener = () => {
      popupRef.current?.open('#btnGo');
  };

  return (
      <div id="popupWrapper">
            <oj-popup ref={popupRef} id="popup1"><span class="demo-blink-rainbow">Hello World!!!</span></oj-popup>
            <oj-button id="btnGo" onojAction={openListener}>Go</oj-button>
        </div>
    );
};

export default PopupPopupcorepack;
