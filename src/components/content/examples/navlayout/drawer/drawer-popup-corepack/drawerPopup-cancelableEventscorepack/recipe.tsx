import { h } from "preact";

const recipeHtmlText = String.raw`<ol>
  <li>
    Create a
    <code class="prettyprint">oj-drawer-popup</code>
    element.
  </li>
  <li>
    Add
    <code class="prettyprint">on-oj-before-close</code>
    event handler.
  </li>
  <li>
    Open the drawer using the
    <code class="prettyprint">opened</code>
    attribute.
  </li>
  <li>
    Cancel the
    <code class="prettyprint">ojBeforeClose</code>
    event when closing.
  </li>
</ol>`;

export const drawerPopupCancelableEventscorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
