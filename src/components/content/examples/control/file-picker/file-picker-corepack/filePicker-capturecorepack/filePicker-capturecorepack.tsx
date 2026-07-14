import 'oj-c/file-picker';
import { CFilePickerElement } from 'oj-c/file-picker';
import 'oj-c/radioset';
import 'preact';
import type { ComponentProps } from 'preact';
import { useState } from 'preact/hooks';

type CaptureValue = NonNullable<ComponentProps<'oj-c-file-picker'>['capture']>;
type RadioValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-c-radioset'>['onvalueChanged']>
>[0];

const captureOptions: Array<{ value: CaptureValue; label: string }> = [
  { value: 'user', label: 'User' },
  { value: 'environment', label: 'Environment' },
  { value: 'implementation', label: 'Implementation' },
  { value: 'none', label: 'None' }
];

export const FilePickerCapturecorepack = () => {
  const [captureValue, setCaptureValue] = useState<CaptureValue>('environment');
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [invalidMessage, setInvalidMessage] = useState('');

  const handleCaptureValueChanged = (event: RadioValueChangedEvent) => {
    const nextValue = event.detail.value;

    if (
      nextValue === 'user' ||
      nextValue === 'environment' ||
      nextValue === 'implementation' ||
      nextValue === 'none'
    ) {
      setCaptureValue(nextValue);
    }
  };

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
    <div id="file-picker-capture-demo-container">
      <oj-c-file-picker
        accept={['image/*']}
        capture={captureValue}
        selectionMode="single"
        onojSelect={handleSelect}
        onojInvalidSelect={handleInvalidSelect}
      />

      <div class="oj-sm-padding-1x-top" />

      <oj-c-radioset
        labelHint="Capture"
        labelEdge="inside"
        direction="row"
        value={captureValue}
        options={captureOptions}
        onvalueChanged={handleCaptureValueChanged}
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

export default FilePickerCapturecorepack;
