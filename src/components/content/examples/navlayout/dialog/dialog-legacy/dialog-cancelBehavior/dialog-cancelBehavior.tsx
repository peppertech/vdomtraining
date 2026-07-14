import 'ojs/ojbutton';
import 'ojs/ojdialog';
import { ojDialog } from 'ojs/ojdialog';
import 'ojs/ojinputtext';
import 'ojs/ojlabel';
import 'ojs/ojlabelvalue';
import 'ojs/ojoption';
import 'ojs/ojradioset';
import 'preact';
import type { ComponentProps } from 'preact';
import { useRef,useState } from 'preact/hooks';

type DialogCancelBehavior = ComponentProps<'oj-dialog'>['cancelBehavior'];
type RadioSetValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-radioset'>['onvalueChanged']>
>[0];

export const DialogCancelBehavior = () => {
  const dialogRef = useRef<ojDialog | null>(null);
  const [currentCancelBehaviorOpt, setCurrentCancelBehaviorOpt] =
    useState<DialogCancelBehavior>('icon');

  const handleCurrentCancelBehaviorOptValueChanged = (event: RadioSetValueChangedEvent) => {
    setCurrentCancelBehaviorOpt(event.detail.value ?? 'icon');
  };

  const handleOpen = () => {
    dialogRef.current?.open();
  };

  const handleClose = () => {
    dialogRef.current?.close();
  };

  return (
    <div>
      <div id="formId">
        <oj-label id="mainlabelid">cancel-behavior:</oj-label>
        <oj-radioset
          id="diaogCBRadioSetId"
          aria-labelledby="mainlabelid"
          labelledBy="mainlabelid"
          onvalueChanged={handleCurrentCancelBehaviorOptValueChanged}
          value={currentCancelBehaviorOpt}
        >
          <oj-option id="opticon" value="icon">
            icon
          </oj-option>
          <oj-option id="optescape" value="escape">
            escape
          </oj-option>
          <oj-option id="optnone" value="none">
            none
          </oj-option>
        </oj-radioset>
      </div>
      <div id="dialogWrapper">
        <oj-dialog
          ref={dialogRef}
          id="dialog1"
          dialogTitle="Cancel Behavior Options"
          cancelBehavior={currentCancelBehaviorOpt}
        >
          <div slot="body">
            <oj-label-value labelEdge="top">
              <oj-label slot="label" for="cancelBehavior">
                cancel-behavior:
              </oj-label>
              <oj-input-text
                slot="value"
                id="cancelBehavior"
                value={currentCancelBehaviorOpt}
                readonly
              />
            </oj-label-value>
          </div>
          <div slot="footer">
            <oj-button id="okButton" onojAction={handleClose}>
              OK
            </oj-button>
          </div>
        </oj-dialog>
        <oj-button id="buttonOpener" onojAction={handleOpen}>
          Open Dialog
        </oj-button>
      </div>
    </div>
  );
};

export default DialogCancelBehavior;
