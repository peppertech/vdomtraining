import 'preact';

const recipeHtmlText = String.raw`<ol>
  <li>
    Create a JET Truncating Text by specifying the
    <code class="prettyprint">&lt;oj-c-truncating-text></code>
    element.
  </li>
  <li>Use the hyphens attribute to control how long words with no spaces should behave.</li>
</ol>`;

export const truncatingTextHyphenscorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
