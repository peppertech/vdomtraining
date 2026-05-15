import { h } from "preact";

const recipeHtmlText = String.raw`<p>
  Specify "sm", "md", or "lg" for the property "size" to get different size buttons.  The default is "md".
</p>`;

export const buttonsSizescorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
