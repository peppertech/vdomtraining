import 'preact';

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
    <code class="prettyprint">slot="start"</code>
    attribute.
  </li>
  <li>
    Create a drawer by adding a child
    <code class="prettyprint">div</code>
    with a
    <code class="prettyprint">slot="end"</code>
    attribute.
  </li>
  <li>
    Add
    <code class="prettyprint">on-oj-start-opened-changed</code>
    and
    <code class="prettyprint">on-oj-end-opened-changed</code>
    writeback handlers.
  </li>
  <li>
    Add
    <code class="prettyprint">on-oj-before-close</code>
    handler.
  </li>
  <li>
    Add
    <code class="prettyprint">on-oj-close</code>
    handler.
  </li>
  <li>
    Open or close the drawers with
    <code class="prettyprint">start-opened</code>
    and
    <code class="prettyprint">end-opened</code>
    attributes of the drawer layout.
  </li>
</ol>`;

export const drawerLayoutEventscorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
