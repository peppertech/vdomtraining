import { ComponentProps } from "preact";
import { useState, useCallback } from "preact/hooks";
import "ojs/ojfilepicker";
import { FilePickerElement } from "ojs/ojfilepicker";

type FilePickerProps = ComponentProps<"oj-file-picker">;

type modes = FilePickerProps["selectionMode"];

const FilePicker = () => {
  const [accept, setAccept] = useState<string[]>(["image/*"]);
  const [selectionMode, setSelectionMode] = useState<modes>("multiple");
  const [disabled, setDisabled] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<Array<File>>(); // State for storing file details

  const selectListener = (event: FilePickerElement.ojSelect) => {
    const files = event.detail.files;
    setSelectedFiles(Array.from(files));
  };

  const invalidSelectListener = (event: any) => {
    const message = event.detail.messages;
    setSelectedFiles([]);
    alert(
      `${
        message[0].severity.charAt(0).toUpperCase() +
        message[0].severity.slice(1)
      } \n ${message[0].summary}`
    );
  };

  return (
    <>
      <oj-file-picker
        accept={accept}
        selectionMode={selectionMode}
        onojSelect={selectListener}
        disabled={disabled}
        onojInvalidSelect={invalidSelectListener}></oj-file-picker>
      <div>
        {/* Display selected file details */}
        {selectedFiles && selectedFiles.length > 0 && (
          <ul>
            {selectedFiles.map((file, index) => (
              <li key={index}>
                {`Name: ${file.name} (${file.type})`}
                <br />
                {`Size: ${file.size} bytes`}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default FilePicker;
