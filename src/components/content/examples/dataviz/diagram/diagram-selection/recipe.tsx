import { h } from 'preact';
import * as recipeHtmlText from 'text!./recipe.html';

export const diagramSelectionRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText as string }} />
);
