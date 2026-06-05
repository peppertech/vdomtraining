import { h } from "preact";

const recipeHtmlText = String.raw`<ul>
  <li>
    Use the
    <code class="prettyprint">oj-c-dialog</code>
    element to create a
    <code class="prettyprint">dialog</code>
    component.
  </li>
  <li>
    Create a child element with with
    <code class="prettyprint">slot='body'</code>
    , and define your body content within this element.
  </li>
  <li>
    Use the optional
    <code class="prettyprint">aria-describedby</code>
    attribute to specify content that should be read by screen readers as the dialog description.
  </li>
  oj-c-dialog
  <li>
    Configure the dialog to modeless by setting
    <code class="prettyprint">modality="modeless"</code>
    in the oj-c-dialog.
  </li>
</ul>`;

export const dialogModelesscorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
