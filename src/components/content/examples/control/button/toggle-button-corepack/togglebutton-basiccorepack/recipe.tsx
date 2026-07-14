import 'preact';

const recipeHtmlText = String.raw`The
<code class="prettyprint">value</code>
attribute can be bound.
<ul>
  If desired, the on-value-changed listener can be used to invoke notification of changes.
</ul>
<ul>
  <li>Disabled button cannot be activated.</li>
</ul>`;

export const togglebuttonBasiccorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
