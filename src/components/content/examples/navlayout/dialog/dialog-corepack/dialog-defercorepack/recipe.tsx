import 'preact';

const recipeHtmlText = String.raw`<ul>
  <li>
    Use the
    <code class="prettyprint">oj-c-dialog</code>
    element to create a
    <code class="prettyprint">dialog</code>
    component.
  </li>
  <li>
    Create a child element with
    <code class="prettyprint">slot='body'</code>, and define your body content within this element.
  </li>
  <li>
    Use the
    <code class="prettyprint">oj-defer</code>
    tag to define deferred content inside the
    <code class="prettyprint">slot='body'</code>.
  </li>
</ul>`;

export const dialogDefercorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
