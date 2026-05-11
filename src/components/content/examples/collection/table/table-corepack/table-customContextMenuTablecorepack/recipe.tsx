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
        Use the
        <code>context-menu-config</code>
        attribute to specify a context menu.
    </li>
    <li>
        You can specify <code>defaultMenuItems</code> as a part of the array returned by the context menu items so it would render the resize menu item to perform the resizing when applicable.
    </li>
    <li>To add default menu items, please add string <code>'defaultMenuItems'</code> as shown in the demo typescript with a seperator</li>
</ul>`;

export const tableCustomContextMenuTablecorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
