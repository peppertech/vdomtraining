import { h } from "preact";

const recipeHtmlText = String.raw`<ol>
  <li>
    Speicify the position of the popup relative to its anchor element using the
    <code class="prettyprint">placement</code>
    attribute.
  </li>
  <li>
    Set the
    <code class="prettyprint">tail</code>
    property value to
    <code class="prettyprint">simple</code>
    to enable the optional theme-specific decoration at the anchor point.
  </li>
</ol>`;

export const popupTailCommonPositionscorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
