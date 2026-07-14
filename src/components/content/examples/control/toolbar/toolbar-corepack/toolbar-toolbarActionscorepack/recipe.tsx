import 'preact';

const recipeHtmlText = String.raw`<ol>
  <li>
    The
    <code class="prettyprint">on-oj-toolbar-action</code>
    attribute can be used as shown to bind an action listener.
    <ul>
      <li>Disabled items cannot be activated.</li>
    </ul>
  </li>
</ol>`;

export const toolbarToolbarActionscorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
