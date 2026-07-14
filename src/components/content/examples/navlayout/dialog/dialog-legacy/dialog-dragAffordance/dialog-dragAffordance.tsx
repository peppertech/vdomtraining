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
export const DialogDragAffordance = () => {
  const dialogRef = useRef<ojDialog | null>(null);
  const [currentDragAffordanceOpt, setCurrentDragAffordanceOpt] = useState<ojDialog['dragAffordance']>('title-bar' as ojDialog['dragAffordance']);
  const handleCurrentDragAffordanceOptValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-radioset'>['onvalueChanged']>>[0]) => {
    setCurrentDragAffordanceOpt(event.detail.value);
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
                <oj-label id="mainlabelid">dragAffordance:</oj-label>
                <oj-radioset id="diaogRBRadioSetId" aria-labelledby="mainlabelid" onvalueChanged={handleCurrentDragAffordanceOptValueChanged} value={currentDragAffordanceOpt}>
                        <oj-option id="opttitlebar" value="title-bar">title-bar</oj-option>
                        <oj-option id="optnone" value="none">none</oj-option>
                    </oj-radioset>
            </div>
          <div id="dialogWrapper">
                <oj-dialog ref={dialogRef} id="dialog1" dialogTitle="Drag Affordance Options" dragAffordance="title-bar">
                        <div slot="body"><div>dragAffordance: title-bar</div></div>
                        <div slot="footer"><oj-button id="okButton" onojAction={handleOKClose}>OK</oj-button></div>
                    </oj-dialog>
                <oj-button id="buttonOpener" onojAction={handleOpen}>Open Dialog</oj-button>
            </div>
      </>
    );
};
export default DialogDragAffordance;
