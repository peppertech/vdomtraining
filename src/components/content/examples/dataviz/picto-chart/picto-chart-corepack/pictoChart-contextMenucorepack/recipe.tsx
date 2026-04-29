// @ts-nocheck
import { h } from "preact";

const recipeHtmlText = String.raw`<ul>
  <li>
    Create an
    <b>oj-c-picto-chart</b>
    element.
  </li>
  <li>
    Supply the data items using the
    <i><b>data</b></i>
    attribute. Optionally set the 'data-oj-as' attribute on the template element to set the alias
    for the $current context for individual templates.
  </li>
  <li>
    Add an
    <b>itemTemplate</b>
    slot with
    <b>oj-c-picto-chart-item</b>
    child element. For more details, see
    <a target="_blank" href="jsdocs/oj-c.PictoChart.html#itemTemplate">itemTemplate</a>
    and
    <a target="_blank" href="jsdocs/oj-c.PictoChartItem.html">oj-c-picto-chart-item</a>
    .
  </li>
  <li>
    Use the <i><b>context-menu-config</b></i> attribute to specify a context menu.
  </li>
  <li>
    As an alternative of adding <i><b>onAction</b></i> and <i><b>onSelection</b></i> callbacks on the pertinent items definition inside <i><b>context-menu-config</b></i>, you can add 
    <a href="jsdocs/oj-c.PictoChart.html#event:ojContextMenuAction">
      <i><b>on-oj-context-menu-action</b></i>
    </a> and 
    <a href="jsdocs/oj-c.PictoChart.html#event:ojContextMenuSelection">
      <i><b>on-oj-context-menu-selection</b></i>
    </a> events.
  </li>
</ul>`;

export const pictoChartContextMenucorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
