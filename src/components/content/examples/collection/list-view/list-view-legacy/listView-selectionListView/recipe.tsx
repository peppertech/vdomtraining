// @ts-nocheck
import { h } from 'preact';

export const listViewSelectionListViewRecipe = (
  <>
    <ol>
      <li>Construct an ArrayDataProvider with the array data.</li>
      <li>Use the oj-list-view tag to create a JET ListView.</li>
      <li>
        Use the data attribute to bind an ArrayDataProvider you created previously as data for ListView.
      </li>
      <li>Use the itemTemplate slot to specify the template for rendering the item.</li>
      <li>
        Since oj-list-item-layout is used, which provides its own padding, remove the default item
        padding using the oj-listview-item-padding-off style class.
      </li>
      <li>Use the oj-selector and associated its selected-keys to the selected KeySet in ListView.</li>
      <li>
        Use the
        <code className={"prettyprint"}>selection-mode</code>
        attribute to enable multi-selection.
      </li>
      <li>
        Bind the
        <code className={"prettyprint"}>selected</code>
        attribute to an observable keyset to monitor current selection.
      </li>
      <li>
        Use the
        <code className={"prettyprint"}>first-selected-item</code>
        attribute to track the first selected item.
      </li>
      <li>
        Use on-selected-changed attribute to register listeners to perform custom logic on selected
        items.
      </li>
      <li>
        Use the item.enter-key-focus-behavior attribute and set it to 'focusWithin' to allow access to
        focusable elements within the item using the enter key (in addition to F2 key).
      </li>
      <li>
        To get data from selected rows use fetchByKeys on the dataprovder as shown in the
        <a href={"#"}>
          data provider demo.
        </a>
      </li>
    </ol>
    <p>
      Refer
      <a href={"#"}>
        demos
      </a>
      for more Data Provider usage.
    </p>
  </>
);
