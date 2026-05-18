// @ts-nocheck
import { h } from 'preact';

export const filePickerCustomDescription = (
  <>
    <p>A file picker displays a clickable dropzone for selecting files from the device storage.</p>This demo shows how to perform custom validation on the files selected by the user.

    <h2>Test Steps</h2>

    <ul>
      <li>
        This demo is initially configured to accept files with a maximum size of 100kb. This size
        restriction is implemented in the
        <a href={"jsdocs/oj.ojFilePicker.html#event:beforeSelect"}>ojBeforeSelect</a>
        listener.
      </li>
      <li>
        Drag and Drop a file smaller than 100kb on to the filepicker to fire an
        <a href={"jsdocs/oj.ojFilePicker.html#event:select"}>ojSelect</a>
        event. The list of selected files will be displayed.
      </li>
      <li>
        Drag and Drop a file larger than 100kb on to the filepicker to fire an
        <a href={"jsdocs/oj.ojFilePicker.html#event:invalidSelect"}>ojInvalidSelect</a>
        event. The invalidSelect event message content will be displayed.
      </li>
      <li>
        Click the filepicker to open the file dialog to select a file and fire an
        <a href={"jsdocs/oj.ojFilePicker.html#event:select"}>ojSelect</a>
        event. The list of selected files will be displayed.
      </li>
    </ul>
  </>
);
