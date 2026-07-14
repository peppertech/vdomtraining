import 'preact';

const recipeHtmlText = String.raw`<ol>
  <li>
    Insert the
    <code class="prettyprint">oj-c-popup</code>
    element in the view template.
  </li>
  <li>Specify the content to be displayed when the popup is open.</li>
  <li>
    Control the offset value using an Object that has
    <code class="prettyprint">x</code> and <code class="prettyprint">y</code>
    properties.
  </li>
</ol>`;

export const popupOffsetcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
