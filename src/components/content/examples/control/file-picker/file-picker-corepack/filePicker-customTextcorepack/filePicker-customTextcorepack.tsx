import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useState } from 'preact/hooks';
import { CFilePickerElement } from 'oj-c/file-picker';
import 'oj-c/checkboxset';
import 'oj-c/file-picker';

type CheckboxValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-c-checkboxset'>['onvalueChanged']>
>[0];
type SelectionMode = NonNullable<ComponentProps<'oj-c-file-picker'>['selectionMode']>;

const primaryText = 'Select files to upload';

const secondaryText = ({ selectionMode }: { selectionMode: SelectionMode }) =>
  selectionMode === 'multiple'
    ? 'Drop one or more files here, or click to browse.'
    : 'Drop one file here, or click to browse.';

const selectionOptions: Array<{ value: 'multiple'; label: string }> = [
  { value: 'multiple', label: 'Select Multiple' }
];

export const FilePickerCustomTextcorepack = () => {
  const [multiple, setMultiple] = useState<Array<'multiple'>>(['multiple']);
  const [fileNames, setFileNames] = useState<string[]>([]);

  const selectionMode: SelectionMode = multiple.includes('multiple') ? 'multiple' : 'single';

  const handleMultipleValueChanged = (event: CheckboxValueChangedEvent) => {
    setMultiple(((event.detail.value as Array<'multiple'> | null) ?? []).filter(Boolean));
  };

  const handleSelect = (event: CFilePickerElement.ojSelect) => {
    setFileNames(Array.from(event.detail.files).map((file) => file.name));
  };

  return (
    <div id="file-picker-custom-text-demo-container">
      <oj-c-file-picker
        selectionMode={selectionMode}
        primaryText={primaryText}
        secondaryText={secondaryText}
        onojSelect={handleSelect}
      />

      <div class="oj-sm-padding-1x-top" />

      <oj-c-checkboxset
        labelHint="Selection Type"
        labelEdge="none"
        options={selectionOptions}
        value={multiple}
        onvalueChanged={handleMultipleValueChanged}
      />

      <div class="oj-sm-padding-1x-top">
        Selected files: {fileNames.length > 0 ? fileNames.join(', ') : 'None'}
      </div>
    </div>
  );
};

export default FilePickerCustomTextcorepack;
