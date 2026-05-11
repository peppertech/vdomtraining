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
    <code class="prettyprint">horizontal-grid-visible</code>
    and
    <code class="prettyprint">vertical-grid-visible</code>
    attributes as desired.
  </li>
</ul>`;

export const tableGridStylingcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
