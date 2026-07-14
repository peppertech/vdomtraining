import 'preact';
import * as recipeHtmlText from 'text!./recipe.html';

export const diagramShapedDataRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText as string }} />
);
