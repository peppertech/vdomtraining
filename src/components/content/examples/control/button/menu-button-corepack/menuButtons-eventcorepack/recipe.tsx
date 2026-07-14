import 'preact';

const recipeHtmlText = String.raw`<ol>
  <li>For each menu item, add a key property.  This enables translation of the label without impacting the code.</li>
  <li>Add a on-oj-menu-action handler. </li>
  <li>If using a selection group, add a on-oj-menu-selection handler</li>
  </li>
</ol>`;

export const menuButtonsEventcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
