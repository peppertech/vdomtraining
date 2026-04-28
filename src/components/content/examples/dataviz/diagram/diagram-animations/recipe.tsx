import { h } from 'preact';
import * as recipeHtmlText from 'text!./recipe.html';

export const diagramAnimationsRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText as string }} />
);
