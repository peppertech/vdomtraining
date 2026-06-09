import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useState } from 'preact/hooks';
import type { FilePickerElement } from 'ojs/ojfilepicker';
import 'ojs/ojcheckboxset';
import 'ojs/ojfilepicker';
import 'ojs/ojoption';

type CheckboxValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-checkboxset'>['onvalueChanged']>
>[0];

const primaryText = 'Select files to upload';

const secondaryText = ({ selectionMode }: { selectionMode: 'multiple' | 'single' }) =>
  selectionMode === 'multiple'
    ? 'Drop one or more files here, or click to browse.'
    : 'Drop one file here, or click to browse.';

export const FilePickerCustomText = () => {
  const [multiple, setMultiple] = useState<string[]>(['multiple']);
  const [fileNames, setFileNames] = useState<string[]>([]);

  const selectionMode: FilePickerElement['selectionMode'] = multiple.includes('multiple')
    ? 'multiple'
    : 'single';

  const handleMultipleValueChanged = (event: CheckboxValueChangedEvent) => {
    setMultiple((event.detail.value ?? []) as string[]);
  };

  const selectListener = (event: FilePickerElement.ojSelect) => {
    setFileNames(Array.from(event.detail.files).map((file) => file.name));
  };

  return (
    <div id="parentContainer" class="oj-sm-padding-1x">
      <oj-file-picker
        selectionMode={selectionMode}
        primaryText={primaryText}
        secondaryText={secondaryText}
        onojSelect={selectListener}
      />

      <div class="oj-sm-padding-1x-top" />

      <oj-checkboxset
        id="selection"
        aria-label="Multiple selection"
        onvalueChanged={handleMultipleValueChanged}
        value={multiple}
      >
        <oj-option id="multipleSelect" value="multiple">
          Select Multiple
        </oj-option>
      </oj-checkboxset>

      <div class="oj-sm-padding-1x-top">
        Selected files: {fileNames.length > 0 ? fileNames.join(', ') : 'None'}
      </div>
    </div>
  );
};

export default FilePickerCustomText;
