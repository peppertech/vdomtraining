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
        Set a template for the
        <code class="prettyprint">columns</code>
        attribute and create a template for action column with an
        <code class="prettyprint">oj-c-menu-button</code>
        component.
    </li>
    <li>
        Use the
        <code class="prettyprint">items</code>
        attribute to create the menu.
    </li>
    <li>
        Add a menu listener on the
        <code class="prettyprint">oj-c-menu-button</code>
        to update the mutable array due to the action.
    </li>
    <li>
        For sticky columns, set the columns sticky property to
        <code>enabled</code>
    </li>
    <li>
        This demo sets the first, third and last columns to be sticky
    </li>
    <li>The Selector checkbox column always remains sticky at the start.</li>
</ul>`;

export const tableStickyColumnTablecorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
