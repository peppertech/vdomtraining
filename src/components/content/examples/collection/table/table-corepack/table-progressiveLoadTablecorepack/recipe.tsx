import 'preact';

const recipeHtmlText = String.raw`<ul>
  <li>
    Create an
    <code class="prettyprint">oj-c-table</code>
    element with a meaningful id, aria-label, and className to size the table.
  </li>
  <li>
    Create and set a
    <code class="prettyprint">DataProvider</code>
    using the
    <code class="prettyprint">data</code>
    attribute. In general, supplying any
    <code class="prettyprint">DataProvider</code>
    that takes time to fetch data (e.g.
    <code class="prettyprint">RESTDataProvider</code>
    or
    <code class="prettyprint">DeferredDataProvider</code>
    ) may cause the component to show the loading indicator. Note that the initial fetch is
    intentionally slowed down in this demo to show this.
  </li>
</ul>`;

export const tableProgressiveLoadTablecorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
