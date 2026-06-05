import { h } from 'preact';
import { ojDialog } from 'ojs/ojdialog';
import 'ojs/ojdialog';
import 'ojs/ojbutton';

export const DialogUserDefinedHeader = () => {
  const handleOpen = () => {
      (document.querySelector('#dialogWithUserDefinedHeader') as ojDialog).open();
  };

  const handleOKClose = () => {
      (document.querySelector('#dialogWithUserDefinedHeader') as ojDialog).close();
  };

  return (
      <div id="dialogWrapper">
            <oj-dialog id="dialogWithUserDefinedHeader">
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
