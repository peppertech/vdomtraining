import 'preact';

const recipeHtmlText = String.raw`<ol>
  <li>For each menu item, add a key property.  This enables translation of the label without impacting the code.</li>
  <li>Add a on-oj-menu-action handler. </li>
  <li>Add a on-oj-action handler.</li>
  </li>
</ol>`;

export const splitmenubuttonEventcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
