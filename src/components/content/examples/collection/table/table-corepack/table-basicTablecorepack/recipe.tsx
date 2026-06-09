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
        Create a
        <code class="prettyprint">MutableArrayDataProvider</code>
        from an array of data objects and bind it to the
        <code class="prettyprint">data</code>
        attribute.
    </li>
    <li>
        Create a
        <code class="prettyprint">columns</code>
        object to select the column fields from the data and their corresponding header text to display
        and bind it to the
        <code class="prettyprint">columns</code>
        attribute.
    </li>
    <li>
        Set the
        <code class="prettyprint">row.accessible-row-header</code>
        to the column that best labels the rows.
    </li>
</ul>`;

export const tableBasicTablecorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
