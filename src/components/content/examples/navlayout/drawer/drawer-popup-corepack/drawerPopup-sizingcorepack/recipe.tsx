import { h } from "preact";

const recipeHtmlText = String.raw`<ol>
  <li>
    Create a
    <code class="prettyprint">oj-c-drawer-popup</code>
    element.
  </li>
  <li>
    Open or close the drawer using the
    <code class="prettyprint">opened</code>
    attribute.
  </li>
  <li>
    Control the size of the drawer by sizing its content.
  </li>
</ol>`;

export const drawerPopupSizingcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
