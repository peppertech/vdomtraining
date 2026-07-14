import 'preact';
import * as recipeHtmlText from 'text!./recipe.html';

export const diagramForeignObjectRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText as string }} />
);
