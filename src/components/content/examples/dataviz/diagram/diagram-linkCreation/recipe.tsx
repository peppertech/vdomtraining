import { h } from 'preact';
import * as recipeHtmlText from 'text!./recipe.html';

export const diagramLinkCreationRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText as string }} />
);
