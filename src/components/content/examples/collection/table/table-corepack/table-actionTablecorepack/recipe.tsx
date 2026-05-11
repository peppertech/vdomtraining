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
    Set a template for the
    <code class="prettyprint">columns</code>
    attribute and create a template for action column with an
    <code class="prettyprint">oj-c-button</code>
    component.
  </li>
  <li>
    Add an action handler on the
    <code class="prettyprint">oj-c-button</code>
    to update the mutable array due to the action.
  </li>
  <li>
    Set the
    <code class="prettyprint">data-oj-clickthrough</code>
    attribute on the
    <code class="prettyprint">oj-c-button</code>
    to
    <code class="prettyprint">disabled</code>
    to prevent clicks from affecting the
    <code class="prettyprint">oj-c-table's</code>
    selection state.
  </li>
</ul>`;

export const tableActionTablecorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
