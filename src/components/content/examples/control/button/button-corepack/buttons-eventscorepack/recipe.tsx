import 'preact';

const recipeHtmlText = String.raw`The
<code class="prettyprint">on-oj-action</code>
attribute can be used as shown to bind an action listener.
<ul>
  <li>Disabled button cannot be activated.</li>
</ul>`;

export const buttonsEventscorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
