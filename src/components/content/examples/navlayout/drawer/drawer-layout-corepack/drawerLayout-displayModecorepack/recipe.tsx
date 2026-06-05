import { h } from "preact";

const recipeHtmlText = String.raw`<ol>
  <li>
    Create a
    <code class="prettyprint">oj-c-drawer-layout</code>
    element.
  </li>
  <li>
    Create a drawer by adding a child
    <code class="prettyprint">div</code>
    with a
    <code class="prettyprint">slot="end"</code>
    attribute.
  </li>
  <li>
    Control the 'Display mode' with the
    <code class="prettyprint">end-display</code>
    attribute of the layout element.
  </li>
  <li>
    Open or close the drawer using the
    <code class="prettyprint">end-opened</code>
    attribute of the layout element.
  </li>
</ol>`;

export const drawerLayoutDisplayModecorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
