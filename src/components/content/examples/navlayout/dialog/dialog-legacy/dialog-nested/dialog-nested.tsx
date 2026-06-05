import { h } from 'preact';
import { ojDialog } from 'ojs/ojdialog';
import 'ojs/ojdialog';
import 'ojs/ojbutton';
import "css!./demo.css";

export const DialogNested = () => {
  const handleNestedOpen = () => {
      (document.querySelector('#outerDialog') as ojDialog).open();
  };

  const handleOpen = () => {
      (document.querySelector('#innerDialog') as ojDialog).open();
  };

  const handleOKClose = () => {
      (document.querySelector('#outerDialog') as ojDialog).close();
  };

  const handleOKClose2 = () => {
      (document.querySelector('#innerDialog') as ojDialog).close();
  };

  return (
      <div id="dialogWrapper">
            <oj-dialog id="outerDialog" dialogTitle="Outer Dialog">
                    <div slot="body">
                              You can launch another dialog from this dialog.
                              <oj-dialog id="innerDialog" dialogTitle="Dialog Inner" modality="modal">
                                          <div slot="body">Inner Dialog</div>
                                          <div slot="footer"><oj-button id="okButton2" onojAction={handleOKClose2}>OK</oj-button></div>
                                      </oj-dialog>
                          </div>
                    <div slot="footer">
                              <oj-button id="buttonOpenerNested" onojAction={handleOpen}>Open Dialog</oj-button>
                              <oj-button id="okButton" onojAction={handleOKClose}>OK</oj-button>
                          </div>
                </oj-dialog>
            <oj-button id="buttonOpener" onojAction={handleNestedOpen}>Open Nested Dialog</oj-button>
        </div>
    );
};

export default DialogNested;
