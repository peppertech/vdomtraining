// @ts-nocheck
import 'preact';

export const listViewNoDataListViewRecipe = (
  <>
    <ol>
      <li>Use the oj-list-view tag to create a JET ListView.</li>
      <li>Use the noData slot to specify the content to show when there is no data.</li>
      <li>
        To adhere to Redwood design for list items, use the
        {" "}
        <code>oj-sp-empty-state</code>
        {" "}
        component in the noData slot.
      </li>
    </ol>
  </>
);
