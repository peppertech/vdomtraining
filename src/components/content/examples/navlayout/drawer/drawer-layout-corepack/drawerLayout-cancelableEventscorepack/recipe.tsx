import 'preact';

const recipeHtmlText = String.raw`<ol>
  <li>
    Create a
    <code class="prettyprint">oj-c-drawer-layout</code>
    element.
  </li>
  <li>
    Add
    <code class="prettyprint">on-oj-before-close</code>
    event handler.
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
    Open drawers using the
    <code class="prettyprint">&lt;edge>-opened</code>
    attribute.
  </li>
  <li>
    Cancel the
    <code class="prettyprint">ojBeforeClose</code>
    event when closing.
  </li>
</ol>`;

export const drawerLayoutCancelableEventscorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
