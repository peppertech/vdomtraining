// @ts-nocheck
import { h } from 'preact';

export const listViewHighWaterMarkScrollingListViewRecipe = (
  <>
    <ol>
      <li>Construct a DataProvider for the Tweets dataset.</li>
      <li>Use the oj-list-view tag to create a JET ListView.</li>
      <li>Bind the DataProvider to ListView through the data attribute.</li>
      <li>
        Keep the default scroll-policy value of loadMoreOnScroll to enable high-water mark
        scrolling.
      </li>
      <li>Use the scroll-policy-options.fetch-size attribute to explicitly specify a fetch size.</li>
      <li>Note the fetch is intentionally slowed down to show the loading indicator.</li>
    </ol>
  </>
);
