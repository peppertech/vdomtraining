import 'preact';
import * as recipeHtmlText from 'text!./recipe.html';

export const diagramAsynchronousLayoutRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText as string }} />
);
