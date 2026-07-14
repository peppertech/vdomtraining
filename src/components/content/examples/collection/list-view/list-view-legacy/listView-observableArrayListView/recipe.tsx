// @ts-nocheck
import 'preact';

export const listViewObservableArrayListViewRecipe = (
  <>
    <ol>
      <li>Construct an ArrayDataProvider using the observable array as shown.</li>
      <li>Wrap the ArrayDataProvider with a BufferingDataProvider.</li>
      <li>Use the oj-list-view tag to create a JET ListView.</li>
      <li>Bind the BufferingDataProvider to the data attribute of the ListView.</li>
      <li>Use the selection-mode attribute to enable multi-selection.</li>
      <li>Use the selected attribute to keep track of current selection.</li>
      <li>
        Use BufferingDataProvider methods (addItem, updateItem, removeItem) to buffer edits created by
        the Add/Update/Remove buttons.
      </li>
      <li>Specify a template using the itemTemplate slot to render each list item.</li>
      <li>
        Use the item.enter-key-focus-behavior attribute and set it to 'focusWithin' to allow access to
        focusable elements within the item using the Enter key (in addition to F2).
      </li>
      <li>Apply the Knockout binding as shown at the bottom.</li>
    </ol>
  </>
);
