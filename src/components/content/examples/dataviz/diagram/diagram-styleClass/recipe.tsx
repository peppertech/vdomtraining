import 'preact';
import * as recipeHtmlText from 'text!./recipe.html';

export const diagramStyleClassRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText as string }} />
);
