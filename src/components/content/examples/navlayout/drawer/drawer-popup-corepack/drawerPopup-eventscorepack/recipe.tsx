import 'preact';

const recipeHtmlText = String.raw`<ol>
  <li>
    Create
    <code class="prettyprint">oj-drawer-popup</code>
    elements.
  </li>
  <li>
    Add
    <code class="prettyprint">on-oj-opened-changed</code>
    writeback handlers.
  </li>
  <li>
    Add
    <code class="prettyprint">on-oj-before-close</code>
    handlers.
  </li>
  <li>
    Add
    <code class="prettyprint">on-oj-close</code>
    handlers.
  </li>
  <li>
    Open or close drawers using the
    <code class="prettyprint">opened</code>
    attributes.
  </li>
</ol>`;

export const drawerPopupEventscorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
