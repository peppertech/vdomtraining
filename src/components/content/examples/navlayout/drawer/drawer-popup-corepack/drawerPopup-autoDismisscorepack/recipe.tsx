import 'preact';

const recipeHtmlText = String.raw`<ol>
  <li>
    Create a
    <code class="prettyprint">oj-drawer-popup</code>
    element.
  </li>
  <li>
    Control the 'Auto dismiss' behaviour with
    <code class="prettyprint">auto-dismiss</code>
    attribute.
  </li>
  <li>
    Open or close the drawer with
    <code class="prettyprint">opened</code>
    attribute.
  </li>
</ol>`;

export const drawerPopupAutoDismisscorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
