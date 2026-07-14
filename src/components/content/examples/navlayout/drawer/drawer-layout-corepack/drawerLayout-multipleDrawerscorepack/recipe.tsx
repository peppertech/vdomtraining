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
    Create a drawer by adding a child
    <code class="prettyprint">div</code>
    with a
    <code class="prettyprint">slot="bottom"</code>
    attribute.
  </li>
  <li>
    Open or close the drawers using the
    <code class="prettyprint">start-opened</code>
    and
    <code class="prettyprint">end-opened</code>
    attributes.
  </li>
</ol>`;

export const drawerLayoutMultipleDrawerscorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
