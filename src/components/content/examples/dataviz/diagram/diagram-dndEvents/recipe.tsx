import 'preact';
import * as recipeHtmlText from 'text!./recipe.html';

export const diagramDndEventsRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText as string }} />
);
