import { h } from "preact";

const recipeHtmlText = String.raw`<ol>
  <li>
    Create a
    <code class="prettyprint">div</code>
    element representing a header.
  </li>
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
    Limit the height of the
    <code class="prettyprint">oj-c-drawer-layout</code>
    using e.g. absolute positioning.
    <ul>
      <li>
        Add your own custom class (or use the style attribute) to apply
        <code class="prettyprint">position: absolute; top:0; bottom: 0;</code>
        to the drawer layout element
      </li>
      <li>
        Stretch its parent element to cover desired area applying e.g.
        <code class="prettyprint">min-height: 100vh;</code>
        .
      </li>
    </ul>
  </li>
  <li>
    Create a fixed drawer header using e.g.
    <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout">
      CSS Flexible Box Layout
    </a>
    .
    <ul>
      <li>
        Add your own custom class (or use the style attribute) to apply
        <code class="prettyprint">display: flex; flex-direction: column</code>
        to the drawer element
      </li>
      <li>Create a child div that contains header element.</li>
      <li>Create a child div that contains drawer content.</li>
      <li>
        Add your own custom class (or use the style attribute) to apply
        <code class="prettyprint">overflow-y: auto</code>
        to the element that contains drawer content.
      </li>
    </ul>
  </li>
</ol>`;

export const drawerLayoutInsetLayoutcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
