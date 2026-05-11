import { h } from "preact";

const recipeHtmlText = String.raw`<ul>
  <li>
    Please see the <a href="#" onclick="demoGoLink(event, 'cardViewCorepack', 'basic'); return false;">
      basic demo
    </a> 
    for more information about configuring an oj-c-card-view.
  </li>
  <li>
    Bind the
    <code>selected-key</code>
    attribute to an observable keyset so that
    <code class="prettyprint">oj-c-selector-all</code>
    will update based on the current selection.
  </li>
  <li>
    Use the
    <code>selection-mode</code>
    attribute to enable multiple selection.
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
    element and put it inside the itemTemplate slot.
  </li>
  <li>
    Bind the
    <code>selected</code>
    attribute on
    <code class="prettyprint">oj-c-selection-card</code>
    to reflect whether the item is selected or not.
  </li>
  <li>
    Create an
    <code class="prettyprint">oj-c-selector</code>
    element and place it inside the
    <code class="prettyprint">oj-c-selection-card</code>.
  </li>
  <li>
    Note that since the oj-c-selector is used inside of oj-c-card-view,
    You do not need to specify any attributes on oj-c-selector as it will
    retrieve all of those from oj-c-card-view.
  </li>
  <li>
    To get data from selected rows use fetchByKeys on the dataprovder as shown in the
    <a href="#" onclick="demoGoLink(event, 'home', 'rootFramework_childDataProvider'); return false;">
      data provider demo.
    </a>
  </li>
</ul>`;

export const cardViewMultipleSelectioncorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
