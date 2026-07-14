import 'preact';

const recipeHtmlText = String.raw`<ol>
  <li>Click the disclosure icon to see what events are fired.</li>
</ol>`;

export const collapsibleEventscorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
