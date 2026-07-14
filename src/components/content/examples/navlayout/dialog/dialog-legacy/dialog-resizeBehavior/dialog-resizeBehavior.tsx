import { JetElementCustomEvent } from 'ojs/index';
import 'ojs/ojbutton';
import 'ojs/ojdialog';
import { ojDialog } from 'ojs/ojdialog';
import 'ojs/ojlabel';
import 'ojs/ojoption';
import 'ojs/ojradioset';
import 'preact';
import type { ComponentProps } from 'preact';
import { useRef,useState } from 'preact/hooks';
type ValueChangedEvent<TValue> = JetElementCustomEvent<TValue>;
export const DialogResizeBehavior = () => {
  const dialogRef = useRef<ojDialog | null>(null);
  const [currentResizeBehaviorOpt, setCurrentResizeBehaviorOpt] = useState<ojDialog['resizeBehavior']>('resizable' as ojDialog['resizeBehavior']);
  const handleCurrentResizeBehaviorOptValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-radioset'>['onvalueChanged']>>[0]) => {
    setCurrentResizeBehaviorOpt(event.detail.value);
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
                <oj-label id="mainlabelid">resizeBehavior:</oj-label>
                <oj-radioset id="diaogRBRadioSetId" aria-labelledby="mainlabelid" labelledBy="mainlabelid" onvalueChanged={handleCurrentResizeBehaviorOptValueChanged} value={currentResizeBehaviorOpt}>
                        <oj-option id="optresizable" value="resizable">resizable</oj-option>
                        <oj-option id="optnone" value="none">none</oj-option>
                    </oj-radioset>
            </div>
          <div id="dialogWrapper">
                <oj-dialog ref={dialogRef} id="dialog1" dialogTitle="Resize Behavior Options" resizeBehavior="resizable">
                        <div slot="body"><div>resizeBehavior: resizable</div></div>
                        <div slot="footer"><oj-button id="okButton" onojAction={handleOKClose}>OK</oj-button></div>
                    </oj-dialog>
                <oj-button id="buttonOpener" onojAction={handleOpen}>Open Dialog</oj-button>
            </div>
      </>
    );
};
export default DialogResizeBehavior;
