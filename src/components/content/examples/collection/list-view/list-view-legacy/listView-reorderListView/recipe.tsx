// @ts-nocheck
import 'preact';

export const listViewReorderListViewRecipe = (
  <>
    <ol>
      <li>Construct an ArrayTreeDataProvider using the JSON data from url as shown.</li>
      <li>Use the oj-list-view tag to create a JET ListView.</li>
      <li>Use the data attribute to bind the ArrayTreeDataProvider you created previously as input.</li>
      <li>Use the display attribute to specify whether to render data as card or item.</li>
      <li>Use the itemTemplate slot to specify what to render the content inside list item.</li>
      <li>
        Since oj-list-item-layout is used, which provides its own padding, remove the default item
        padding using the oj-listview-item-padding-off style class.
      </li>
      <li>
        Use the item.enter-key-focus-behavior attribute and set it to 'focusWithin' to allow access to
        focusable elements within the item using the enter key (in addition to F2 key).
      </li>
      <li>
        Specify oj-listview-drag-handle class on the drag affordance. This will enable reordering of a
        single item within the list. If you wish to reorder multiple items, do not use this class.
        Instead, change selection-mode to 'multiple' so that users can select multiple items, then drag
        them.
      </li>
      <li>Use the dnd.reorder.items attribute to enable item reordering.</li>
      <li>
        Use the dnd.drop.items.drag-over attribute to register a drag over event callback that prevent
        drop on the folder.
      </li>
      <li>
        Use the on-oj-reorder attribute to specify a handler for the reorder event to perform the move
        operation.
      </li>
      <li>
        To meet Accessibility Guidelines define a context menu on the ListView that perform cut and
        paste item.
      </li>
      <li>
        Optionally, define key listener to handle cut and paste of item using specific keystrokes.
      </li>
      <li>
        Associate the context menu with the listview by adding it as a child of listview element and set
        the slot attribute to "contextMenu" on the context menu element.
      </li>
      <li>Apply the binding as shown at the bottom.</li>
    </ol>
  </>
);
