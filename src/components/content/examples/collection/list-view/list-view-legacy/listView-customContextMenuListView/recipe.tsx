// @ts-nocheck
import 'preact';

export const listViewCustomContextMenuListViewRecipe = (
  <>
    <ol>
      <li>
        Use the oj-list-view tag to create a JET ListView component and assign it a meaningful id.
      </li>
      <li>Use the oj-menu tag to create a JET Menu component and add it as a child of oj-list-view.</li>
      <li>The oj-menu must have a slot attribute with value set to "contextMenu".</li>
      <li>
        Since oj-list-item-layout is used, which provides its own padding, remove the default item
        padding using the oj-listview-item-padding-off style class.
      </li>
      <li>
        Use the item.enter-key-focus-behavior attribute and set it to 'focusWithin' to allow access to
        focusable elements within the item using the enter key (in addition to F2 key).
      </li>
      <li>In your JavaScript define necessary functions, such as a new on action function.</li>
      <li>Bind the listview and the enclosed custom menu using knockout.</li>
    </ol>
  </>
);
