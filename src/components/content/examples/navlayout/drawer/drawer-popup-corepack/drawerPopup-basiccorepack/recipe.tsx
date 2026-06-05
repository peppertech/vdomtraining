import { h } from "preact";

const recipeHtmlText = String.raw`<ol>
  <li>
    Create a
    <code class="prettyprint">oj-drawer-popup</code>
    element.
  </li>
  <li>
    Open or close the drawer using the
    <code class="prettyprint">opened</code>
    attribute.
  </li>
</ol>`;

export const drawerPopupBasiccorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
