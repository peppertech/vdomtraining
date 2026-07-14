import 'oj-c/button';
import { pickFiles,type FileOptions } from 'ojs/ojfilepickerutils';
import 'preact';
import { useState } from 'preact/hooks';

const fileOptions: FileOptions = {
  accept: [],
  capture: 'none',
  selectionMode: 'multiple'
};

export const FilePickerButtoncorepack = () => {
  const [fileNames, setFileNames] = useState<string[]>([]);

  const handleFilesSelected = (files: FileList) => {
    setFileNames(Array.from(files).map((file) => file.name));
  };

  const handleSelectFiles = () => {
    pickFiles(handleFilesSelected, fileOptions);
  };

  return (
    <div id="file-picker-button-demo-container">
      <oj-c-button id="selectFilesButton" label="Select Files" onojAction={handleSelectFiles}>
        <span slot="startIcon" class="oj-ux-ico-plus" />
      </oj-c-button>

      <div class="oj-sm-padding-1x-top">
        Selected files: {fileNames.length > 0 ? fileNames.join(', ') : 'None'}
      </div>
    </div>
  );
};

export default FilePickerButtoncorepack;
