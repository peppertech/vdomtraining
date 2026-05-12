import { h } from "preact";

const recipeHtmlText = String.raw`<ul>
  <li>
    Please see the <a href="#" onclick="demoGoLink(event, 'listViewCorepack', 'basic'); return false;">
      basic demo
    </a> 
    for more information about configuring an oj-c-list-view.
  </li>
  <li>
    Use the
    <code>selection-mode</code>
    attribute to enable multiple item selection.
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
    Note that since the oj-c-selector is used inside of oj-c-list-view,
    You do not need to specify any attributes on oj-c-selector as it will
    retrieve all of those from oj-c-list-view.
  </li>
  <li>
    To get data from selected rows use fetchByKeys on the dataprovder as shown in the
    <a href="#" onclick="demoGoLink(event, 'home', 'rootFramework_childDataProvider'); return false;">
    data provider demo.
    </a>
  </li>

</ul>`;

export const listViewMultipleSelectioncorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
