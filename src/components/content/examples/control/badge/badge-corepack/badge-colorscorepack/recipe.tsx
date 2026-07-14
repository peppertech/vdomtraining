import 'preact';

const recipeHtmlText = String.raw`<ol>
  <li>
    Create a JET Badge by specifying the
    <code class="prettyprint">&lt;oj-c-badge></code>
    element.
  </li>
  <li>You can add color by adding one of the supported variants, for ex: variant="danger".</li>
  <li>You can also make the colors subtle, for ex: variant="dangerSubtle".</li>
</ol>`;

export const badgeColorscorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
