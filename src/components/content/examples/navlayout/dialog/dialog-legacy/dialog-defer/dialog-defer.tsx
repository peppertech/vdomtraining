import 'ojs/ojbutton';
import 'ojs/ojdefer';
import 'ojs/ojdialog';
import { ojDialog } from 'ojs/ojdialog';
import * as preact from 'preact';
import { useRef,useState } from 'preact/hooks';

export const DialogDefer = () => {
  const dialogRef = useRef<ojDialog | null>(null);
  const [closeButtonStatus, setCloseButtonStatus] = useState<string>('close button has not been rendered');
  const closeButtonLabel = 'Close';

  const handleOpen = () => {
      dialogRef.current?.open();
  };

  const handleClose = () => {
      dialogRef.current?.close();
  };

  return (
      <div id="dialogWrapper">
            <oj-dialog ref={dialogRef} id="dialog1" dialog-title="Dialog with deferred content" aria-describedby="desc">
                    <div slot="body">
                              {preact.h('oj-defer', null, (
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
