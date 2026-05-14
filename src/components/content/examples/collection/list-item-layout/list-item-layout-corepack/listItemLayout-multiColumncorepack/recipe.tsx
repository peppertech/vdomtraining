import { h } from "preact";

const recipeHtmlText = String.raw`<ol>
  <li>Construct an ArrayDataProvider using the data as shown.</li>
  <li>
    Use the oj-c-list-view tag to create a JET ListView which uses the ArrayDataProvider you created
    previously as input.
  </li>
  <li>
    Use
    <a href="#" onclick="demoGoLink(event, 'text', 'typography'); return false;">oj-typography-*</a>
    classes to set style for text content.
  </li>
  <li>
    The sample shows how to use multiple
    <code class="prettyprint">oj-c-list-item-layout</code>
    components to build a multi-column layout.
  </li>
  <li>
    Use
    <code class="prettyprint">oj-flex</code>
    and
    <code class="prettyprint">oj-flex-item</code>
    to lay out the
    <code class="prettyprint">oj-c-list-item-layout</code>
    component as a column or row.
  </li>
</ol>`;

export const listItemLayoutMultiColumncorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
