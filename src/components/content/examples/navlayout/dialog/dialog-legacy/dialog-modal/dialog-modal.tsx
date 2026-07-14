import 'preact';
import type { ComponentProps } from 'preact';

import 'ojs/ojbutton';
import 'ojs/ojdialog';
import { ojDialog } from 'ojs/ojdialog';
import 'ojs/ojformlayout';
import 'ojs/ojinputtext';
import { useRef,useState } from 'preact/hooks';

type InputTextValue = ComponentProps<'oj-input-text'>['value'];
type InputTextValueChangedEvent = Parameters<NonNullable<ComponentProps<'oj-input-text'>['onvalueChanged']>>[0];

export const DialogModal = () => {
  const dialogRef = useRef<ojDialog | null>(null);
  const [textVal1, setTextVal1] = useState<InputTextValue>('');
  const [textVal2, setTextVal2] = useState<InputTextValue>('');

  const handleTextVal1ValueChanged = (event: InputTextValueChangedEvent) => {
    setTextVal1(event.detail.value ?? '');
  };

  const handleTextVal2ValueChanged = (event: InputTextValueChangedEvent) => {
    setTextVal2(event.detail.value ?? '');
  };

  const close = () => {
      dialogRef.current?.close();
  };

  const open = () => {
      dialogRef.current?.open();
  };

  return (
      <div id="dialogWrapper">
            <oj-dialog ref={dialogRef} id="modalDialog1" dialogTitle="Modal Dialog" aria-describedby="desc">
                    <div slot="body">
                              <p id="desc">
                                          This is the dialog content. User can change dialog resize behavior, cancel behavior and drag behavior by setting attributes. Default attribute value depends on the theme.
                                      </p>
                          </div>
                    <div slot="footer"><oj-button id="okButton" onojAction={close}>OK</oj-button></div>
                </oj-dialog>
            <oj-button id="buttonOpener" onojAction={open}>Open Modal Dialog</oj-button>
            <div class="oj-sm-padding-4x-top" id="form-container">
                    <oj-form-layout direction="row" maxColumns={1}>
                              <oj-input-text onvalueChanged={handleTextVal1ValueChanged} value={textVal1} labelHint="Address 1" />
                              <oj-input-text onvalueChanged={handleTextVal2ValueChanged} value={textVal2} labelHint="Address 2" />
                          </oj-form-layout>
                </div>
        </div>
    );
};
export default DialogModal;
