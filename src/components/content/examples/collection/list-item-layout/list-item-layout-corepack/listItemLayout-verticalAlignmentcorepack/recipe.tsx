import { h } from "preact";

const recipeHtmlText = String.raw`<ol>
  <li>Create a new oj-c-list-item-layout with desired slots. See the Overview demo for examples.</li>
  <li>Set the <code>vertical-alignment</code> property to 'top'.</li>
</ol>`;

export const listItemLayoutVerticalAlignmentcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
