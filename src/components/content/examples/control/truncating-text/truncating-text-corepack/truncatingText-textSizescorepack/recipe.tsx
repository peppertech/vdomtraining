import 'preact';

const recipeHtmlText = String.raw`<ol>
  <li>
    Create a JET Truncating Text by specifying the
    <code class="prettyprint">&lt;oj-c-truncating-text></code>
    element.
  </li>
  <li>
    On the element, add one of the sizes described in the
    <a href="jsdocs/oj-c.TruncatingText.html#size" target="_blank">API doc</a>
  </li>
</ol>`;

export const truncatingTextTextSizescorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
