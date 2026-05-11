import { h } from "preact";

const recipeHtmlText = String.raw`<ul>
  <li>
    Please see the
    <a href="#" onclick="demoGoLink(event, 'tableCorepack', 'basicTable'); return false;">
      basic oj-c-table demo
    </a>
    for more information about configuring a basic oj-c-table.
  </li>
  <li>
    Set the
    <code class="prettyprint">selection-mode</code>
    to multiple row and column selection.
  </li>
</ul>`;

export const tableOverviewcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
