import { h } from "preact";

const recipeHtmlText = String.raw`<ol>
    <li>
        For more information about configuring an oj-c-tab-bar with reorderable and removable tabs please see the <a href="#" onclick="demoGoLink(event, 'tabBarCorepack', 'reorder'); return false;">reorder demo</a>
        and <a href="#" onclick="demoGoLink(event, 'tabBarCorepack', 'addAndRemove'); return false;">remove demo</a>.
    </li>
    <li>
        Use the
        <code>context-menu-config</code>
        attribute to specify a context menu.
    </li>
    <li>
        You can specify <code>defaultMenuItems</code> as a part of the array returned by the context menu items so it would render the remove menu item to perform the remove action and move menu items to perform the reorder action when applicable.
        To know if default menu items are availabe use <code>hasDefaultMenuItems</code> from the context and then specify a separator and it will be rendered between default and custom menu items. 
    </li>
    <li>
        Alternatively you can pick either one of these default menu items by specifying <code>remove</code> or <code>reorder</code> or both and insert them amongst the custom menu items. 
    </li>
    <li>
        Note: Do not use both defaultMenuItems and allMenuItems. 
    </li>
  </ol>`;

export const tabBarContextMenucorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
