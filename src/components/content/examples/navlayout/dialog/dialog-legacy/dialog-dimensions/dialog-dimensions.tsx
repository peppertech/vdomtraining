import "css!./demo.css";
import 'ojs/ojbutton';
import { ojButton } from 'ojs/ojbutton';
import 'ojs/ojdialog';
import { ojDialog } from 'ojs/ojdialog';
import 'preact';
import { useRef } from 'preact/hooks';

export const DialogDimensions = () => {
  const dialogRef = useRef<ojDialog | null>(null);

  const handleOpen = (event: ojButton.ojAction) => {
      dialogRef.current?.open();
  };

  const handleOKClose = (event: ojButton.ojAction) => {
      dialogRef.current?.close();
  };

  return (
      <div id="dialogWrapper">
            <oj-dialog ref={dialogRef} id="minMaxDialog" dialogTitle="Min/Max Dimensions Dialog" resizeBehavior="resizable">
                    <div slot="body">Resize this dialog to observe the minimum and maximum dimensions.</div>
                    <div slot="footer"><oj-button id="okButton" onojAction={handleOKClose}>OK</oj-button></div>
                </oj-dialog>
            <oj-button id="buttonOpener" onojAction={handleOpen}>Open Dialog</oj-button>
        </div>
    );
};

export default DialogDimensions;
