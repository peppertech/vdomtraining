import "css!./demo.css";
import 'ojs/ojbutton';
import 'ojs/ojdialog';
import { ojDialog } from 'ojs/ojdialog';
import 'preact';
import { useRef } from 'preact/hooks';

export const DialogScrolling = () => {
  const dialogRef = useRef<ojDialog | null>(null);

  const handleOpen = () => {
      dialogRef.current?.open();
  };

  const handleOKClose = () => {
      dialogRef.current?.close();
  };

  return (
      <div id="dialogWrapper">
            <oj-dialog ref={dialogRef} id="scrollingDialog" dialogTitle="Scrolling Dialog">
                    <div slot="body">
                              <h5>Dialog with scrolling Content</h5>
                              <ol>
                                          <li>Item A</li>
                                          <li>Item B</li>
                                          <li>Item C</li>
                                          <li>Item D</li>
                                          <li>Item E</li>
                                          <li>Item F</li>
                                          <li>Item G</li>
                                          <li>Item H</li>
                                          <li>Item I</li>
                                          <li>Item J</li>
                                          <li>Item K</li>
                                          <li>Item L</li>
                                          <li>Item M</li>
                                          <li>Item N</li>
                                      </ol>
                          </div>
                    <div slot="footer"><oj-button id="okButton" onojAction={handleOKClose}>OK</oj-button></div>
                </oj-dialog>
            <oj-button id="buttonOpener" onojAction={handleOpen}>Open Scrolling Dialog</oj-button>
        </div>
    );
};

export default DialogScrolling;
