import { h } from "preact";

const recipeHtmlText = String.raw`<ul>
  <li>
    Create an
    <code class="prettyprint">oj-c-table</code>
    element with a meaningful
    <code class="prettyprint">id</code>,
    <code class="prettyprint">aria-label</code>, and
    <code class="prettyprint">class</code>
    to size the table.
  </li>
  <li>
    Set the
    <code class="prettyprint">noData</code>
    template slot to specify the content to show when there is no data.
  </li>
</ul>`;

export const tableNoDataTablecorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
