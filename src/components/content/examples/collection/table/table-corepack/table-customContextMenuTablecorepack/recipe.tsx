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
        Use the
        <code>contextMenuConfig</code>
        property to return custom actions for the cell or header that opened the menu.
    </li>
    <li>
        Include <code>'defaultMenuItems'</code> when <code>hasDefaultMenuItems</code> is true to place supported built-in actions between custom actions.
    </li>
    <li>Add <code>{ type: 'separator' }</code> objects around the built-in actions, as shown in the TypeScript demo.</li>
</ul>`;

export const tableCustomContextMenuTablecorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
