import { h } from "preact";

const recipeHtmlText = String.raw`<ul>
  <li>
    Create an
    <code class="prettyprint">oj-c-file-picker</code>
    element
  </li>
  <li>
    Populate the <a href="jsdocs/oj-c.FilePicker.html#trigger">trigger</a> slot with custom content. <code class="prettyprint">oj-c-file-picker</code> will add click and drag and drop listeners to the slot content.
  </li>
  <li><b>Accessibility</b>: The application is responsible for setting tabindex and aria-label to make this use case accessible.
</li>
</ul>`;

export const filePickerCustomContentcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
