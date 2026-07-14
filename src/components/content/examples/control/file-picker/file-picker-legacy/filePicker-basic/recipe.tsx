// @ts-nocheck
import 'preact';

export const filePickerBasicRecipe = (
  <>
    <ul>
      <li>
        Create an
        {" "}
        <code className={"prettyprint"}>oj-file-picker</code>
        {" "}
        element, specify attributes
        {" "}
        <a href={"jsdocs/oj.ojFilePicker.html#selectionMode"}>selection-mode</a>
        {" "}
        or
        {" "}
        <a href={"jsdocs/oj.ojFilePicker.html#accept"}>accept</a>
        {" "}
        if needed.
      </li>
      <li>
        Add an
        {" "}
        <a href={"jsdocs/oj.ojFilePicker.html#event:select"}>ojSelect</a>
        {" "}
        event listener to the
        {" "}
        <code className={"prettyprint"}>oj-file-picker</code>
        {" "}
        element using the on-oj-select attribute. In the listener, update the current selected file
        names.
      </li>
      <li>
        Add an
        {" "}
        <a href={"jsdocs/oj.ojFilePicker.html#event:invalidSelect"}>ojInvalidSelect</a>
        {" "}
        event listener to the
        {" "}
        <code className={"prettyprint"}>oj-file-picker</code>
        {" "}
        element using the on-oj-invalid-select attribute. To trigger this listener, drag and drop a file
        of invalid MIME type onto the file picker.
      </li>
      <li>
        <p>
          Note: Due to browser/OS differences, you may have to specify multiple values for the same
          value type. For example, for a CSV file, you might need to specify 'text/csv', '.csv',
          'application/vnd.ms-excel', 'text/comma-separated-values' and others depending on your target
          browser/OS.
        </p>
      </li>
    </ul>
  </>
);
