import { h } from "preact";

const recipeHtmlText = String.raw`<ol>
    <li>
    Please see the
    <a href="#" onclick="demoGoLink(event, 'tabBarCorepack', 'basic'); return false;">
      basic oj-c-tab-bar demo
    </a>
    for more information about configuring oj-c-tab-bar.
    </li>
    <li>
        use the 
        <code>reorderable</code>
        attribute to enable item reordering.
    </li>
    <li>
        Use the 
        <code>on-oj-reorder</code>
        attribute to specify a handler for the reorder event.
    </li>
  </ol>`;

export const tabBarReordercorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
