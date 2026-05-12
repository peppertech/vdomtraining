// @ts-nocheck
import { h } from 'preact';

export const listViewStickyGroupHeaderListViewRecipe = (
  <>
    <ol>
      <li>Construct an JSON TreeDataSource using the JSON data from url as shown.</li>
      <li>Use the oj-list-view tag to create a JET ListView.</li>
      <li>Use the data attribute to bind the JSON TreeDataSource you created previously as input.</li>
      <li>
        Use the item.renderer attribute to specify how you want to use to render the content inside list
        item.
      </li>
      <li>
        Use the item.enter-key-focus-behavior attribute and set it to 'focusWithin' to allow access to
        focusable elements within the item using the enter key (in addition to F2 key).
      </li>
      <li>Use the drill-mode attribute to disable expand/collapse.</li>
      <li>
        Use the group-header-position attribute to make the group header stick to the top of ListView
        when scrolls.
      </li>
      <li>Define a div in your HTML for filtering contacts.</li>
      <li>Bind a keyup event handler on the filter to perform filtering as the user types.</li>
      <li>Apply the binding as shown at the bottom.</li>
    </ol>
  </>
);
