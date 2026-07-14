import 'preact';
import * as recipeHtmlText from 'text!./recipe.html';

export const diagramDefaultRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText as string }} />
);
