import 'preact';

const recipeHtmlText = String.raw`<ol>
  <li>
    Create a JET Truncating Badge by specifying the
    <code class="prettyprint">&lt;oj-c-truncating-badge></code>
    element.
  </li>
  <li>
    In addition, you can add color by adding one of the supported variant properties, for ex:
    variant="danger".
  </li>
  <li>To make the colors subtle, use a subtle variant property, for ex: variant="dangerSubtle".</li>
  <li>To create smaller badges, use the size property, for ex: size="sm".</li>
</ol>`;

export const truncatingBadgeOverviewcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
