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
    Define one or more inline cell templates and set the slot attribute to the names of your
    choosing. If you are using the same default cell template for all cells, use the default
    <code class="prettyprint">cellTemplate</code>
    slot name.
  </li>
  <li>
    In the
    <code class="prettyprint">columns</code>
    attribute set the
    <code class="prettyprint">template</code>
    value to reference the slot names for the inline cell templates you defined. This is not
    required when using the default
    <code class="prettyprint">cellTemplate</code>
    slot.
  </li>
  <li>
    Define one or more inline header templates and set the slot attribute to the names of your
    choosing. If you are using the same default header template for all headers, use the default
    <code class="prettyprint">headerTemplate</code>
    slot.
  </li>
  <li>
    In the
    <code class="prettyprint">columns</code>
    attribute set the
    <code class="prettyprint">headerTemplate</code>
    value to reference the slot names for the inline header templates you defined. This is not
    required when using the default
    <code class="prettyprint">headerTemplate</code>
    slot.
  </li>
  <li>
    Set the
    <code class="prettyprint">data-oj-as</code>
    attribute on the template element to set the alias for the cell context for individual
    templates.
  </li>
</ul>`;

export const tableTemplateSlotTablecorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
