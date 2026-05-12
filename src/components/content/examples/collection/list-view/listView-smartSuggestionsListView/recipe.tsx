// @ts-nocheck
import { h } from 'preact';

export const listViewSmartSuggestionsListViewRecipe = (
  <>
    <ol>
      <li>
        Construct a custom DataProvider that returns suggestion metadata. For example, a custom
        DataProvider that works with OARS service (please refer to information in the info section for
        details). The DemoSmartSuggestionsDataProvider used here is for demo purpose only!.
      </li>
      <li>Use the oj-list-view tag to create a JET ListView.</li>
      <li>
        Use the data attribute to bind the DataProvider you created previously as data for ListView.
      </li>
      <li>Use the itemTemplate slot to specify the template for rendering the item.</li>
      <li>
        Use the item.enter-key-focus-behavior attribute and set it to 'focusWithin' to allow access to
        focusable elements within the item using the enter key (in addition to F2 key).
      </li>
    </ol>
  </>
);
