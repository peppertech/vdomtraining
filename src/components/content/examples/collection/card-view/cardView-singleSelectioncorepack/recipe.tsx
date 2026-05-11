import { h } from "preact";

const recipeHtmlText = String.raw`<ul>
  <li>
    Please see the
    <a href="#" onclick="demoGoLink(event, 'cardViewCorepack', 'basic'); return false;">
      basic oj-c-card-view demo
    </a>
    for more information about configuring oj-c-card-view.  
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
    Create an
    <code class="prettyprint">oj-c-selection-card</code>
    element.
  </li>
  <li>
    Bind the
    <code>selected</code>
    attribute on
    <code class="prettyprint">oj-c-selection-card</code>
    to reflect whether the item is selected or not.
  </li>
  <li>
    Use the switch to change
    <code>selection-mode</code> attribute to <code>singleRequired</code>
    to enforce selection.
  </li>
  <li>
    To get data from selected rows use fetchByKeys on the dataprovder as shown in the
    <a href="#" onclick="demoGoLink(event, 'home', 'rootFramework_childDataProvider'); return false;">
      data provider demo.
    </a>
  </li>

</ul>`;

export const cardViewSingleSelectioncorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
