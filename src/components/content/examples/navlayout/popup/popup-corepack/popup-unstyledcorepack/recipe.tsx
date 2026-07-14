import 'preact';

const recipeHtmlText = String.raw`<ol>
  <li>
    Set the
    <code class="prettyprint">variant</code>
    option to
    <code class="prettyprint">unstyled</code>
    to remove the popup's default border, shadow and background color defined by the active theme.
  </li>
  <li>Optionally, apply additional styling to the popup content element.</li>
</ol>`;

export const popupUnstyledcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
