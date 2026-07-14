import 'ojs/ojbutton';
import 'ojs/ojdialog';
import { ojDialog } from 'ojs/ojdialog';
import 'preact';
import { useRef } from 'preact/hooks';

export const DialogUserDefinedHeader = () => {
  const dialogRef = useRef<ojDialog | null>(null);

  const handleOpen = () => {
      dialogRef.current?.open();
  };

  const handleOKClose = () => {
      dialogRef.current?.close();
  };

  return (
      <div id="dialogWrapper">
            <oj-dialog ref={dialogRef} id="dialogWithUserDefinedHeader">
                    <div slot="header">
                              <h1 id="dialogTitleId" class="oj-dialog-title">
                                          User Defined Header
                                          <span role="img" class="oj-ux-ico-information-s" />
                                      </h1>
                          </div>
                    <div slot="body">This dialog contains a user-defined header.</div>
                    <div slot="footer"><oj-button id="okButton" onojAction={handleOKClose}>OK</oj-button></div>
                </oj-dialog>
            <oj-button id="buttonOpener" onojAction={handleOpen}>Open Dialog</oj-button>
        </div>
    );
};

export default DialogUserDefinedHeader;
