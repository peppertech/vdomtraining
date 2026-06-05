import { h } from 'preact';
import { ojDialog } from 'ojs/ojdialog';
import 'ojs/ojdialog';
import 'ojs/ojbutton';
import "css!./demo.css";

export const DialogPercent = () => {
  const handleOpen = () => {
      (document.querySelector('#percentDialog') as ojDialog).open();
  };

  const handleOKClose = () => {
      (document.querySelector('#percentDialog') as ojDialog).close();
  };

  return (
      <div id="dialogWrapper">
            <oj-dialog id="percentDialog" dialogTitle="Percent Dimensions Dialog">
                    <div slot="body">This dialog's width and height are set to 50% of the viewport.</div>
                    <div slot="footer"><oj-button id="okButton" onojAction={handleOKClose}>OK</oj-button></div>
                </oj-dialog>
            <oj-button id="buttonOpener" onojAction={handleOpen}>Open Dialog</oj-button>
        </div>
    );
};

export default DialogPercent;
