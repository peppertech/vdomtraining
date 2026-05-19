// @ts-nocheck
import { h } from 'preact';

export const messagesSortingMessagesRecipe = (
  <>
    <p>Sorting the messages list:</p>
    <ol>
      <li>
        Include a
        <code>oj-messages</code>
        element in the page with its 'messages' attribute bound to DataProvider implementation. We use
        the ListDataProviderView since it already provides the convenience of invoking the sort during
        data fetch.
      </li>
      <li>
        Create a comparator callback function for custom sort, and set it on the ArrayDataProvider.
      </li>
      <li>Create a ListDataProviderView from the ArrayDataProvider and add a sort criteria.</li>
    </ol>
  </>
);
