import { h } from 'preact';
import { useState } from 'preact/hooks';
import { CFilePickerElement } from 'oj-c/file-picker';
import 'oj-c/file-picker';

const MAX_FILE_SIZE = 100 * 1024;

type FilePickerMessage = CFilePickerElement.ojInvalidSelect['detail']['messages'][number];

const formatFileSize = (size: number) => {
  if (size < 1024) {
    return `${size} B`;
  }

  return `${Math.round((size / 1024) * 10) / 10} KB`;
};

const formatSelectedFile = (file: File) => `${file.name} (${formatFileSize(file.size)})`;

const formatMessage = (message: FilePickerMessage) => {
  const detail = message.detail ? `, detail: '${message.detail}'` : '';
  return `{severity: '${message.severity}', summary: '${message.summary}'${detail}}`;
};

export const FilePickerRestrictFileSizecorepack = () => {
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [invalidMessage, setInvalidMessage] = useState('');

  const handleBeforeSelect = (event: CFilePickerElement.ojBeforeSelect) => {
    setFileNames([]);
    setInvalidMessage('');

    const files = Array.from(event.detail.files);
    const oversizedFiles = files.filter((file) => file.size > MAX_FILE_SIZE);

    if (oversizedFiles.length === 0) {
      return;
    }

    const fileList =
      oversizedFiles.length === 1
        ? oversizedFiles[0].name
        : oversizedFiles.map((file) => file.name).join(', ');
    const summary =
      oversizedFiles.length === 1
        ? `${oversizedFiles[0].name} is too large.`
        : `${oversizedFiles.length} files are too large.`;

    event.detail.accept(
      Promise.reject([
        {
          severity: 'error',
          summary,
          detail: `Maximum file size is 100 KB. Rejected: ${fileList}.`
        }
      ])
    );
  };

  const handleInvalidSelect = (event: CFilePickerElement.ojInvalidSelect) => {
    setFileNames([]);
    setInvalidMessage(event.detail.messages.map(formatMessage).join('; '));

    event.detail.until?.then(() => {
      setInvalidMessage('');
    });
  };

  const handleSelect = (event: CFilePickerElement.ojSelect) => {
    setInvalidMessage('');
    setFileNames(Array.from(event.detail.files).map(formatSelectedFile));
  };

  return (
    <div id="file-picker-demo-container">
      <oj-c-file-picker
        onojBeforeSelect={handleBeforeSelect}
        onojSelect={handleSelect}
        onojInvalidSelect={handleInvalidSelect}
      />

      <div class="oj-sm-padding-1x-top">
        Selected files: {fileNames.length > 0 ? fileNames.join(', ') : 'None'}
      </div>
      <div class="oj-sm-padding-1x-top">
        Invalid Message Content: {invalidMessage || 'None'}
      </div>
    </div>
  );
};

export default FilePickerRestrictFileSizecorepack;
