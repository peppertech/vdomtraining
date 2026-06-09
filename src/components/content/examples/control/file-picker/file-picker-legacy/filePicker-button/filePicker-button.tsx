import { h } from 'preact';
import { useState } from 'preact/hooks';
import { pickFiles, type FileOptions } from 'ojs/ojfilepickerutils';
import 'ojs/ojbutton';

const fileOptions: FileOptions = {
  accept: [],
  capture: 'none',
  selectionMode: 'multiple'
};

export const FilePickerButton = () => {
  const [fileNames, setFileNames] = useState<string[]>([]);

  const handleFilesSelected = (files: FileList) => {
    setFileNames(Array.from(files).map((file) => file.name));
  };

  const handleSelectFiles = () => {
    pickFiles(handleFilesSelected, fileOptions);
  };

  return (
    <div id="parentContainer" class="oj-sm-padding-1x">
      <oj-button id="selectFilesButton" onojAction={handleSelectFiles}>
        <span slot="startIcon" class="oj-ux-ico-plus" />
        Select Files
      </oj-button>

      <div class="oj-sm-padding-1x-top">
        Selected files: {fileNames.length > 0 ? fileNames.join(', ') : 'None'}
      </div>
    </div>
  );
};

export default FilePickerButton;
