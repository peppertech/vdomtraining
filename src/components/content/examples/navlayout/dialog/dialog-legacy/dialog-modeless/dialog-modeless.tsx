import { JetElementCustomEvent } from 'ojs/index';
import { h } from 'preact';
import type { ComponentProps } from 'preact';

import { useRef, useState } from 'preact/hooks';
import { ojDialog } from 'ojs/ojdialog';
import 'ojs/ojdialog';
import 'ojs/ojbutton';
import 'ojs/ojformlayout';
import 'ojs/ojinputtext';

type InputTextValue = ComponentProps<'oj-input-text'>['value'];
type InputTextValueChangedEvent = Parameters<NonNullable<ComponentProps<'oj-input-text'>['onvalueChanged']>>[0];

export const DialogModeless = () => {
  const dialogRef = useRef<ojDialog | null>(null);
  const [textVal1, setTextVal1] = useState<InputTextValue>('');
  const [textVal2, setTextVal2] = useState<InputTextValue>('');

  const handleTextVal1ValueChanged = (event: InputTextValueChangedEvent) => {
    setTextVal1(event.detail.value ?? '');
  };

  const handleTextVal2ValueChanged = (event: InputTextValueChangedEvent) => {
    setTextVal2(event.detail.value ?? '');
  };

  const handleOpen = () => {
      dialogRef.current?.open();
  };

  const handleOKClose = () => {
      dialogRef.current?.close();
  };

  return (
      <div id="dialogWrapper">
            <oj-dialog ref={dialogRef} id="modelessDialog1" dialogTitle="Modeless Dialog" modality="modeless" aria-describedby="desc">
                    <div slot="body">
                              <p id="desc">
                                          This is an example of a modeless dialog. Interaction with other window areas and components is possible when a modeless dialog is displayed.
                                      </p>
                          </div>
                    <div slot="footer"><oj-button id="okButton" onojAction={handleOKClose}>OK</oj-button></div>
                </oj-dialog>
            <oj-button id="buttonOpener" onojAction={handleOpen}>Open Modeless Dialog</oj-button>
            <div class="oj-sm-padding-4x-top" id="form-container">
                    <oj-form-layout direction="row" maxColumns={1}>
                              <oj-input-text onvalueChanged={handleTextVal1ValueChanged} value={textVal1} labelHint="Address 1" />
                              <oj-input-text onvalueChanged={handleTextVal2ValueChanged} value={textVal2} labelHint="Address 2" />
                          </oj-form-layout>
                </div>
        </div>
    );
};
export default DialogModeless;
