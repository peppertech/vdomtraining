import 'preact';
import * as recipeHtmlText from 'text!./recipe.html';

export const diagramOverviewRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText as string }} />
);
