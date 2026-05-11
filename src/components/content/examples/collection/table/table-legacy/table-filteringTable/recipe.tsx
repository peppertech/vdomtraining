// @ts-nocheck
import { h } from 'preact';

export const tableFilteringTableRecipe = (
  <>
    <ol>
      <li>
        Create a ListDataProviderView. To create an observable for totalFilteredRowCount set
        <code>includeFilteredRowCount</code>
        option to
        <code>enabled</code>
        .
      </li>
      <li>
        Setup observable for filtered row count using
        <code>getTotalFilteredRowCountObservable</code>
        method as shown.
      </li>
      <li>Define an oj-input-text in your HTML for the filter.</li>
      <li>Add a "filter" observable to your view model.</li>
      <li>Bind the "on-raw-value-changed" attribute of the oj-input-text to a listener that updates the "filter" observable as the user types.</li>
      <li>Define an oj-table in your HTML for the data.</li>
      <li>Bind the "data" attribute of the oj-table to ListDataProvider instance created earlier.</li>
      <li>Define a cell renderer function to perform any highlighting on the cell contents according to the filter.</li>
      <li>Specify the cell renderer function in the "columns" definition and bind it to the oj-table.</li>
      <li>Add either an aria-label or caption to the oj-table to conform to accessibility guidelines.</li>
    </ol>
    <p>
      Refer
      <a href={"#"}>demos</a>
      for more Data Provider usage.
    </p>
  </>
);
