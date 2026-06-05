import { h } from 'preact';
import 'ojs/ojbutton';
import 'ojs/ojpopup';
import { ojPopup } from 'ojs/ojpopup';
import "css!./demo.css";

export const PopupPopup = () => {
  const openListener = () => {
      let popup = document.getElementById('popup1') as ojPopup;
      popup.open('#btnGo');
  };

  return (
      <div id="popupWrapper">
            <oj-popup id="popup1"><span class="demo-blink-rainbow">Hello World!!!</span></oj-popup>
            <oj-button id="btnGo" onojAction={openListener}>Go</oj-button>
        </div>
    );
};

export default PopupPopup;
