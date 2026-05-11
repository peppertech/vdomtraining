// @ts-nocheck
import { h } from 'preact';

export const tableScrollToKeyTableRecipe = (
  <>
    <ol>
      <li>Construct an ArrayDataProvider with an array of data.</li>
      <li>Use the oj-table tag to create a JET Table</li>
      <li>Use the data attribute to bind the ArrayDataProvider you created previously as data for Table</li>
      <li>Use the selection-mode attribute to specify single row selection.</li>
      <li>Set row with id 'i6' as selected using selected attribute.</li>
      <li>Set the scroll-policy attribute to "loadMoreOnScroll" for highwatermark scrolling.</li>
      <li>Use the scroll-policy-options.fetch-size attribute to explicitly specify a fetch size.</li>
      <li>Use the scroll-position attribute to specify the initial scroll position.</li>
      <li>Use the scroll-to-key attribute to control whether the Table scrolls to the selected row (use "capability" to enable scrolling to selected row, or "never" to disable it, refer to the documentation for all supported values).</li>
      <li>Apply the binding as shown at the bottom.</li>
    </ol>
  </>
);
