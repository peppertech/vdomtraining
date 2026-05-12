import { h } from "preact";

const recipeHtmlText = String.raw`<ul>
  <li>
    Create an
    <code class="prettyprint">oj-c-list-view</code>
    element.
  </li>
  <li>
    Create an
    <code>MutableArrayDataProvider</code>
    from an array, each item contains an object with the required
    <code>value</code>
    and
    <code>label</code>
    fields.
  </li>
  <li>
    Bind the
    <code>data</code>
    attribute to the
    <code>MutableArrayDataProvider</code>
    .
  </li>
</ul>`;

export const listViewBasiccorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
