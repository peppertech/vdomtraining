import 'preact';
import * as recipeHtmlText from 'text!./recipe.html';

export const diagramContextMenuRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText as string }} />
);
