// @ts-nocheck
import 'preact';

export const tableScrollPosTableRecipe = (
  <>
    <ol>
      <li>Construct an ArrayDataProvider with an array of data.</li>
      <li>Use the oj-table tag to create a JET Table</li>
      <li>Use the data attribute to bind the ArrayDataProvider you created previously as data for Table</li>
      <li>Set the scroll-policy attribute to "loadMoreOnScroll" for highwatermark scrolling.</li>
      <li>Specify the scroll-position value on the table.</li>
      <li>Add input fields for each property you want to control in scroll position (e.g. rowIndex, columnIndex).</li>
      <li>Create observables and bind them to input fields.</li>
      <li>Use an observable for scroll-position that combines these input values and bind it to the table.</li>
    </ol>
  </>
);
