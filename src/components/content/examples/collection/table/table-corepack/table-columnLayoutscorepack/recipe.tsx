import 'preact';

const recipeHtmlText = String.raw`<ul>
  <li>
    Please see the
    <a href="#" onclick="demoGoLink(event, 'tableCorepack', 'basicTable'); return false;">
      basic oj-c-table demo
    </a>
    for more information about configuring a basic oj-c-table.
  </li>
  <li>
    Set the layout attribute to specify whether the
    <code class="prettyprint">oj-c-table's</code>
    columns should be sized based on its rendered contents (contents) or set values (fixed).
  </li>
  <li>
    If layout='fixed' is specified, make sure the
    <code class="prettyprint">oj-c-table</code>
    has a set width on it.
  </li>
  <li>
    Set the 
    <code class="prettyprint">oj-c-table's</code>
    <code class="prettyprint">columnWidths</code>
    and
    <code class="prettyprint">columns</code>
    sizing properties to fine-tune the column layouts.
  </li>
</ul>`;

export const tableColumnLayoutscorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
