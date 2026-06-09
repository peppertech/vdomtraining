import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useState } from 'preact/hooks';
import type { FilePickerElement } from 'ojs/ojfilepicker';
import 'ojs/ojfilepicker';
import 'ojs/ojoption';
import 'ojs/ojradioset';

type CaptureValue = NonNullable<FilePickerElement['capture']>;
type RadioValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-radioset'>['onvalueChanged']>
>[0];

export const FilePickerCapture = () => {
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

  const selectListener = (event: FilePickerElement.ojSelect) => {
    setInvalidMessage('');
    setFileNames(Array.from(event.detail.files).map((file) => file.name));
  };

  const invalidListener = (event: FilePickerElement.ojInvalidSelect) => {
    setFileNames([]);
    setInvalidMessage(event.detail.messages.map((message) => message.summary).join('; '));

    event.detail.until?.then(() => {
      setInvalidMessage('');
    });
  };

  return (
    <div id="parentContainer" class="oj-sm-padding-1x">
      <oj-file-picker
        accept={['image/*']}
        capture={captureValue}
        selectionMode="single"
        onojSelect={selectListener}
        onojInvalidSelect={invalidListener}
      />

      <div class="oj-sm-padding-1x-top" />

      <oj-radioset
        id="captureOptions"
        value={captureValue}
        onvalueChanged={handleCaptureValueChanged}
        labelHint="Capture"
        labelEdge="inside"
        class="oj-choice-direction-row"
      >
        <oj-option value="user">User</oj-option>
        <oj-option value="environment">Environment</oj-option>
        <oj-option value="implementation">Implementation</oj-option>
        <oj-option value="none">None</oj-option>
      </oj-radioset>

      <div class="oj-sm-padding-1x-top">
        Selected files: {fileNames.length > 0 ? fileNames.join(', ') : 'None'}
      </div>
      <div class="oj-sm-padding-1x-top">
        Invalid Message Content: {invalidMessage || 'None'}
      </div>
    </div>
  );
};

export default FilePickerCapture;
