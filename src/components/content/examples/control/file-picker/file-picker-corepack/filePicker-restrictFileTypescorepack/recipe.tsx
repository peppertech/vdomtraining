import { h } from "preact";

const recipeHtmlText = String.raw`<ul>
  <li>
    Create an
    <code class="prettyprint">oj-c-file-picker</code>
    element, specify attributes
    <a href="jsdocs/oj-c.FilePicker.html#selectionMode">selection-mode</a>
    or
    <a href="jsdocs/oj-c.FilePicker.html#accept">accept</a>
    if needed.
  </li>
  <li>
    Add an
    <a href="jsdocs/oj-c.FilePicker.html#event:ojSelect">ojSelect</a>
    event listener to the
    <code class="prettyprint">oj-c-file-picker</code>
    element using the on-oj-select attribute. In the listener, update the current selected file
    names.
  </li>
  <li>
    Add an
    <a href="jsdocs/oj-c.FilePicker.html#event:ojInvalidSelect">ojInvalidSelect</a>
    event listener to the
    <code class="prettyprint">oj-c-file-picker</code>
    element using the on-oj-invalid-select attribute. To trigger this listener, drag and drop a file
    of invalid MIME type onto the file picker.
  </li>
  <li>
    Create a disabled file picker by using the <a href="jsdocs/oj-c.FilePicker.html#disabled">disabled</a> attribute on the <code class="prettyprint">oj-c-file-picker</code> element.
  </li>
</ul>`;

export const filePickerRestrictFileTypescorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
