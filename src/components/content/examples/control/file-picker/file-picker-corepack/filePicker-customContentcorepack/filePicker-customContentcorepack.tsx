import 'css!./demo.css';
import 'oj-c/file-picker';
import { CFilePickerElement } from 'oj-c/file-picker';
import 'preact';
import { useState } from 'preact/hooks';

export const FilePickerCustomContentcorepack = () => {
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [invalidMessage, setInvalidMessage] = useState<string>('');

  const handleSelect = (event: CFilePickerElement.ojSelect) => {
    setInvalidMessage('');
    setFileNames(Array.from(event.detail.files).map((file) => file.name));
  };

  const handleInvalidSelect = (event: CFilePickerElement.ojInvalidSelect) => {
    setFileNames([]);
    setInvalidMessage(event.detail.messages.map((message) => message.summary).join('; '));

    event.detail.until?.then(() => {
      setInvalidMessage('');
    });
  };

  return (
    <div id="file-picker-custom-content-demo-container">
      <oj-c-file-picker onojSelect={handleSelect} onojInvalidSelect={handleInvalidSelect}>
        <div
          slot="trigger"
          class="demo-trigger-content oj-panel oj-bg-neutral-30"
          role="button"
          tabIndex={0}
          aria-label="Select or drop files">
          <span class="oj-ux-ico-upload oj-typography-heading-lg" aria-hidden="true" />
          <span class="oj-typography-body-lg">Drop files here</span>
          <span class="oj-typography-body-sm">or click to browse</span>
        </div>
      </oj-c-file-picker>

      <div class="oj-sm-padding-1x-top">
        Selected files: {fileNames.length > 0 ? fileNames.join(', ') : 'None'}
      </div>
      {invalidMessage && (
        <div class="oj-sm-padding-1x-top">Invalid Message Content: {invalidMessage}</div>
      )}
    </div>
  );
};

export default FilePickerCustomContentcorepack;
