import { h } from "preact";

const recipeHtmlText = String.raw`<ul>
    <li>
      Create an
      <code class="prettyprint">oj-c-file-picker</code>
      element, specifying 'user', 'environment', or 'implementation' for the
      <a href="jsdocs/oj-c.FilePicker.html#capture">capture</a>
      attribute.
    </li>
    <li>
      Specify ["image/*"] (or ["video/*"]) for the
      <a href="jsdocs/oj-c.FilePicker.html#accept">accept</a>
      attribute.
    </li>
    <li>
      Add an
      <a href="jsdocs/oj-c.FilePicker.html#event:ojSelect">ojSelect</a>
      event listener to the
      <code class="prettyprint">oj-c-file-picker</code>
      element using the on-oj-select attribute. In the listener, update the current selected file
      names.
    </li>
  </ul>`;

export const filePickerCapturecorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
