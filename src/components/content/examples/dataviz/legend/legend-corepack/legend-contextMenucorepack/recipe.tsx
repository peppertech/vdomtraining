import { h } from "preact";

const recipeHtmlText = String.raw`<ol>
  <li>
    Please see the
    <a href="#" onclick="demoGoLink(event, 'legendCorepack', 'basic'); return false;">
      basic oj-c-legend demo
    </a>
    for more information about configuring a basic oj-c-legend.
</li>
  <li>
    Use the <i><b>context-menu-config</b></i> attribute to specify a context menu.
  </li>
  <li>
    This demo shows using <i><b>onAction</b></i> and <i><b>onSelection</b></i> callbacks on the pertinent items definition inside  <i><b>context-menu-config</b></i>, but an
    alternative would be to add <a href="jsdocs/oj-c.Legend.html#event:ojContextMenuAction">
      <i><b>on-oj-context-menu-action</b></i>
    </a> and 
    <a href="jsdocs/oj-c.Legend.html#event:ojContextMenuSelection">
      <i><b>on-oj-context-menu-selection</b></i>
    </a> listeners on the <b>oj-c-legend</b>. See this <a href="#" onclick="demoGoLink(event, 'menuButtonsCorepack', 'event'); return false;"><i><b>demo</b></i></a> which shows <i><b>on-oj-menu-action</b></i> and the <i><b>on-oj-menu-selection</b></i> callbacks which are analogous to the context menu callbacks.
  
  </li>
</ol>`;

export const legendContextMenucorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
