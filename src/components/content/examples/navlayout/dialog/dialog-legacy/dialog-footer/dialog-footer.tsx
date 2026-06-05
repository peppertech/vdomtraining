import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useState } from 'preact/hooks';
import { ojDialog } from 'ojs/ojdialog';
import { JetElementCustomEvent } from 'ojs/index';
import 'ojs/ojdialog';
import 'ojs/ojbutton';
import 'ojs/ojcheckboxset';
import 'ojs/ojlabel';
import 'ojs/ojoption';

type CheckboxValueChangedEvent = Parameters<NonNullable<ComponentProps<'oj-checkboxset'>['onvalueChanged']>>[0];

export const DialogFooter = () => {
  const [classNames, setClassNames] = useState<string[]>([]);

  const handleClassNamesValueChanged = (event: CheckboxValueChangedEvent) => {
    setClassNames(event.detail.value ?? []);
  };

  const handleOpen = () => {
      (document.querySelector('#dialog1') as ojDialog).open();
  };

  const handleOkClose = () => {
      (document.querySelector('#dialog1') as ojDialog).close();
  };

  const isSelected = (option: string) => {
      return classNames.indexOf(option) >= 0;
  };

  return (
      <div id="dialogWrapper">
            <oj-label id="checkboxSetLabel">Classes to apply to the dialog footer:</oj-label>
            <oj-checkboxset id="checkboxSet" aria-labelledby="checkboxSetLabel" labelledBy="checkboxSetLabel" onvalueChanged={handleClassNamesValueChanged} value={classNames}>
                    <oj-option id="nochrome" value="oj-dialog-footer-separator">.oj-dialog-footer-separator (footer separator)</oj-option>
                </oj-checkboxset>
            <br />
            <br />
            <oj-dialog id="dialog1" dialogTitle="Dialog Footer Styles">
                    <div slot="body">A separator can be added between the body and the footer sections.</div>
                    <div slot="footer" className={isSelected('oj-dialog-footer-separator') ? 'ojDialogFooterSeparator' : undefined}><oj-button id="okButton" onojAction={handleOkClose}>Ok</oj-button></div>
                </oj-dialog>
            <oj-button onojAction={handleOpen}>Open Dialog</oj-button>
        </div>
    );
};

export default DialogFooter;

