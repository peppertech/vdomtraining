import 'preact';
import * as recipeHtmlText from 'text!./recipe.html';

export const diagramCustomTemplatesRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText as string }} />
);
