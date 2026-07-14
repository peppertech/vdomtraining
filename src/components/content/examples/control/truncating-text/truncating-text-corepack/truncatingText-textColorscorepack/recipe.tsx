import 'preact';

const recipeHtmlText = String.raw`<ol>
  <li>
    Create a JET Truncating Text by specifying the
    <code class="prettyprint">&lt;oj-c-truncating-text></code>
    element.
  </li>
  <li>
    On the element, add one of the variants described in the
    <a href="jsdocs/oj-c.TruncatingText.html#variant" target="_blank">API doc</a>
  </li>
</ol>`;

export const truncatingTextTextColorscorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
