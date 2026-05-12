// @ts-nocheck
import { h } from 'preact';

export const listViewJsonHierListViewRecipe = (
  <>
    <ol>
      <li>Construct an ArrayTreeDataProvider using the JSON data from url as shown.</li>
      <li>Use the oj-list-view tag to create a JET ListView.</li>
      <li>
        Use the data attribute to bind the ArrayTreeDataProvider you created previously as data input.
      </li>
      <li>
        Use the itemTemplate slot with a template element to specify the content to render inside each
        list item.
      </li>
      <li>
        Since oj-list-item-layout is used, which provides its own padding, remove the default item
        padding using the oj-listview-item-padding-off style class.
      </li>
      <li>Use the item.selectable attribute to control what can be select.</li>
      <li>Use the selection-mode attribute to enable selection.</li>
      <li>Use the drill-mode attribute to disable expand/collapse.</li>
      <li>Use the expanded attribute to control which group nodes should be expanded initially.</li>
      <li>
        Use the item.enter-key-focus-behavior attribute and set it to 'focusWithin' to allow access to
        focusable elements within the item using the enter key (in addition to F2 key).
      </li>
      <li>Apply the binding as shown at the bottom.</li>
    </ol>
  </>
);
