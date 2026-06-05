import { JetElementCustomEvent } from 'ojs/index';
import { Fragment, h } from 'preact';
import type { ComponentProps } from 'preact';type ValueChangedEvent<TValue> = JetElementCustomEvent<TValue>;
import { useState } from 'preact/hooks';
import { ojDialog } from 'ojs/ojdialog';
import 'ojs/ojdialog';
import 'ojs/ojbutton';
import 'ojs/ojradioset';
import 'ojs/ojlabel';
import 'ojs/ojoption';
export const DialogResizeBehavior = () => {
  const [currentResizeBehaviorOpt, setCurrentResizeBehaviorOpt] = useState<ojDialog['resizeBehavior']>('resizable' as ojDialog['resizeBehavior']);
  const handleCurrentResizeBehaviorOptValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-radioset'>['onvalueChanged']>>[0]) => {
    setCurrentResizeBehaviorOpt(event.detail.value);
  };
  const handleOpen = () => {
      (document.querySelector('#dialog1') as ojDialog).open();
  };
  const handleOKClose = () => {
      (document.querySelector('#dialog1') as ojDialog).close();
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
                <oj-dialog id="dialog1" dialogTitle="Resize Behavior Options" resizeBehavior="resizable">
                        <div slot="body"><div>resizeBehavior: resizable</div></div>
                        <div slot="footer"><oj-button id="okButton" onojAction={handleOKClose}>OK</oj-button></div>
                    </oj-dialog>
                <oj-button id="buttonOpener" onojAction={handleOpen}>Open Dialog</oj-button>
            </div>
      </>
    );
};
export default DialogResizeBehavior;
