import 'preact';

const recipeHtmlText = String.raw`<li>
  To change the width of the
  <code class="prettyprint">oj-c-file-picker</code>
  element, set the max-width to a percent width or use a length unit as shown in this demo.
</li>
<li>
  You must use
  <code>'max-width'</code>
  instead of
  <code>'width'</code>
</li>
<li>
  To change the height of the
  <code class="prettyprint">oj-c-file-picker</code>
  element, set the height to a percent height or use a length unit as shown in this demo.
</li>`;

export const filePickerCustomSizecorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
