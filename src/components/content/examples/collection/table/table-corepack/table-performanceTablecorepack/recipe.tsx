import 'preact';

const recipeHtmlText = String.raw`<ol>
    <li>
        Please see the
        <a href="#" onclick="demoGoLink(event, 'tableCorepack', 'basicTable'); return false;">
            basic oj-c-table demo
        </a>
        for more information about configuring a basic oj-c-table.
    </li>
    <li>
        Define an
        <code class="prettyprint">oj-c-input-number</code>
        in your HTML to update number of rows and columns.
    </li>
    <li>
        Define an
        <code class="prettyprint">oj-c-button</code>
        in your HTML to re-render table.
    </li>
    <li>
        Bind the
        <code class="prettyprint">on-oj-action</code>
        attribute of the
        <code class="prettyprint">oj-c-button</code> and
        <code class="prettyprint">on-value-changed</code>
        attribute of the
        <code class="prettyprint">oj-c-input-number</code>
        to a listener that updates table.
    </li>
</ol>`;

export const tablePerformanceTablecorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
