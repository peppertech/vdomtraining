// @ts-nocheck
import { h } from 'preact';

export const tableExternalScrollTableRecipe = (
  <>
    <ol>
      <li>Construct a MutableArrayDataProvider with an array of data.</li>
      <li>Use the oj-table tag to create a JET Table</li>
      <li>Use the data attribute to bind the MutableArrayDataProvider you created previously as data for Table</li>
      <li>Use the scroll-policy-options.scroller attribute to specify the external scroller element on the page.</li>
      <li>Note - Make sure the Table's height and width are NOT constrained in any way when using the external scroller functionality.</li>
      <li>Optionally, use the scroll-policy-options.scroller-offset-[dir] attributes to specify any adjustments to the Table's logical viewport sizing if it differs from the external scroll element's size. For example, scroll-policy-options.scroller-offset-top="100" would be used to notify the Table that a 100px tall 'sticky' element is always shown between the top of the Table and the top of its external scroller.</li>
    </ol>
  </>
);
