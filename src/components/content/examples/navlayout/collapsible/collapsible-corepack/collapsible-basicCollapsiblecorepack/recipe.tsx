import 'preact';

const recipeHtmlText = String.raw`<ol>
  <li>
    Create an
    <code class="prettyprint">oj-c-collapsible</code>
    element with two child elements.
  </li>
  <li>The first child element is the collapsible header.</li>
  <li>The second child element is the collapsible content.</li>
</ol>`;

export const collapsibleBasicCollapsiblecorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
