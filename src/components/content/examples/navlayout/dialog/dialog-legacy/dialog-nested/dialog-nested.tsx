import { h } from 'preact';
import { useRef } from 'preact/hooks';
import { ojDialog } from 'ojs/ojdialog';
import 'ojs/ojdialog';
import 'ojs/ojbutton';
import "css!./demo.css";

export const DialogNested = () => {
  const outerDialogRef = useRef<ojDialog | null>(null);
  const innerDialogRef = useRef<ojDialog | null>(null);

  const handleNestedOpen = () => {
      outerDialogRef.current?.open();
  };

  const handleOpen = () => {
      innerDialogRef.current?.open();
  };

  const handleOKClose = () => {
      outerDialogRef.current?.close();
  };

  const handleOKClose2 = () => {
      innerDialogRef.current?.close();
  };

  return (
      <div id="dialogWrapper">
            <oj-dialog ref={outerDialogRef} id="outerDialog" dialogTitle="Outer Dialog">
                    <div slot="body">
                              You can launch another dialog from this dialog.
                              <oj-dialog ref={innerDialogRef} id="innerDialog" dialogTitle="Dialog Inner" modality="modal">
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
