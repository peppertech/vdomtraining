// @ts-nocheck
import { h } from 'preact';

export const listViewProgressiveLoadListViewRecipe = (
  <>
    <ol>
      <li>
        Construct an CollectionDataProvider using the Collection object as shown. Make sure to specify
        the 'idAttribute' option.
      </li>
      <li>Use the oj-list-view tag to create a JET ListView</li>
      <li>
        Use the data attribute to bind the CollectionDataProvider you created previously as data for
        ListView
      </li>
      <li>Use the scroll-policy attribute to enable high-water mark scrolling.</li>
      <li>Use the scroll-policy-options.fetch-size attribute to explicitly specify a fetch size.</li>
      <li>
        Use the item.enter-key-focus-behavior attribute and set it to 'focusWithin' to allow access to
        focusable elements within the item using the enter key (in addition to F2 key).
      </li>
      <li>Apply the binding as shown at the bottom.</li>
      <li>Note the initial fetch is intentionally slowed down to show the loading indicator.</li>
    </ol>
  </>
);
