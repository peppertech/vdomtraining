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
    Define an
    <code class="prettyprint">oj-c-input-text</code>
    in your HTML for the filter.
  </li>
  <li>
    Bind the
    <code class="prettyprint">on-raw-value-changed</code>
    attribute of the
    <code class="prettyprint">oj-c-input-text</code>
    to a listener that updates the
    <code class="prettyprint">ListDataProviderView</code>
    <code class="prettyprint">filterCriterion</code>
    as the user types.
  </li>
</ul>`;

export const tableFilteringTablecorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
