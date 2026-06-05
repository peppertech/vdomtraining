/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from 'preact';
import { useState } from 'preact/hooks';
import { ojDialog } from 'ojs/ojdialog';
import 'ojs/ojdialog';
import 'ojs/ojbutton';
import 'ojs/ojdefer';

export const DialogDefer = () => {
  const [closeButtonStatus, setCloseButtonStatus] = useState<string>('close button has not been rendered');
  const closeButtonLabel = 'Close';

  const handleOpen = () => {
      (document.querySelector('#dialog1') as ojDialog).open();
  };

  const handleClose = () => {
      (document.querySelector('#dialog1') as ojDialog).close();
  };

  return (
      <div id="dialogWrapper">
            <oj-dialog id="dialog1" dialog-title="Dialog with deferred content" aria-describedby="desc">
                    <div slot="body">
                              {h('oj-defer', null, (
                                          <>
                                            <p id="desc">Dialog content has been rendered.</p>
                                            <oj-button onojAction={handleClose}><span>{closeButtonLabel}</span></oj-button>
                                          </>
                                      ))}
                          </div>
                </oj-dialog>
            <oj-button id="buttonOpener" onojAction={handleOpen}>Open Dialog</oj-button>
        </div>
    );
};

export default DialogDefer;
