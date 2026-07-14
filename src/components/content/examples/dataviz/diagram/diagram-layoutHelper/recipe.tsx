import 'preact';
import * as recipeHtmlText from 'text!./recipe.html';

export const diagramLayoutHelperRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText as string }} />
);
