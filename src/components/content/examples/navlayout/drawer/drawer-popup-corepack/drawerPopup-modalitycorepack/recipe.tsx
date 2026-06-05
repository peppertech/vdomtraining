import { h } from "preact";

const recipeHtmlText = String.raw`<ol>
  <li>
    Create a
    <code class="prettyprint">oj-drawer-popup</code>
    element.
  </li>
  <li>
    Control the 'Modality' with the
    <code class="prettyprint">modality</code>
    attribute.
  </li>
  <li>
    Open or close the drawer using the
    <code class="prettyprint">opened</code>
    attribute.
  </li>
</ol>`;

export const drawerPopupModalitycorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
