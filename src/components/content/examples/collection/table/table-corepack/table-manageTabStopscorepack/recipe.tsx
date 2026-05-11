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
    In the <code class="prettyprint">columns</code> attribute set the <code class="prettyprint">template</code>
    value to reference the slot names for the inline cell templates you defined. This is not
    required when using the default <code class="prettyprint">cellTemplate</code> slot.
  </li>
  <li>
    Set the <code class="prettyprint">data-oj-as</code> attribute on the template element to set
    the alias for the cell context for individual templates.
  </li>
  <li>
    In the 'link' template, use the <code class="prettyprint">isTabbable</code> property from the template
    context to determine the correct <code class="prettyprint">tabindex</code>code> for the anchor element.
  </li>
  <li>
    In the 'card' template, add the <code>data-oj-manage-tabs</code> attribute to the
    <code class="prettyprint">demo-memory-card</code> element as it contains tabbable content
    that is not accessible to the application.
  </li>
  <li>
    Note - all core pack components (<code class="prettyprint">oj-c-button</code> for example) automatically
    handle <code class="prettyprint">tabindex</code> manipulation when specified as children of the
    <code class="prettyprint">oj-c-table</code>.
  </li>
</ul>`;

export const tableManageTabStopscorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
