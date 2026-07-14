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
        Enable resizing per column using <code class="prettyprint">resizable: 'enabled'</code>.
    </li>
    <li>
        Use the columnResizeBehavior attribute to specify whether the Table's column resizing behavior
        should keep the total width of all columns the same by redistributing any resize amount to an
        adjacent column, or should increase or decrease the total width of all columns by the resize
        amount.
    </li>
</ul>`;

export const tableColumnResizingcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
