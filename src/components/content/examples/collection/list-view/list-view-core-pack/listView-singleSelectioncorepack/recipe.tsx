import { h } from "preact";

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
    <code>selection-mode</code>
    attribute to enable single item selection.
  </li>
  <li>
    Bind the
    <code>selected</code>
    attribute to an observable keyset to monitor current selection.
  </li>
  <li>
    Use
    <code>on-selected-changed</code>
    attribute to register listeners to perform custom logic on selected items.
  </li>
  <li>
    Use the switch to change
    <code>selection-mode</code> attribute to <code>singleRequired</code>
    to enforce selection.
  </li>
  <li>
    Use
    <code>on-oj-first-selected-item</code>
    attribute to register listeners to perform custom logic on the first selected item.
  </li>
  <li>
    To get data from selected rows use fetchByKeys on the dataprovder as shown in the
    <a href="#" onclick="demoGoLink(event, 'home', 'rootFramework_childDataProvider'); return false;">
    data provider demo.
    </a>
  </li>
</ul>`;

export const listViewSingleSelectioncorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
