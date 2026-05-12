// @ts-nocheck
import { h } from 'preact';

export const listViewGridlinesListViewRecipe = (
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
      <li>Use the gridlines attribute to explicitly set whether gridlines are visible or hidden.</li>
      <li>
        Use the item.enter-key-focus-behavior attribute and set it to 'focusWithin' to allow access to
        focusable elements within the item using the enter key (in addition to F2 key).
      </li>
    </ol>
  </>
);
