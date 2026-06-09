import { h } from "preact";

const recipeHtmlText = String.raw`<ul>
  <li>
    Create an
    <code class="prettyprint">oj-c-select-single</code>
    element.
  </li>
  <li>
    Specify a
    <code class="prettyprint">template</code>
    in the
    <code class="prettyprint">itemTemplate</code>
    slot of the
    <code class="prettyprint">oj-c-select-single</code>.
  </li>
  <li>
    Use
    <code class="prettyprint">oj-c-list-item-layout</code>
    as the root element of the
    <code class="prettyprint">itemTemplate</code>
    and place the avatar, secondary text, and metadata in the appropriate slots.
  </li>
  <li>
    Use
    <code class="prettyprint">oj-c-highlight-text</code>
    to apply matching search text highlighting in the items.
  </li>
  <li>
    Specify a function callback that accepts a context object argument and returns a string as the
    value of the
    <code class="prettyprint">item-text</code>
    attribute of the
    <code class="prettyprint">oj-c-select-single</code>.
  </li>
</ul>`;

export const selectSingleItemTemplatecorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
