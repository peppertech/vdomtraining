import { h } from "preact";

const recipeHtmlText = String.raw`<ul>
  <li>
    Use the oj-c-dialog element to create a
    <code class="prettyprint">dialog</code>
    component.
  </li>
  <li>
    Create a child element with with
    <code class="prettyprint">slot='body'</code>
    , and define your body content within this element.
  </li>
  <li>
    Configure how to launch the dialog using the
    <code class="prettyprint">opened</code>
    attribute.
  </li>
  <li>
    Configure the dialog's dimensions using
    <code class="prettyprint">width, height, min-width, max-width, min-height, max-height</code>
    attributes.
  </li>
</ul>`;

export const dialogScrollingcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
