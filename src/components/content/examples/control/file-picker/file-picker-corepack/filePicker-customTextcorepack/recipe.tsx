import { h } from "preact";

const recipeHtmlText = String.raw`<ul>
  <li>
    Create an
    <code class="prettyprint">oj-c-file-picker</code>
    element, specify attributes
    <a href="jsdocs/oj-c.FilePicker.html#primaryText">primary-text</a>
    or
    <a href="jsdocs/oj-c.FilePicker.html#secondaryText">secondary-text</a>
    to customize the text content. Both attributes can take either a string or a formatting function
    that returns a string.
  </li>
  <li>
    In this demo,
    <a href="jsdocs/oj-c.FilePicker.html#primaryText">primary-text</a>
    is configured with a simple string value while
    <a href="jsdocs/oj-c.FilePicker.html#secondaryText">secondary-text</a>
    is configured with a function to vary the text based on the <code class="prettyprint">oj-c-file-picker</code> selection-mode.
  </li>
</ul>`;

export const filePickerCustomTextcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
