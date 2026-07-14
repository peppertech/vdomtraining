import 'preact';

const recipeHtmlText = String.raw`<ol>
  <li>
    Create a JET Truncating Text by specifying the
    <code class="prettyprint">&lt;oj-c-truncating-text></code>
    element.
  </li>
  <li>
    On the element, specify either one of the truncation options as described in the
    <a href="jsdocs/oj-c.TruncatingText.html#truncation" target="_blank">API doc</a>, or one of the line-clamp options as described in the
    <a href="jsdocs/oj-c.TruncatingText.html#lineClamp" target="_blank">API doc</a>. Do not use the truncation attribute and line-clamp attribute together, this will cause an
    error.
  </li>
  <li>
    In addition, you can add color by adding one of the supported variant properties, for ex:
    variant="danger".
  </li>
  <li>To create text with different sizes, use the size property, for ex: size="sm".</li>
</ol>`;

export const truncatingTextTruncationAndLineClampcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
