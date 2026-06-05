import { h } from "preact";

const recipeHtmlText = String.raw`<ol>
  <li>
    Set the
    <code class="prettyprint">modality</code>
    option to
    <code class="prettyprint">modal</code>
    .
  </li>
  <li>
    Set the
    <code class="prettyprint">auto-dismiss</code>
    option to
    <code class="prettyprint">none</code>
    .
  </li>
  <li>
    Configure the
    <code class="prettyprint">anchor</code>
    option to <code class="prettyprint">window</code>.
  </li>
</ol>`;

export const popupModalcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
