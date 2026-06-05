import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { ojButton } from 'ojs/ojbutton';
import { ojDialog } from 'ojs/ojdialog';
import 'ojs/ojbutton';
import 'ojs/ojcheckboxset';
import 'ojs/ojdialog';
import 'ojs/ojlabel';
import 'ojs/ojoption';
import 'ojs/ojradioset';
import 'css!./demo.css';

type DialogPositionValue = NonNullable<
  NonNullable<ComponentProps<'oj-dialog'>['position']>['at']
>['vertical'];
type DialogProps = ComponentProps<'oj-dialog'>;
type RadioSetValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-radioset'>['onvalueChanged']>
>[0];
type CheckboxValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-checkboxset'>['onvalueChanged']>
>[0];

export const DialogPosition = () => {
  const [currentPosition, setCurrentPosition] = useState<DialogPositionValue>('center');
  const [fullScreen, setFullScreen] = useState<string[]>([]);

  const handleCurrentPositionValueChanged = (event: RadioSetValueChangedEvent) => {
    setCurrentPosition(event.detail.value ?? 'center');
  };

  const handleFullScreenValueChanged = (event: CheckboxValueChangedEvent) => {
    setFullScreen(event.detail.value ?? []);
  };

  const close = (_event: ojButton.ojAction) => {
    (document.getElementById('modalDialog1') as ojDialog | null)?.close();
  };

  const open = (_event: ojButton.ojAction) => {
    (document.getElementById('modalDialog1') as ojDialog | null)?.open();
  };

  const dialogProps = useMemo<Partial<DialogProps>>(
    () => ({
      position: {
        at: {
          vertical: currentPosition
        },
        my: {
          vertical: currentPosition
        }
      }
    }),
    [currentPosition]
  );
  const isFullScreen = fullScreen.includes('full');

  return (
    <div>
      <div id="formId">
        <oj-radioset
          id="dialogCBRadioPosition"
          class="demo-form-field"
          labelHint="Position"
          onvalueChanged={handleCurrentPositionValueChanged}
          value={currentPosition}
        >
          <oj-option id="optcenter" value="center">
            center
          </oj-option>
          <oj-option id="optbottom" value="bottom">
            bottom
          </oj-option>
          <oj-option id="opttop" value="top">
            top
          </oj-option>
        </oj-radioset>
        <oj-checkboxset
          id="checkboxFullScreen"
          class="demo-form-field"
          labelHint="Full Screen"
          onvalueChanged={handleFullScreenValueChanged}
          value={fullScreen}
        >
          <oj-option id="full" value="full">
            Size 100%
          </oj-option>
        </oj-checkboxset>
      </div>
      <div id="dialogWrapper">
        <oj-dialog
          id="modalDialog1"
          dialogTitle="Modal Dialog"
          class={isFullScreen ? 'demo-dialog-full-screen' : undefined}
          {...dialogProps}
        >
          <div slot="body">
            This is a modal dialog window. Its position and size can be customized using the
            position attribute and the width/height CSS properties.
          </div>
          <div slot="footer">
            <oj-button id="okButton" onojAction={close}>
              OK
            </oj-button>
          </div>
        </oj-dialog>
        <oj-button id="buttonOpener" onojAction={open}>
          Open Modal Dialog
        </oj-button>
      </div>
    </div>
  );
};

export default DialogPosition;
