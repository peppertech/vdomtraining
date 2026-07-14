import 'preact';
import type { ComponentProps } from 'preact';

import 'ojs/ojcheckboxset';
import type { ojCheckboxset } from 'ojs/ojcheckboxset';
import 'ojs/ojfilepicker';
import { FilePickerElement } from 'ojs/ojfilepicker';
import 'ojs/ojinputtext';
import 'ojs/ojlabel';
import 'ojs/ojoption';
import { useState } from 'preact/hooks';

type CheckboxValueChangedEvent = ojCheckboxset.valueChanged<string, string>;

export const FilePickerBasic = () => {
  const [multiple, setMultiple] = useState<string[]>(['multiple']);
  const [disabled, setDisabled] = useState<string[]>([]);
  const [invalidMessage, setInvalidMessage] = useState<string>('');
  const [acceptStr, setAcceptStr] = useState<string>('image/*');
  const [fileNames, setFileNames] = useState<string[]>([]);
  const multipleStr = (() => {
      return multiple[0] ? 'multiple' : 'single';
  })();
  const isDisabled = (() => {
      return disabled[0] === 'disable' ? true : false;
  })();
  const acceptArr = (() => {
      const accept = acceptStr;
      return accept ? accept.split(',') : [];
  })();
  const handleMultipleValueChanged = (event: CheckboxValueChangedEvent) => {
    setMultiple(event.detail.value ?? []);
  };

  const handleDisabledValueChanged = (event: CheckboxValueChangedEvent) => {
    setDisabled(event.detail.value ?? []);
  };

  const handleAcceptStrValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-text-area'>['onvalueChanged']>>[0]) => {
    setAcceptStr(event.detail.value ?? '');
  };

  const invalidListener = (event: FilePickerElement.ojInvalidSelect) => {
      setFileNames([]);
      setInvalidMessage("{severity: '" +
          event.detail.messages[0].severity +
          "', summary: '" +
          event.detail.messages[0].summary +
          "'}");
      const promise = event.detail.until;
      if (promise) {
          promise.then(() => {
              setInvalidMessage('');
          });
      }
  };
  const selectListener = (event: FilePickerElement.ojSelect) => {
      setInvalidMessage('');
      const files = event.detail.files;
      setFileNames(Array.from(files).map((file: File) => file.name));
  };
  return (
      <div id="parentContainer" class="oj-sm-padding-1x">
            <oj-file-picker accept={acceptArr} selectionMode={multipleStr} onojSelect={selectListener} disabled={isDisabled} onojInvalidSelect={invalidListener} />
            <div class="oj-sm-padding-1x-top" />
            <oj-checkboxset id="selection" aria-label="Mulitple selection" onvalueChanged={handleMultipleValueChanged} value={multiple}><oj-option id="multipleSelect" value="multiple">Select Multiple</oj-option></oj-checkboxset>
            <div class="oj-sm-padding-1x-top" />
            <oj-checkboxset id="disabled" aria-label="Disabled" onvalueChanged={handleDisabledValueChanged} value={disabled}><oj-option id="disable" value="disable">Disable</oj-option></oj-checkboxset>
            <oj-label for="acceptFld">Accept</oj-label>
            <oj-text-area id="acceptFld" rows={3} onvalueChanged={handleAcceptStrValueChanged} value={acceptStr} />
            <div class="oj-sm-padding-1x-top">
                    Selected files:
                    {fileNames}
                </div>
            <div class="oj-sm-padding-1x-top">
                    Invalid Message Content:
                    {invalidMessage}
                </div>
        </div>
    );
};
export default FilePickerBasic;
