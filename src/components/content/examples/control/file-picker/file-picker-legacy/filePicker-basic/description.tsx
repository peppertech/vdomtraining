// @ts-nocheck
import { h } from 'preact';

export const filePickerBasicDescription = (
  <>
    <p>A file picker displays a clickable dropzone for selecting files from the device storage.</p><p>
      This demo shows how to use JET
      {" "}
      <code className={"prettyprint"}>oj-file-picker</code>
      {" "}
      to select files from the file browser or drop files from the file system to the drop zone. To
      trigger an
      {" "}
      <a href={"jsdocs/oj.ojFilePicker.html#event:invalidSelect"}>invalidSelect</a>
      {" "}
      event, drag and drop a file of invalid MIME type onto the file picker.
    </p>
    <p>
      Note: Due to browser/OS differences, you may have to specify multiple values for the same value
      type. For example, for a CSV file, you might need to specify 'text/csv', '.csv',
      'application/vnd.ms-excel', 'text/comma-separated-values' and others depending on your target
      browser/OS.
    </p>
    <h2>Test Steps</h2>

    <ul>
      <li>
        This demo is initially configured to accept image file types and supports multiple selection.
        These settings can be configured using the 'Accept' and 'Select Multiple' controls. The set of
        accepted file types can be specified in the 'Accept' textbox as a comma-separated list of
        {" "}
        <a href={"https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#Unique_file_type_specifiers"}>
          unique content type specifiers
        </a>.
      </li>
      <li>
        Drag and drop an accepted file type onto the file picker to fire an
        {" "}
        <a href={"jsdocs/oj.ojFilePicker.html#event:select"}>ojSelect</a>
        {" "}
        event. The list of selected files will be displayed.
      </li>
      <li>
        Drag and drop a file of any other type onto the file picker to fire an
        {" "}
        <a href={"jsdocs/oj.ojFilePicker.html#event:invalidSelect"}>ojInvalidSelect</a>
        {" "}
        event. The invalidSelect event message content will be displayed.
      </li>
      <li>
        Click the file picker to open the file dialog to select a file and fire an
        {" "}
        <a href={"jsdocs/oj.ojFilePicker.html#event:select"}>ojSelect</a>
        {" "}
        event. The list of selected files will be displayed.
      </li>
      <li>Toggle the Disable checkbox to disable the file picker.</li>
    </ul>
  </>
);
