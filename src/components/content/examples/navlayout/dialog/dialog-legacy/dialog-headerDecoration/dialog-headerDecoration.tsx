import 'ojs/ojbutton';
import 'ojs/ojdialog';
import { ojDialog } from 'ojs/ojdialog';
import 'ojs/ojlabel';
import 'ojs/ojoption';
import 'ojs/ojradioset';
import 'preact';
import { useRef,useState } from 'preact/hooks';

type PropertyChangedEvent<T> = CustomEvent<{ value: T }>;

export const DialogHeaderDecoration = () => {
  const dialogRef = useRef<ojDialog | null>(null);
  const [currentHeaderDecorationOpt, setCurrentHeaderDecorationOpt] = useState<ojDialog['headerDecoration']>('on' as ojDialog['headerDecoration']);

  const handleCurrentHeaderDecorationOptValueChanged = (event: PropertyChangedEvent<ojDialog['headerDecoration']>) => {
    setCurrentHeaderDecorationOpt(event.detail.value);
  };

  const handleOpen = () => {
      dialogRef.current?.open();
  };

  const handleOKClose = () => {
      dialogRef.current?.close();
  };

  return (
      <>
          <div id="formId">
                <oj-label id="mainlabelid">headerDecoration:</oj-label>
                <oj-radioset id="diaogRBRadioSetId" aria-labelledby="mainlabelid" onvalueChanged={handleCurrentHeaderDecorationOptValueChanged} value={currentHeaderDecorationOpt}>
                        <oj-option id="optOff" value="off">off</oj-option>
                        <oj-option id="optOn" value="on">on</oj-option>
                    </oj-radioset>
            </div>
          <div id="dialogWrapper">
                <oj-dialog ref={dialogRef} id="dialog1" dialog-title="Header Decoration Options" header-decoration={currentHeaderDecorationOpt}>
                        <div slot="body">
                                  <div>
                                              header-decoration:
                                              {currentHeaderDecorationOpt}
                                          </div>
                              </div>
                        <div slot="footer"><oj-button id="okButton" onojAction={handleOKClose}>OK</oj-button></div>
                    </oj-dialog>
                <oj-button id="buttonOpener" onojAction={handleOpen}>Open Dialog</oj-button>
            </div>
      </>
    );
};

export default DialogHeaderDecoration;
