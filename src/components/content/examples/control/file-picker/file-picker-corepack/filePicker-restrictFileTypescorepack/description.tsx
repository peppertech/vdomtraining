import 'preact';

const descriptionHtmlText = String.raw`<p>A file picker displays a clickable dropzone for selecting files from the device storage.</p><p>
    This demo shows how to use JET
    <code class="prettyprint">oj-c-file-picker</code>
    to select files from the file browser or drop files from the file system to the drop zone. To
    trigger an
    <a href="jsdocs/oj-c.FilePicker.html#event:ojInvalidSelect">ojInvalidSelect</a>
    event, drag and drop a file of invalid MIME type onto the file picker.
  </p>
  <h5>Test Steps</h5>
  
  <ul>
    <li>
      This demo is initially configured to accept image file types and supports multiple selection.
      These settings can be configured using the 'Accept' and 'Select Multiple' controls. The set of
      accepted file types can be specified in the 'Accept' textbox as a comma-separated list of
      <a
        href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#Unique_file_type_specifiers">
        unique content type specifiers
      </a>.
    </li>
    <li>
      Drag and drop an accepted file type onto the file picker to fire an
      <a href="jsdocs/oj-c.FilePicker.html#event:ojSelect">ojSelect</a>
      event. The list of selected files will be displayed.
    </li>
    <li>
      Drag and drop a file of any other type onto the file picker to fire an
      <a href="jsdocs/oj-c.FilePicker.html#event:ojInvalidSelect">ojInvalidSelect</a>
      event. The invalidSelect event message content will be displayed.
    </li>
    <li>
      Click the file picker to open the file dialog to select a file and fire an
      <a href="jsdocs/oj-c.FilePicker.html#event:ojSelect">ojSelect</a>
      event. The list of selected files will be displayed.
    </li>
    <li>Toggle the Disable checkbox to disable the file picker.</li>
  </ul>`;

export const filePickerRestrictFileTypescorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
