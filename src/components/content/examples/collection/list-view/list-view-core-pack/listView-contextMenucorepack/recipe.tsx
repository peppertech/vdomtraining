import 'preact';

const recipeHtmlText = String.raw`<ul>
  <li>
    Please see the
    <a href="#" onclick="demoGoLink(event, 'listViewCorepack', 'basic'); return false;">
      basic oj-c-list-view demo
    </a>
    for more information about configuring oj-c-list-view.  
  </li>
  <li>
    Use the
    <code>context-menu-config</code>
    attribute to specify a context menu.
  </li>
  <li>
    As an alternative of adding onAction and onSelection callbacks on the pertinent items definition inside context-menu-config,
    you can add on-oj-context-menu-action and on-oj-context-menu-selection events. This DOM-centric approach corresponds 
    to the legacy approach for menus and may provide easier integration with Visual Builder.
  </li>
</ul>`;

export const listViewContextMenucorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
