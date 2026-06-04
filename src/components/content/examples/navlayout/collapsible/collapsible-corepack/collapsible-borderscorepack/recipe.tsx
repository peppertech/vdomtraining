import { h } from "preact";

const recipeHtmlText = String.raw`<ol>
  <li>Set <code class="prettyprint">variant=&quot;horizontal-rule&quot;</code> on <code class="prettyprint">oj-c-collapsible</code>.</li>
</ol>`;

export const collapsibleBorderscorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
