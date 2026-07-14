import 'preact';

const recipeHtmlText = String.raw`<ol>
  <li>Create an oj-c-menu-button JET Menu element.</li>
  <li>Create an items structure that includes selectsingle or multipleselect type elements.</li>
</ol>`;

export const menuButtonsSelectcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
